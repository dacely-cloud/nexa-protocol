// SPDX-FileCopyrightText: 2026 Dacely <business@dacely.com>
// SPDX-License-Identifier: LicenseRef-Proprietary

/** Keyboard repetition reuses a held input; pointer gestures have no Repeat phase. */
export const RobloxKeyboardPhase = {
    Press: 'Press',
    Release: 'Release',
    Cancel: 'Cancel',
    Repeat: 'Repeat',
} as const;
/** Allowed phases for native held-key commands. */
export type RobloxKeyboardPhase = (typeof RobloxKeyboardPhase)[keyof typeof RobloxKeyboardPhase];

/** A physical key remains held until its matching release or cancellation. */
export interface RobloxKeyboardGesture {
    readonly phase: RobloxKeyboardPhase;
    readonly key: string;
}
