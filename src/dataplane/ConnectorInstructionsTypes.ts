// SPDX-FileCopyrightText: 2026 Nexa contributors
// SPDX-License-Identifier: LicenseRef-Proprietary

/** Selects account-owned standing instructions without selecting a network address. */
export interface ConnectorInstructionsGetParams {
    readonly enrollmentId: string;
}

/** An exact revision and retained request identify one deliberate instruction edit. */
export interface ConnectorInstructionsUpdateParams extends ConnectorInstructionsGetParams {
    readonly instructions: string;
    readonly expectedRevision: string;
    readonly requestId: string;
}

/** User-authored preferences never broaden the connector's operating-system permissions. */
export interface ConnectorInstructionsView extends ConnectorInstructionsGetParams {
    readonly instructions: string;
    readonly revision: string;
}

/** Read one authenticated account's preferences for its linked connector. */
export interface ConnectorInstructionsGetMethod {
    readonly params: ConnectorInstructionsGetParams;
    readonly result: ConnectorInstructionsView;
}

/** Replace instructions using compare-and-set so concurrent edits cannot disappear. */
export interface ConnectorInstructionsUpdateMethod {
    readonly params: ConnectorInstructionsUpdateParams;
    readonly result: ConnectorInstructionsView;
}
