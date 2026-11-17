// SPDX-FileCopyrightText: 2026 Nexa contributors
// SPDX-License-Identifier: LicenseRef-Proprietary

/**
 * A null inner radius produces a regular polygon; a ratio produces an alternating-radius star.
 * @additionalProperties false
 */
export interface DesignPolygonSettings {
    /**
     * Number of outer vertices.
     * @type integer
     * @minimum 3
     * @maximum 64
     */
    readonly points: number;
    /**
     * Inner radius relative to the outer circle, before fitting the authored box.
     * @minimum 0.01
     * @maximum 1
     */
    readonly innerRadius: number | null;
}
