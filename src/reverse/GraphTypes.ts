// SPDX-FileCopyrightText: 2026 Nexa contributors
// SPDX-License-Identifier: LicenseRef-Proprietary

import type { ReverseCatalogQuery } from './ArchiveTypes.js';
import type { ReverseControlFlowBlock, ReverseControlFlowPage } from './ControlFlowTypes.js';
import type { ReverseEvidenceRecord } from './ProgressTypes.js';

/** Reads captured blocks, or an instruction page from one captured block. */
export interface ReverseGraphQuery extends ReverseCatalogQuery {
    readonly evidenceId: string;
    /** When present, cursor addresses instructions in this block rather than captured blocks. */
    readonly blockId?: string;
}

/** Original coverage and presentation paging remain separate. */
export interface ReverseGraphBlock extends ReverseControlFlowBlock {
    readonly instructionCount: number;
    readonly instructionOffset: number;
    readonly nextInstructionOffset: number | null;
}

/** At most four captured blocks and 12000 serialized block characters. */
export interface ReverseGraphProjection extends ReverseControlFlowPage {
    readonly blocks: readonly ReverseGraphBlock[];
}

/** Immutable graph provenance, with bounded block and instruction navigation. */
export interface ReverseGraphPage {
    readonly runId: string;
    readonly sha256: string;
    readonly record: ReverseEvidenceRecord;
    readonly evidenceSha256: string;
    readonly cursor: string;
    readonly nextCursor: string | null;
    readonly blockId: string | null;
    readonly capturedOffset: number;
    readonly capturedBlocks: number;
    /** The next analyzer offset is absent from this capture; another inspection is required. */
    readonly uncapturedOffset: number | null;
    readonly graph: ReverseGraphProjection;
}
