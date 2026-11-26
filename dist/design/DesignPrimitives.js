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
};
/** Free positioning and responsive container layouts. */
export const DesignFlow = {
    Absolute: 'absolute',
    Row: 'row',
    Column: 'column',
    Grid: 'grid',
};
/** Sizing relative to the parent and content. */
export const DesignSizing = { Fixed: 'fixed', Fill: 'fill', Hug: 'hug' };
/** Alignment within the available layout space. */
export const DesignAlign = {
    Start: 'start',
    Center: 'center',
    End: 'end',
    Between: 'between',
    Stretch: 'stretch',
};
/** Absolute children retain a chosen relation to a resized parent. */
export const DesignConstraint = {
    Start: 'start',
    Center: 'center',
    End: 'end',
    Stretch: 'stretch',
    Scale: 'scale',
};
/** Supported paint sources. Image assets use workspace references. */
export const DesignPaintKind = {
    Solid: 'solid',
    Linear: 'linear',
    Radial: 'radial',
    Angular: 'angular',
    Diamond: 'diamond',
    Image: 'image',
    Pattern: 'pattern',
};
/** Path verbs use explicit coordinates; cubic curves are preserved as editable geometry. */
export const DesignPathVerb = {
    Move: 'M',
    Line: 'L',
    Quadratic: 'Q',
    Cubic: 'C',
    Close: 'Z',
};
/** Image scaling mode. */
export const DesignImageFit = {
    Cover: 'cover',
    Contain: 'contain',
    Stretch: 'stretch',
    Tile: 'tile',
};
/** Token families. */
export const DesignTokenCategory = {
    Color: 'color',
    Spacing: 'spacing',
    Typography: 'typography',
};
/** Prototype triggers. */
export const DesignTrigger = { Click: 'click', Hover: 'hover', After: 'after' };
/** Prototype actions. */
export const DesignAction = { Navigate: 'navigate', Overlay: 'overlay', Back: 'back' };
/** Prototype transitions. */
export const DesignTransition = {
    Instant: 'instant',
    Dissolve: 'dissolve',
    Slide: 'slide',
};
/** Saved construction overlays stay separate from automatic child placement. */
export const DesignFrameGridKind = { Square: 'square', Columns: 'columns', Rows: 'rows' };
/** Stretch divides available space; fixed tracks retain their authored size. */
export const DesignFrameGridDistribution = {
    Stretch: 'stretch',
    Start: 'start',
    Center: 'center',
    End: 'end',
};
/** A saved ruler line uses a page-world coordinate on one canvas axis. */
export const DesignRulerAxis = { X: 'x', Y: 'y' };
/** Boolean groups retain their source layers and derive one shared vector silhouette. */
export const DesignBooleanMode = {
    Union: 'union',
    Subtract: 'subtract',
    Intersect: 'intersect',
    Exclude: 'exclude',
};
