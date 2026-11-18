// SPDX-FileCopyrightText: 2026 Nexa contributors
// SPDX-License-Identifier: LicenseRef-Proprietary
/** Null public workspace selection is deliberately distinct from an explicit managed choice. */
export const DataUploadTargetKind = {
    Unselected: 'unselected',
    Managed: 'managed',
    Local: 'local',
    Host: 'host',
    Unsupported: 'unsupported',
};
/** Published approval is checked before source admission; native operations still verify actual storage. */
export const DataUploadHostState = {
    Authorized: 'authorized',
    Offline: 'offline',
    Disabled: 'disabled',
    MissingTools: 'missing-tools',
};
