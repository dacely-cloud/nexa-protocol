/** Semantic surfaces keep generated explanations legible in both application themes. */
export declare const VisualTone: {
    readonly Neutral: 'neutral';
    readonly Orange: 'orange';
    readonly Blue: 'blue';
    readonly Green: 'green';
    readonly Purple: 'purple';
    readonly Red: 'red';
};
export type VisualTone = (typeof VisualTone)[keyof typeof VisualTone];
/** A scene mixes explanatory cards, background groups, typography and key figures. */
export declare const VisualElementKind: {
    readonly Card: 'card';
    readonly Group: 'group';
    readonly Text: 'text';
    readonly Metric: 'metric';
};
export type VisualElementKind = (typeof VisualElementKind)[keyof typeof VisualElementKind];
/** Icons are native interface symbols, never model-authored markup or remote images. */
export declare const VisualIcon: {
    readonly None: 'none';
    readonly User: 'user';
    readonly Server: 'server';
    readonly Database: 'database';
    readonly Cpu: 'cpu';
    readonly Cloud: 'cloud';
    readonly Shield: 'shield';
    readonly Code: 'code';
    readonly Layers: 'layers';
    readonly Spark: 'spark';
    readonly Check: 'check';
};
export type VisualIcon = (typeof VisualIcon)[keyof typeof VisualIcon];
export declare const VisualSide: {
    readonly Auto: 'auto';
    readonly Top: 'top';
    readonly Right: 'right';
    readonly Bottom: 'bottom';
    readonly Left: 'left';
};
export type VisualSide = (typeof VisualSide)[keyof typeof VisualSide];
export declare const VisualLine: {
    readonly Solid: 'solid';
    readonly Dashed: 'dashed';
};
export type VisualLine = (typeof VisualLine)[keyof typeof VisualLine];
export declare const VisualArrow: {
    readonly Forward: 'forward';
    readonly Both: 'both';
    readonly None: 'none';
};
export type VisualArrow = (typeof VisualArrow)[keyof typeof VisualArrow];
/** Scene coordinates are bounded display pixels, independent of viewport zoom. */
export interface VisualPoint extends Readonly<Record<string, number>> {
    readonly x: number;
    readonly y: number;
}
/** All copy is plain text; geometry and semantic style are the complete rendering instructions. */
export interface VisualElement extends Readonly<Record<string, string | number>> {
    readonly x: number;
    readonly y: number;
    readonly id: string;
    readonly kind: VisualElementKind;
    readonly title: string;
    readonly detail: string;
    readonly eyebrow: string;
    readonly value: string;
    readonly icon: VisualIcon;
    readonly tone: VisualTone;
    readonly width: number;
    readonly height: number;
}
/** Routes attach to card boundaries; optional waypoints describe intentional bends. */
export interface VisualConnection extends Readonly<Record<string, string | boolean | readonly VisualPoint[]>> {
    readonly id: string;
    readonly from: string;
    readonly to: string;
    readonly label: string;
    readonly fromSide: VisualSide;
    readonly toSide: VisualSide;
    readonly line: VisualLine;
    readonly arrow: VisualArrow;
    readonly animated: boolean;
    readonly via: readonly VisualPoint[];
}
/** Optional guided explanations highlight existing content without changing its meaning or geometry. */
export interface VisualStep extends Readonly<Record<string, string | readonly string[]>> {
    readonly title: string;
    readonly detail: string;
    readonly elements: readonly string[];
    readonly connections: readonly string[];
}
/** Versioned, inert UI instructions delivered and restored as part of an ordinary conversation. */
export interface VisualResponse extends Readonly<Record<string, string | number | readonly VisualElement[] | readonly VisualConnection[] | readonly VisualStep[]>> {
    readonly version: 1;
    readonly id: string;
    readonly title: string;
    readonly description: string;
    readonly width: number;
    readonly height: number;
    readonly elements: readonly VisualElement[];
    readonly connections: readonly VisualConnection[];
    readonly steps: readonly VisualStep[];
}
