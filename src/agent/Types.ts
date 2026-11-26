// SPDX-FileCopyrightText: 2026 Dacely <business@dacely.com>
// SPDX-License-Identifier: LicenseRef-Proprietary

import type { ChatModelSelection } from '../connections/ConnectionTypes.js';
import type { Graphic } from '../graphics/Graphic.js';
import type { DeliveredAttachment } from '../media/DeliveredAttachment.js';
import type { FinishReason, TokenUsage } from '../providers/Types.js';
import type { ToolCall, ToolOutcome, ToolProgress } from '../tools/Types.js';
import type { TurnActivityEvent, TurnActivityStatusEvent } from './TurnActivityTypes.js';
import type { WorkerStatus } from './WorkerStatusTypes.js';

/** Correlated native graphic packet, journalled and streamed like other turn events. */
export interface GraphicEvent {
    readonly type: 'graphic';
    readonly call: ToolCall;
    readonly graphic: Graphic;
}

/** Why a turn is answered by the safeguard fallback model instead of the selected one. */
export const SafeguardFallbackCause = {
    /** The selected model declined this message on a safety refusal. */
    Declined: 'declined',
    /** A recent refusal still pauses the selected model for this message. */
    Continuing: 'continuing',
} as const;

/** Union of {@link SafeguardFallbackCause} values. */
export type SafeguardFallbackCause =
    (typeof SafeguardFallbackCause)[keyof typeof SafeguardFallbackCause];

/** The selected subscription model is paused after a safety refusal, so the fallback answers. */
export interface SafeguardFallbackEvent {
    readonly type: 'safeguard-fallback';
    readonly cause: SafeguardFallbackCause;
    /** The model the user selected, which declined or is paused. */
    readonly selected: ChatModelSelection;
    /** The model answering this message; absent is the Nexa model. */
    readonly answering?: ChatModelSelection;
    /**
     * Further messages the fallback answers before the selected model resumes.
     * @minimum 0
     * @maximum 49
     * @TJS-type integer
     */
    readonly remainingMessages: number;
}

/**
 * An event emitted while a turn runs.
 *
 * A superset of the provider's stream events plus the agent-level ones a provider cannot know
 * about: tools starting and finishing, an iteration boundary, compaction, and approval.
 *
 * ### Divergence from plan 035's `AgentEvent`, recorded deliberately
 *
 * Plan 035 specifies an `AgentEvent` union in `src/agent/Events.ts`. That file does not exist and
 * this union is what every consumer in the tree subscribes to — the TUI (`src/tui/App.ts`), the CLI
 * renderer (`src/cli/Main.ts`), the ACP adapter (`src/acp/Server.ts`), the gateway wire
 * (`WireTurnEvent` in `src/gateway/Protocol.ts`, which is DERIVED from this type) and the web
 * control UI (`src/web/Assets.ts`). Most of the plan's vocabulary is present here under other
 * names, and renaming it would be a wire-protocol break for a synonym:
 *
 * | plan 035              | here                              |
 * |-----------------------|-----------------------------------|
 * | `agent_start`         | `turn-start`                      |
 * | `agent_end`           | `turn-finish`                     |
 * | `turn_start`          | `iteration-start`                 |
 * | `turn_end`            | (folded into `iteration-start`/`turn-finish`) |
 * | `tool_execution_start`| `tool-start`                      |
 * | `tool_execution_update`| `tool-progress`                  |
 * | `tool_execution_end`  | `tool-finish`                     |
 *
 * Two things in the plan are genuinely ABSENT rather than renamed, and neither is faked here:
 *
 * - **The message envelope** (`message_start` / `message_update` / `message_end`). This loop streams
 *   `text` and `reasoning` DELTAS and assembles the assistant message privately, so there is no
 *   partial `AssistantMessage` to put on an envelope event. Emitting one built from the deltas would
 *   be a second, drifting accumulator beside `StreamAccumulator`; the honest fix is for the loop to
 *   carry the plan-036 `AssistantMessage` through the turn, which is the same change that gives
 *   `turnId`-at-message-end a home.
 * - **`ToolErrorKind`.** `tool-finish` carries the whole {@link ToolOutcome}, whose `result.status`
 *   separates ok / error / denied / aborted and whose `result.label` separates the unknown-tool
 *   case. It does NOT separate `argument-validation` from `threw`, or `permission-denied` from
 *   `hook-blocked`: the registry produces both halves of each pair through the same `fail()` and
 *   `refused()` constructors, so the distinction exists nowhere but in the prose of the message.
 *   Deriving it here by matching that prose would be a classifier that breaks the first time an
 *   error message is reworded. The field belongs on `ToolResult` in `src/tools/Types.ts`, set at the
 *   point that knows which branch it took.
 *
 * The event ORDER is a contract regardless of the names, and it is asserted in
 * `test/agent/TurnLoop.test.ts`: `turn-start` is always first, and on every exit the generator is
 * DRAINED to — including the one where the turn goes on to reject — `turn-finish` is last.
 *
 * The qualifier is not hedging. A consumer that stops iterating closes the generator at a `yield`,
 * which runs the loop's `finally` and nothing else, so that exit emits NO `turn-finish` at all and
 * no amount of care inside the loop can change it: a generator that is never resumed cannot yield.
 * `TurnLoop`'s `owed` docstring names the same path and says what it does still guarantee — the
 * transcript is closed — and `Nexa.stream`'s `finally` deliberately calls `turn.return(...)` to
 * take it. A consumer that needs an end-of-turn signal on an abandoned stream has to take it from
 * its own `finally`, not from this union.
 */
export type TurnEvent =
    | GraphicEvent
    | SafeguardFallbackEvent
    | TurnActivityEvent
    | { readonly type: 'agents-status'; readonly workers: readonly WorkerStatus[] }
    | { readonly type: 'attachment'; readonly attachment: DeliveredAttachment }
    | { readonly type: 'turn-start'; readonly turnId: string }
    /** A new model round-trip begins. `iteration` counts from 1. */
    | { readonly type: 'iteration-start'; readonly iteration: number }
    | { readonly type: 'text'; readonly text: string }
    | { readonly type: 'reasoning'; readonly text: string }
    | { readonly type: 'tool-start'; readonly call: ToolCall }
    /**
     * Partial output from a tool that has not finished.
     *
     * Carries the CALL as well as the update, because a batch runs several tools at once and a
     * consumer appending untagged text to "the current tool" writes a grep's matches into a build
     * log. Emitted only by tools that report progress; a tool that says nothing until it returns
     * produces `tool-start` then `tool-finish` exactly as before.
     */
    | { readonly type: 'tool-progress'; readonly call: ToolCall; readonly update: ToolProgress }
    | { readonly type: 'tool-finish'; readonly outcome: ToolOutcome }
    /** The agent is waiting on the user to approve something. */
    | { readonly type: 'approval-required'; readonly tool: string; readonly summary: string }
    /** History was compacted to fit the context window. */
    | {
          readonly type: 'compacted';
          readonly droppedMessages: number;
          readonly summary: string;
      }
    /** Cumulative usage for this turn, including completed passes and the current live snapshot. */
    | { readonly type: 'usage'; readonly usage: TokenUsage }
    /** A provider-native event with no neutral equivalent (the rich NCAP frames). */
    | { readonly type: 'native'; readonly source: string; readonly data: unknown }
    | TurnActivityStatusEvent
    | {
          readonly type: 'turn-finish';
          readonly turnId: string;
          readonly reason: FinishReason;
          readonly usage: TokenUsage;
          readonly iterations: number;
      }
    | { readonly type: 'error'; readonly error: Error; readonly retryable: boolean };
