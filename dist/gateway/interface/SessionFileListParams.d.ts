/** Indexed metadata paging inside one owned conversation. */
export interface SessionFileListParams {
    readonly id: string;
    /** @maxLength 73 */
    readonly cursor?: string;
    /**
     * @minimum 1
     * @maximum 128
     */
    readonly limit?: number;
}
