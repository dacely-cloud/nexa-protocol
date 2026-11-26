// SPDX-FileCopyrightText: 2026 Dacely <business@dacely.com>
// SPDX-License-Identifier: LicenseRef-Proprietary

import type {
    BrowserWebMcpMetadata,
    BrowserWebMcpDescriptor,
    BrowserSchemaProperty,
} from './BrowserWebMcpTypes.js';

/** Metadata, declaration rows and one selected schema have independent transfer budgets. */
export const BrowserWebMcpView = {
    Metadata: 'metadata',
    Tools: 'tools',
    Schema: 'schema',
} as const;
/** One selected saved representation. */
export type BrowserWebMcpView = (typeof BrowserWebMcpView)[keyof typeof BrowserWebMcpView];
/** Tool inputs name saved evidence and retained ordinals, never browser sockets or principals. */
export interface BrowserWebMcpReadRequest {
    readonly runId: string;
    readonly evidenceId: string;
    readonly view?: BrowserWebMcpView;
    readonly selector?: string;
    readonly cursor?: string;
}
/** Gateway authority is checked against the original owner and conversation before any index read. */
export interface BrowserWebMcpQuery extends BrowserWebMcpReadRequest {
    readonly id: string;
}
/** Only selected rows are transferred; schema leaves and complete originals remain host-side. */
export interface BrowserWebMcpPage {
    readonly runId: string;
    readonly sha256: string;
    readonly evidenceId: string;
    readonly captureSha256: string;
    readonly metadata: BrowserWebMcpMetadata;
    readonly view: BrowserWebMcpView;
    readonly selector: string | null;
    readonly cursor: string;
    readonly nextCursor: string | null;
    readonly selectedTool: BrowserWebMcpDescriptor | null;
    readonly tools: readonly BrowserWebMcpDescriptor[];
    readonly properties: readonly BrowserSchemaProperty[];
}
