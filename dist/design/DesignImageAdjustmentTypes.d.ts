/** Non-destructive photographic adjustments use normalized values from minus one to one. */
export interface DesignImageAdjustments {
    readonly exposure: number;
    readonly contrast: number;
    readonly saturation: number;
    readonly temperature: number;
    readonly tint: number;
    readonly highlights: number;
    readonly shadows: number;
}
/** Runtime field names are shared by strict patches and editor controls. */
export declare const DesignImageAdjustmentField: {
    readonly Exposure: 'exposure';
    readonly Contrast: 'contrast';
    readonly Saturation: 'saturation';
    readonly Temperature: 'temperature';
    readonly Tint: 'tint';
    readonly Highlights: 'highlights';
    readonly Shadows: 'shadows';
};
/** One normalized image adjustment. */
export type DesignImageAdjustmentField = (typeof DesignImageAdjustmentField)[keyof typeof DesignImageAdjustmentField];
/** Row-major SVG color matrix and a shared piecewise channel-tone curve. */
export interface DesignImageColorTransform {
    readonly matrix: readonly number[];
    readonly tones: readonly number[];
}
