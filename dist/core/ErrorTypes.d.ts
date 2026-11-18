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
export declare const ErrorCode: {
    /** The caller aborted (a signal fired, the user pressed escape). Never retried. */
    readonly Aborted: 'aborted';
    /** A request-shaping bug: bad arguments, a malformed schema, an impossible combination. */
    readonly InvalidRequest: 'invalid-request';
    /** A checked revision or original request conflicts with current durable state; never retry automatically. */
    readonly Conflict: 'conflict';
    /** Credentials are missing, malformed, or rejected. */
    readonly Auth: 'auth';
    /** Authenticated, but not allowed to do this. */
    readonly Forbidden: 'forbidden';
    /** The named thing does not exist (a model, a session, a conversation, a file). */
    readonly NotFound: 'not-found';
    /** A rate limit or quota. Retryable, usually with a server-supplied delay. */
    readonly RateLimit: 'rate-limit';
    /** The provider failed on its side. Retryable. */
    readonly Upstream: 'upstream';
    /** The network failed: DNS, TLS, a dropped connection, a socket timeout. Retryable. */
    readonly Network: 'network';
    /** A deadline elapsed. Retryable, but usually needs a larger budget rather than a repeat. */
    readonly Timeout: 'timeout';
    /** The request does not fit the model's context window. Needs compaction, not a retry. */
    readonly ContextOverflow: 'context-overflow';
    /** A response could not be parsed or violated the protocol. */
    readonly Protocol: 'protocol';
    /** A send may have succeeded, but its acknowledgement was lost. Never replay automatically. */
    readonly DeliveryUnconfirmed: 'delivery-unconfirmed';
    /** A tool failed while executing. */
    readonly ToolExecution: 'tool-execution';
    /** A tool call's arguments did not validate against its schema. */
    readonly ToolInput: 'tool-input';
    /** The operation was denied by policy (permission mode, sandbox, net policy). */
    readonly Denied: 'denied';
    /** Configuration is missing or invalid. */
    readonly Config: 'config';
    /** A budget was exhausted (tokens, credit, turns, time). */
    readonly BudgetExhausted: 'budget-exhausted';
    /** Anything genuinely unclassified. Treated as non-retryable. */
    readonly Internal: 'internal';
};
/** One gateway error code. */
export type ErrorCode = (typeof ErrorCode)[keyof typeof ErrorCode];
