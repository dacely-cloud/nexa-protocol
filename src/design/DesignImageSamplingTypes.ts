// SPDX-FileCopyrightText: 2026 Nexa contributors
// SPDX-License-Identifier: LicenseRef-Proprietary

/** Source viewport anchors retain SVG image cropping before texture interpolation. */
export const DesignImageSamplingAlign = { Start: 'start', Center: 'center', End: 'end' } as const;
/** One supported source crop anchor. */
export type DesignImageSamplingAlign =
    (typeof DesignImageSamplingAlign)[keyof typeof DesignImageSamplingAlign];
/** Aspect and anchors describe a source rectangle without creating a cropped bitmap or another asset. */
export interface DesignImageSampling {
    readonly aspect: number;
    readonly alignX: DesignImageSamplingAlign;
    readonly alignY: DesignImageSamplingAlign;
}
/** Intrinsic source pixel coordinates remain independent of image placement on the artboard. */
export interface DesignImageSampleRectangle {
    readonly x: number;
    readonly y: number;
    readonly width: number;
    readonly height: number;
}
