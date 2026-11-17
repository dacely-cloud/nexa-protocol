/** Native data visualization families. Rich visual explanations use render_visual. */
export declare const GraphicKind: {
    readonly Line: 'line';
    readonly Area: 'area';
    readonly Bar: 'bar';
    readonly StackedBar: 'stacked-bar';
    readonly Scatter: 'scatter';
    readonly Pie: 'pie';
    readonly Donut: 'donut';
    readonly Radar: 'radar';
    readonly Heatmap: 'heatmap';
    readonly Treemap: 'treemap';
    readonly Funnel: 'funnel';
    readonly Metric: 'metric';
};
/** Supported visualization family. */
export type GraphicKind = (typeof GraphicKind)[keyof typeof GraphicKind];
/** Curated palettes and surface treatments, with Nerva's homepage as the default. */
export declare const GraphicStyle: {
    readonly Studio: 'studio';
    readonly Midnight: 'midnight';
    readonly Blueprint: 'blueprint';
    readonly Aurora: 'aurora';
    readonly Minimal: 'minimal';
};
/** Supported visual treatment. */
export type GraphicStyle = (typeof GraphicStyle)[keyof typeof GraphicStyle];
/** One bounded measurement. x is required only for a scatter plot. */
export interface GraphicMeasurement {
    readonly label: string;
    readonly value: number;
    readonly x?: number;
}
/** Immutable JSON measurement, with an optional continuous scatter coordinate. */
export type GraphicPoint = Readonly<GraphicMeasurement>;
/** A named series of measurements. */
export interface GraphicSeries extends Readonly<Record<string, string | readonly GraphicPoint[]>> {
    readonly name: string;
    readonly points: readonly GraphicPoint[];
}
/** An inert, versioned visual specification. Text never becomes markup or code. */
export interface Graphic extends Readonly<Record<string, string | number | readonly GraphicSeries[]>> {
    readonly version: 1;
    readonly id: string;
    readonly title: string;
    readonly description: string;
    readonly kind: GraphicKind;
    readonly style: GraphicStyle;
    readonly xLabel: string;
    readonly yLabel: string;
    readonly unit: string;
    readonly source: string;
    readonly series: readonly GraphicSeries[];
}
/** Shared browser-safe validation before native delivery, wire acceptance and history rendering. */
export declare class Graphics {
    #private;
    /** Copy validated fields into an immutable specification with bounded aggregate work. */
    static parse(raw: unknown): Graphic;
    /** A predicate for network validators that must reject rather than throw. */
    static isValid(raw: unknown): raw is Graphic;
}
