// SPDX-FileCopyrightText: 2026 Nexa contributors
// SPDX-License-Identifier: LicenseRef-Proprietary
/** Selection commands share one implementation between agent tools and browser editors. */
export const DesignSelectionAction = {
    Duplicate: 'duplicate',
    Group: 'group',
    AutoLayout: 'auto-layout',
    Mask: 'mask',
    ReleaseMask: 'release-mask',
    Ungroup: 'ungroup',
    Union: 'union',
    Subtract: 'subtract',
    Intersect: 'intersect',
    Exclude: 'exclude',
    Flatten: 'flatten',
    Left: 'left',
    Center: 'center',
    Right: 'right',
    Top: 'top',
    Middle: 'middle',
    Bottom: 'bottom',
    DistributeHorizontal: 'distribute-horizontal',
    DistributeVertical: 'distribute-vertical',
    Front: 'front',
    Back: 'back',
};
