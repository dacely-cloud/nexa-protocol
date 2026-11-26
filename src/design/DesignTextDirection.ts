// SPDX-FileCopyrightText: 2026 Dacely <business@dacely.com>
// SPDX-License-Identifier: LicenseRef-Proprietary

/** Base paragraph direction is independent of physical left/center/right alignment. */
export const DesignTextDirection = { Auto: 'auto', Ltr: 'ltr', Rtl: 'rtl' } as const;
export type DesignTextDirection = (typeof DesignTextDirection)[keyof typeof DesignTextDirection];
/** Individual visual runs always have a concrete shaping direction. */
export type DesignResolvedTextDirection = Exclude<
    DesignTextDirection,
    typeof DesignTextDirection.Auto
>;
