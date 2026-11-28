// SPDX-FileCopyrightText: 2026 Dacely <business@dacely.com>
// SPDX-License-Identifier: LicenseRef-Proprietary
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
};
/** Where the access to a model comes from, in the order Maestro prefers them. */
export const MaestroConnectionKind = {
    /** The user's own plan, such as Claude Code or Codex signed in on the user's VM. */
    Plan: 'plan',
    /** The user's own provider API key. */
    Key: 'key',
    /** Access Nerva provides when the user has added none. */
    Nerva: 'nerva',
};
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
};
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
};
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
};
/** How the attempts of a task or subtask are arranged. */
export const MaestroPattern = {
    Single: 'single',
    Cascade: 'cascade',
    Critique: 'critique',
    BestOfN: 'best-of-n',
    FanOut: 'fan-out',
    Race: 'race',
    Roles: 'roles',
};
/** Model capability tier, used by the optional model ceiling. */
export const MaestroTier = {
    /** Nerva's own base model. */
    Base: 'base',
    Light: 'light',
    Mid: 'mid',
    Frontier: 'frontier',
};
/** What Maestro does when a provider declines a request. */
export const MaestroRefusalHandling = {
    /** Check the request once against Nerva's usage policy, then move to the best other model. */
    Reroute: 'reroute',
    /** Return the refusal without moving. */
    Off: 'off',
    /** Ask the user before moving. */
    Ask: 'ask',
};
/** Lifecycle of a Maestro run or sub-agent. */
export const MaestroAgentState = {
    Queued: 'queued',
    Running: 'running',
    Checking: 'checking',
    Fixing: 'fixing',
    Done: 'done',
    Failed: 'failed',
    Stopped: 'stopped',
};
/** Kinds of environment Maestro can place work on. */
export const MaestroEnvironmentKind = {
    /** The account's managed Nerva VM. */
    Managed: 'managed',
    /** A computer linked through the Nerva Connector. */
    Connector: 'connector',
    /** An environment an API client attached to its own connection. */
    Attached: 'attached',
};
/** Operating systems an environment can run. */
export const MaestroPlatform = {
    Linux: 'linux',
    Windows: 'windows',
    Macos: 'macos',
    Other: 'other',
};
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
};
/** Lifecycle of one check. */
export const MaestroCheckState = {
    Running: 'running',
    Passed: 'passed',
    Failed: 'failed',
    Skipped: 'skipped',
};
