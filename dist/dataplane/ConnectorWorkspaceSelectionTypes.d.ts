import type { ConnectorFileMode } from 'nerva-connector-protocol/protocol/ConnectorFiles.js';
import type { ConnectorHostPlatform } from 'nerva-connector-protocol/protocol/ConnectorHost.js';
import type { ConnectorWorkspaceCatalogView, ConnectorWorkspaceJointTarget } from './ConnectorWorkspaceCatalogTypes.js';
/** Account-scoped idempotent creation admits an empty owned conversation without starting a turn. */
export interface ConnectorWorkspaceCreateParams {
    readonly requestId: string;
}
/** Reads only an existing conversation whose private owner matches the authenticated caller. */
export interface ConnectorWorkspaceGetParams {
    readonly sessionId: string;
}
/** Removes future file selection using one immutable request and its captured comparison revision. */
export interface ConnectorWorkspaceClearParams extends ConnectorWorkspaceGetParams {
    readonly requestId: string;
    readonly expectedRevision: string;
}
/** Captures a granted root and exact policy; the current signed profile determines its access mode. */
export interface ConnectorWorkspaceSelectParams extends ConnectorWorkspaceClearParams {
    readonly environmentId: string;
    readonly rootId: string;
    readonly policySha256: string;
}
/** Future turns can select one exact separately approved full-computer grant. */
export interface ConnectorWorkspaceSelectHostParams extends ConnectorWorkspaceClearParams {
    readonly environmentId: string;
    readonly grantId: string;
    readonly grantRevision: string;
}
/** Each selected authority is explicit; missing persisted kinds require deliberate operator review. */
export declare const ConnectorWorkspaceSelectionKind: {
    readonly Files: 'files';
    readonly Joint: 'joint';
    readonly Host: 'host';
};
/** One ConnectorWorkspaceSelectionKind value. */
export type ConnectorWorkspaceSelectionKind = (typeof ConnectorWorkspaceSelectionKind)[keyof typeof ConnectorWorkspaceSelectionKind];
/** A catalog is read only after verifying ownership of this conversation. */
export interface ConnectorWorkspaceCatalogParams extends ConnectorWorkspaceGetParams {
    readonly environmentId: string;
}
/** A Joint choice commits every catalog field before fresh device and authority verification. */
export interface ConnectorWorkspaceSelectJointParams extends ConnectorWorkspaceClearParams {
    readonly target: ConnectorWorkspaceJointTarget;
}
/** Shared file aliases preserve the virtual Machine root without revealing customer paths. */
export interface ConnectorWorkspaceSelectionBase {
    readonly environmentId: string;
    readonly rootId: string;
    readonly policySha256: string;
    readonly mode: ConnectorFileMode;
}
/** Files-only placement derives access from the current signed file profile. */
export interface ConnectorWorkspaceFileSelection extends ConnectorWorkspaceSelectionBase {
    readonly kind: typeof ConnectorWorkspaceSelectionKind.Files;
}
/** Joint placement pins both policy roots and the complete first archived proof commitment. */
export interface ConnectorWorkspaceJointSelection extends ConnectorWorkspaceSelectionBase {
    readonly kind: typeof ConnectorWorkspaceSelectionKind.Joint;
    readonly executionRootId: string;
    readonly executionPolicySha256: string;
    readonly bindingRevision: string;
    readonly jointBindingSha256: string;
    readonly descriptorSha256: string;
}
/** Full-host placement publishes the native default path without pretending to be a confined file root. */
export interface ConnectorWorkspaceHostSelection {
    readonly kind: typeof ConnectorWorkspaceSelectionKind.Host;
    readonly environmentId: string;
    readonly grantId: string;
    readonly grantRevision: string;
    readonly platform: ConnectorHostPlatform;
    readonly directory: string;
    readonly mode: ConnectorFileMode.ReadWrite;
}
/** Neither selection kind can be inferred from a missing field or an executable name. */
export type ConnectorWorkspaceSelection = ConnectorWorkspaceFileSelection | ConnectorWorkspaceJointSelection | ConnectorWorkspaceHostSelection;
/** Public current state contains no private owner, provider identity, endpoint or device credentials. */
export interface ConnectorWorkspaceSelectionView {
    readonly sessionId: string;
    readonly revision: string;
    readonly selection: ConnectorWorkspaceSelection | null;
}
/** Wire contract for idempotent, account-owned conversation admission. */
export interface ConnectorWorkspaceCreateMethod {
    readonly params: ConnectorWorkspaceCreateParams;
    readonly result: ConnectorWorkspaceSelectionView;
}
/** Wire contract for reading current owned-conversation file placement. */
export interface ConnectorWorkspaceGetMethod {
    readonly params: ConnectorWorkspaceGetParams;
    readonly result: ConnectorWorkspaceSelectionView;
}
/** Wire contract for explicitly changing file placement for future turns. */
export interface ConnectorWorkspaceSelectMethod {
    readonly params: ConnectorWorkspaceSelectParams;
    readonly result: ConnectorWorkspaceSelectionView;
}
/** Catalog access is mediated by Nexa and the existing conversation owner. */
export interface ConnectorWorkspaceCatalogMethod {
    readonly params: ConnectorWorkspaceCatalogParams;
    readonly result: ConnectorWorkspaceCatalogView;
}
/** Joint selection captures a verified mapping; local execution grants remain independent. */
export interface ConnectorWorkspaceSelectJointMethod {
    readonly params: ConnectorWorkspaceSelectJointParams;
    readonly result: ConnectorWorkspaceSelectionView;
}
/** Full-host selection retains account ownership and ordinary conversation revision control. */
export interface ConnectorWorkspaceSelectHostMethod {
    readonly params: ConnectorWorkspaceSelectHostParams;
    readonly result: ConnectorWorkspaceSelectionView;
}
/** Wire contract for explicitly returning future turns to managed placement. */
export interface ConnectorWorkspaceClearMethod {
    readonly params: ConnectorWorkspaceClearParams;
    readonly result: ConnectorWorkspaceSelectionView;
}
