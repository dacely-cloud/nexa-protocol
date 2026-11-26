// SPDX-FileCopyrightText: 2026 Dacely <business@dacely.com>
// SPDX-License-Identifier: LicenseRef-Proprietary
/**
 * Nexa's error taxonomy.
 *
 * Every failure the agent can recover from must be DISTINGUISHABLE from one it cannot, because the
 * turn loop's whole job at a failure boundary is deciding between three actions: retry the same
 * call, change something and retry, or stop and tell the user. A bare `Error` forces that decision
 * to be made by string-matching a message, which breaks the moment a provider rewords one.
 *
 * So every error here carries three machine-readable facts:
 *
 * - `code` — a stable slug the agent branches on;
 * - `retryable` — whether repeating the SAME request could plausibly succeed;
 * - `retryAfterMs` — how long to wait, when the peer said.
 */
/** A stable, machine-readable failure classification. */
export const ErrorCode = {
    /** The caller aborted (a signal fired, the user pressed escape). Never retried. */
    Aborted: 'aborted',
    /** A request-shaping bug: bad arguments, a malformed schema, an impossible combination. */
    InvalidRequest: 'invalid-request',
    /** A checked revision or original request conflicts with current durable state; never retry automatically. */
    Conflict: 'conflict',
    /** Credentials are missing, malformed, or rejected. */
    Auth: 'auth',
    /** Authenticated, but not allowed to do this. */
    Forbidden: 'forbidden',
    /** The named thing does not exist (a model, a session, a conversation, a file). */
    NotFound: 'not-found',
    /** A rate limit or quota. Retryable, usually with a server-supplied delay. */
    RateLimit: 'rate-limit',
    /** The provider failed on its side. Retryable. */
    Upstream: 'upstream',
    /** The network failed: DNS, TLS, a dropped connection, a socket timeout. Retryable. */
    Network: 'network',
    /** A deadline elapsed. Retryable, but usually needs a larger budget rather than a repeat. */
    Timeout: 'timeout',
    /** The request does not fit the model's context window. Needs compaction, not a retry. */
    ContextOverflow: 'context-overflow',
    /** A response could not be parsed or violated the protocol. */
    Protocol: 'protocol',
    /** A send may have succeeded, but its acknowledgement was lost. Never replay automatically. */
    DeliveryUnconfirmed: 'delivery-unconfirmed',
    /** A tool failed while executing. */
    ToolExecution: 'tool-execution',
    /** A tool call's arguments did not validate against its schema. */
    ToolInput: 'tool-input',
    /** The operation was denied by policy (permission mode, sandbox, net policy). */
    Denied: 'denied',
    /** Configuration is missing or invalid. */
    Config: 'config',
    /** A budget was exhausted (tokens, credit, turns, time). */
    BudgetExhausted: 'budget-exhausted',
    /** Anything genuinely unclassified. Treated as non-retryable. */
    Internal: 'internal',
};
