// SPDX-FileCopyrightText: 2026 Dacely <business@dacely.com>
// SPDX-License-Identifier: LicenseRef-Proprietary

import type {
    ConnectorWorkspaceHostSelection,
    ConnectorWorkspaceSelectionView,
} from '../dataplane/ConnectorWorkspaceSelectionTypes.js';

/** A client supplies a comparison context, never a machine address or private owner generation. */
export interface DataUploadContext {
    readonly sessionId: string;
    readonly selectionRevision: string;
    readonly ownerSha256: string;
}

/** Null public workspace selection is deliberately distinct from an explicit managed choice. */
export const DataUploadTargetKind = {
    Unselected: 'unselected',
    Managed: 'managed',
    Local: 'local',
    Host: 'host',
    Unsupported: 'unsupported',
} as const;

/** Metadata describes an authenticated selection; actual storage admission checks authority again. */
export type DataUploadTargetKind = (typeof DataUploadTargetKind)[keyof typeof DataUploadTargetKind];

/** No storage or default machine is acquired while requesting an explicit choice. */
export interface DataUploadTargetUnselected {
    readonly kind: typeof DataUploadTargetKind.Unselected;
    readonly context: DataUploadContext;
}

/** Normal managed storage is activated only from a verified retained Clear receipt. */
export interface DataUploadTargetManaged {
    readonly kind: typeof DataUploadTargetKind.Managed;
    readonly context: DataUploadContext;
    readonly maximumBytes: string;
}

/** The deployment intentionally exposes its normal local workspace under fresh authenticated account policy. */
export interface DataUploadTargetLocal {
    readonly kind: typeof DataUploadTargetKind.Local;
    readonly context: DataUploadContext;
    readonly maximumBytes: string;
}

/** The exact selected host profile remains the ceiling throughout one upload. */
export interface DataUploadTargetHost {
    readonly kind: typeof DataUploadTargetKind.Host;
    readonly context: DataUploadContext;
    readonly maximumBytes: string;
    readonly selection: ConnectorWorkspaceHostSelection;
    readonly state: DataUploadHostState;
}

/** Published approval is checked before source admission; native operations still verify actual storage. */
export const DataUploadHostState = {
    Authorized: 'authorized',
    Offline: 'offline',
    Disabled: 'disabled',
    MissingTools: 'missing-tools',
} as const;

/** Missing native file authority never becomes a default-machine fallback. */
export type DataUploadHostState = (typeof DataUploadHostState)[keyof typeof DataUploadHostState];

/** A restricted workspace remains selected until the user explicitly chooses a supported upload target. */
export interface DataUploadTargetUnsupported {
    readonly kind: typeof DataUploadTargetKind.Unsupported;
    readonly context: DataUploadContext;
}

/** Clients cannot infer managed authority from missing host metadata. */
export type DataUploadTarget =
    | DataUploadTargetUnselected
    | DataUploadTargetManaged
    | DataUploadTargetLocal
    | DataUploadTargetHost
    | DataUploadTargetUnsupported;

/** Target discovery requires an already owned conversation, created through the existing account API. */
export interface DataUploadTargetParams {
    readonly sessionId: string;
}

/** A placement choice changes only this owned conversation; no endpoint, path or private nonce is accepted. */
export interface DataUploadSelectManaged {
    readonly kind: typeof DataUploadTargetKind.Managed;
}

/** Host choice is resolved against the current signed local approval by the existing selection service. */
export interface DataUploadSelectHost {
    readonly kind: typeof DataUploadTargetKind.Host;
    readonly environmentId: string;
    readonly grantId: string;
    readonly grantRevision: string;
}

/** Both choices require the same original context and immutable CAS request identity. */
export type DataUploadChoice = DataUploadSelectManaged | DataUploadSelectHost;

/** A stale browser dialog cannot select for a recreated private conversation generation. */
export interface DataUploadSelectParams {
    readonly context: DataUploadContext;
    readonly requestId: string;
    readonly choice: DataUploadChoice;
}

/** Immutable original acceptance is separate from current placement, which may already be newer. */
export interface DataUploadSelectionResult {
    readonly receipt: ConnectorWorkspaceSelectionView;
    readonly target: DataUploadTarget;
}

/** Reuses the existing idempotent empty-conversation creator; this accepts no user text or file bytes. */
export interface DataUploadCreateParams {
    readonly requestId: string;
}
