/**
 * Ellipse-relative angles and radius preserve editable arcs, sectors and rings.
 * @additionalProperties false
 */
export interface DesignArcSettings {
    /**
     * Start angle in clockwise degrees from the right-hand ellipse axis.
     * @minimum -360
     * @maximum 360
     */
    readonly start: number;
    /**
     * Signed clockwise sweep; zero produces no painted curve.
     * @minimum -360
     * @maximum 360
     */
    readonly sweep: number;
    /**
     * Inner ellipse radius relative to the outer ellipse.
     * @minimum 0
     * @maximum 0.999
     */
    readonly innerRadius: number;
    /** Closed partial curves join the center or the inner arc; open curves retain ordinary SVG paint semantics. */
    readonly closed: boolean;
}
