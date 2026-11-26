// SPDX-FileCopyrightText: 2026 Dacely <business@dacely.com>
// SPDX-License-Identifier: LicenseRef-Proprietary

/** Editable scene primitives, including reusable component definitions and instances. */
export const DesignKind = {
    Frame: 'frame',
    Group: 'group',
    Boolean: 'boolean',
    Mask: 'mask',
    Rectangle: 'rectangle',
    Ellipse: 'ellipse',
    Line: 'line',
    Polygon: 'polygon',
    Path: 'path',
    Text: 'text',
    Image: 'image',
    Component: 'component',
    ComponentSet: 'component-set',
    Instance: 'instance',
} as const;

/** Primitive identity. */
export type DesignKind = (typeof DesignKind)[keyof typeof DesignKind];

/** Free positioning and responsive container layouts. */
export const DesignFlow = {
    Absolute: 'absolute',
    Row: 'row',
    Column: 'column',
    Grid: 'grid',
} as const;

/** Layout direction. */
export type DesignFlow = (typeof DesignFlow)[keyof typeof DesignFlow];

/** Sizing relative to the parent and content. */
export const DesignSizing = { Fixed: 'fixed', Fill: 'fill', Hug: 'hug' } as const;

/** Sizing choice. */
export type DesignSizing = (typeof DesignSizing)[keyof typeof DesignSizing];

/** Alignment within the available layout space. */
export const DesignAlign = {
    Start: 'start',
    Center: 'center',
    End: 'end',
    Between: 'between',
    Stretch: 'stretch',
} as const;

/** Alignment choice. */
export type DesignAlign = (typeof DesignAlign)[keyof typeof DesignAlign];

/** Absolute children retain a chosen relation to a resized parent. */
export const DesignConstraint = {
    Start: 'start',
    Center: 'center',
    End: 'end',
    Stretch: 'stretch',
    Scale: 'scale',
} as const;

/** Constraint choice. */
export type DesignConstraint = (typeof DesignConstraint)[keyof typeof DesignConstraint];

/** Supported paint sources. Image assets use workspace references. */
export const DesignPaintKind = {
    Solid: 'solid',
    Linear: 'linear',
    Radial: 'radial',
    Angular: 'angular',
    Diamond: 'diamond',
    Image: 'image',
    Pattern: 'pattern',
} as const;

/** Paint kind. */
export type DesignPaintKind = (typeof DesignPaintKind)[keyof typeof DesignPaintKind];

/** The four editable gradient families share stops and normalized handles. */
export type DesignGradientKind = Exclude<
    DesignPaintKind,
    typeof DesignPaintKind.Solid | typeof DesignPaintKind.Image | typeof DesignPaintKind.Pattern
>;

/** Path verbs use explicit coordinates; cubic curves are preserved as editable geometry. */
export const DesignPathVerb = {
    Move: 'M',
    Line: 'L',
    Quadratic: 'Q',
    Cubic: 'C',
    Close: 'Z',
} as const;

/** Vector path verb. */
export type DesignPathVerb = (typeof DesignPathVerb)[keyof typeof DesignPathVerb];

/** A vector instruction in layer-local coordinates. */
export interface DesignPathCommand {
    readonly verb: DesignPathVerb;
    readonly values: readonly number[];
}

/** Image scaling mode. */
export const DesignImageFit = {
    Cover: 'cover',
    Contain: 'contain',
    Stretch: 'stretch',
    Tile: 'tile',
} as const;

/** Image scaling mode. */
export type DesignImageFit = (typeof DesignImageFit)[keyof typeof DesignImageFit];

/** Token families. */
export const DesignTokenCategory = {
    Color: 'color',
    Spacing: 'spacing',
    Typography: 'typography',
} as const;

/** Token family. */
export type DesignTokenCategory = (typeof DesignTokenCategory)[keyof typeof DesignTokenCategory];

/** Prototype triggers. */
export const DesignTrigger = { Click: 'click', Hover: 'hover', After: 'after' } as const;

/** Prototype trigger. */
export type DesignTrigger = (typeof DesignTrigger)[keyof typeof DesignTrigger];

/** Prototype actions. */
export const DesignAction = { Navigate: 'navigate', Overlay: 'overlay', Back: 'back' } as const;

/** Prototype action. */
export type DesignAction = (typeof DesignAction)[keyof typeof DesignAction];

/** Prototype transitions. */
export const DesignTransition = {
    Instant: 'instant',
    Dissolve: 'dissolve',
    Slide: 'slide',
} as const;

/** Prototype transition. */
export type DesignTransition = (typeof DesignTransition)[keyof typeof DesignTransition];

/** Saved construction overlays stay separate from automatic child placement. */
export const DesignFrameGridKind = { Square: 'square', Columns: 'columns', Rows: 'rows' } as const;

/** Grid orientation for a frame's construction overlay. */
export type DesignFrameGridKind = (typeof DesignFrameGridKind)[keyof typeof DesignFrameGridKind];

/** Stretch divides available space; fixed tracks retain their authored size. */
export const DesignFrameGridDistribution = {
    Stretch: 'stretch',
    Start: 'start',
    Center: 'center',
    End: 'end',
} as const;

/** Track distribution within the frame's margins. */
export type DesignFrameGridDistribution =
    (typeof DesignFrameGridDistribution)[keyof typeof DesignFrameGridDistribution];

/** A saved ruler line uses a page-world coordinate on one canvas axis. */
export const DesignRulerAxis = { X: 'x', Y: 'y' } as const;

/** Axis names are shared by native tooling, codecs and the canvas. */
export type DesignRulerAxis = (typeof DesignRulerAxis)[keyof typeof DesignRulerAxis];

/** Boolean groups retain their source layers and derive one shared vector silhouette. */
export const DesignBooleanMode = {
    Union: 'union',
    Subtract: 'subtract',
    Intersect: 'intersect',
    Exclude: 'exclude',
} as const;

/** The group's ordered set operation. Subtract keeps the bottom source and removes the others. */
export type DesignBooleanMode = (typeof DesignBooleanMode)[keyof typeof DesignBooleanMode];
