// SPDX-License-Identifier: LicenseRef-Proprietary

/** Font units measured by the same fontdue font used for native GUI drawing. */
export interface RobloxTextMetrics {
    /** Original bundled font identity; absent for older scenes or a host-configured override. */
    readonly fontUri?: string;
    readonly format: 'nexa.roblox.text-metrics';
    readonly version: 1;
    readonly unitsPerEm: number;
    readonly ascent: number;
    readonly lineHeight: number;
    readonly advances: Readonly<Record<string, number>>;
    readonly kerning: Readonly<Record<string, number>>;
}

/** Bounded request for the actual glyphs and adjacent pairs used by a scene. */
export interface RobloxTextMetricRequest {
    readonly characters: string;
    readonly pairs: readonly string[];
}

/** Intrinsic text bounds before GUI alignment, transforms and clipping. */
export interface RobloxTextBounds {
    readonly width: number;
    readonly height: number;
    readonly lines: number;
}
