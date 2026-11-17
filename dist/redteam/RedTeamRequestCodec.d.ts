import type { RedTeamSource, RedTeamStartRequest, RedTeamEffortRequest, RedTeamGetRequest, RedTeamUpdateRequest, RedTeamListRequest } from './RedTeamTypes.js';
/** Validates controls without accepting caller-supplied ownership or tool permissions. */
export declare class RedTeamRequestCodec {
    /** Admit exact GitHub repository roots or a bounded selection of uploaded file identities. */
    static source(raw: unknown): RedTeamSource;
    /** Default parallelism is applied at the boundary, not left to each consumer. */
    static start(raw: unknown): RedTeamStartRequest;
    /** Decode an effort identity without accepting caller-selected account or session authority. */
    static effort(raw: unknown): RedTeamEffortRequest;
    /** Latest reads use null cursors; continuing pages must name their saved revision. */
    static get(raw: unknown): RedTeamGetRequest;
    /** Require an exact expected revision and at least one bounded owner-selected change. */
    static update(raw: unknown): RedTeamUpdateRequest;
    /** Decode a bounded effort directory request with an exclusive identity cursor. */
    static list(raw: unknown): RedTeamListRequest;
}
