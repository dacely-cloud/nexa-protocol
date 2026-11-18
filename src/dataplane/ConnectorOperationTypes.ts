// SPDX-FileCopyrightText: 2026 Nexa contributors
// SPDX-License-Identifier: LicenseRef-Proprietary

import type { ConnectorJointWorkspaceDescriptor } from './ConnectorJointWorkspaceTypes.js';

/** Explicit wire alternatives retain independent authority or one complete signed workspace association. */
export const ConnectorAuthorizationKind = {
    Independent: 'independent',
    Joint: 'joint',
} as const;
/** One ConnectorAuthorizationKind value. */
export type ConnectorAuthorizationKind =
    (typeof ConnectorAuthorizationKind)[keyof typeof ConnectorAuthorizationKind];

/** This envelope is selected by trusted preparation, never by model parameters or a missing historical field. */
export interface ConnectorIndependentAuthorization {
    readonly kind: typeof ConnectorAuthorizationKind.Independent;
}

/** Full signed association remains data until the pinned SDK/backend/device separately authorize the operation. */
export interface ConnectorJointAuthorization {
    readonly kind: typeof ConnectorAuthorizationKind.Joint;
    readonly binding: ConnectorJointWorkspaceDescriptor;
}

/** Both current alternatives are explicit; missing or malformed metadata cannot select Independent. */
export type ConnectorOperationAuthorization =
    ConnectorIndependentAuthorization | ConnectorJointAuthorization;
