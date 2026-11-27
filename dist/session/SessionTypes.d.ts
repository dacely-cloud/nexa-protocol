import type { TokenUsage } from '../providers/Types.js';
/**
 * A stored conversation as the gateway lists and reads it.
 *
 * @remarks
 * Nexa reads and writes the same fields through its stored session record; that record's derived type is assignable
 * to this one, so a field the store adds without adding it here fails Nexa's build.
 */
export interface Session {
    readonly id: string;
    /** Which agent ran the turns. */
    readonly agentId: string;
    readonly title: string | null;
    /** A user title remains stable when an automatic title job finishes later. */
    readonly titleEdited?: boolean;
    /** The original owned conversation whose saved prompt was edited or regenerated. */
    readonly retrySourceId?: string;
    /** Stable caller request identity makes an edit or regeneration safe to retry. */
    readonly retryRequestId?: string;
    /** A prepared edit/regeneration is claimed once before starting model or tool work. */
    readonly retryState?: string;
    readonly retryFingerprint?: string;
    /**
     * The first conversation of a set of versions. Every edit or regeneration of any version shares
     * it, so the versions are presented as one conversation whose prompts branch.
     */
    readonly versionRootId?: string;
    /** The source version's saved prompt this version replaces, by its journal record identity. */
    readonly versionBranchInputId?: string;
    /** The stream identity of that saved prompt, when the prompt has one. */
    readonly versionBranchStreamId?: string;
    /**
     * Saved prompts before the replaced one. Versions copy everything before it, so the count is the
     * same in every version that shares those prompts.
     */
    readonly versionBranchIndex?: number;
    readonly createdAt: number;
    readonly updatedAt: number;
    /** The provider-owned conversation id, when the provider holds history itself. */
    readonly conversationId: string | null;
    /** Tool discovery survives transcript compaction without copying schemas into messages. */
    readonly activeToolFamilies?: readonly string[];
    readonly projectId?: string;
    /** Delegated transcripts belong to this coordination conversation, never the chat picker. */
    readonly parentSessionId?: string;
    readonly userId?: string;
    /** Everyone who has taken a turn in this session, by principal id, the owner included. */
    readonly participants: readonly string[];
    /** The workspace this session's tools are rooted at. */
    readonly workspaceId?: string;
    /** A cached projection of the transcript's length, not the authority on it. */
    readonly messageCount: number;
    /** Whether a turn is in flight on this session's transcript. */
    readonly turnOpen?: boolean;
    /** Cumulative usage, so a session's cost is available without replaying the ledger. */
    readonly usage: TokenUsage;
}
