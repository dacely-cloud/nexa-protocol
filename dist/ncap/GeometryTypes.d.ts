/** Supported serialized 3D asset formats; radiance fields remain unspecified. */
export type GeometryFormat = 'glb' | 'gaussian_ply';
/** Exact events carried by geometry-generation-1. */
export type GeometryEvent = {
    readonly phase: 'accepted';
    readonly model: string;
    readonly seed: number;
} | {
    readonly phase: 'progress';
    readonly stage: number;
    readonly completed: number;
    readonly total: number;
} | {
    readonly phase: 'preview' | 'chunk';
    readonly assetId: number;
    readonly revision: number;
    readonly format: GeometryFormat;
    readonly offset: number;
    readonly totalBytes: number;
    readonly data: Uint8Array | readonly number[];
} | {
    readonly phase: 'end';
    readonly assetId: number;
    readonly totalBytes: number;
};
