// SPDX-FileCopyrightText: 2026 Dacely <business@dacely.com>
// SPDX-License-Identifier: LicenseRef-Proprietary

/** Host editing operations act on the current native focus without accepting target ids. */
export const RobloxTextEditKind = {
    Insert: 'Insert',
    Selection: 'Selection',
    Key: 'Key',
} as const;
/** Supported logical editing keys; complete physical keyboard routing is separate. */
export const RobloxTextEditKey = {
    Left: 'Left',
    Right: 'Right',
    Home: 'Home',
    End: 'End',
    Backspace: 'Backspace',
    Delete: 'Delete',
    Return: 'Return',
    Escape: 'Escape',
} as const;
/** Known editing-key values. */
export type RobloxTextEditKey = (typeof RobloxTextEditKey)[keyof typeof RobloxTextEditKey];
/** Inserted Unicode text replaces the native selection or inserts at its cursor. */
export interface RobloxTextInsertion {
    readonly kind: typeof RobloxTextEditKind.Insert;
    readonly text: string;
}
/** Selection positions are one-based UTF-8 bytes; -1 removes the anchor. */
export interface RobloxTextSelection {
    readonly kind: typeof RobloxTextEditKind.Selection;
    readonly cursor: number;
    readonly selectionStart: number;
}
/** A complete logical key gesture emits native Begin/End with one real InputObject. */
export interface RobloxTextKeyGesture {
    readonly kind: typeof RobloxTextEditKind.Key;
    readonly key: RobloxTextEditKey;
    readonly shift?: boolean;
}
/** The same edit contract is consumed by tools, native processes and the gateway. */
export type RobloxTextEditRequest =
    RobloxTextInsertion | RobloxTextSelection | RobloxTextKeyGesture;
