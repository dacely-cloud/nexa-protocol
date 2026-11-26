// SPDX-FileCopyrightText: 2026 Dacely <business@dacely.com>
// SPDX-License-Identifier: LicenseRef-Proprietary

/** Source formats decoded without replaying captured traffic. */
export const NetworkFormat = { Har: 'har', Mitmproxy: 'mitmproxy' } as const;

/** Supported capture formats. */
export type NetworkFormat = (typeof NetworkFormat)[keyof typeof NetworkFormat];

/** Native coordinates are exact decimal byte offsets in the immutable input. */
export interface NetworkNativeSource {
    readonly ordinal: string;
    readonly start: string;
    readonly end: string;
    readonly flowType: string | null;
    readonly flowId: string | null;
    readonly stateVersion: string | null;
}

/** Metadata for an observed payload, independently of whether its text is available. */
export interface NetworkBody {
    readonly mimeType: string;
    readonly captured: boolean;
    readonly binary: boolean;
    readonly bytes: string | null;
    readonly sha256: string | null;
    readonly characters: number;
    readonly redacted: boolean;
}

/** Compact request directory row with an immutable HAR JSON pointer. */
export interface NetworkRequest {
    readonly id: string;
    readonly location: string;
    readonly method: string | null;
    readonly url: string | null;
    readonly urlTruncated: boolean;
    readonly status: number | null;
    readonly mimeType: string;
    readonly startedDateTime: string | null;
    readonly durationMs: number | null;
    readonly native?: NetworkNativeSource;
    readonly requestBody: NetworkBody;
    readonly responseBody: NetworkBody;
}

/** Explicit missing or rejected capture coverage. */
export interface NetworkIssue {
    readonly location: string;
    readonly message: string;
}

/** Bounded capability-free projection; full entries and payloads require paged evidence queries. */
export interface ReverseNetworkSnapshot {
    readonly format: NetworkFormat;
    readonly version: string;
    readonly entryCount: number;
    readonly missingBodies: number;
    readonly redactedBodies: number;
    readonly issueCount: number;
    readonly requests: readonly NetworkRequest[];
    readonly issues: readonly NetworkIssue[];
}
