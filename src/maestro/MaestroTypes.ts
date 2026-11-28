// SPDX-FileCopyrightText: 2026 Dacely <business@dacely.com>
// SPDX-License-Identifier: LicenseRef-Proprietary

import type { ReasoningEffort } from '../providers/Types.js';

/**
 * Maestro: the orchestrating model a user selects beside Athena.
 *
 * @remarks
 * Maestro picks the model and reasoning effort for every step of a task, can change model in the
 * middle of a task, starts sub-agents that each run as a full Maestro on the environment their
 * goal needs, and commits only work that passed its checks. It prefers the user's own plans and
 * keys over Nerva-provided access and never stops a task because one model failed or refused.
 * Every amount of money on this wire is a decimal string of USD micros (1 USD = 1000000).
 */

/** What Maestro aims for when it picks models, roles and attempts. */
export const MaestroGoal = {
    /** Every role plays and each step goes to the model most likely to get it right. */
    BestResult: 'best-result',
    /** A builder and a reviewer, each the best value for its step. */
    Balanced: 'balanced',
    /** Starts on the base model and moves up only when a check fails. */
    LowestCost: 'lowest-cost',
} as const;

/** Union of {@link MaestroGoal} values. */
export type MaestroGoal = (typeof MaestroGoal)[keyof typeof MaestroGoal];

/** Where the access to a model comes from, in the order Maestro prefers them. */
export const MaestroConnectionKind = {
    /** The user's own plan, such as Claude Code or Codex signed in on the user's VM. */
    Plan: 'plan',
    /** The user's own provider API key. */
    Key: 'key',
    /** Access Nerva provides when the user has added none. */
    Nerva: 'nerva',
} as const;

/** Union of {@link MaestroConnectionKind} values. */
export type MaestroConnectionKind =
    (typeof MaestroConnectionKind)[keyof typeof MaestroConnectionKind];

/** The roles of the orchestra. */
export const MaestroRole = {
    Plan: 'plan',
    Build: 'build',
    Review: 'review',
    Fix: 'fix',
    /** Supporting work done by the base model: exploration, test writing, log reading. */
    Support: 'support',
    /** A direct conversational answer. */
    Answer: 'answer',
} as const;

/** Union of {@link MaestroRole} values. */
export type MaestroRole = (typeof MaestroRole)[keyof typeof MaestroRole];

/** The closed set of failure classes every provider error maps to. */
export const MaestroFailureClass = {
    /** Network error, server error or deadline. */
    Transport: 'transport',
    /** Rate limit or exhausted quota. */
    RateLimit: 'rate-limit',
    /** The request did not fit the model's context window. */
    ContextOverflow: 'context-overflow',
    /** Invalid tool calls or unparseable output. */
    MalformedOutput: 'malformed-output',
    /** No progress within the step budget. */
    Stall: 'stall',
    /** The attempt's checks failed. */
    CheckFailed: 'check-failed',
    /** Running cost reached a limit the user set. */
    BudgetExceeded: 'budget-exceeded',
    /** The provider declined the request. */
    Refusal: 'refusal',
    /** The usage-policy check after a refusal did not allow a reroute. */
    RerouteDeclined: 'reroute-declined',
} as const;

/** Union of {@link MaestroFailureClass} values. */
export type MaestroFailureClass = (typeof MaestroFailureClass)[keyof typeof MaestroFailureClass];

/** Why Maestro chose or changed a model. */
export const MaestroRouteCause = {
    /** The first model of a run or sub-agent. */
    Start: 'start',
    /** The next step needs something different. */
    Step: 'step',
    /** A subtask was handed to another model with a written handover. */
    Handover: 'handover',
    /** The previous model failed; see the failure class. */
    Failure: 'failure',
    /** The previous model declined and the request passed the usage-policy check. */
    Refusal: 'refusal',
    /** A check failed and a stronger model starts fresh. */
    Escalation: 'escalation',
    /** The user's own connection failed and Nerva-provided access continues. */
    ConnectionFailed: 'connection-failed',
} as const;

/** Union of {@link MaestroRouteCause} values. */
export type MaestroRouteCause = (typeof MaestroRouteCause)[keyof typeof MaestroRouteCause];

/** How the attempts of a task or subtask are arranged. */
export const MaestroPattern = {
    Single: 'single',
    Cascade: 'cascade',
    Critique: 'critique',
    BestOfN: 'best-of-n',
    FanOut: 'fan-out',
    Race: 'race',
    Roles: 'roles',
} as const;

/** Union of {@link MaestroPattern} values. */
export type MaestroPattern = (typeof MaestroPattern)[keyof typeof MaestroPattern];

/** Model capability tier, used by the optional model ceiling. */
export const MaestroTier = {
    /** Nerva's own base model. */
    Base: 'base',
    Light: 'light',
    Mid: 'mid',
    Frontier: 'frontier',
} as const;

/** Union of {@link MaestroTier} values. */
export type MaestroTier = (typeof MaestroTier)[keyof typeof MaestroTier];

/** What Maestro does when a provider declines a request. */
export const MaestroRefusalHandling = {
    /** Check the request once against Nerva's usage policy, then move to the best other model. */
    Reroute: 'reroute',
    /** Return the refusal without moving. */
    Off: 'off',
    /** Ask the user before moving. */
    Ask: 'ask',
} as const;

/** Union of {@link MaestroRefusalHandling} values. */
export type MaestroRefusalHandling =
    (typeof MaestroRefusalHandling)[keyof typeof MaestroRefusalHandling];

/** One model, named by its provider family and model id. */
export interface MaestroModelRef {
    /** Provider family, such as `nerva`, `anthropic`, `openai`, `google` or `mistral`. */
    readonly provider: string;
    readonly model: string;
}

/** The connection currently serving a provider or model. */
export interface MaestroConnection {
    readonly kind: MaestroConnectionKind;
    /** The application id for plans, the key's provider for keys, or `nerva`. */
    readonly via: string;
    /** User-facing name, such as "Your Claude Code plan". */
    readonly name: string;
}

/** A model as Maestro used it for one step. */
export interface MaestroModelUse extends MaestroModelRef {
    /** User-facing model name. */
    readonly name: string;
    readonly connection: MaestroConnection;
    readonly effort?: ReasoningEffort;
}

/** Whether each role of the orchestra plays. */
export interface MaestroRoles {
    readonly plan: boolean;
    readonly build: boolean;
    readonly review: boolean;
    readonly fix: boolean;
}

/** Which models Maestro may choose from. */
export interface MaestroModelRules {
    /** Provider families switched off. */
    readonly disabledProviders: readonly string[];
    /** Individual models switched off. */
    readonly disabledModels: readonly MaestroModelRef[];
    /** The model doing supporting work; null is Athena. */
    readonly baseModel: MaestroModelRef | null;
    /** A pinned lead model; null lets Maestro choose per step. */
    readonly leadModel: MaestroModelRef | null;
}

/** Which environments Maestro may place work on. */
export interface MaestroEnvironmentRules {
    /** Environment ids switched off. */
    readonly disabled: readonly string[];
}

/** An optional spending cap. */
export interface MaestroSpendingCap {
    readonly enabled: boolean;
    /** USD micros per task, or null for no per-task cap. */
    readonly taskMicros: string | null;
    /** USD micros per calendar month, or null for no monthly cap. */
    readonly monthMicros: string | null;
}

/** An optional model ceiling: routine work stays at or under the tier unless a verified failure forces more. */
export interface MaestroModelCeiling {
    readonly enabled: boolean;
    readonly tier: MaestroTier;
}

/** Optional data rules: which providers may receive files and source code. */
export interface MaestroDataRules {
    readonly enabled: boolean;
    /** Provider families allowed to receive files and source code. */
    readonly fileProviders: readonly string[];
}

/** Optional limits on sub-agents. */
export interface MaestroAgentLimits {
    readonly enabled: boolean;
    /**
     * Most sub-agents per task, or null for no limit.
     * @minimum 1
     * @maximum 100000
     */
    readonly maxCount: number | null;
    /**
     * Deepest nesting, or null for no limit.
     * @minimum 1
     * @maximum 1000
     */
    readonly maxDepth: number | null;
}

/** Every limit Maestro can apply. All are off by default. */
export interface MaestroLimits {
    readonly spending: MaestroSpendingCap;
    readonly ceiling: MaestroModelCeiling;
    readonly data: MaestroDataRules;
    readonly agents: MaestroAgentLimits;
    readonly refusals: MaestroRefusalHandling;
}

/** The user's Maestro configuration. One stored policy drives the settings page and the router. */
export interface MaestroPolicy {
    readonly goal: MaestroGoal;
    readonly roles: MaestroRoles;
    /**
     * Parallel attempts on a stuck part, or null to let Maestro choose.
     * @minimum 1
     * @maximum 16
     */
    readonly width: number | null;
    readonly models: MaestroModelRules;
    readonly environments: MaestroEnvironmentRules;
    readonly limits: MaestroLimits;
}

/** The stored policy with its revision. */
export interface MaestroPolicyView {
    readonly policy: MaestroPolicy;
    /**
     * Increases by one on every change; 0 means the defaults were never changed.
     * @minimum 0
     * @TJS-type integer
     */
    readonly revision: number;
    /** When the policy last changed, or null for the defaults. */
    readonly updatedAt: string | null;
}

/** Replaces the policy when the stored revision still matches. */
export interface MaestroPolicySetParams {
    readonly policy: MaestroPolicy;
    /**
     * The revision the caller edited.
     * @minimum 0
     * @TJS-type integer
     */
    readonly revision: number;
}

/** One earlier version of the policy. */
export interface MaestroPolicyRevision {
    /**
     * @minimum 1
     * @TJS-type integer
     */
    readonly revision: number;
    readonly updatedAt: string;
    readonly policy: MaestroPolicy;
}

/** Earlier versions of the policy, newest first. */
export interface MaestroPolicyHistoryPage {
    readonly items: readonly MaestroPolicyRevision[];
}

/** Restores an earlier version as a new revision. */
export interface MaestroPolicyRestoreParams {
    /**
     * The version to restore.
     * @minimum 1
     * @TJS-type integer
     */
    readonly restore: number;
    /**
     * The revision the caller saw.
     * @minimum 0
     * @TJS-type integer
     */
    readonly revision: number;
}

/** A published benchmark result Maestro seeds its registry with. */
export interface MaestroBenchmark {
    readonly name: string;
    /**
     * Percentage of tasks solved.
     * @minimum 0
     * @maximum 100
     */
    readonly score: number;
    /** Where the number was read. */
    readonly source: string;
}

/** One model in the Maestro catalog. */
export interface MaestroModelView extends MaestroModelRef {
    readonly name: string;
    readonly tier: MaestroTier;
    /** Whether a connection can serve it right now. */
    readonly available: boolean;
    /** Whether the policy lets Maestro use it. */
    readonly enabled: boolean;
    /** The connection that serves it, or null when none can. */
    readonly connection: MaestroConnection | null;
    readonly benchmark?: MaestroBenchmark;
}

/** One provider family in the Maestro catalog. */
export interface MaestroProviderView {
    readonly id: string;
    readonly name: string;
    /** Whether the policy lets Maestro use this provider. */
    readonly enabled: boolean;
    /** The connection that currently serves this provider, or null when none can. */
    readonly connection: MaestroConnection | null;
    readonly models: readonly MaestroModelView[];
}

/** Every model Maestro knows, grouped by provider. */
export interface MaestroModelsPage {
    readonly providers: readonly MaestroProviderView[];
}

/** Lifecycle of a Maestro run or sub-agent. */
export const MaestroAgentState = {
    Queued: 'queued',
    Running: 'running',
    Checking: 'checking',
    Fixing: 'fixing',
    Done: 'done',
    Failed: 'failed',
    Stopped: 'stopped',
} as const;

/** Union of {@link MaestroAgentState} values. */
export type MaestroAgentState = (typeof MaestroAgentState)[keyof typeof MaestroAgentState];

/** Kinds of environment Maestro can place work on. */
export const MaestroEnvironmentKind = {
    /** The account's managed Nerva VM. */
    Managed: 'managed',
    /** A computer linked through the Nerva Connector. */
    Connector: 'connector',
    /** An environment an API client attached to its own connection. */
    Attached: 'attached',
} as const;

/** Union of {@link MaestroEnvironmentKind} values. */
export type MaestroEnvironmentKind =
    (typeof MaestroEnvironmentKind)[keyof typeof MaestroEnvironmentKind];

/** Operating systems an environment can run. */
export const MaestroPlatform = {
    Linux: 'linux',
    Windows: 'windows',
    Macos: 'macos',
    Other: 'other',
} as const;

/** Union of {@link MaestroPlatform} values. */
export type MaestroPlatform = (typeof MaestroPlatform)[keyof typeof MaestroPlatform];

/** An environment as shown on a run card. */
export interface MaestroEnvironmentRef {
    readonly id: string;
    readonly name: string;
    readonly kind: MaestroEnvironmentKind;
    readonly platform: MaestroPlatform;
}

/** Passed and failed test counts. */
export interface MaestroTestTally {
    /**
     * @minimum 0
     * @TJS-type integer
     */
    readonly passed: number;
    /**
     * @minimum 0
     * @TJS-type integer
     */
    readonly failed: number;
}

/** One subtask of a plan. */
export interface MaestroSubtask {
    readonly id: string;
    readonly title: string;
    readonly dependsOn: readonly string[];
    /** The environment it will run on, when known. */
    readonly environmentId?: string;
}

/** Cost and tokens of one model within a run. */
export interface MaestroModelCost extends MaestroModelRef {
    readonly name: string;
    /**
     * What this model's tokens cost at its published API price, whoever paid: a plan's usage is
     * priced too, so a run's footprint is never hidden. "0" with `priced` false means no price is known.
     */
    readonly costMicros: string;
    /**
     * What was actually charged for this model: the user's key, Nerva-provided access or Athena.
     * Usage covered by the user's plan bills "0". Absent on runs recorded before billing was split.
     */
    readonly billedMicros?: string;
    /** How the model was reached; `plan` usage is covered by the user's subscription. */
    readonly connection?: MaestroConnectionKind;
    /** False when no published price is known for this model, so `costMicros` is not an estimate. */
    readonly priced?: boolean;
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

/** The live cost meter of a run. */
export interface MaestroCost {
    /** The run's tokens at each model's published API price, including plan-covered usage. */
    readonly costMicros: string;
    /** What the run actually charged; plan-covered usage bills nothing. Absent on older runs. */
    readonly billedMicros?: string;
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
    readonly models: readonly MaestroModelCost[];
}

/** A run started or finished. */
export interface MaestroRunUpdate {
    readonly kind: 'run';
    readonly state: MaestroAgentState;
    readonly goal: MaestroGoal;
    readonly title: string;
}

/** Maestro chose or changed the model doing the work. */
export interface MaestroRouteUpdate {
    readonly kind: 'route';
    readonly model: MaestroModelUse;
    /** The model it replaced, absent for the first choice. */
    readonly previous?: MaestroModelUse;
    readonly cause: MaestroRouteCause;
    /** Present when the cause is a failure or a refusal. */
    readonly failure?: MaestroFailureClass;
    readonly role: MaestroRole;
    /** Plain-words reason, such as "the plan needs deep reasoning". */
    readonly reason: string;
}

/** Maestro placed work on an environment. */
export interface MaestroEnvironmentUpdate {
    readonly kind: 'environment';
    readonly environment: MaestroEnvironmentRef;
    /** True for the main workspace, false for an additional one. */
    readonly primary: boolean;
    readonly reason: string;
}

/** Maestro decided how to arrange the work. */
export interface MaestroPlanUpdate {
    readonly kind: 'plan';
    readonly pattern: MaestroPattern;
    /** The quick decision in plain words. */
    readonly summary: string;
    readonly subtasks: readonly MaestroSubtask[];
}

/** A sub-agent changed state. Each sub-agent is a full Maestro. */
export interface MaestroAgentUpdate {
    readonly kind: 'agent';
    /** The agent that started it. */
    readonly parentId: string;
    readonly title: string;
    readonly goal: string;
    readonly state: MaestroAgentState;
    readonly environment?: MaestroEnvironmentRef;
    readonly model?: MaestroModelUse;
    /**
     * Model switches so far.
     * @minimum 0
     * @TJS-type integer
     */
    readonly switches: number;
    readonly activity: string;
    readonly tests?: MaestroTestTally;
}

/** Lifecycle of one check. */
export const MaestroCheckState = {
    Running: 'running',
    Passed: 'passed',
    Failed: 'failed',
    Skipped: 'skipped',
} as const;

/** Union of {@link MaestroCheckState} values. */
export type MaestroCheckState = (typeof MaestroCheckState)[keyof typeof MaestroCheckState];

/** A check ran on the work. */
export interface MaestroCheckUpdate {
    readonly kind: 'check';
    readonly checkId: string;
    readonly name: string;
    readonly state: MaestroCheckState;
    readonly environment?: MaestroEnvironmentRef;
    readonly tests?: MaestroTestTally;
    readonly summary: string;
    /**
     * @minimum 0
     * @TJS-type integer
     */
    readonly durationMs?: number;
}

/** The run's live cost meter changed. */
export interface MaestroUsageUpdate {
    readonly kind: 'usage';
    readonly cost: MaestroCost;
}

/** Union of every Maestro update. */
export type MaestroUpdate =
    | MaestroRunUpdate
    | MaestroRouteUpdate
    | MaestroEnvironmentUpdate
    | MaestroPlanUpdate
    | MaestroAgentUpdate
    | MaestroCheckUpdate
    | MaestroUsageUpdate;

/**
 * One Maestro update in a turn's event stream. Sent only on turns that selected Maestro.
 *
 * @remarks
 * `agentId` equals `runId` for the lead Maestro; a sub-agent has its own id and names its parent in
 * its `agent` updates.
 */
export interface MaestroEvent {
    readonly type: 'maestro';
    readonly runId: string;
    readonly agentId: string;
    /** Decimal epoch milliseconds. */
    readonly at: string;
    readonly update: MaestroUpdate;
}

/** Per-turn Maestro options. */
export interface MaestroTurnOptions {
    /** Overrides the policy's goal for this turn. */
    readonly goal?: MaestroGoal;
}

/** A finished or running Maestro run. */
export interface MaestroRunSummary {
    readonly id: string;
    /** The conversation the run answered, when it came from a chat. */
    readonly sessionId: string | null;
    readonly title: string;
    readonly goal: MaestroGoal;
    readonly state: MaestroAgentState;
    readonly startedAt: string;
    readonly finishedAt: string | null;
    /** The run's tokens at published API prices, including plan-covered usage. */
    readonly costMicros: string;
    /** What the run actually charged. Absent on runs recorded before billing was split. */
    readonly billedMicros?: string;
    /**
     * @minimum 0
     * @TJS-type integer
     */
    readonly models: number;
    /**
     * @minimum 0
     * @TJS-type integer
     */
    readonly switches: number;
    /**
     * @minimum 0
     * @TJS-type integer
     */
    readonly agents: number;
    readonly tests: MaestroTestTally;
}

/** Recent runs, newest first, with the month's spend. */
export interface MaestroRunsPage {
    readonly items: readonly MaestroRunSummary[];
    /** Pass back to read older runs; null at the end. */
    readonly nextCursor: string | null;
    /** This calendar month's Maestro runs at published API prices, including plan-covered usage. */
    readonly monthMicros: string;
    /** What this calendar month's Maestro runs actually charged; the monthly spending cap counts this. */
    readonly monthBilledMicros?: string;
}

/** Pages through recent runs. */
export interface MaestroRunsListParams {
    /**
     * @minimum 1
     * @maximum 100
     * @TJS-type integer
     */
    readonly limit?: number;
    readonly cursor?: string;
}

/** Names one run. */
export interface MaestroRunParams {
    readonly id: string;
}

/** The full trace of a run, for replay and inspection. */
export interface MaestroRunTrace {
    readonly run: MaestroRunSummary;
    readonly events: readonly MaestroEvent[];
    /** True when the oldest events were dropped to bound the trace. */
    readonly truncated: boolean;
}

/** `maestro.policy.get` contract. */
export interface MaestroPolicyGetMethod {
    readonly params: Readonly<Record<string, never>>;
    readonly result: MaestroPolicyView;
}

/** `maestro.policy.set` contract. */
export interface MaestroPolicySetMethod {
    readonly params: MaestroPolicySetParams;
    readonly result: MaestroPolicyView;
}

/** `maestro.policy.history` contract. */
export interface MaestroPolicyHistoryMethod {
    readonly params: Readonly<Record<string, never>>;
    readonly result: MaestroPolicyHistoryPage;
}

/** `maestro.policy.restore` contract. */
export interface MaestroPolicyRestoreMethod {
    readonly params: MaestroPolicyRestoreParams;
    readonly result: MaestroPolicyView;
}

/** `maestro.models.list` contract. */
export interface MaestroModelsListMethod {
    readonly params: Readonly<Record<string, never>>;
    readonly result: MaestroModelsPage;
}

/** `maestro.runs.list` contract. */
export interface MaestroRunsListMethod {
    readonly params: MaestroRunsListParams;
    readonly result: MaestroRunsPage;
}

/** `maestro.runs.get` contract. */
export interface MaestroRunsGetMethod {
    readonly params: MaestroRunParams;
    readonly result: MaestroRunTrace;
}
