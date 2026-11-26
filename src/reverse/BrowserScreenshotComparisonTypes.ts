// SPDX-FileCopyrightText: 2026 Dacely <business@dacely.com>
// SPDX-License-Identifier: LicenseRef-Proprietary

import type { BrowserScreenshotMetadata } from './BrowserScreenshotTypes.js';
import type { ReverseBrowserReference } from './BrowserCaptureTypes.js';

/** Pixel outcomes keep tolerated changes separate from exact equality. */
export const BrowserPixelStatus = {
    Identical: 'identical',
    WithinThreshold: 'within-threshold',
    Different: 'different',
    DimensionMismatch: 'dimension-mismatch',
} as const;
/** One bounded local pixel-comparison outcome. */
export type BrowserPixelStatus = (typeof BrowserPixelStatus)[keyof typeof BrowserPixelStatus];
/** Pixel rectangle uses inclusive left/top and exclusive right/bottom coordinates. */
export interface BrowserPixelBounds {
    readonly x: number;
    readonly y: number;
    readonly width: number;
    readonly height: number;
}
/** Counts are decimal strings; averages retain all RGBA deltas, including tolerated pixels. */
export interface BrowserPixelComparison {
    readonly algorithm: 'rgba-channel-v1';
    readonly beforeWidth: number;
    readonly beforeHeight: number;
    readonly afterWidth: number;
    readonly afterHeight: number;
    readonly channelThreshold: number;
    readonly status: BrowserPixelStatus;
    readonly comparedPixels: string;
    readonly changedPixels: string | null;
    readonly changedRatio: number | null;
    readonly absoluteChannelDelta: string | null;
    readonly maximumChannelDelta: number | null;
    readonly meanAbsoluteChannelDelta: number | null;
    readonly bounds: BrowserPixelBounds | null;
}
/** Capture selectors provide identity; the host supplies authorization. */
export interface BrowserScreenshotSelection {
    readonly runId: string;
    readonly evidenceId: string;
}
/** Both originals must belong to the authenticated parent conversation. */
export interface BrowserScreenshotCompareRequest {
    readonly before: BrowserScreenshotSelection;
    readonly after: BrowserScreenshotSelection;
    readonly channelThreshold?: number;
}
/** Comparison retains each original capture and image digest separately. */
export interface BrowserScreenshotComparisonSource {
    readonly reference: ReverseBrowserReference;
    readonly sha256: string;
    readonly metadata: BrowserScreenshotMetadata;
}
/** A reproducible image-free report binds deterministic metrics to two immutable originals. */
export interface BrowserScreenshotComparison {
    readonly before: BrowserScreenshotComparisonSource;
    readonly after: BrowserScreenshotComparisonSource;
    readonly metrics: BrowserPixelComparison;
}
/** Body-free progress also identifies the archived comparison report. */
export interface BrowserScreenshotComparisonSnapshot extends BrowserScreenshotComparison {
    readonly reference: ReverseBrowserReference;
}
/** Worker input contains bounded PNG bytes only, never workspace paths or executable code. */
export interface BrowserPixelJob {
    readonly before: Uint8Array;
    readonly after: Uint8Array;
    readonly channelThreshold: number;
}
