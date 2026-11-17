import type { RedTeamEffort, RedTeamAgent, RedTeamTask, RedTeamEvidence, RedTeamFinding, RedTeamSnapshot, RedTeamListPage, RedTeamCoordinationEvent, RedTeamDelegatedAgent } from './RedTeamTypes.js';
/** Decodes bounded owner-scoped metadata; chat journals carry verbose agent output. */
export declare class RedTeamCodec {
    #private;
    /** Decode bounded effort metadata and exact counters without accepting unknown fields. */
    static effort(raw: unknown): RedTeamEffort;
    /** Decode one worker and its saved Chat session reference. */
    static agent(raw: unknown): RedTeamAgent;
    /** Native worker identities and selectors are instance identities, never persona aliases. */
    static delegatedAgent(raw: unknown): RedTeamDelegatedAgent;
    /** Validate one real exchange without treating a paged-out ledger record as missing. */
    static coordination(raw: unknown): RedTeamCoordinationEvent;
    /** Decode a task whose execution state remains owned by the durable runtime. */
    static task(raw: unknown): RedTeamTask;
    /** Decode a bounded observation and optional retained artifact reference. */
    static evidence(raw: unknown): RedTeamEvidence;
    /** Decode a complete candidate or observed verdict without inventing report metadata. */
    static finding(raw: unknown): RedTeamFinding;
    /** Validate a bounded revision page, known worker references and ordered coordination events. */
    static snapshot(raw: unknown): RedTeamSnapshot;
    /** Decode one bounded owner-scoped effort directory page. */
    static list(raw: unknown): RedTeamListPage;
    /** Duplicate and delayed snapshots cannot roll a rendered effort backwards. */
    static advance(previous: RedTeamSnapshot | undefined, raw: unknown): RedTeamSnapshot;
}
