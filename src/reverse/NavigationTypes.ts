// SPDX-FileCopyrightText: 2026 Nexa contributors
// SPDX-License-Identifier: LicenseRef-Proprietary

import type { ReverseCatalogQuery } from './ArchiveTypes.js';
import type { ReverseEvidenceRecord } from './ProgressTypes.js';

/** Installed native analyzer supplying a function directory. */
export const ReverseEngine = { Ida: 'ida', Ghidra: 'ghidra' } as const;

/** A supported native analyzer identity. */
export type ReverseEngine = (typeof ReverseEngine)[keyof typeof ReverseEngine];

/** Explicit inventory coverage distinguishes absent, partial and complete indexing. */
export const ReverseDirectoryState = {
    Indexing: 'indexing',
    Ready: 'ready',
    Partial: 'partial',
    Failed: 'failed',
    Unavailable: 'unavailable',
} as const;

/** One function-directory lifecycle state. */
export type ReverseDirectoryState =
    (typeof ReverseDirectoryState)[keyof typeof ReverseDirectoryState];

/** Durable metadata, with exact addresses and byte sizes represented as strings. */
export interface ReverseFunction {
    readonly address: string;
    readonly name: string;
    readonly bytes: string | null;
}

/** An authenticated directory read never accepts analyzer handles or filesystem paths. */
export interface ReverseFunctionsQuery extends ReverseCatalogQuery {
    readonly engine: ReverseEngine;
    /** Literal case-insensitive name or address prefix, never a regular expression. */
    readonly filter?: string;
}

/** At most fifty address-ordered function rows from a single owner-scoped inventory. */
export interface ReverseFunctionsPage {
    readonly runId: string;
    readonly sha256: string;
    readonly engine: ReverseEngine;
    readonly state: ReverseDirectoryState;
    readonly error: string | null;
    readonly cursor: string;
    readonly nextCursor: string | null;
    readonly total: string;
    readonly functions: readonly ReverseFunction[];
}

/** Read-only browser operations supported by live or reopened native analyzers. */
export const ReverseInspection = {
    Decompile: 'decompile',
    Assembly: 'disassemble',
    References: 'xrefs',
    Graph: 'graph',
} as const;

/** One bounded native inspection operation. */
export type ReverseInspection = (typeof ReverseInspection)[keyof typeof ReverseInspection];

/** Selects an owner-scoped live or saved target; database ids and query tokens never cross the wire. */
export interface ReverseInspectQuery extends ReverseFunctionsQuery {
    readonly selector: string;
    readonly operation: ReverseInspection;
    readonly offset?: number;
}

/** Inspection captures immutable evidence; its text is read separately through the existing paged API. */
export interface ReverseInspectResult {
    readonly runId: string;
    readonly sha256: string;
    readonly record: ReverseEvidenceRecord;
}
