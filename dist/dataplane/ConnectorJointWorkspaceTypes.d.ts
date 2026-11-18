import type { ConnectorFileMode } from './ConnectorFileMode.js';
/** Three permanent operation journals remain distinct across reconnects and controller replicas. */
export interface ConnectorJointExecutionJournals {
    readonly first: string;
    readonly second: string;
}
/** Public wire metadata preserves exact revisions without exposing physical paths or derivation keys. */
export interface ConnectorJointWorkspaceBinding {
    readonly authorityId: string;
    readonly environmentId: string;
    readonly enrollmentId: string;
    readonly revision: string;
    readonly filePolicySha256: string;
    readonly executionPolicySha256: string;
    readonly fileRootId: string;
    readonly executionRootId: string;
    readonly access: ConnectorFileMode;
    readonly physicalRootCommitment: string;
    readonly fileJournalId: string;
    readonly executionJournals: ConnectorJointExecutionJournals;
}
/** The complete signature is retained unchanged; structural decoding does not authenticate or activate this descriptor. */
export interface ConnectorJointWorkspaceDescriptor {
    readonly binding: ConnectorJointWorkspaceBinding;
    readonly signature: string;
}
