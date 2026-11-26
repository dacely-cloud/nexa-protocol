// SPDX-FileCopyrightText: 2026 Dacely <business@dacely.com>
// SPDX-License-Identifier: LicenseRef-Proprietary
/** Importer selection provenance never claims an observed installed runtime base. */
export const BrowserModuleContext = {
    Explicit: 'explicit-importer-url',
    Reported: 'reported-source-url',
};
/** Native URL evidence is distinct from computed syntax and runtime execution. */
export const BrowserModuleTraceStatus = {
    Native: 'native-resolution',
    Computed: 'computed-specifier',
    Unsupported: 'unsupported-literal',
};
