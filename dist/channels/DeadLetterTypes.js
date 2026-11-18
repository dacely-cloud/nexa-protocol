// SPDX-FileCopyrightText: 2026 Nexa contributors
// SPDX-License-Identifier: LicenseRef-Proprietary
/**
 * Where a message goes when the router could not finish with it.
 *
 * Until this existed the answer was nowhere. Every channel wraps the router's handler in
 * `try { await onMessage(inbound) } catch { Logger.error('handler threw') }` — Telegram, Slack,
 * Matrix and Discord each have their own copy — so a message that failed after ingest produced one
 * log line and then did not exist. The user is still waiting; the operator has a line saying
 * something threw in `telegram`, with no chat, no sender, no session, and no way to tell whether it
 * was one message or four hundred. Silent inbound loss is the hardest channel bug to diagnose after
 * the fact, and one row of storage removes the whole class.
 *
 * ## What is recorded, and the one thing that is not
 *
 * A dead letter has to answer two questions: *can this be retried*, and *what happened*. Retry
 * needs the address (channel, conversation, thread, message id), the sender, and the route the
 * message had already resolved to. Explaining needs the stage, the failure, and the time. All of
 * that is recorded.
 *
 * The message TEXT is not, by default, and that is a deliberate trade rather than an oversight.
 * Inbound channel text is attacker-controlled: anyone who can @-mention the bot in a group it was
 * added to can put arbitrary bytes in it. A dead letter is durable, is read by an operator, and is
 * the input to any future replay — so storing the raw text moves attacker-controlled content out of
 * the transient turn it belonged to and into the state directory, an operator's terminal, and
 * whatever dashboard renders the list. That is a persistent prompt-injection and terminal-escape
 * surface bought for a debugging convenience. It also relocates whatever the user pasted — a token,
 * a customer's address — out from under session retention and into a file with none.
 *
 * What survives instead is a SHA-256 of the text and its length, which preserves the two things an
 * operator actually asks content for: "is this the same message failing over and over" (compare
 * hashes) and "is this dead letter the message the user is showing me" (hash theirs). Neither
 * question needs to read it.
 *
 * `retainContent` opts in, for the single-user install where the sender IS the operator and there
 * is no untrusted party to protect anybody from. It is not the default because the deployments that
 * most need dead letters — shared bots in shared rooms — are exactly the ones where it is wrong.
 */
/** How far a message got before it failed. */
export const DeadLetterStage = {
    /** Routing itself failed: a binding named an agent that does not exist. */
    Route: 'route',
    /** Something between ingest and the turn threw: the allowlist store, an identity resolver. */
    Gate: 'gate',
    /** The agent turn threw. */
    Turn: 'turn',
    /** The turn produced an answer and the platform would not take it. */
    Deliver: 'deliver',
};
