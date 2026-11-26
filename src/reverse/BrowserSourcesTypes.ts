// SPDX-FileCopyrightText: 2026 Dacely <business@dacely.com>
// SPDX-License-Identifier: LicenseRef-Proprietary

/** Source coverage is separate from script inventory and resource presence. */
export const BrowserScriptSourceState = {
    Captured: 'captured',
    NotSelected: 'not-selected',
    NonJavaScript: 'non-javascript',
    Budget: 'budget-exhausted',
} as const;

/** Reasons for having or omitting Debugger source text. */
export type BrowserScriptSourceState =
    (typeof BrowserScriptSourceState)[keyof typeof BrowserScriptSourceState];

/** A source-map declaration is retained independently of fetched or decoded map coverage. */
export interface BrowserScriptSourceMap {
    readonly url: string | null;
    readonly inline: boolean;
    readonly declarationSha256: string;
    readonly declarationLength: string;
}

/** One resource listed by Page, without headers, cookies or response content. */
export interface BrowserSourceResource {
    readonly id: string;
    readonly frameId: string;
    readonly url: string;
    readonly type: string;
    readonly mimeType: string;
    readonly contentSize: string | null;
    readonly failed: boolean;
    readonly canceled: boolean;
}

/** Captured source identity describes UTF-8 encoded Debugger text, never transfer bytes. */
export interface BrowserScriptSource {
    readonly state: BrowserScriptSourceState;
    readonly sha256: string | null;
    readonly bytes: string | null;
    readonly text: string | null;
}

/** Stable capture-local identity excludes transient CDP script IDs and records native locations. */
export interface BrowserSourceScript {
    readonly id: string;
    readonly frameId: string;
    readonly url: string;
    readonly cdpHash: string | null;
    readonly length: string | null;
    readonly language: string;
    readonly isModule: boolean;
    readonly hasSourceUrl: boolean;
    readonly startLine: number;
    readonly startColumn: number;
    readonly endLine: number;
    readonly endColumn: number;
    readonly sourceMap: BrowserScriptSourceMap | null;
    readonly sourceMapOmitted: boolean;
    readonly resourceIds: readonly string[];
    readonly source: BrowserScriptSource;
}

/** Coverage counters describe observations, including repeats rejected before identity retention. */
export interface BrowserSourcesCoverage {
    readonly excludedScriptObservations: string;
    readonly omittedScriptObservations: string;
    readonly excludedResources: string;
    readonly excludedFrames: boolean;
    readonly capturedSources: string;
    readonly sourceBytes: string;
    readonly partial: boolean;
}

/** Immutable passive script/resource capture; public progress must project out source bodies. */
export interface BrowserSourcesCapture {
    readonly provider: 'cdp-passive';
    readonly targetId: string;
    readonly frameId: string;
    readonly url: string;
    readonly origin: string;
    readonly capturedAt: string;
    readonly priorActivityAvailable: false;
    readonly includeSources: boolean;
    readonly coverage: BrowserSourcesCoverage;
    readonly scripts: readonly BrowserSourceScript[];
    readonly resources: readonly BrowserSourceResource[];
    readonly limitations: readonly string[];
}
