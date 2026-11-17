/** One canonical raw-upload header used for framing and working-memory negotiation. */
export declare class BinaryUploadHeader {
    /** Validates upload metadata before it can control framing or allocation. */
    static encode(requestId: string, uploadId: string, offset: string, length: number): Uint8Array<ArrayBuffer>;
}
