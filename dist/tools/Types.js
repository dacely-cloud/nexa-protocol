// SPDX-FileCopyrightText: 2026 Dacely <business@dacely.com>
// SPDX-License-Identifier: LicenseRef-Proprietary
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
};
/** What a tool did, from the agent's point of view. */
export const ToolStatus = {
    Ok: 'ok',
    /** The tool ran and failed. The model sees the error and may adapt. */
    Error: 'error',
    /** Policy refused the call. Distinct from an error: retrying identically will refuse again. */
    Denied: 'denied',
    /** The call was aborted. */
    Aborted: 'aborted',
};
