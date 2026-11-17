/** Standard layer blending applies to a layer and its composited descendants. */
export declare const DesignBlendMode: {
    readonly Normal: 'normal';
    readonly Multiply: 'multiply';
    readonly Screen: 'screen';
    readonly Overlay: 'overlay';
    readonly Darken: 'darken';
    readonly Lighten: 'lighten';
    readonly ColorDodge: 'color-dodge';
    readonly ColorBurn: 'color-burn';
    readonly HardLight: 'hard-light';
    readonly SoftLight: 'soft-light';
    readonly Difference: 'difference';
    readonly Exclusion: 'exclusion';
    readonly Hue: 'hue';
    readonly Saturation: 'saturation';
    readonly Color: 'color';
    readonly Luminosity: 'luminosity';
};
/** A validated native layer blend mode. */
export type DesignBlendMode = (typeof DesignBlendMode)[keyof typeof DesignBlendMode];
/** An isolated group starts its children against a transparent internal backdrop. */
export declare const DesignIsolation: {
    readonly Auto: 'auto';
    readonly Isolate: 'isolate';
};
/** Automatic grouping retains existing opacity, masking and effect isolation rules. */
export type DesignIsolation = (typeof DesignIsolation)[keyof typeof DesignIsolation];
/** Optional authored compositing preserves legacy documents with neither property. */
export interface DesignBlendStyle {
    readonly blendMode?: DesignBlendMode;
    readonly isolation?: DesignIsolation;
}
