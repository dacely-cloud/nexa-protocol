// SPDX-FileCopyrightText: 2026 Nexa contributors
// SPDX-License-Identifier: LicenseRef-Proprietary

/** An account check compares prompt-visible connector facts without transferring inventory. */
export interface ConnectorContextCheckQuery {
    readonly knownVersion: string | null;
}

/** The current metadata version and server clock bound time-derived presence observations. */
export interface ConnectorContextCheckView {
    readonly version: string;
    readonly changed: boolean;
    readonly serverNowMs: string;
    readonly nextTransitionAtMs: string | null;
}

/** Authenticated account RPC contract for conditional connector facts. */
export interface ConnectorContextCheckMethod {
    readonly params: ConnectorContextCheckQuery;
    readonly result: ConnectorContextCheckView;
}
