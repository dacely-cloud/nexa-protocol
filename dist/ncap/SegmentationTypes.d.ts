/** One binary segmentation frame: its NCAP frame type and payload. */
export interface SegmentationFrame {
    readonly type: number;
    readonly payload: Uint8Array | readonly number[];
}
