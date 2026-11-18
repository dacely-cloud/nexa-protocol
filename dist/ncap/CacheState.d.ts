/** Actual server cache state; a renewal never creates inference or resurrects missing KV. */
export interface NcapCacheState {
    readonly agentId: number;
    readonly conversationId: string;
    readonly cacheId: string;
    readonly state: number;
    readonly ttlMs: number;
    readonly residentTokens: number;
    readonly createdTokens: number;
}
