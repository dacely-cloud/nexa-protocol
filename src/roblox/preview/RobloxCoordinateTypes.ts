// SPDX-FileCopyrightText: 2026 Dacely <business@dacely.com>
// SPDX-License-Identifier: LicenseRef-Proprietary

import { RobloxInputDevice } from './RobloxSceneTypes.js';
import type { RobloxPointerPhase } from './RobloxSceneTypes.js';

/** Coordinate routing accepts physical mouse or touch gestures. */
export const RobloxCoordinateDevice = {
    Mouse: RobloxInputDevice.Mouse,
    Touch: RobloxInputDevice.Touch,
} as const;

/** Named device values for server-owned coordinate commands. */
export type RobloxCoordinateDevice =
    (typeof RobloxCoordinateDevice)[keyof typeof RobloxCoordinateDevice];

/** One physical gesture chooses its target from the current native live root. */
export interface RobloxCoordinateGesture {
    readonly phase: RobloxPointerPhase;
    readonly id: number;
    readonly x: number;
    readonly y: number;
    readonly device?: RobloxCoordinateDevice;
    readonly clickCount?: number;
}
