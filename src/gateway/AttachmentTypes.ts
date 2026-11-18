// SPDX-FileCopyrightText: 2026 Nexa contributors
// SPDX-License-Identifier: LicenseRef-Proprietary

import type { ContentBlock } from '../providers/Types.js';

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
