// SPDX-FileCopyrightText: 2026 Dacely <business@dacely.com>
// SPDX-License-Identifier: LicenseRef-Proprietary

import type { BinarySource, ContentBlock } from '../providers/Types.js';

/** User-authored attachment kinds accepted by the agent's public boundary. */
export const AttachmentType = {
    Text: 'text',
    Image: 'image',
    Video: 'video',
    VideoFrame: 'video-frame',
    Document: 'document',
} as const;

/** A user attachment cannot inject tool results or provider reasoning into history. */
export type InboundAttachment = Extract<
    ContentBlock,
    { readonly type: (typeof AttachmentType)[keyof typeof AttachmentType] }
>;

/** Bytes supplied by the user for a correction to a running turn. */
export interface SteeringImage {
    readonly type: 'image';
    readonly source: Extract<BinarySource, { readonly kind: 'base64' }>;
    readonly title?: string;
}

/** Bounds a single steering request and the media retained by one active turn. */
export const SteeringImageLimits = {
    Count: 8,
    EncodedChars: 4 * Math.ceil((8 * 1024 * 1024) / 3),
    TurnEncodedChars: 4 * Math.ceil((16 * 1024 * 1024) / 3),
} as const;
