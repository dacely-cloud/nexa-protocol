import type { ContentBlock } from '../providers/Types.js';
/** User-authored attachment kinds accepted by the agent's public boundary. */
export declare const AttachmentType: {
    readonly Text: 'text';
    readonly Image: 'image';
    readonly Video: 'video';
    readonly VideoFrame: 'video-frame';
    readonly Document: 'document';
};
/** A user attachment cannot inject tool results or provider reasoning into history. */
export type InboundAttachment = Extract<ContentBlock, {
    readonly type: (typeof AttachmentType)[keyof typeof AttachmentType];
}>;
