// SPDX-FileCopyrightText: 2026 Nexa contributors
// SPDX-License-Identifier: LicenseRef-Proprietary

import type { NcapCacheState } from './CacheState.js';
import type { GeometryEvent } from './GeometryTypes.js';
import type { QuickDecisionTrace } from './QuickDecisionTrace.js';
import type { SegmentationFrame } from './SegmentationTypes.js';

/** A rich block the server decoded from the model stream, streamed in three phases. */
export interface NcapBlockDelta {
    /** `begin` opens the block, `delta` appends to it, `end` closes it. */
    readonly phase: 'begin' | 'delta' | 'end';
    /** Server-assigned numeric id, stable across the block's begin/delta/end. */
    readonly blockId: number;
    /** The block kind on `begin`: `code`, `bash`, `file_write`, `read`, `search`, `list`, `diff`,
     * or `ask`. The server classifies the model's fenced action vocabulary into these. */
    readonly blockKind?: string;
    /** The language on a `begin` for a code block. */
    readonly language?: string;
    /** The target path on a `begin` for a `file_write` / `read` / `list` block. */
    readonly path?: string;
    /** The query on a `begin` for a `search` block. */
    readonly query?: string;
    /** The appended text on a `delta`. */
    readonly text?: string;
}

/** A tool the server asked the client to execute, decoded from the model stream. */
export interface NcapToolCall {
    readonly toolCallId: number;
    readonly name: string;
    /** JSON-encoded arguments (may be partial JSON while `partial` is true). */
    readonly arguments: string;
    /** A live preview of a call the model is still typing: render the forming action but do NOT
     * execute it. The authoritative call (no `partial`) arrives at completion and is what runs. */
    readonly partial?: boolean;
}

/** A source location decoded from a graph frame: where an entity or relation is evidenced. */
export interface NcapGraphSpan {
    readonly path: string;
    readonly line: number;
}

/** One code entity decoded from a `GraphNode` frame. */
export interface NcapGraphNode {
    readonly id: string;
    readonly label: string;
    /** A node-kind string (e.g. `file`, `function`); the store validates it. */
    readonly kind: string;
    /** A node-resolution string (`package` / `module` / `symbol`). */
    readonly resolution: string;
    readonly parent: string | null;
    readonly span: NcapGraphSpan | null;
    readonly language: string;
    readonly generated: boolean;
    readonly overlayDirty: boolean;
    readonly owner: string | null;
    readonly summary: string | null;
    readonly recentChange: string | null;
}

/** One relation decoded from a `GraphEdge` frame. */
export interface NcapGraphEdge {
    readonly source: string;
    readonly target: string;
    /** An edge-kind string; exact kinds carry confidence 1, probabilistic ones below 1. */
    readonly kind: string;
    readonly confidence: number;
    readonly span: NcapGraphSpan | null;
}

/** The grounding overlay decoded from a `GroundingUpdate` frame (the active/highlighted subgraph). */
export interface NcapGrounding {
    /** `off` | `local` | `auto` | `deep` | `audit`. */
    readonly mode: string;
    readonly snapshot: string;
    readonly overlayChanges: number;
    readonly anchors: readonly string[];
    readonly activeReferences: readonly string[];
    /** `none` | `pending` | `passed` | `failed`. */
    readonly verification: string;
}

/**
 * A live project-graph event decoded from a `Graph*` frame. The server streams the codebase graph as
 * it builds it: `begin` opens a graph session (the client resets its store for it), `node`/`edge`
 * append entities/relations, `grounding` updates the active subgraph highlight, and `end` marks the
 * batch complete.
 */
export interface NcapGraphDelta {
    readonly phase: 'begin' | 'node' | 'edge' | 'grounding' | 'end';
    /** `begin`: the graph session id. */
    readonly session?: string;
    /** `node`: the appended entity. */
    readonly node?: NcapGraphNode;
    /** `edge`: the appended relation. */
    readonly edge?: NcapGraphEdge;
    /** `grounding`: the active-subgraph overlay. */
    readonly grounding?: NcapGrounding;
}

/** One agent's own record from a live fan-out, for the roster. */
export interface NcapAgentDelta {
    /** The item this agent is working. */
    readonly item: number;
    /** The expert it is running as, which the planner assigned per item. */
    readonly expert: string;
    /** Its role on the team, when the engine names one. Empty otherwise. */
    readonly role: string;
    /** `working` | `done` | `failed` | `retired`. Retired means it stood down and a fresh agent
     * takes the item on, which is not the same as the item failing. */
    readonly state: string;
    /** Which turn this agent is on. There is NO `turnsAllowed` beside it: nothing bounds an agent's
     * turns, so the engine's denominator was structurally zero and the frame no longer carries one. */
    readonly turn: number;
    readonly findings: number;
    /** Completion tokens this agent has spent, as the engine measured them. */
    readonly tokens: number;
    readonly activity: string;
}

/** One deduped finding a decomposed run produced, as the engine holds it. */
export interface NcapFindingDelta {
    /** `info` | `low` | `medium` | `high` | `critical`, worst last. */
    readonly severity: string;
    /** `path:line`, or whatever locator the worker gave. One string: the engine does not guarantee
     * the `path:line` shape, so splitting it would invent a line number. */
    readonly location: string;
    readonly claim: string;
    /** The worker's own supporting quote. Empty when it gave none. */
    readonly evidence: string;
    /** How many workers reported this same defect. */
    readonly seen: number;
    /** EVERY item that reported it, not just the copy that survived the dedup. */
    readonly reporters: readonly number[];
}

/** One item's DELIVERABLE, as it closes — the counterpart to a finding for work that MAKES rather
 * than checks. */
export interface NcapArtifactDelta {
    readonly item: number;
    /** The item's own title. An artifact carries no location and no severity to anchor it. */
    readonly title: string;
    readonly artifact: string;
}

/** One step of a research run on an unsolved problem. */
export interface NcapResearchDelta {
    /** The problem being worked, as the user stated it. Never empty. */
    readonly problem: string;
    /** The line of attack this frame is about, or empty when it is about the run itself. */
    readonly line: string;
    /** `opened` | `working` | `reported` | `again` | `settled` | `bare`, or `unknown` from a newer
     * engine. `bare` means the run established nothing, which is an HONEST outcome of research and
     * must never be rendered as an error. */
    readonly phase: string;
    /** `failed` | `inconclusive` | `cases` | `reduced` | `refuted` | `proved`, or null before a line
     * has reported. Never collapse these: `reduced` is not a proof and `cases` is not a theorem. */
    readonly status: string | null;
    /** True when ANOTHER line settled this same claim the OTHER way. Orthogonal to `status`. */
    readonly disputed: boolean;
    /** The engine's own line for this frame. */
    readonly detail: string;
    /** The claim in one line, when the frame carries one. */
    readonly claim: string;
    /** The round within this run. */
    readonly round: number;
    /** Rounds across EVERY run this machine has done on this problem. */
    readonly roundsTotal: number;
    /** How many lines of attack are open. */
    readonly lines: number;
    /** What the run has cost so far, as the engine estimates it. */
    readonly tokens: number;
}

/** One skill the engine ingested, and what it has done this run. */
export interface NcapSkillDelta {
    readonly name: string;
    readonly description: string;
    /** `project` | `claude` | `user` — where it was found, which is also its precedence. */
    readonly source: string;
    /** Whether it bypasses matching and applies to every item. */
    readonly always: boolean;
    /** Whether it carries a `requires:`/`forbids:` clause the engine can CHECK rather than only
     * inject — the difference between a directive that is enforced and one merely offered. */
    readonly checkable: boolean;
    readonly file: string;
    /** How many items it matched this run. */
    readonly matched: number;
    /** How many it was actually injected into. Lower than `matched` means the budget bit. */
    readonly applied: number;
    /** `ingested` | `applied` | `squeezed` | `enforced` | `refused` | `unknown`. */
    readonly state: string;
    readonly detail: string;
}

/** How the engine reports a decomposed turn's backlog, one frame at a time. */
export type NcapBacklogDelta =
    | { readonly phase: 'begin'; readonly goal: string; readonly itemCount: number }
    | {
          readonly phase: 'item';
          readonly id: number;
          readonly parent: number | null;
          readonly kind: string;
          readonly status: string;
          readonly title: string;
          readonly dependsOn: readonly number[];
          /** The planner's estimate. Drives a client's Definition-of-Ready model. */
          readonly points: number;
          /** The criteria this item is judged against, in the planner's own words. */
          readonly acceptance: readonly string[];
      }
    | {
          readonly phase: 'update';
          readonly id: number;
          readonly status: string;
          readonly findings: number;
          /** Which turn this item's agent is on. `0` before it has taken one. There is no ceiling to
           * divide it by: nothing bounds an agent's turns. */
          readonly turn: number;
          /** What the agent said it is doing this turn, in its own words. Empty until it says. */
          readonly activity: string;
      }
    | {
          readonly phase: 'end';
          readonly done: number;
          readonly failed: number;
          readonly skipped: number;
          /** Why the run stopped, in words, so a PARTIAL run can say that it is partial. */
          readonly stoppedBy: string;
      };

/** One supervision round of a decomposed run: what the supervisor concluded and every directive. */
export interface NcapSteerDelta {
    readonly round: number;
    /** The supervisor's own statement of what was achieved, when it signed the goal off. */
    readonly summary: string;
    readonly directives: readonly {
        /** `plan` | `depend` | `accept` | `reject` | `done`, or `unknown` from a newer server. */
        readonly kind: string;
        /** The item it names, or null for a directive that names none. Item id 0 is a REAL id. */
        readonly item: number | null;
        readonly text: string;
    }[];
}

/** A sub-agent asking for a tool to be run on its behalf, answered on the data-response channel. */
export interface NcapAgentToolDelta {
    readonly requestRef: number;
    /** The backlog item whose agent is asking, for attribution in the UI. */
    readonly item: number;
    readonly tool: string;
    /** Raw JSON arguments, exactly as the agent wrote them. */
    readonly arguments: string;
}

/** Live, non-terminal token usage for the whole turn. */
export interface NcapUsage {
    readonly promptTokens: number;
    readonly completionTokens: number;
    /** The subset of `promptTokens` served from the prefix cache. */
    readonly cachedTokens: number;
    /** The max-token ceiling; `0` means uncapped. */
    readonly maxTokens: number;
}

/** One event in a native video-generation stream. */
export type NcapVideoDelta =
    | {
          readonly phase: 'accepted';
          readonly videoId: string;
          readonly model: string;
          readonly width: number;
          readonly height: number;
          readonly frames: number;
          readonly fps: number;
      }
    | {
          readonly phase: 'progress';
          readonly videoId: string;
          readonly stage: number;
          readonly completed: number;
          readonly total: number;
      }
    | {
          readonly phase: 'chunk';
          readonly videoId: string;
          readonly offset: number;
          readonly data: Uint8Array | readonly number[];
      }
    | {
          readonly phase: 'end';
          readonly videoId: string;
          readonly totalBytes: number;
      };

/**
 * A single streamed delta from the engine.
 *
 * Under NCAP the server DECODES the model stream into typed packets, so a delta carries exactly one
 * of: answer `content`, `reasoning`, an engine `status`, a `block` phase, a `tool` call, or one of
 * the out-of-band reports (graph, backlog, roster, findings, learning, research, skills).
 */
export interface NcapDelta {
    /** Exact model input/output diagnostics, separate from user-visible content. */
    readonly quickDecision?: QuickDecisionTrace;
    /** Actual cache creation/residency, separate from model token accounting. */
    readonly cache?: NcapCacheState;
    /** Native transcription, separate from assistant content. */
    readonly asr?: NcapAsrTranscript;
    /** Answer content for this chunk (empty on a non-content chunk). */
    readonly content: string;
    /** Reasoning / thinking-trace text for this chunk (empty on a non-reasoning chunk). */
    readonly reasoning: string;
    /** An out-of-band engine lifecycle status carried by a chunk with no text. */
    readonly status?: string;
    /** A live, non-terminal token-usage / progress update. */
    readonly usage?: NcapUsage;
    /** The EXPERT the server's pre-flight reflection chose to handle this turn. */
    readonly expert?: {
        readonly id: string;
        readonly index: number;
        readonly why: string;
        readonly pass: number;
    };
    /** The full pre-flight reflection for the panel shown before the answer streams. */
    readonly preflight?: {
        readonly expertId: string;
        readonly items: readonly { readonly label: string; readonly value: string }[];
        readonly subQuestions: readonly string[];
    };
    /** The reflection stage's reasoning. Display-only: it never becomes part of the persisted
     * assistant turn. */
    readonly reflection?: {
        readonly stages: readonly { readonly label: string; readonly text: string }[];
    };
    /** A live rich-block phase (begin/delta/end) decoded server-side. */
    readonly block?: NcapBlockDelta;
    /** A tool call the client must execute. */
    readonly tool?: NcapToolCall;
    /**
     * 80 ms of the model speaking, 24 kHz mono PCM16: a binary view in the decoding process, the sample values
     * on the JSON wire.
     */
    readonly voice?: Int16Array | readonly number[];
    /** One accepted/progress/content/end event from native video generation. */
    readonly video?: NcapVideoDelta;
    /** Native PNG batch output; offsets and totals are exact byte counts. */
    /** Native 3D generation event; binary asset data stays outside model text. */
    readonly geometry?: GeometryEvent;
    readonly segmentation?: SegmentationFrame;
    readonly image?:
        | {
              readonly phase: 'chunk';
              readonly index: number;
              readonly offset: number;
              readonly data: Uint8Array | readonly number[];
          }
        | {
              readonly phase: 'end';
              readonly index: number;
              readonly width: number;
              readonly height: number;
              readonly transparent: boolean;
              readonly totalBytes: number;
          };
    /** A live project-graph event for the knowledge-graph view. */
    readonly graph?: NcapGraphDelta;
    /** A live backlog the ENGINE built for this turn: the goal decomposed and fanned out. */
    readonly backlog?: NcapBacklogDelta;
    /** One agent's own record from the live fan-out, for the roster. */
    readonly agent?: NcapAgentDelta;
    /** One DEDUPED finding from a closed fan-out, with its words. */
    readonly finding?: NcapFindingDelta;
    /** One item's DELIVERABLE, as that item closes. */
    readonly artifact?: NcapArtifactDelta;
    /** One step of working an UNSOLVED problem. */
    readonly research?: NcapResearchDelta;
    /** One skill the engine ingested. */
    readonly skill?: NcapSkillDelta;
    /** One SUPERVISION ROUND of a decomposed run. */
    readonly steer?: NcapSteerDelta;
    /** A sub-agent asking for a tool to be run on its behalf. */
    readonly agentTool?: NcapAgentToolDelta;
    /** The server-owned conversation id for this turn, surfaced early (from `AgentBegin`). */
    readonly conversationId?: string;
    /** The response's numeric `agent_id`. `0` for a plain turn; in a batch it is the sub-request's
     * `subId`, so the caller routes each delta to the right sub-stream. */
    readonly agentId?: number;
}

/** Native ASR result over exact mono 16 kHz input. */
export interface NcapAsrTranscript {
    readonly audioSamples: number;
    readonly language: string;
    readonly text: string;
}
