// SPDX-FileCopyrightText: 2026 Dacely <business@dacely.com>
// SPDX-License-Identifier: LicenseRef-Proprietary
/** Installed native analyzer supplying a function directory. */
export const ReverseEngine = { Ida: 'ida', Ghidra: 'ghidra' };
/** Explicit inventory coverage distinguishes absent, partial and complete indexing. */
export const ReverseDirectoryState = {
    Indexing: 'indexing',
    Ready: 'ready',
    Partial: 'partial',
    Failed: 'failed',
    Unavailable: 'unavailable',
};
/** Read-only browser operations supported by live or reopened native analyzers. */
export const ReverseInspection = {
    Decompile: 'decompile',
    Assembly: 'disassemble',
    References: 'xrefs',
    Graph: 'graph',
};
