// SPDX-FileCopyrightText: 2026 Dacely <business@dacely.com>
// SPDX-License-Identifier: LicenseRef-Proprietary

import type { ErrorCode } from '../core/ErrorTypes.js';
import type { Graphic } from '../graphics/Graphic.js';
import type { JsonValue } from '../json/JsonValue.js';
import type { ContentBlock } from '../providers/Types.js';
import type { ReverseRunSnapshot } from '../reverse/ProgressTypes.js';
import type { VisualResponse } from '../visuals/VisualResponse.js';
import type { DeliveryReceipt } from './DeliveryTypes.js';
import type { TruncationRecord } from './output/TruncateTypes.js';
import type { ProgressPreview } from './ProgressPreview.js';

/**
 * The tool contract.
 *
 * Two rules shape everything here, and both come from the requirement that many agents run
 * concurrently in one process:
 *
 * 1. **Every tool is async.** There is no synchronous escape hatch. A tool that reads a file
 *    synchronously blocks every other agent's streaming for the duration; the type system refusing
 *    to express that is the cheapest enforcement available.
 * 2. **Every tool takes an `AbortSignal` and must honor it.** A user pressing escape, a turn
 *    timeout, or a parent agent cancelling a sub-agent all resolve to the same thing — a tool that
 *    ignores the signal keeps burning a slot and, worse, may deliver a result for a turn that has
 *    already ended.
 */

/** How a tool's result is rendered and how much it can be trusted. */
export const ResultContentSource = {
    /** Produced locally from the user's own machine or workspace. */
    Local: 'local',
    /**
     * Fetched from the network.
     *
     * Marked so the turn can be TAINTED: content an attacker controls must never be read as
     * instructions. Anything carrying this is fenced before it reaches the model.
     */
    Network: 'network',
    /** Produced by a model from instructions this agent supplied (for example, a sub-agent). */
    Model: 'model',
    /** Produced by a model interpreting attacker-influenced input such as an uploaded image. */
    ExternalModel: 'external-model',
} as const;

/** Where a tool result's content came from. */
export type ResultContentSource = (typeof ResultContentSource)[keyof typeof ResultContentSource];

/** What a tool did, from the agent's point of view. */
export const ToolStatus = {
    Ok: 'ok',
    /** The tool ran and failed. The model sees the error and may adapt. */
    Error: 'error',
    /** Policy refused the call. Distinct from an error: retrying identically will refuse again. */
    Denied: 'denied',
    /** The call was aborted. */
    Aborted: 'aborted',
} as const;

/** One tool outcome status. */
export type ToolStatus = (typeof ToolStatus)[keyof typeof ToolStatus];

/** A normal host-produced command snapshot may describe a running program or observed termination. */
export interface CommandExecutionSnapshot {
    /** An explicit false value never supplies native cleanup uncertainty metadata. */
    readonly cleanupUnconfirmed?: false;
    readonly command: string;
    readonly cwd: string;
    readonly exitCode: number | null;
    readonly signal: string | null;
    readonly processId: string | null;
    readonly processToken: string | null;
    readonly running: boolean;
    readonly remote: boolean;
    /** Original terminal stream, including ANSI styles and cursor controls. */
    readonly terminalOutput?: string;
}

/** Unresolved native ownership preserves only the exact actionable handle, without command arguments or fabricated exit evidence. */
export interface CommandExecutionCleanupUnconfirmed {
    readonly cleanupUnconfirmed: true;
    readonly processId: string;
    readonly running: true;
    readonly remote: true;
    readonly exitCode: null;
    readonly signal: null;
}

/** Native cleanup uncertainty remains distinct from a normal command snapshot. */
export type CommandExecutionReceipt = CommandExecutionSnapshot | CommandExecutionCleanupUnconfirmed;

/** What a tool returns. */
export interface ToolResult {
    /** Selected visual milestones; the controller delivers them without ending the task. */
    readonly progressPreviews?: readonly ProgressPreview[];
    /** Inert rich visual response retained independently of model-visible text. */
    readonly visual?: VisualResponse;
    /** Validated native graphic retained independently of model-visible text. */
    readonly graphic?: Graphic;
    /** Runtime-authored investigation receipt, retained in presentation history. */
    readonly reverse?: ReverseRunSnapshot;
    /** Only the execution adapter supplies this evidence; stdout cannot forge it. */
    readonly commandExecution?: CommandExecutionReceipt;
    /** Absolute source paths accepted by a native engineering workflow, never model-supplied. */
    readonly verifiedCodePaths?: readonly string[];
    /** The native process table confirmed the requested handle is absent for this session. */
    readonly processMissing?: boolean;
    readonly status: ToolStatus;
    /** A runtime-classified cause that can be presented without exposing exception text. */
    readonly failureCode?: ErrorCode;
    /**
     * What the model sees. A string for the ordinary case; blocks when the result carries an image
     * or a document the model should actually look at.
     */
    readonly content: string | readonly ContentBlock[];
    /**
     * Preserve the string byte-for-byte instead of applying the registry's display-oriented
     * truncation. This is only for machine-readable protocol payloads whose consumer is the
     * provider itself, such as the paged project-graph manifest. Ordinary human/model output must
     * leave this unset and use `continuation` when it is large. A native paged diagnostic may also
     * preserve one indivisible record within its own hard page limit when a batch prefers less;
     * full source records and unbounded output must never use this exception.
     */
    readonly protocolPayload?: boolean;
    /** A short human label for a UI, e.g. `read 412 lines from src/main.ts`. */
    readonly label?: string;
    /** Where the content came from, for taint tracking. */
    readonly source?: ResultContentSource;
    /**
     * Structured data for a UI that renders this tool specially (a diff view, a file tree).
     * Never sent to the model — that is what `content` is for.
     */
    readonly display?: JsonValue;
    /** Text this tool already delivered to the user outside the agent's eventual reply. */
    readonly deliveredText?: string;
    /** Host receipt: true only after the attachment channel send resolves. */
    readonly deliveredMedia?: boolean;
    /** Exact submitted artifact and acknowledged destination, produced by the delivery adapter. */
    readonly deliveryReceipt?: DeliveryReceipt;
    /** One authoritative receipt per file in a multi-attachment delivery. */
    readonly deliveryReceipts?: readonly DeliveryReceipt[];
    /** Original image digests successfully inspected by a vision route. */
    readonly inspectedMediaSha256?: readonly string[];
    /**
     * A question handed back to the conversation surface for native delivery.
     *
     * Finite choices become buttons or a menu on capable channels and numbered text elsewhere.
     * With no choices, the question remains an ordinary text reply. The channel router, not the
     * tool, owns delivery because only it knows the active address and platform capabilities.
     */
    readonly question?: ToolQuestion;
    /**
     * Whether this result should END the turn rather than feed back into the model.
     *
     * Used by tools that hand control elsewhere (asking the user a question, yielding to another
     * agent). AND-ed across a batch, never OR-ed: one tool wanting to stop must not cancel the
     * results the model still needs from the others in the same batch.
     */
    readonly terminate?: boolean;
    /**
     * The exact call that would show the next page of this result, written by the tool.
     *
     * Supplied by the TOOL and by nothing else, because only the tool knows its own argument names.
     * A shared builder would render `offset` for a tool whose parameter is `start_index`, and a
     * model handed a follow-up call that does not validate concludes paging is broken and gives up
     * on the rest of the output entirely. The registry copies it into the truncation marker when it
     * has to cut the result; a tool that pages itself puts it in `content` and leaves this unset.
     */
    readonly continuation?: string;
    /**
     * What the registry's backstop removed, when it removed anything.
     *
     * Set on the way OUT, never by the tool. It exists because the marker in `content` is prose for
     * the model and a UI cannot parse prose: without this, a transcript view has no way to render
     * "this result was cut" as anything but a wall of text, and no way to offer the spill file as a
     * link. `undefined` means the result was returned whole.
     *
     * It is PLUMBING, not a delivered feature: no UI in this repo reads it. It rides out to
     * embedders on `toolOutcomes`, which is a legitimate public API, but the transcript view that
     * would render a cut is not built and neither is the spill link — see `tools/output/Spill.ts`,
     * whose store the composition root does not construct.
     */
    readonly truncation?: TruncationRecord;
}

/** One finite answer offered by a tool-originated question. */
export interface ToolQuestionChoice {
    readonly label: string;
    /** The inbound text produced by a press. Defaults to the label. */
    readonly value?: string;
    /** Optional detail used by menu-capable surfaces. */
    readonly description?: string;
}

/** A question that may be rendered interactively by a conversation surface. */
export interface ToolQuestion {
    readonly text: string;
    readonly choices?: readonly ToolQuestionChoice[];
}

/** A partial update from a running tool. */
export interface ToolProgressAttachment {
    readonly filename: string;
    readonly mimeType: string;
    /**
     * The attachment bytes: a binary view in the process that produced them, and on the JSON wire the indexed
     * object a serialized `Uint8Array` becomes or an array of byte values.
     */
    readonly data: Uint8Array | Readonly<Record<string, number>> | readonly number[];
    readonly description?: string;
}

/** Partial output from a tool that has not finished. */
export interface ToolProgress {
    /** Shared investigation plan and evidence provenance, without live query capabilities. */
    readonly reverse?: ReverseRunSnapshot;
    /** Text appended to the live view. */
    readonly text?: string;
    /** Complete replacement output, including empty output; bounded to 65536 UTF-16 code units and therefore at most 196608 UTF-8 bytes. */
    readonly outputSnapshot?: string;
    /** Completed fraction in `[0, 1]`, when the tool can know it. */
    readonly fraction?: number;
    /** A one-line status, e.g. `running tests…`. */
    readonly status?: string;
    /** Transient visual progress for the active chat; never persisted in the transcript. */
    readonly attachment?: ToolProgressAttachment;
    /** Live pseudoterminal identity for authenticated input and resize controls. */
    readonly terminal?: ToolTerminal;
}

/** A terminal belongs to the session that launched this exact process. */
export interface ToolTerminal {
    readonly processId: string;
    readonly sessionId: string;
    readonly cols: number;
    readonly rows: number;
}

/** A tool call the model asked for. */
export interface ToolCall {
    readonly id: string;
    readonly name: string;
    readonly input: JsonValue;
}

/** One tool call's outcome, paired back to its call. */
export interface ToolOutcome {
    /** Registry-owned leaf-entry evidence; absent means unknown, and tool-returned data cannot set it. */
    readonly executionStarted?: boolean;
    readonly call: ToolCall;
    readonly result: ToolResult;
    readonly durationMs: number;
}
