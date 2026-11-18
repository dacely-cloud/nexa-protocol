/** What a caller may do. */
export declare const Scope: {
    /** Read state: sessions, transcripts, agents, jobs, spend. */
    readonly Read: 'read';
    /** Act: run turns, add and remove jobs, delete sessions. Implies read. */
    readonly Write: 'write';
    /** Change the deployment: define agents. Implies everything. */
    readonly Admin: 'admin';
};
/** One gateway authorization scope. */
export type Scope = (typeof Scope)[keyof typeof Scope];
