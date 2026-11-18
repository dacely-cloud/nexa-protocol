// SPDX-FileCopyrightText: 2026 Nexa contributors
// SPDX-License-Identifier: LicenseRef-Proprietary

/** Browser connection owns the handle; the conversation is authorized independently on every request. */
export interface LuauEditorHandle {
    readonly id: string;
    readonly handle: string;
}

/** A bounded source chunk stages an immutable revision without checking an incomplete upload. */
export interface LuauEditorSourcePart extends LuauEditorHandle {
    readonly revision: number;
    readonly name: string;
    readonly offset: number;
    readonly source: string;
    readonly complete: boolean;
}

/** The complete selected source set is committed to the native frontend in one check. */
export interface LuauEditorCommit extends LuauEditorHandle {
    readonly revision: number;
    readonly paths: readonly string[];
    readonly definitions: readonly string[];
}

/** Queries refer to exactly the displayed committed revision and use zero-based UTF-16 positions. */
export interface LuauEditorQuery extends LuauEditorHandle {
    readonly revision: number;
    readonly name: string;
    readonly line: number;
    readonly character: number;
}

/** Small staging/close acknowledgments do not imply successful type coverage. */
export interface LuauEditorAck {
    readonly handle: string;
    readonly revision: number;
}

/** Actual native diagnostic classifications. */
export const LuauEditorSeverity = { Error: 'error', Warning: 'warning' } as const;

/** Classification shared by generated contracts and source-only native reports. */
export type LuauEditorSeverity = (typeof LuauEditorSeverity)[keyof typeof LuauEditorSeverity];

/** Native diagnostic positions retain their documented zero-based UTF-8 byte columns. */
export interface LuauEditorDiagnostic {
    readonly file: string;
    readonly code: string;
    readonly message: string;
    readonly severity: LuauEditorSeverity;
    readonly startLine: number;
    readonly startColumn: number;
    readonly endLine: number;
    readonly endColumn: number;
}

/** Complete project diagnostics belong to one committed source revision. */
export interface LuauEditorReport extends LuauEditorAck {
    readonly ok: boolean;
    readonly typecheckComplete: boolean;
    readonly checked: number;
    readonly rechecked: number;
    readonly unchecked: readonly string[];
    readonly timeouts: readonly string[];
    readonly diagnostics: readonly LuauEditorDiagnostic[];
    readonly lines: string;
    readonly elapsedUs: string;
    readonly error: string | null;
}

/** Hover preserves native Markdown as text; clients must not inject it as HTML. */
export interface LuauEditorHover extends LuauEditorAck {
    readonly text: string | null;
}

/** One actual upstream completion entry. */
export interface LuauEditorCompletionItem {
    readonly label: string;
    readonly detail: string | null;
    readonly deprecated: boolean;
}

/** Completion entries are bounded by the native analyzer's 2048-item limit. */
export interface LuauEditorCompletion extends LuauEditorAck {
    readonly items: readonly LuauEditorCompletionItem[];
    readonly isIncomplete: boolean;
}

/** Definition targets remain relative to the supplied source project, with UTF-16 coordinates. */
export interface LuauEditorLocation {
    readonly name: string;
    readonly startLine: number;
    readonly startCharacter: number;
    readonly endLine: number;
    readonly endCharacter: number;
}

/** An unresolved definition returns null rather than an invented source location. */
export interface LuauEditorDefinition extends LuauEditorAck {
    readonly location: LuauEditorLocation | null;
}
