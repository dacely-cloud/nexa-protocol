import type { Session } from '../session/SessionTypes.js';
import type { ReasoningEffort } from '../providers/Types.js';
/** A stable input, response stream, or canonical entry in a saved conversation. */
export interface ConversationMessageRef {
    readonly kind: 'input' | 'input-stream' | 'response' | 'entry';
    readonly key: string;
}
/** Changes a title only if the editor still sees the current title. */
export interface ConversationRenameParams {
    readonly id: string;
    readonly title: string;
    readonly expectedTitle: string | null;
}
/** Edits a human prompt or repeats its response in a separate saved version. */
export interface ConversationRetryParams extends ConversationPinParams {
    readonly requestId: string;
    readonly mode: 'edit' | 'regenerate';
    readonly text?: string;
    readonly modelReview?: boolean;
    readonly reasoningEffort?: ReasoningEffort;
    readonly targetTimeSeconds?: number;
}
/** A saved version is returned even when its model run was already started by a lost acknowledgement. */
export interface ConversationRetryResult {
    readonly session: Session;
    readonly started: boolean;
    readonly streamId: string;
}
/** Only editable text and a media count cross the wire when opening the message editor. */
export interface ConversationInput {
    readonly text: string;
    readonly attachmentCount: number;
}
/** A message selected from an owned saved conversation. */
export interface ConversationPinParams {
    readonly id: string;
    readonly message: ConversationMessageRef;
}
/** A private, durable bookmark with an authoritative saved excerpt. */
export interface ConversationPin {
    readonly id: string;
    readonly sessionId: string;
    readonly message: ConversationMessageRef;
    readonly title: string;
    readonly excerpt: string;
    readonly role: 'user' | 'assistant';
    readonly timestamp: number;
    readonly createdAt: number;
}
/** Bounded newest-first bookmarks, with an opaque owned-record cursor. */
export interface ConversationPinsParams {
    readonly before?: string;
    readonly limit?: number;
}
/** A page of owned pins, with the continuation cursor if more records exist. */
export interface ConversationPinsPage {
    readonly pins: readonly ConversationPin[];
    readonly nextBefore?: string;
}
/** Removes only a bookmark belonging to the current authenticated principal. */
export interface ConversationUnpinParams {
    readonly pinId: string;
}
