// SPDX-FileCopyrightText: 2026 Dacely <business@dacely.com>
// SPDX-License-Identifier: LicenseRef-Proprietary

import type {
    MaestroAgentState,
    MaestroChannelAction,
    MaestroCheckState,
    MaestroCost,
    MaestroEnvironmentRef,
    MaestroFailureClass,
    MaestroGoal,
    MaestroModelRef,
    MaestroModelUse,
    MaestroPayerCost,
    MaestroRole,
    MaestroRouteCause,
    MaestroSubtaskState,
    MaestroTestTally,
    MaestroWaitResolution,
} from '../../maestro/MaestroTypes.js';
import type { ReasoningEffort } from '../../providers/Types.js';
import type { PlanStepStatus } from '../../tools/planning/PlanningStateTypes.js';

/**
 * The agile level a node of a Maestro run's task tree is shown at, decided by its depth.
 *
 * @remarks
 * The run itself is the epic, each top-level subtask is a story, and every deeper subtask is a task
 * that names the story or task it refines, so the hierarchy has no depth limit.
 */
export const AgileMaestroLevel = {
    /** The run: the lead Maestro's whole task. Its node id is the run id. */
    Epic: 'epic',
    /** A top-level subtask of the run. */
    Story: 'story',
    /** A subtask of a story or of another task, at any depth. */
    Task: 'task',
} as const;

/** Union of {@link AgileMaestroLevel} values. */
export type AgileMaestroLevel = (typeof AgileMaestroLevel)[keyof typeof AgileMaestroLevel];

/** What the conversation's owner can ask Maestro to do with one node of a running task tree. */
export const AgileMaestroActionKind = {
    /** Run the node again with a fresh attempt. */
    Retry: 'retry',
    /** Do not run the node, or stop it, and continue without it. */
    Skip: 'skip',
    /** Do the node's work with this model and, optionally, this reasoning effort. */
    Pin: 'pin',
    /** Add an instruction to the node's brief. */
    Instruct: 'instruct',
    /** Split the node into subtasks again, optionally with guidance. */
    Resplit: 'resplit',
    /** Stop the sub-agent working the node now. */
    Cancel: 'cancel',
} as const;

/** Union of {@link AgileMaestroActionKind} values. */
export type AgileMaestroActionKind =
    (typeof AgileMaestroActionKind)[keyof typeof AgileMaestroActionKind];

/** Where a board action is. */
export const AgileMaestroActionState = {
    /** Waiting for the next point where Maestro can safely apply it. */
    Pending: 'pending',
    Applied: 'applied',
    /** It no longer applied; the note says why. */
    Rejected: 'rejected',
} as const;

/** Union of {@link AgileMaestroActionState} values. */
export type AgileMaestroActionState =
    (typeof AgileMaestroActionState)[keyof typeof AgileMaestroActionState];

/** The Maestro agent working a node, and the model, effort and connection doing it now. */
export interface AgileMaestroAssignee {
    /** The run id for the lead, else the sub-agent's id, as in its `maestro` events. */
    readonly agentId: string;
    readonly state: MaestroAgentState;
    /** What the agent is doing, in a few words; empty when nothing was reported. */
    readonly activity: string;
    /** The model, reasoning effort and connection doing the work now, when one was chosen. */
    readonly model?: MaestroModelUse;
    /**
     * Model switches so far.
     * @minimum 0
     * @TJS-type integer
     */
    readonly switches: number;
}

/** One acceptance check of a node and its latest result. */
export interface AgileMaestroCheck {
    readonly id: string;
    readonly name: string;
    readonly state: MaestroCheckState;
    readonly summary: string;
    readonly tests?: MaestroTestTally;
    /**
     * @minimum 0
     * @TJS-type integer
     */
    readonly durationMs?: number;
    readonly environment?: MaestroEnvironmentRef;
}

/** One model choice or switch on a node, with its reason. */
export interface AgileMaestroRoute {
    /** Decimal epoch milliseconds. */
    readonly at: string;
    readonly model: MaestroModelUse;
    /** The model it replaced, absent for the first choice. */
    readonly previous?: MaestroModelUse;
    readonly cause: MaestroRouteCause;
    /** Present when the cause is a failure or a refusal. */
    readonly failure?: MaestroFailureClass;
    readonly role: MaestroRole;
    readonly reason: string;
}

/** What a node and every node under it cost, as the run's meter measured it; the epic's usage is the whole run. */
export interface AgileMaestroUsage {
    /** Tokens at each model's published API price, including plan-covered usage; USD micros. */
    readonly costMicros: string;
    /** What the user's Nerva wallet was charged; keys, subscriptions and exemptions bill "0"; USD micros. */
    readonly billedMicros: string;
    /** What each payer recorded; absent on boards written before payers were split. */
    readonly payers?: readonly MaestroPayerCost[];
    /** False when a model it used has no published price, so `costMicros` leaves it out. */
    readonly priced: boolean;
    /**
     * @minimum 0
     * @TJS-type integer
     */
    readonly inputTokens: number;
    /**
     * @minimum 0
     * @TJS-type integer
     */
    readonly outputTokens: number;
    /**
     * @minimum 0
     * @TJS-type integer
     */
    readonly cachedInputTokens: number;
}

/** A board action the conversation's owner asked for, and how it ended. */
export interface AgileMaestroAction {
    readonly id: string;
    readonly kind: AgileMaestroActionKind;
    readonly state: AgileMaestroActionState;
    /** The model a pin names. */
    readonly model?: MaestroModelRef;
    /** The reasoning effort a pin names. */
    readonly effort?: ReasoningEffort;
    /** The instruction, or the guidance for a re-split. */
    readonly text?: string;
    /** Decimal epoch milliseconds. */
    readonly requestedAt: string;
    /** Decimal epoch milliseconds; absent while pending. */
    readonly settledAt?: string;
    /** How it applied or why it was rejected, in plain words. */
    readonly note?: string;
}

/**
 * One node of a Maestro run's task tree as an agile item.
 *
 * @remarks
 * Maestro owns these items: the conversation's planner never edits them, and the board changes them
 * only through {@link AgileMaestroCommand}. `state` is Maestro's own lifecycle; `status` is the board
 * column it maps to (pending, active, done, skipped, and blocked for a node that failed).
 */
export interface AgileMaestroNode {
    /** The subtask id, or the run id for the epic. */
    readonly id: string;
    readonly level: AgileMaestroLevel;
    /** The node it refines: null for the epic, the run id for a story, a story or task for a task. */
    readonly parentId: string | null;
    readonly title: string;
    /** What it produces, in plain words. */
    readonly goal: string;
    /** Sibling nodes that must finish before it starts. */
    readonly dependsOn: readonly string[];
    readonly state: MaestroSubtaskState;
    readonly status: PlanStepStatus;
    /** Absent until an agent picks the node up. */
    readonly assignee?: AgileMaestroAssignee;
    /** Every agent that worked the node, oldest first; a retry may hand it to a new one. */
    readonly agentIds: readonly string[];
    /** The environment its work runs on, once placed. */
    readonly environment?: MaestroEnvironmentRef;
    /** The node's acceptance checks with their latest results, in the order they first ran. */
    readonly checks: readonly AgileMaestroCheck[];
    /**
     * Checks seen in total; more than `checks.length` when the oldest were left out to bound it.
     * @minimum 0
     * @TJS-type integer
     */
    readonly checkCount: number;
    /** Model choices and switches, oldest first. */
    readonly routes: readonly AgileMaestroRoute[];
    /**
     * Routes seen in total; more than `routes.length` when the oldest were left out to bound it.
     * @minimum 0
     * @TJS-type integer
     */
    readonly routeCount: number;
    /** What the node's own agents spent; absent until the meter attributed usage to them. */
    readonly usage?: AgileMaestroUsage;
    /** Decimal epoch milliseconds the node started. */
    readonly startedAt?: string;
    /** Decimal epoch milliseconds the node finished. */
    readonly finishedAt?: string;
    /** Board actions on this node, oldest first; pending ones are never left out. */
    readonly actions: readonly AgileMaestroAction[];
    /** What the node waits for from other nodes right now, oldest first; absent when it waits for nothing. */
    readonly waits?: readonly AgileMaestroWait[];
    /**
     * The node's newest coordination entries, oldest first: what its agents posted, wrote and
     * published, what they waited for and how each wait ended; absent before the first one.
     */
    readonly channel?: readonly AgileMaestroChannelEntry[];
    /**
     * Coordination entries seen in total; more than `channel.length` when the oldest were left out.
     * @minimum 0
     * @TJS-type integer
     */
    readonly channelCount?: number;
}

/** A result one node is waiting for from another, while it waits. */
export interface AgileMaestroWait {
    /** The wait's id on the run's channel. */
    readonly id: string;
    /** The node whose result it waits for: a subtask id, or the run id for the lead. */
    readonly onNodeId: string;
    /** That node's title, so the board can say who it waits for without looking it up. */
    readonly onTitle: string;
    /** The result's name. */
    readonly key: string;
    /** What it needs, in the waiting agent's words. */
    readonly what: string;
    /** Decimal epoch milliseconds the wait began. */
    readonly since: string;
}

/** One coordination entry of a node, as its card shows it. */
export interface AgileMaestroChannelEntry {
    /**
     * Its position in the run's channel.
     * @minimum 1
     * @TJS-type integer
     */
    readonly seq: number;
    /** Decimal epoch milliseconds. */
    readonly at: string;
    readonly action: MaestroChannelAction;
    /** The other node it concerns: the one written to or waited on; absent for broadcasts. */
    readonly otherNodeId?: string;
    /** The published or awaited result's name. */
    readonly key?: string;
    /** How a wait ended, for an unblock. */
    readonly resolution?: MaestroWaitResolution;
    /** One line in plain words. */
    readonly summary: string;
}

/** One Maestro run of the conversation and its whole task tree. */
export interface AgileMaestroRun {
    readonly runId: string;
    readonly title: string;
    readonly goal: MaestroGoal;
    readonly state: MaestroAgentState;
    /** Why the run stopped or failed, in plain words, when it did. */
    readonly reason?: string;
    /** Decimal epoch milliseconds. */
    readonly startedAt: string;
    /** Decimal epoch milliseconds; absent while it runs. */
    readonly finishedAt?: string;
    /** Decimal epoch milliseconds of the newest change shown. */
    readonly updatedAt: string;
    /** The run's live cost meter. */
    readonly cost?: MaestroCost;
    /** The epic first, then every subtask, parents before their children, siblings in order. */
    readonly nodes: readonly AgileMaestroNode[];
    /**
     * Subtasks left out because the tree outgrew the board's bound; they remain in the run's trace.
     * @minimum 0
     * @TJS-type integer
     */
    readonly omittedNodes: number;
}

/** Maestro's runs in a conversation, projected onto its agile board. */
export interface AgileMaestroBoard {
    /** Oldest first. */
    readonly runs: readonly AgileMaestroRun[];
    /**
     * Older runs left out to bound the board; `maestro.runs.get` still returns their traces.
     * @minimum 0
     * @TJS-type integer
     */
    readonly omittedRuns: number;
}

/**
 * A board action on one node of a running Maestro task tree.
 *
 * @remarks
 * Maestro applies it at the node's next safe point, never in the middle of a model call. Sending the
 * same `id` again with the same content returns the current board without queueing it twice; the
 * same `id` with other content is a conflict. `pin` needs `model`, `instruct` needs `text`, and
 * `resplit` may carry `text` as guidance; the other kinds carry neither.
 */
export interface AgileMaestroCommand {
    /** Chosen by the client, unique per action. */
    readonly id: string;
    readonly runId: string;
    /** A subtask id of that run, or the run id for the epic. */
    readonly nodeId: string;
    readonly kind: AgileMaestroActionKind;
    readonly model?: MaestroModelRef;
    readonly effort?: ReasoningEffort;
    readonly text?: string;
}

/** Session ownership is checked before the action reaches Maestro. */
export interface AgileMaestroSteerParams {
    readonly sessionId: string;
    readonly command: AgileMaestroCommand;
}
