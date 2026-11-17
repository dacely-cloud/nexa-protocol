/** Endpoint shapes match the centered SVG stroke model. */
export declare const DesignStrokeCap: {
    readonly Butt: 'butt';
    readonly Round: 'round';
    readonly Square: 'square';
};
/** Supported endpoint shape. */
export type DesignStrokeCap = (typeof DesignStrokeCap)[keyof typeof DesignStrokeCap];
/** Corners may retain a round sector, bevel or bounded miter. */
export declare const DesignStrokeJoin: {
    readonly Miter: 'miter';
    readonly Round: 'round';
    readonly Bevel: 'bevel';
};
/** Supported corner shape. */
export type DesignStrokeJoin = (typeof DesignStrokeJoin)[keyof typeof DesignStrokeJoin];
