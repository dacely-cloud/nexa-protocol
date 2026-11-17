/** Editable scene primitives, including reusable component definitions and instances. */
export declare const DesignKind: {
    readonly Frame: 'frame';
    readonly Group: 'group';
    readonly Boolean: 'boolean';
    readonly Mask: 'mask';
    readonly Rectangle: 'rectangle';
    readonly Ellipse: 'ellipse';
    readonly Line: 'line';
    readonly Polygon: 'polygon';
    readonly Path: 'path';
    readonly Text: 'text';
    readonly Image: 'image';
    readonly Component: 'component';
    readonly ComponentSet: 'component-set';
    readonly Instance: 'instance';
};
/** Primitive identity. */
export type DesignKind = (typeof DesignKind)[keyof typeof DesignKind];
/** Free positioning and responsive container layouts. */
export declare const DesignFlow: {
    readonly Absolute: 'absolute';
    readonly Row: 'row';
    readonly Column: 'column';
    readonly Grid: 'grid';
};
/** Layout direction. */
export type DesignFlow = (typeof DesignFlow)[keyof typeof DesignFlow];
/** Sizing relative to the parent and content. */
export declare const DesignSizing: {
    readonly Fixed: 'fixed';
    readonly Fill: 'fill';
    readonly Hug: 'hug';
};
/** Sizing choice. */
export type DesignSizing = (typeof DesignSizing)[keyof typeof DesignSizing];
/** Alignment within the available layout space. */
export declare const DesignAlign: {
    readonly Start: 'start';
    readonly Center: 'center';
    readonly End: 'end';
    readonly Between: 'between';
    readonly Stretch: 'stretch';
};
/** Alignment choice. */
export type DesignAlign = (typeof DesignAlign)[keyof typeof DesignAlign];
/** Absolute children retain a chosen relation to a resized parent. */
export declare const DesignConstraint: {
    readonly Start: 'start';
    readonly Center: 'center';
    readonly End: 'end';
    readonly Stretch: 'stretch';
    readonly Scale: 'scale';
};
/** Constraint choice. */
export type DesignConstraint = (typeof DesignConstraint)[keyof typeof DesignConstraint];
/** Supported paint sources. Image assets use workspace references. */
export declare const DesignPaintKind: {
    readonly Solid: 'solid';
    readonly Linear: 'linear';
    readonly Radial: 'radial';
    readonly Angular: 'angular';
    readonly Diamond: 'diamond';
    readonly Image: 'image';
    readonly Pattern: 'pattern';
};
/** Paint kind. */
export type DesignPaintKind = (typeof DesignPaintKind)[keyof typeof DesignPaintKind];
/** The four editable gradient families share stops and normalized handles. */
export type DesignGradientKind = Exclude<DesignPaintKind, typeof DesignPaintKind.Solid | typeof DesignPaintKind.Image | typeof DesignPaintKind.Pattern>;
/** Path verbs use explicit coordinates; cubic curves are preserved as editable geometry. */
export declare const DesignPathVerb: {
    readonly Move: 'M';
    readonly Line: 'L';
    readonly Quadratic: 'Q';
    readonly Cubic: 'C';
    readonly Close: 'Z';
};
/** Vector path verb. */
export type DesignPathVerb = (typeof DesignPathVerb)[keyof typeof DesignPathVerb];
/** A vector instruction in layer-local coordinates. */
export interface DesignPathCommand {
    readonly verb: DesignPathVerb;
    readonly values: readonly number[];
}
/** Image scaling mode. */
export declare const DesignImageFit: {
    readonly Cover: 'cover';
    readonly Contain: 'contain';
    readonly Stretch: 'stretch';
    readonly Tile: 'tile';
};
/** Image scaling mode. */
export type DesignImageFit = (typeof DesignImageFit)[keyof typeof DesignImageFit];
/** Token families. */
export declare const DesignTokenCategory: {
    readonly Color: 'color';
    readonly Spacing: 'spacing';
    readonly Typography: 'typography';
};
/** Token family. */
export type DesignTokenCategory = (typeof DesignTokenCategory)[keyof typeof DesignTokenCategory];
/** Prototype triggers. */
export declare const DesignTrigger: {
    readonly Click: 'click';
    readonly Hover: 'hover';
    readonly After: 'after';
};
/** Prototype trigger. */
export type DesignTrigger = (typeof DesignTrigger)[keyof typeof DesignTrigger];
/** Prototype actions. */
export declare const DesignAction: {
    readonly Navigate: 'navigate';
    readonly Overlay: 'overlay';
    readonly Back: 'back';
};
/** Prototype action. */
export type DesignAction = (typeof DesignAction)[keyof typeof DesignAction];
/** Prototype transitions. */
export declare const DesignTransition: {
    readonly Instant: 'instant';
    readonly Dissolve: 'dissolve';
    readonly Slide: 'slide';
};
/** Prototype transition. */
export type DesignTransition = (typeof DesignTransition)[keyof typeof DesignTransition];
/** Saved construction overlays stay separate from automatic child placement. */
export declare const DesignFrameGridKind: {
    readonly Square: 'square';
    readonly Columns: 'columns';
    readonly Rows: 'rows';
};
/** Grid orientation for a frame's construction overlay. */
export type DesignFrameGridKind = (typeof DesignFrameGridKind)[keyof typeof DesignFrameGridKind];
/** Stretch divides available space; fixed tracks retain their authored size. */
export declare const DesignFrameGridDistribution: {
    readonly Stretch: 'stretch';
    readonly Start: 'start';
    readonly Center: 'center';
    readonly End: 'end';
};
/** Track distribution within the frame's margins. */
export type DesignFrameGridDistribution = (typeof DesignFrameGridDistribution)[keyof typeof DesignFrameGridDistribution];
/** A saved ruler line uses a page-world coordinate on one canvas axis. */
export declare const DesignRulerAxis: {
    readonly X: 'x';
    readonly Y: 'y';
};
/** Axis names are shared by native tooling, codecs and the canvas. */
export type DesignRulerAxis = (typeof DesignRulerAxis)[keyof typeof DesignRulerAxis];
/** Boolean groups retain their source layers and derive one shared vector silhouette. */
export declare const DesignBooleanMode: {
    readonly Union: 'union';
    readonly Subtract: 'subtract';
    readonly Intersect: 'intersect';
    readonly Exclude: 'exclude';
};
/** The group's ordered set operation. Subtract keeps the bottom source and removes the others. */
export type DesignBooleanMode = (typeof DesignBooleanMode)[keyof typeof DesignBooleanMode];
