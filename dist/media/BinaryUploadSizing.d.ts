/** Sizes disk-upload slices against the gateway's complete request working-storage policy. */
export declare class BinaryUploadSizing {
    /** Covers numeric request IDs, offsets, reassembly, callback input and native geometric capacity. */
    static chunkBytes(uploadId: string, budget: number | undefined): number;
}
