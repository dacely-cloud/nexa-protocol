// SPDX-FileCopyrightText: 2026 Dacely <business@dacely.com>
// SPDX-License-Identifier: LicenseRef-Proprietary

import type { ReverseBrowserReference } from './BrowserCaptureTypes.js';

/** Value-free schema summaries use the native JSON value vocabulary. */
export const BrowserSchemaType = {
    Object: 'object',
    Array: 'array',
    String: 'string',
    Number: 'number',
    Boolean: 'boolean',
    Null: 'null',
} as const;
/** One observed JSON value kind, independent of a schema's declared semantics. */
export type BrowserSchemaType = (typeof BrowserSchemaType)[keyof typeof BrowserSchemaType];
/** Schema keys are retained as escaped JSON pointers; leaf values are excluded. */
export interface BrowserSchemaProperty {
    readonly id: string;
    readonly path: string;
    readonly types: readonly BrowserSchemaType[];
    readonly observations: string;
}
/** Structural coverage reports a finite observed schema traversal rather than parameter validation. */
export interface BrowserSchemaSummary {
    readonly rootType: BrowserSchemaType;
    readonly nodeCount: string;
    readonly maximumDepth: number;
    readonly propertyCount: string;
    readonly complete: boolean;
}
/** Page-provided booleans remain untrusted annotations, never authorization decisions. */
export interface BrowserWebMcpAnnotations {
    readonly readOnly: boolean | null;
    readonly untrustedContent: boolean | null;
    readonly autosubmit: boolean | null;
    readonly consequential: boolean | null;
    readonly debugging: boolean | null;
}
/** A registration call frame is exposed only for an admitted HTTP(S) source origin. */
export interface BrowserWebMcpSource {
    readonly url: string;
    readonly line: number | null;
    readonly column: number | null;
}
/** Declarations are inventory evidence; they never become executable Nexa tools. */
export const BrowserWebMcpDeclaration = {
    Declarative: 'declarative',
    Imperative: 'imperative',
} as const;
/** How the page registered a declaration. */
export type BrowserWebMcpDeclaration =
    (typeof BrowserWebMcpDeclaration)[keyof typeof BrowserWebMcpDeclaration];
/** A directory row excludes its separately paged structural schema properties. */
export interface BrowserWebMcpDescriptor {
    readonly id: string;
    readonly key: string;
    readonly name: string;
    readonly description: string;
    readonly frameId: string;
    readonly frameUrl: string;
    readonly origin: string;
    readonly declaration: BrowserWebMcpDeclaration;
    readonly inputSchema: BrowserSchemaSummary | null;
    readonly annotations: BrowserWebMcpAnnotations;
    readonly registrationSource: BrowserWebMcpSource | null;
    readonly trust: 'page-declared-untrusted';
}
/** Host-only capture detail keeps schemas out of progress and directory pages. */
export interface BrowserWebMcpTool extends BrowserWebMcpDescriptor {
    readonly properties: readonly BrowserSchemaProperty[];
}
/** Captured scope distinguishes unsupported protocols and explicit retention/authority gaps. */
export interface BrowserWebMcpMetadata {
    readonly provider: 'cdp-passive';
    readonly targetId: string;
    readonly frameId: string;
    readonly url: string;
    readonly origin: string;
    readonly allowedOrigins: readonly string[];
    readonly capturedAt: string;
    readonly observationMs: number;
    readonly available: boolean;
    readonly complete: boolean;
    readonly frameCoverageComplete: boolean;
    readonly schemaCoverageComplete: boolean;
    readonly toolCount: string;
    readonly dropped: string;
    readonly schemaValuesExcluded: true;
    readonly invocationAvailable: false;
    readonly limitations: readonly string[];
}
/** An immutable original is published once and shared by all investigation specialists. */
export interface BrowserWebMcpCapture {
    readonly metadata: BrowserWebMcpMetadata;
    readonly tools: readonly BrowserWebMcpTool[];
}
/** Progress binds metadata to the original report without tool/schema arrays. */
export interface BrowserWebMcpSnapshot extends BrowserWebMcpMetadata {
    readonly reference: ReverseBrowserReference;
}
/** The host supplies the admitted origins; agents select only an observation duration. */
export interface BrowserWebMcpOptions {
    readonly observationMs: number;
    readonly allowedOrigins: readonly string[];
}
