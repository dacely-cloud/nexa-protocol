// SPDX-FileCopyrightText: 2026 Nexa contributors
// SPDX-License-Identifier: LicenseRef-Proprietary

/** Explicit local permission profiles have no implied broader mode or default. */
export const ConnectorFileMode = {
    ReadOnly: 'read-only',
    ReadWrite: 'read-write',
} as const;
/** A file grant's access, with the same values as the connector protocol's file mode. */
export type ConnectorFileMode = (typeof ConnectorFileMode)[keyof typeof ConnectorFileMode];
