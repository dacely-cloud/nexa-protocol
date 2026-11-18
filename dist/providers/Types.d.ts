import type { Graphic } from '../graphics/Graphic.js';
import type { JsonValue } from '../json/JsonValue.js';
import type { VisualResponse } from '../visuals/VisualResponse.js';
/** Where binary content comes from: inline base64, or a URL the provider fetches. */
export type BinarySource = {
    readonly kind: 'base64';
    readonly mediaType: string;
    readonly data: string;
} | {
    readonly kind: 'url';
    readonly url: string;
};
/** One block of a message's content. */
export type ContentBlock = {
    readonly type: 'text';
    readonly text: string;
} | {
    /** The model's reasoning trace. `signature` is Anthropic's integrity token: it MUST be
     * round-tripped verbatim on a later turn or the API rejects the thinking block. */
    readonly type: 'thinking';
    readonly thinking: string;
    readonly signature?: string;
} | {
    /** Reasoning the provider encrypted. Opaque, and round-tripped as-is. */
    readonly type: 'redacted-thinking';
    readonly data: string;
} | {
    readonly type: 'image';
    readonly source: BinarySource;
    readonly title?: string;
} | {
    /** An encoded video or animation container decoded natively by a multimodal model. */
    readonly type: 'video';
    readonly source: BinarySource;
    readonly title?: string;
} | {
    /** One ordered frame of a video or animation. Consecutive frames form one clip. */
    readonly type: 'video-frame';
    readonly source: BinarySource;
    readonly title?: string;
} | {
    readonly type: 'document';
    readonly source: BinarySource;
    readonly title?: string;
} | {
    /** The model asking for a tool to run. `id` is the provider's own call id and is what a
     * result must quote back. */
    readonly type: 'tool-use';
    readonly id: string;
    readonly name: string;
    readonly input: JsonValue;
    /**
     * An integrity token some providers attach to a tool call made while reasoning.
     *
     * Opaque, and round-tripped verbatim on the next turn. Gemini rejects a replayed function
     * call whose thought signature is missing or altered, so this must travel WITH the block
     * rather than in a side table — a cache keyed by call id does not survive a session being
     * reloaded from disk, which is exactly when the replay happens.
     */
    readonly signature?: string;
} | {
    /** The outcome of a tool call, sent back on the next turn. */
    readonly type: 'tool-result';
    readonly toolUseId: string;
    /** Inert rich visual response retained independently of model-visible text. */
    readonly visual?: VisualResponse;
    /** Validated native graphic retained independently of model-visible text. */
    readonly graphic?: Graphic;
    /** Host-authored observation evidence; never inferred from result prose. */
    readonly inspectedMediaSha256?: readonly string[];
    readonly content: string | readonly ContentBlock[];
    readonly isError?: boolean;
};
/** Who authored a message. */
export declare const MessageRole: {
    readonly System: 'system';
    readonly User: 'user';
    readonly Assistant: 'assistant';
    /** A tool's output, for providers that model it as its own role rather than a user block. */
    readonly Tool: 'tool';
};
/** One message role. */
export type MessageRole = (typeof MessageRole)[keyof typeof MessageRole];
/** Durable host metadata; provider adapters send only the role and content to models. */
export interface ModelMessageIdentity {
    readonly id: string;
    readonly timestamp: number;
    readonly streamId: string;
    readonly inputId?: string;
}
/** One conversation message as a model reads it. */
export interface ModelMessage {
    readonly role: MessageRole;
    readonly content: string | readonly ContentBlock[];
    readonly identity?: ModelMessageIdentity;
}
/**
 * How hard the model should think before answering.
 *
 * Six tiers rather than four because the ends of the range are real and providers price them apart.
 * `Minimal` is a distinct setting on current OpenAI models — nearly no reasoning, but not none —
 * and `XHigh` is the recommended tier for agentic coding on several of them. A five-tier ladder
 * makes both unreachable, which means a caller cannot request the setting the provider itself
 * recommends. A provider without a given tier ladders DOWN to its nearest supported one.
 */
export declare const ReasoningEffort: {
    readonly Off: 'off';
    /** Nearly no reasoning, but the model still emits a trace. Distinct from `Off`. */
    readonly Minimal: 'minimal';
    readonly Low: 'low';
    readonly Medium: 'medium';
    readonly High: 'high';
    /** Above `high` where a provider offers it; ladders down to `high` otherwise. */
    readonly XHigh: 'xhigh';
    /** The highest tier a provider offers. */
    readonly Max: 'max';
};
/** One reasoning effort level. */
export type ReasoningEffort = (typeof ReasoningEffort)[keyof typeof ReasoningEffort];
/** Reasoning configuration for a request. */
export interface ReasoningOptions {
    readonly effort?: ReasoningEffort;
    /** A hard token budget for the reasoning trace, where the provider accepts one. */
    readonly maxTokens?: number;
    /** Whether the reasoning trace should be streamed back at all. */
    readonly include?: boolean;
}
/** Why a turn stopped. */
export declare const FinishReason: {
    /** The model finished its answer. */
    readonly Stop: 'stop';
    /** The model wants one or more tools run. */
    readonly ToolUse: 'tool-use';
    /** The output token cap was reached. */
    readonly Length: 'length';
    /** A stop sequence matched. */
    readonly StopSequence: 'stop-sequence';
    /** The provider refused to answer. */
    readonly Refusal: 'refusal';
    /** The caller aborted. */
    readonly Aborted: 'aborted';
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
    readonly Error: 'error';
    /** The provider ended the stream without saying why. */
    readonly Unknown: 'unknown';
};
/** Why a model turn ended. */
export type FinishReason = (typeof FinishReason)[keyof typeof FinishReason];
/** Token accounting for a turn. */
export interface TokenUsage {
    readonly inputTokens: number;
    readonly outputTokens: number;
    /** Input tokens served from a prompt cache (already counted in `inputTokens`). */
    readonly cachedInputTokens?: number;
    /** Tokens written INTO the cache by this request, where the provider bills them apart. */
    readonly cacheWriteTokens?: number;
    /**
     * Cache writes billed at a longer time-to-live, where the provider prices two tiers.
     *
     * Separate from `cacheWriteTokens` because they are billed at different rates; folding them
     * together would misprice every request that uses the longer tier.
     */
    readonly cacheWriteLongTokens?: number;
    /** Reasoning tokens (already counted in `outputTokens` for most providers). */
    readonly reasoningTokens?: number;
    /**
     * How much of the model's context window the conversation currently OCCUPIES.
     *
     * Distinct from `inputTokens`, and the distinction is load-bearing for compaction. `inputTokens`
     * is a billing figure that accumulates across a turn's several round-trips; occupancy is the
     * size of the prompt right now. A compaction trigger that watched the billing figure would fire
     * early on every tool-heavy turn — after five round-trips the cumulative input exceeds the
     * window while the actual prompt is nowhere near it.
     */
    readonly contextTokens?: number;
}
