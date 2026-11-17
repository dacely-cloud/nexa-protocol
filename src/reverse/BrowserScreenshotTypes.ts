// SPDX-FileCopyrightText: 2026 Nexa contributors
// SPDX-License-Identifier: LicenseRef-Proprietary

import type { ReverseBrowserReference } from './BrowserCaptureTypes.js';

/** CSS viewport coordinates are separate from the PNG's physical pixel dimensions. */
export interface BrowserScreenshotViewport {
    readonly pageX: number;
    readonly pageY: number;
    readonly width: number;
    readonly height: number;
    readonly scale: number;
}
/** Image-free historical receipt for one explicitly requested visible viewport. */
export interface BrowserScreenshotMetadata {
    readonly provider: 'cdp-passive';
    readonly targetId: string;
    readonly frameId: string;
    readonly origin: string;
    readonly capturedAt: string;
    readonly mimeType: 'image/png';
    readonly sha256: string;
    readonly bytes: string;
    readonly width: number;
    readonly height: number;
    readonly viewport: BrowserScreenshotViewport;
    readonly coverage: 'visible-viewport';
}
/** Raw PNG bytes enter durable storage once; progress contains only metadata. */
export interface BrowserScreenshotCapture extends BrowserScreenshotMetadata {
    readonly data: string;
}
/** Progress retains an owner-bound archive identity without any image data. */
export interface BrowserScreenshotSnapshot extends BrowserScreenshotMetadata {
    readonly reference: ReverseBrowserReference;
}
/** Metadata reads contain no pixels; selected image pages contain at most 49152 decoded bytes. */
export const BrowserScreenshotView = { Metadata: 'metadata', Image: 'image' } as const;
/** One finite saved screenshot representation. */
export type BrowserScreenshotView =
    (typeof BrowserScreenshotView)[keyof typeof BrowserScreenshotView];
/** Saved image reads accept archive IDs and canonical byte offsets, never URLs or files. */
export interface BrowserScreenshotQuery {
    readonly id: string;
    readonly runId: string;
    readonly evidenceId: string;
    readonly view: BrowserScreenshotView;
    readonly cursor?: string;
}
/** Capture and PNG digests identify different immutable artifacts. */
export interface BrowserScreenshotPage {
    readonly runId: string;
    readonly sha256: string;
    readonly evidenceId: string;
    readonly captureSha256: string;
    readonly metadata: BrowserScreenshotMetadata;
    readonly view: BrowserScreenshotView;
    readonly cursor: string;
    readonly nextCursor: string | null;
    readonly data: string | null;
}
