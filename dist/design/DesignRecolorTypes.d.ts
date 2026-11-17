/** A color occurs once per selected authored layer, including editable descendants. */
export interface DesignSelectionColor {
    readonly color: string;
    readonly layers: number;
}
