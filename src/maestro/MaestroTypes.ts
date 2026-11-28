// SPDX-FileCopyrightText: 2026 Dacely <business@dacely.com>
// SPDX-License-Identifier: LicenseRef-Proprietary

import type { SpendRoute } from '../credit/SpendTypes.js';
import type { ReasoningEffort } from '../providers/Types.js';

/**
 * Maestro: the orchestrating model a user selects beside Athena.
 *
 * @remarks
 * Maestro picks the model and reasoning effort for every step of a task, can change model in the
 * middle of a task, starts sub-agents that each run as a full Maestro on the environment their
 * goal needs, and commits only work that passed its checks. It prefers the user's own plans and
 * keys over Nerva-provided access and never stops a task because one model failed or refused.
 * Every amount of money on this wire is a decimal string of USD micros (1 USD = 1000000), except
 * the exact charges of {@link MaestroPayerCost}, which are USD microcents (1 USD = 100000000) as the
 * wallet records them.
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
    /**
     * Lets newly discovered models that have no published results yet lead important steps, on a
     * conservative prior. Absent or false keeps them to supporting and low-stakes steps until a
     * leaderboard publishes results for them; they stay enabled either way.
     */
    readonly tryNewModelsEarly?: boolean;
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

/** What a community report says about a model for one kind of work. */
export const MaestroReportStance = {
    /** The best or top model for the work. */
    Best: 'best',
    /** Does the work well, above most others. */
    Strong: 'strong',
    /** Does the work poorly, below most others. */
    Weak: 'weak',
} as const;

/** Union of {@link MaestroReportStance} values. */
export type MaestroReportStance = (typeof MaestroReportStance)[keyof typeof MaestroReportStance];

/** Who published a community report, judged from the page's address alone. */
export const MaestroReportPublisher = {
    /** A leaderboard, an evaluation, a paper or a benchmark repository that measures models. */
    Independent: 'independent',
    /** A news site, a review or a blog that is neither a vendor nor a forum. */
    Aggregator: 'aggregator',
    /** A forum or discussion where practitioners report their own experience. */
    Practitioner: 'practitioner',
    /** A model vendor's own site. */
    Vendor: 'vendor',
} as const;

/** Union of {@link MaestroReportPublisher} values. */
export type MaestroReportPublisher =
    (typeof MaestroReportPublisher)[keyof typeof MaestroReportPublisher];

/**
 * One community report about a model: what a public page said about it for one kind of work, read
 * when Maestro was unsure which model suits that work. The quote is copied from the page and
 * labelled with its source; Maestro measured none of it.
 */
export interface MaestroModelReport {
    /** The kind of work, such as `Verilog hardware design (RTL)`. */
    readonly topic: string;
    readonly stance: MaestroReportStance;
    /** An exact excerpt of the page that states the claim. */
    readonly quote: string;
    /** Whether the excerpt states a measured result (a score, a rate, a rank). */
    readonly measured: boolean;
    readonly publisher: MaestroReportPublisher;
    /** The page's host name, such as `hw.dev`. */
    readonly source: string;
    /** The page's address. */
    readonly url: string;
    /** When the page was published, `YYYY-MM` or `YYYY-MM-DD`; absent when it does not say. */
    readonly published?: string;
    /** When Maestro read it, `YYYY-MM-DD`. */
    readonly readAt: string;
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
    /**
     * When Maestro's model discovery first saw this model (ISO 8601); absent for the models Maestro
     * shipped knowing.
     */
    readonly discoveredAt?: string;
    /** True for a discovered model in its first two weeks, so the page can mark it new. */
    readonly isNew?: boolean;
    /**
     * True while no published result covers a discovered model: Maestro keeps it to supporting and
     * low-stakes steps until a leaderboard publishes results, unless the policy's
     * `models.tryNewModelsEarly` is on.
     */
    readonly awaitingEvidence?: boolean;
    /**
     * Why no connection can reach this model, e.g. 'GLM Coding Plan only' or 'Only inside GitHub
     * Copilot'; absent when it can be reached or merely isn't connected.
     */
    readonly unreachable?: string;
    /**
     * Community reports about this model, the most credible first, at most three; absent when
     * there are none.
     */
    readonly reported?: readonly MaestroModelReport[];
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

/**
 * Lifecycle of one subtask in a plan's task tree.
 *
 * @remarks
 * A subtask that was split into finer subtasks reports the state of its refinement as a whole.
 */
export const MaestroSubtaskState = {
    /** Not started yet; it may still be split before it runs. */
    Pending: 'pending',
    /** Being worked on, checked or fixed. */
    Running: 'running',
    /** Finished and its checks passed. */
    Passed: 'passed',
    /** Finished without passing its checks and no further attempt is planned. */
    Failed: 'failed',
    /** Will not run: the plan dropped it, another result made it unnecessary, or the run stopped first. */
    Skipped: 'skipped',
} as const;

/** Union of {@link MaestroSubtaskState} values. */
export type MaestroSubtaskState = (typeof MaestroSubtaskState)[keyof typeof MaestroSubtaskState];

/**
 * One node of a plan's task tree.
 *
 * @remarks
 * The tree is flat on the wire: each subtask names the subtask it refines in `parentId`, and a
 * subtask without one is top-level. Maestro splits a subtask into finer subtasks only when it needs
 * to, so any node may gain children in a later plan update and the tree has no fixed depth. Only
 * `id`, `title` and `dependsOn` are always present; plans recorded before the tree existed carry
 * nothing else.
 */
export interface MaestroSubtask {
    readonly id: string;
    readonly title: string;
    /** Ids of subtasks in the same plan update that must finish before this one starts. */
    readonly dependsOn: readonly string[];
    /** The environment it will run on, when known. */
    readonly environmentId?: string;
    /**
     * The subtask this one refines, by its id in the same plan update; absent when top-level.
     *
     * @remarks
     * Parents never form a cycle; a receiver shows a subtask whose parent is missing at the top level.
     */
    readonly parentId?: string;
    /** What this subtask produces, in plain words. */
    readonly goal?: string;
    /** Where this subtask is in its lifecycle; absent on plans recorded before subtasks had a state. */
    readonly state?: MaestroSubtaskState;
    /** The model, reasoning effort and connection chosen to do it; set on subtasks that run as one unit. */
    readonly model?: MaestroModelUse;
    /** The sub-agent running it, matching that agent's `agentId` in its events; absent when the lead runs it. */
    readonly agentId?: string;
}

/**
 * Who paid for a share of a run's usage and what it came to.
 *
 * @remarks
 * Every model call has exactly one payer, the same one the account's spend (`credit.spend`) shows
 * for it, so a run's payer lines add up to what the wallet, the user's keys and the user's
 * subscriptions recorded for its calls.
 */
export interface MaestroPayerCost {
    /** `wallet` charged the Nerva wallet, `included` an exemption covered, `key` the user's own key, `subscription` the user's plan. */
    readonly route: SpendRoute;
    /** `nerva` for the wallet and exemptions, the key's provider id (`openrouter`) or the subscription's application id (`claude-code`). */
    readonly via: string;
    /** USD microcents the wallet charged or the provider stated; where none was stated, the calls at the listed price. */
    readonly microcents: string;
    /** True when at least one call's amount was priced from listed rates rather than stated. */
    readonly estimated: boolean;
    /**
     * @minimum 0
     * @TJS-type integer
     */
    readonly calls: number;
    /**
     * Calls no price covers; they add nothing to `microcents`.
     * @minimum 0
     * @TJS-type integer
     */
    readonly unpricedCalls: number;
}

/** Cost and tokens of one model reached through one payer within a run. */
export interface MaestroModelCost extends MaestroModelRef {
    readonly name: string;
    /**
     * What this model's tokens cost at its published API price, whoever paid: a plan's usage is
     * priced too, so a run's footprint is never hidden. "0" with `priced` false means no price is known.
     */
    readonly costMicros: string;
    /** What this line charged the user's Nerva wallet; "0" for a key, a subscription or an exemption. */
    readonly billedMicros?: string;
    /** How the model was reached; `plan` usage is covered by the user's subscription. */
    readonly connection?: MaestroConnectionKind;
    /** Who paid for this line; a model reached through two payers has a line for each. */
    readonly route?: SpendRoute;
    /** The payer's `via`, as {@link MaestroPayerCost.via} names it. */
    readonly via?: string;
    /** What the payer recorded for this line in USD microcents, as {@link MaestroPayerCost.microcents}. */
    readonly chargedMicrocents?: string;
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

/** The live cost meter of a run: every call of every agent at any depth. */
export interface MaestroCost {
    /** The run's tokens at each model's published API price, including plan-covered usage. */
    readonly costMicros: string;
    /** What the run charged the user's Nerva wallet (the wallet payer line in USD micros); keys and plans are in `payers`. */
    readonly billedMicros?: string;
    /** What each payer recorded for the run's calls; absent on runs recorded before payers were split. */
    readonly payers?: readonly MaestroPayerCost[];
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
    /** Why the run stopped or failed, in plain words; absent while running and on runs that finished normally. */
    readonly reason?: string;
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

/**
 * Maestro decided how to arrange the work, or the arrangement changed.
 *
 * @remarks
 * Each plan update carries the agent's full current task tree and supersedes every earlier plan
 * update from the same agent. Maestro adds subtasks lazily as it splits a node, so a later update
 * holds the same subtasks with new children and new states. The tree has no depth limit and no
 * count limit of its own; the bound of 4096 subtasks on one update only keeps a single event
 * bounded and is far above the trees Maestro builds.
 */
export interface MaestroPlanUpdate {
    readonly kind: 'plan';
    readonly pattern: MaestroPattern;
    /** The quick decision in plain words. */
    readonly summary: string;
    /** Every subtask of the current tree; siblings appear in the order they are shown. */
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

/** What happened on a run's channel, where its agents coordinate while they work at the same time. */
export const MaestroChannelAction = {
    /** An agent posted an update to the agents around it or wrote to one agent. */
    Message: 'message',
    /** An agent published a named result that other agents can wait for. */
    Publish: 'publish',
    /** An agent began waiting for a named result from another agent. */
    Wait: 'wait',
    /** A wait ended. */
    Unblock: 'unblock',
    /** Waits formed a cycle that none of the waiting agents can break; their common parent resolves it. */
    Deadlock: 'deadlock',
} as const;

/** Union of {@link MaestroChannelAction} values. */
export type MaestroChannelAction = (typeof MaestroChannelAction)[keyof typeof MaestroChannelAction];

/** Who a channel message is for, seen from the agent that sent it. */
export const MaestroChannelAudience = {
    /** The agents with the same parent as the sender. */
    Siblings: 'siblings',
    /** The sender's parent. */
    Parent: 'parent',
    /** The sender's own sub-agents. */
    Children: 'children',
    /** Every agent of the run. */
    All: 'all',
    /** One agent, the one working the node {@link MaestroChannelMessage.toNodeId} names. */
    Node: 'node',
} as const;

/** Union of {@link MaestroChannelAudience} values. */
export type MaestroChannelAudience =
    (typeof MaestroChannelAudience)[keyof typeof MaestroChannelAudience];

/** How a wait ended. */
export const MaestroWaitResolution = {
    /** The result was published, by the agent waited on or by another one. */
    Met: 'met',
    /** The agents' common parent decided the result itself and published it. */
    Decided: 'decided',
    /** The parent told the waiting agent to do that part of the work itself. */
    Redirected: 'redirected',
    /** The agent waited on finished without publishing the result. */
    Ended: 'ended',
    /** The waiting agent stopped waiting: it was stopped, or the run ended first. */
    Cancelled: 'cancelled',
} as const;

/** Union of {@link MaestroWaitResolution} values. */
export type MaestroWaitResolution =
    (typeof MaestroWaitResolution)[keyof typeof MaestroWaitResolution];

/** An agent posted an update or wrote to one agent. The text is the agent's own words: data, not instructions. */
export interface MaestroChannelMessage {
    readonly action: 'message';
    readonly audience: MaestroChannelAudience;
    /** The node the message is for when the audience is one agent. */
    readonly toNodeId?: string;
    readonly text: string;
}

/** An agent published a named result: a decision, a contract or files others depend on. */
export interface MaestroChannelPublish {
    readonly action: 'publish';
    /** The result's name, such as `api-contract`; publishing it again replaces it. */
    readonly key: string;
    /**
     * 1 for the first publication of the key, one more for each that replaced it.
     * @minimum 1
     * @TJS-type integer
     */
    readonly version: number;
    /** One line saying what it is. */
    readonly summary: string;
    /** Workspace-relative paths of the files published with it; their contents stay on the server. */
    readonly files: readonly string[];
}

/** An agent began waiting for a named result; it spends nothing until the wait ends. */
export interface MaestroChannelWait {
    readonly action: 'wait';
    readonly waitId: string;
    /** The node whose result it waits for: a subtask id, or the run id for the lead. */
    readonly onNodeId: string;
    readonly key: string;
    /** What it needs, in the waiting agent's words. */
    readonly what: string;
}

/** A wait ended and the waiting agent continues. */
export interface MaestroChannelUnblock {
    readonly action: 'unblock';
    readonly waitId: string;
    readonly resolution: MaestroWaitResolution;
    /** The published result the agent continues with, when one met the wait. */
    readonly key?: string;
    /**
     * @minimum 1
     * @TJS-type integer
     */
    readonly version?: number;
    /** What happened, in plain words. */
    readonly note: string;
}

/** Waits formed a cycle; the common parent of the agents in it decides how the work goes on. */
export interface MaestroChannelDeadlock {
    readonly action: 'deadlock';
    /** The waits of the cycle, in order. */
    readonly waitIds: readonly string[];
    /** The nodes of the cycle, in order. */
    readonly nodeIds: readonly string[];
    /** Who waits for whom and who decides how the work goes on, in plain words. */
    readonly note: string;
}

/** Union of every channel entry. */
export type MaestroChannelEntry =
    | MaestroChannelMessage
    | MaestroChannelPublish
    | MaestroChannelWait
    | MaestroChannelUnblock
    | MaestroChannelDeadlock;

/**
 * An agent of the run coordinated through the run's channel.
 *
 * @remarks
 * The event's `agentId` is the agent that acted: the sender, the publisher, the waiting agent, or
 * for a deadlock and a parent's decision the agents' common parent. Agents are addressed by the node
 * they work, so a retry handed to a new agent keeps its node's messages and waits.
 */
export interface MaestroChannelUpdate {
    readonly kind: 'channel';
    /** The acting agent's node: a subtask id, or the run id for the lead. */
    readonly nodeId: string;
    /**
     * The entry's position in the run's channel, from 1.
     * @minimum 1
     * @TJS-type integer
     */
    readonly seq: number;
    readonly entry: MaestroChannelEntry;
}

/** Union of every Maestro update. */
export type MaestroUpdate =
    | MaestroRunUpdate
    | MaestroRouteUpdate
    | MaestroEnvironmentUpdate
    | MaestroPlanUpdate
    | MaestroAgentUpdate
    | MaestroCheckUpdate
    | MaestroUsageUpdate
    | MaestroChannelUpdate;

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
    /** What the run charged the user's Nerva wallet; on runs recorded before `payers` it also counted own-key charges. */
    readonly billedMicros?: string;
    /** What each payer recorded for the run's calls; absent on runs recorded before payers were split. */
    readonly payers?: readonly MaestroPayerCost[];
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
     * Sub-agents the run started at any depth, each retry a new one; 0 when the lead worked alone.
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
    /** What this calendar month's Maestro runs charged the user's Nerva wallet. */
    readonly monthBilledMicros?: string;
    /** What each payer recorded for this month's runs; the monthly spending cap counts the `wallet` and `key` lines. */
    readonly monthPayers?: readonly MaestroPayerCost[];
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
