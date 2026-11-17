// SPDX-FileCopyrightText: 2026 Nexa contributors
// SPDX-License-Identifier: LicenseRef-Proprietary

import type { ReverseBrowserReference } from './BrowserCaptureTypes.js';

/** Each storage authority has independently reported coverage. */
export const BrowserStorageGroup = {
    Local: 'local-storage',
    Session: 'session-storage',
    Cookies: 'cookies',
    IndexedDb: 'indexed-db',
    Cache: 'cache-storage',
} as const;
/** Finite storage authorities admitted by passive capture and saved row queries. */
export type BrowserStorageGroup = (typeof BrowserStorageGroup)[keyof typeof BrowserStorageGroup];
/** A row distinguishes store existence, schema and record fingerprints. */
export const BrowserStorageKind = {
    Name: 'name',
    Value: 'value',
    Schema: 'schema',
    Record: 'record',
    CacheEntry: 'cache-entry',
} as const;
/** Finite row interpretations preserved by content identity. */
export type BrowserStorageKind = (typeof BrowserStorageKind)[keyof typeof BrowserStorageKind];
/** Storage values are never selected; names and redacted fingerprints have independent opt-ins. */
export interface BrowserStorageOptions {
    readonly includeNames: boolean;
    readonly includeFingerprints: boolean;
}
/** Omitted rows or observed mutations prevent completeness claims. */
export interface BrowserStorageCoverage {
    readonly selected: boolean;
    readonly available: boolean;
    readonly complete: boolean;
    readonly rows: string;
    readonly omitted: string;
    readonly changedDuringCapture: boolean;
}
/** Quota byte counts retain exact validated integer representations. */
export interface BrowserStorageQuota {
    readonly available: boolean;
    readonly usageBytes: string | null;
    readonly quotaBytes: string | null;
}
/** Projected capture identity includes no key/value bodies or unselected names. */
export interface BrowserStorageMetadata {
    readonly provider: 'cdp-passive';
    readonly targetId: string;
    readonly frameId: string;
    readonly url: string;
    readonly origin: string;
    readonly capturedAt: string;
    readonly includeNames: boolean;
    readonly includeFingerprints: boolean;
    readonly valuesRedacted: true;
    readonly fingerprintAlgorithm: 'sha256-canonical-json-v1';
    readonly fingerprintsComplete: boolean;
    readonly quota: BrowserStorageQuota;
    readonly coverage: Readonly<Record<BrowserStorageGroup, BrowserStorageCoverage>>;
    readonly limitations: readonly string[];
}
/** Names appear only when selected; hashes identify data without returning its values. */
export interface BrowserStorageRow {
    readonly id: string;
    readonly group: BrowserStorageGroup;
    readonly kind: BrowserStorageKind;
    readonly name: string | null;
    readonly identitySha256: string | null;
    readonly valueSha256: string | null;
    readonly complete: boolean;
}
/** Original capture retains the bounded inventory independently from progress. */
export interface BrowserStorageCapture {
    readonly metadata: BrowserStorageMetadata;
    readonly rows: readonly BrowserStorageRow[];
}
/** Progress identifies a saved redacted capture without embedding its rows. */
export interface BrowserStorageSnapshot extends BrowserStorageMetadata {
    readonly reference: ReverseBrowserReference;
}
/** Saved rows select one storage group with independent ordinal paging. */
export interface BrowserStorageQuery {
    readonly id: string;
    readonly runId: string;
    readonly evidenceId: string;
    readonly group?: BrowserStorageGroup;
    readonly cursor?: string;
}
/** Metadata-only reads omit a group; selected groups contain at most twenty rows. */
export interface BrowserStoragePage {
    readonly runId: string;
    readonly sha256: string;
    readonly evidenceId: string;
    readonly captureSha256: string;
    readonly metadata: BrowserStorageMetadata;
    readonly group: BrowserStorageGroup | null;
    readonly cursor: string;
    readonly nextCursor: string | null;
    readonly rows: readonly BrowserStorageRow[];
}
