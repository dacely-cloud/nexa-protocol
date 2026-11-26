// SPDX-FileCopyrightText: 2026 Dacely <business@dacely.com>
// SPDX-License-Identifier: LicenseRef-Proprietary
/** Who authored a message. */
export const MessageRole = {
    System: 'system',
    User: 'user',
    Assistant: 'assistant',
    /** A tool's output, for providers that model it as its own role rather than a user block. */
    Tool: 'tool',
};
/**
 * How hard the model should think before answering.
 *
 * Six tiers rather than four because the ends of the range are real and providers price them apart.
 * `Minimal` is a distinct setting on current OpenAI models — nearly no reasoning, but not none —
 * and `XHigh` is the recommended tier for agentic coding on several of them. A five-tier ladder
 * makes both unreachable, which means a caller cannot request the setting the provider itself
 * recommends. A provider without a given tier ladders DOWN to its nearest supported one.
 */
export const ReasoningEffort = {
    Off: 'off',
    /** Nearly no reasoning, but the model still emits a trace. Distinct from `Off`. */
    Minimal: 'minimal',
    Low: 'low',
    Medium: 'medium',
    High: 'high',
    /** Above `high` where a provider offers it; ladders down to `high` otherwise. */
    XHigh: 'xhigh',
    /** The highest tier a provider offers. */
    Max: 'max',
};
/** Why a turn stopped. */
export const FinishReason = {
    /** The model finished its answer. */
    Stop: 'stop',
    /** The model wants one or more tools run. */
    ToolUse: 'tool-use',
    /** The output token cap was reached. */
    Length: 'length',
    /** A stop sequence matched. */
    StopSequence: 'stop-sequence',
    /** The provider refused to answer. */
    Refusal: 'refusal',
    /** The caller aborted. */
    Aborted: 'aborted',
    /**
     * The turn ended because something failed, and the failure is reported separately.
     *
     * A run-level reason like {@link FinishReason.Aborted} beside it, not a provider one: no
     * adapter maps a wire value onto it, and the turn loop is its only producer. It exists because
     * the loop now emits its `turn-finish` event on the failure path too — a subscriber that only
     * ever saw the event on success had no way to tell "the turn ended badly" from "the turn is
     * still going", so a UI left its spinner up forever on any error the recovery matrix declined
     * to retry. Reusing `Unknown` there would have been a lie in the one place a reader checks:
     * `Unknown` means the provider ended the stream WITHOUT saying why, and an error turn has an
     * error event immediately before it saying exactly why. `StopReason` in `agent/Messages.ts`
     * already spells the same outcome `'error'`, so the value is borrowed rather than invented.
     */
    Error: 'error',
    /** The provider ended the stream without saying why. */
    Unknown: 'unknown',
};
