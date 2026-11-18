// SPDX-FileCopyrightText: 2026 Nexa contributors
// SPDX-License-Identifier: LicenseRef-Proprietary

import type { ReverseEvidenceRecord } from './ProgressTypes.js';

/** Reads only an authenticated session's indexed investigation, never a workspace path. */
export interface ReverseCatalogQuery {
    readonly id: string;
    readonly runId: string;
    readonly cursor?: string;
}

/** Evidence ids come from the saved catalog and cannot authorize arbitrary files. */
export interface ReverseEvidenceQuery extends ReverseCatalogQuery {
    readonly evidenceId: string;
    /** Code is extracted at capture time; original remains the default. */
    readonly representation?: ReverseEvidenceRepresentation;
}

/** An append-only catalog page; cursors are exact decimal record offsets. */
export interface ReverseCatalogPage {
    readonly runId: string;
    readonly sha256: string;
    readonly cursor: string;
    readonly nextCursor: string | null;
    readonly total: string;
    readonly evidence: readonly ReverseEvidenceRecord[];
}

/** How saved evidence is represented: the captured original or its code view. */
export const ReverseEvidenceRepresentation = { Original: 'original', Code: 'code' } as const;

/** One evidence representation. */
export type ReverseEvidenceRepresentation =
    (typeof ReverseEvidenceRepresentation)[keyof typeof ReverseEvidenceRepresentation];

/** Original evidence text paged by UTF-16 offset, independent of model report previews. */
export interface ReverseEvidencePage {
    readonly runId: string;
    readonly sha256: string;
    readonly record: ReverseEvidenceRecord;
    readonly evidenceSha256: string;
    readonly cursor: string;
    readonly nextCursor: string | null;
    readonly characters: string;
    readonly text: string;
    readonly representation?: ReverseEvidenceRepresentation;
    /** Present for a derived code page and always identifies the unmodified captured original. */
    readonly originalEvidenceSha256?: string;
}
