// SPDX-License-Identifier: LicenseRef-Proprietary

/** Native wheel rotation and host-adapted pixel travel are independent values. */
export interface RobloxWheelGesture {
    readonly x: number;
    readonly y: number;
    readonly rotation: number;
    readonly deltaX: number;
    readonly deltaY: number;
}
