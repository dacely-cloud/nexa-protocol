// SPDX-FileCopyrightText: 2026 Nexa contributors
// SPDX-License-Identifier: LicenseRef-Proprietary
/** Observed call sites, never claims that an IPC channel, route or native addon was exercised. */
export const ApplicationBoundaryKind = {
    Ipc: 'ipc',
    Route: 'route',
    NativeAddon: 'native-addon',
    Preload: 'preload',
    Window: 'browser-window',
    Bridge: 'context-bridge',
};
