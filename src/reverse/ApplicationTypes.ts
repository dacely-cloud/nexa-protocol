// SPDX-FileCopyrightText: 2026 Dacely <business@dacely.com>
// SPDX-License-Identifier: LicenseRef-Proprietary

import type { SourceLanguage } from './SourcePrimitives.js';

/** Exact generated-source location of a static observation. Columns and offsets are zero-based. */
export interface ApplicationLocation {
    readonly module: string;
    readonly line: number;
    readonly column: number;
    readonly endLine: number;
    readonly endColumn: number;
    readonly start: number;
    readonly end: number;
}

/** An inventoried module with a digest of the exact bytes parsed, including syntax failures. */
export interface ApplicationModule {
    readonly language?: SourceLanguage;
    readonly id: string;
    readonly path: string;
    readonly sha256: string;
    readonly bytes: string;
    readonly functions: number;
    readonly imports: number;
    readonly sourceMap: string | null;
    readonly parseError: string | null;
}

/** Observed call sites, never claims that an IPC channel, route or native addon was exercised. */
export const ApplicationBoundaryKind = {
    Ipc: 'ipc',
    Route: 'route',
    NativeAddon: 'native-addon',
    Preload: 'preload',
    Window: 'browser-window',
    Bridge: 'context-bridge',
} as const;

/** One application boundary kind. */
export type ApplicationBoundaryKind =
    (typeof ApplicationBoundaryKind)[keyof typeof ApplicationBoundaryKind];

/** A boundary between application modules, with the modules it connects. */
export interface ApplicationBoundary {
    readonly id: string;
    readonly kind: ApplicationBoundaryKind;
    readonly operation: string;
    readonly value: string | null;
    readonly location: ApplicationLocation;
}

/** Explicit incomplete coverage rather than silently omitted files or unsupported syntax. */
export interface ApplicationIssue {
    readonly path: string;
    readonly message: string;
}

/** Bounded projection for live Chat events; complete indexes are paged by the native query tool. */
export interface ReverseApplicationSnapshot {
    readonly languages?: readonly SourceLanguage[];
    readonly symbolCount?: number;
    readonly referenceCount?: number;
    readonly moduleCount: number;
    readonly importCount: number;
    readonly functionCount: number;
    readonly ipcCount: number;
    readonly routeCount: number;
    readonly nativeAddonCount: number;
    readonly sourceMapCount: number;
    readonly issueCount: number;
    readonly modules: readonly ApplicationModule[];
    readonly boundaries: readonly ApplicationBoundary[];
    readonly issues: readonly ApplicationIssue[];
}
