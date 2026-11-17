// SPDX-FileCopyrightText: 2026 Nexa contributors
// SPDX-License-Identifier: LicenseRef-Proprietary

/** A color occurs once per selected authored layer, including editable descendants. */
export interface DesignSelectionColor {
    readonly color: string;
    readonly layers: number;
}
