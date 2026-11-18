// SPDX-FileCopyrightText: 2026 Nexa contributors
// SPDX-License-Identifier: LicenseRef-Proprietary

import type { BrowserModuleMatch } from './BrowserModuleCandidateTypes.js';
import type { BrowserModuleContext, BrowserModuleTraceStatus } from './BrowserModuleTraceTypes.js';
import type { BrowserScriptSourceState } from './BrowserSourcesTypes.js';

/** Metadata directories and exact text have independent bounded cursors. */
export const BrowserModuleView = {
    Imports: 'imports',
    Candidates: 'candidates',
    Text: 'text',
} as const;

/** Saved browser module representation. */
export type BrowserModuleView = (typeof BrowserModuleView)[keyof typeof BrowserModuleView];

/** Full fields are read only after selecting an import or its context. */
export const BrowserModuleField = {
    Module: 'module',
    Importer: 'importer-url',
    MapBase: 'map-base-url',
    ParseError: 'parse-error',
    Specifier: 'specifier',
    Url: 'resolved-url',
    Error: 'error-message',
    Expression: 'expression',
} as const;

/** Exact field text selector, independent of source bodies. */
export type BrowserModuleField = (typeof BrowserModuleField)[keyof typeof BrowserModuleField];

/** Requests contain archive IDs, never workspace paths or URLs to fetch. */
export interface BrowserModuleQuery {
    readonly id: string;
    readonly runId: string;
    readonly evidenceId: string;
    readonly view: BrowserModuleView;
    readonly selector?: string;
    readonly field?: BrowserModuleField;
    readonly cursor?: string;
}

/** Original capture identity remains separate from derived analysis and report identities. */
export interface BrowserModuleSourceCapture {
    readonly runId: string;
    readonly sha256: string;
    readonly evidenceId: string;
    readonly captureSha256: string;
}

/** Compact context previews identify exact text available through the text representation. */
export interface BrowserModuleMetadata {
    readonly module: string;
    readonly moduleCharacters: string;
    readonly sourceSha256: string;
    readonly sourceBytes: string;
    readonly engine: 'chromium-import-meta-resolve';
    readonly engineVersion: string | null;
    readonly context: BrowserModuleContext;
    readonly importerUrl: string;
    readonly importerCharacters: string;
    readonly importMapSha256: string | null;
    readonly importMapBytes: string | null;
    readonly importMapBaseUrl: string | null;
    readonly importMapBaseCharacters: string | null;
    readonly parseError: string | null;
    readonly parseErrorCharacters: string | null;
    readonly importCount: string;
    readonly excludedTypeOnly: string;
    readonly excludedNonEs: string;
    readonly sourceCapture: BrowserModuleSourceCapture | null;
}

/** Coordinates identify the exact selected source without repeating a long path in every row. */
export interface BrowserModulePosition {
    readonly line: number;
    readonly column: number;
    readonly endLine: number;
    readonly endColumn: number;
    readonly start: number;
    readonly end: number;
}

/** Literal identity and native errors are previews; exact fields are independently paged. */
export interface BrowserModuleImportRow {
    readonly kind: 'import';
    readonly id: string;
    readonly syntax: string;
    readonly status: BrowserModuleTraceStatus;
    readonly specifier: string | null;
    readonly specifierCharacters: string | null;
    readonly url: string | null;
    readonly urlCharacters: string | null;
    readonly errorName: string | null;
    readonly errorMessage: string | null;
    readonly errorCharacters: string | null;
    readonly expression: string | null;
    readonly expressionCharacters: string | null;
    readonly expressionTruncated: boolean;
    readonly location: BrowserModulePosition;
    readonly candidateCount: number;
    readonly execution: 'unknown';
}

/** Candidate metadata points to original source pages and never carries captured code. */
export interface BrowserModuleCandidateRow {
    readonly kind: 'candidate';
    readonly id: string;
    readonly frameId: string;
    readonly url: string;
    readonly urlCharacters: string;
    readonly sourceSha256: string | null;
    readonly sourceBytes: string | null;
    readonly state: BrowserScriptSourceState;
    readonly isModule: boolean;
    readonly hasSourceUrl: boolean;
    readonly startLine: number;
    readonly startColumn: number;
    readonly match: BrowserModuleMatch;
}

/** One finite row in the selected saved directory. */
export type BrowserModuleDirectoryRow = BrowserModuleImportRow | BrowserModuleCandidateRow;

/** At most twenty previews or one bounded UTF-16 range, with immutable provenance. */
export interface BrowserModulePage {
    readonly runId: string;
    readonly sha256: string;
    readonly evidenceId: string;
    readonly reportSha256: string;
    readonly metadata: BrowserModuleMetadata;
    readonly view: BrowserModuleView;
    readonly selector: string | null;
    readonly field: BrowserModuleField | null;
    readonly cursor: string;
    readonly nextCursor: string | null;
    readonly total: string;
    readonly records: readonly BrowserModuleDirectoryRow[];
    readonly text: string | null;
    readonly textSha256: string | null;
}
