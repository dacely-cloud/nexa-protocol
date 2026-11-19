import type { BinarySource, ContentBlock } from '../providers/Types.js';
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
/** Bytes supplied by the user for a correction to a running turn. */
export interface SteeringImage {
    readonly type: 'image';
    readonly source: Extract<BinarySource, {
        readonly kind: 'base64';
    }>;
    readonly title?: string;
}
/** Bounds a single steering request and the media retained by one active turn. */
export declare const SteeringImageLimits: {
    readonly Count: 8;
    readonly EncodedChars: number;
    readonly TurnEncodedChars: number;
};
