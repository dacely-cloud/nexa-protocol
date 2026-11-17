import type { DesignOperation } from './DesignOperationTypes.js';
/** Selection commands share one implementation between agent tools and browser editors. */
export declare const DesignSelectionAction: {
    readonly Duplicate: 'duplicate';
    readonly Group: 'group';
    readonly AutoLayout: 'auto-layout';
    readonly Mask: 'mask';
    readonly ReleaseMask: 'release-mask';
    readonly Ungroup: 'ungroup';
    readonly Union: 'union';
    readonly Subtract: 'subtract';
    readonly Intersect: 'intersect';
    readonly Exclude: 'exclude';
    readonly Flatten: 'flatten';
    readonly Left: 'left';
    readonly Center: 'center';
    readonly Right: 'right';
    readonly Top: 'top';
    readonly Middle: 'middle';
    readonly Bottom: 'bottom';
    readonly DistributeHorizontal: 'distribute-horizontal';
    readonly DistributeVertical: 'distribute-vertical';
    readonly Front: 'front';
    readonly Back: 'back';
};
/** A command's stable action identity. */
export type DesignSelectionAction = (typeof DesignSelectionAction)[keyof typeof DesignSelectionAction];
/** One complete transaction and the resulting editable selection. */
export interface DesignSelectionPlan {
    readonly operations: readonly DesignOperation[];
    readonly selection: readonly string[];
}
/** Agents use the normal command identity and revision guard for generated selection edits. */
export interface DesignArrangeRequest {
    readonly id: string;
    readonly expectedRevision: string;
    readonly commandId: string;
    readonly pageId: string;
    readonly selection: readonly string[];
    readonly action: DesignSelectionAction;
}
/** A center-derived local transform preserves world geometry when changing containers. */
export interface DesignSelectionGeometry {
    readonly x: number;
    readonly y: number;
    readonly width: number;
    readonly height: number;
    readonly rotation: number;
}
/** Rotated layer bounds are measured along the containing coordinate axes. */
export interface DesignSelectionBounds {
    readonly left: number;
    readonly top: number;
    readonly right: number;
    readonly bottom: number;
}
/** A transformed origin stays stable while a content-sized frame changes dimensions. */
export interface DesignSelectionPoint {
    readonly x: number;
    readonly y: number;
}
