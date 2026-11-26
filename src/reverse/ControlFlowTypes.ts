// SPDX-FileCopyrightText: 2026 Dacely <business@dacely.com>
// SPDX-License-Identifier: LicenseRef-Proprietary

/** One actual analyzer instruction, with an exact unsigned native address. */
export interface ReverseControlFlowInstruction {
    readonly address: string;
    readonly instruction: string;
}
/** A basic block retains declared edges even when their destinations are on another page. */
export interface ReverseControlFlowBlock {
    readonly id: string;
    readonly start: string;
    readonly end: string;
    /** Ghidra uses an inclusive last address; IDA uses an exclusive end address. */
    readonly endInclusive?: boolean;
    readonly successors: readonly string[];
    readonly instructions: readonly ReverseControlFlowInstruction[];
    readonly instructionsTruncated: boolean;
}
/** A bounded captured graph page, independent of analyzer handles and capabilities. */
export interface ReverseControlFlowPage {
    readonly function: string;
    readonly address: string;
    readonly blocks: readonly ReverseControlFlowBlock[];
    readonly totalBlocks: number;
    readonly offset: number;
    readonly nextOffset: number | null;
}
