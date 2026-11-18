// SPDX-FileCopyrightText: 2026 Nexa contributors
// SPDX-License-Identifier: LicenseRef-Proprietary
/** Platform labels are finite; unsupported platforms cannot masquerade as qualified Linux installations. */
export const ConnectorSystemPlatform = {
    Linux: 'linux',
    Windows: 'windows',
    MacOs: 'macos',
    Other: 'other',
};
/** Missing driver access is different from a successful empty inventory. */
export const ConnectorGpuInventoryState = {
    Reported: 'reported',
    Unavailable: 'unavailable',
};
/** Vendor identities remain separate from compute support and memory availability. */
export const ConnectorGpuVendor = {
    Nvidia: 'nvidia',
    Amd: 'amd',
    Intel: 'intel',
    Other: 'other',
};
/** Presence is based on the authenticated backend's lease clock and revocation state. */
export const ConnectorPresence = {
    Pending: 'pending',
    Online: 'online',
    Offline: 'offline',
    Revoked: 'revoked',
};
/** Customer hardware reports never become managed-fleet qualification. */
export const ConnectorInventoryTrust = {
    CustomerReported: 'customer-reported',
};
