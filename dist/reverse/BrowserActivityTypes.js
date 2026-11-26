// SPDX-FileCopyrightText: 2026 Dacely <business@dacely.com>
// SPDX-License-Identifier: LicenseRef-Proprietary
/** The observation vocabulary contains metadata, never raw response bodies or console values. */
export const BrowserActivityKind = {
    Request: 'request',
    Console: 'console',
    Socket: 'websocket',
    Navigation: 'navigation',
};
