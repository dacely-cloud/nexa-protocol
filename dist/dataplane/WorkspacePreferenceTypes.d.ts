/** An account preference names a workspace without carrying connection details or execution grants. */
export declare const WorkspacePreferenceKind: {
    readonly Managed: 'managed';
    readonly Connector: 'connector';
};
/** Use the account's managed VM as the main workspace. */
export interface ManagedWorkspacePreference {
    readonly kind: typeof WorkspacePreferenceKind.Managed;
}
/** Prefer a linked computer by its account-owned enrollment identity. */
export interface ConnectorWorkspacePreference {
    readonly kind: typeof WorkspacePreferenceKind.Connector;
    readonly environmentId: string;
}
/** The user's standing choice; selecting a machine does not change its permissions. */
export type WorkspacePreference = ManagedWorkspacePreference | ConnectorWorkspacePreference;
/** Read the preference of the connection's authenticated account. */
export type WorkspacePreferenceGetParams = Record<string, never>;
/** The saved preference and the version a subsequent edit must compare. */
export interface WorkspacePreferenceView {
    readonly revision: string;
    readonly preference: WorkspacePreference | null;
}
/** Replace the observed preference, or clear it to restore per-conversation selection. */
export interface WorkspacePreferenceSetParams {
    readonly expectedRevision: string;
    readonly preference: WorkspacePreference | null;
}
/** Account-scoped workspace preference read. */
export interface WorkspacePreferenceGetMethod {
    readonly params: WorkspacePreferenceGetParams;
    readonly result: WorkspacePreferenceView;
}
/** Compare-and-set update for an account's main workspace. */
export interface WorkspacePreferenceSetMethod {
    readonly params: WorkspacePreferenceSetParams;
    readonly result: WorkspacePreferenceView;
}
