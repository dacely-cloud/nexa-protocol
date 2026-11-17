/** Only a source boundary inside a glyph cluster clips its ink; exterior overhang stays visible. */
export interface DesignFontPaintClip {
    readonly left: number | null;
    readonly right: number | null;
}
