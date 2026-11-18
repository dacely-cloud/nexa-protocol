// SPDX-FileCopyrightText: 2026 Nexa contributors
// SPDX-License-Identifier: LicenseRef-Proprietary
/** Metadata directories and exact text have independent bounded cursors. */
export const BrowserModuleView = {
    Imports: 'imports',
    Candidates: 'candidates',
    Text: 'text',
};
/** Full fields are read only after selecting an import or its context. */
export const BrowserModuleField = {
    Module: 'module',
    Importer: 'importer-url',
    MapBase: 'map-base-url',
    ParseError: 'parse-error',
    Specifier: 'specifier',
    Url: 'resolved-url',
    Error: 'error-message',
    Expression: 'expression',
};
