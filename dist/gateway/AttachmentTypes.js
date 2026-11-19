// SPDX-FileCopyrightText: 2026 Nexa contributors
// SPDX-License-Identifier: LicenseRef-Proprietary
/** User-authored attachment kinds accepted by the agent's public boundary. */
export const AttachmentType = {
    Text: 'text',
    Image: 'image',
    Video: 'video',
    VideoFrame: 'video-frame',
    Document: 'document',
};
/** Bounds a single steering request and the media retained by one active turn. */
export const SteeringImageLimits = {
    Count: 8,
    EncodedChars: 4 * Math.ceil((8 * 1024 * 1024) / 3),
    TurnEncodedChars: 4 * Math.ceil((16 * 1024 * 1024) / 3),
};
