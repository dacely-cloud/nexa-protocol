import type { MaestroTurnOptions } from '../maestro/MaestroTypes.js';
import type { UserRegion } from '../agent/RegionalContextTypes.js';
import type { TurnEvent } from '../agent/Types.js';
import type { SitePreview } from '../browser/FaviconTypes.js';
import type { ChatModelSelection, SafeguardFallback } from '../connections/ConnectionTypes.js';
import type { ErrorCode } from '../core/ErrorTypes.js';
import type { DeliveredAttachment } from '../media/DeliveredAttachment.js';
import type { FinishReason, ReasoningEffort, TokenUsage } from '../providers/Types.js';
import type { RiskLevel } from '../tools/RiskLevel.js';
import type { InboundAttachment } from './AttachmentTypes.js';
import type { JsonValue } from '../json/JsonValue.js';
/** An error, in the shape a client can act on without parsing prose. */
export interface WireError {
    readonly code: ErrorCode;
    readonly message: string;
    /** Whether repeating the SAME request could plausibly succeed. */
    readonly retryable: boolean;
    readonly retryAfterMs?: number;
    readonly details?: Readonly<Record<string, JsonValue>>;
}
/**
 * A turn event as it travels.
 *
 * Identical to {@link TurnEvent} except for the error variant: `Error` does not survive
 * `JSON.stringify` — it serializes to `{}` — so a failing turn would arrive as an empty object and
 * a client would report "something went wrong" with nothing else, forever.
 */
export type WireTurnEvent = Exclude<TurnEvent, {
    readonly type: 'error' | 'turn-activity';
}> | {
    readonly type: 'error';
    readonly error: WireError;
    readonly retryable: boolean;
};
/** Asynchronous tool decoration; may arrive after turn.end and never blocks it. */
export interface ToolSitesData extends LiveHistoryIdentity {
    readonly streamId: string;
    readonly callId: string;
    readonly sites: readonly SitePreview[];
    readonly sessionId?: string;
}
/** Optional correlation with a presentation record saved by a background checkpoint. */
export interface LiveHistoryIdentity {
    /** Stable record identity shared by the immediate event and its later durable copy. */
    readonly historyId?: string;
    /** Original event time, retained across checkpoint and replay. */
    readonly historyAt?: number;
}
/** One streamed turn event, the payload of `turn.event`. */
export interface TurnEventData extends LiveHistoryIdentity {
    readonly streamId: string;
    readonly event: WireTurnEvent;
    readonly sessionId?: string;
}
/** The payload of a {@link GATEWAY_EVENTS.TurnEnd} event. */
export interface TurnEndData extends LiveHistoryIdentity {
    readonly streamId: string;
    readonly ok: boolean;
    readonly result?: AskResult;
    readonly error?: WireError;
    readonly sessionId?: string;
}
/** The payload of a {@link GATEWAY_EVENTS.SessionMessage} event. */
export interface SessionMessageData {
    /** Attachments sent with this message, preserved for session viewers. */
    readonly attachments?: readonly InboundAttachment[];
    readonly sessionId: string;
    readonly role: 'user' | 'assistant';
    readonly text: string;
    /** Who sent it, so a shared-agent transcript can attribute the turn to a person. */
    readonly principalId: string;
    /** The run this message started, so a viewer can join the stream already in flight. */
    readonly streamId?: string;
    readonly at: number;
}
/** The payload of a {@link GATEWAY_EVENTS.ApprovalRequested} event. */
export interface ApprovalRequestedData {
    readonly approvalId: string;
    readonly sessionId: string | null;
    readonly principalId: string;
    readonly tool: string;
    readonly summary: string;
    /**
     * The exact command or path, so an operator approves what will actually run.
     *
     * Carried because an approval prompt without it is a rubber stamp: "run a shell command" is not
     * a decision anybody can make. It is the tool's own rendering, never the model's prose.
     */
    readonly detail?: string;
    readonly risk: RiskLevel;
    readonly requestedAt: number;
    readonly expiresAt: number;
}
/** The payload of a {@link GATEWAY_EVENTS.ApprovalResolved} event. */
export interface ApprovalResolvedData {
    readonly approvalId: string;
    readonly approved: boolean;
    /** `expired` distinguishes "nobody answered" from "somebody said no", which read differently. */
    readonly outcome: 'answered' | 'expired' | 'cancelled';
    readonly by: string | null;
}
/** What one turn is asked for. */
export interface AskParams {
    /** Coarse regional preferences, never authorization or precise location. */
    readonly userRegion?: UserRegion;
    /** Final answer format; JSON mode does not disable tools or verification. */
    readonly responseFormat?: 'text' | 'json';
    /** Optional AI completion audit for this turn; local execution checks always remain enabled. */
    readonly modelReview?: boolean;
    /** Per-turn reasoning preference; never changes the saved agent configuration. */
    readonly reasoningEffort?: ReasoningEffort;
    /**
     * Soft task time target in seconds; never a cancellation deadline.
     * @minimum 1
     * @maximum 172800
     * @TJS-type integer
     */
    readonly targetTimeSeconds?: number;
    /** User-authored image, video, document, and text blocks, in display order. */
    readonly attachments?: readonly InboundAttachment[];
    /** Opaque completed uploads; not storage paths or authorization. */
    readonly uploadedSources?: readonly string[];
    /** User text; may be blank when at least one attachment contains content. */
    readonly message: string;
    readonly agentId?: string;
    /** A model the user connected with their own key or subscription; absent selects the Nexa model. */
    readonly model?: ChatModelSelection;
    /** Answers messages a selected subscription model declines on a safety refusal; absent reports the refusal. */
    readonly safeguardFallback?: SafeguardFallback;
    /** Per-turn Maestro options; used only when `model` selects Maestro. */
    readonly maestro?: MaestroTurnOptions;
    /** Environments this connection attached that the turn may work in; the first is the main workspace. */
    readonly attachedEnvironments?: readonly string[];
    /** Continues an existing conversation. */
    readonly conversationId?: string;
    /** The principal the turn is billed and authorized as. */
    readonly userId?: string;
    /** Where tools operate. */
    readonly cwd?: string;
}
/** What a finished turn produced. */
export interface AskResult {
    /** A stopped response may leave the task unfinished and its background resources active. */
    readonly incompleteReason?: string;
    /** Delivered files; IDs match attachment events so clients can deduplicate. */
    readonly attachments?: readonly DeliveredAttachment[];
    readonly turnId: string;
    readonly text: string;
    readonly reasoning: string;
    readonly finishReason: FinishReason;
    readonly usage: TokenUsage;
    readonly iterations: number;
    readonly conversationId: string | null;
    /**
     * The session id this turn was filed under — `sessions.get`'s id, not the provider's.
     *
     * The one field a client needs to mirror its own conversation. `conversationId` is null for
     * every provider that does not hold history itself, and even when it is not, the gateway's
     * session key is namespaced by principal: a client that subscribed to what it typed named
     * `main` while the record was `alice::main`, so `sessions.subscribe` refused it and the second
     * device watched nothing. Passing this straight back as the next turn's `conversationId`
     * resumes the same conversation, so a client never has to reconstruct the namespacing itself.
     *
     * Absent from a gateway older than this field. Every reader here treats a missing value as
     * "this server cannot tell me" rather than declaring it optional, because it is never optional
     * on the server that produced it.
     */
    readonly sessionKey: string;
}
