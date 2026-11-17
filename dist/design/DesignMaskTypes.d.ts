/** How a retained source layer controls the visibility of its sibling artwork. */
export declare const DesignMaskMode: {
    readonly Alpha: 'alpha';
    readonly Vector: 'vector';
    readonly Luminance: 'luminance';
};
/** Stable mask rendering mode shared by tooling and the editor. */
export type DesignMaskMode = (typeof DesignMaskMode)[keyof typeof DesignMaskMode];
/** The source is an immediate child, referenced by identity rather than painter order. */
export interface DesignMask {
    readonly mode: DesignMaskMode;
    readonly sourceId: string | null;
}
