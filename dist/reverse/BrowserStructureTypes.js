// SPDX-FileCopyrightText: 2026 Dacely <business@dacely.com>
// SPDX-License-Identifier: LicenseRef-Proprietary
/** Independent tree representations use the same immutable document capture. */
export const BrowserStructureView = { Dom: 'dom', Accessibility: 'accessibility' };
/** The containment relation preserves the difference between light DOM, shadow and embedded documents. */
export const BrowserDomRelation = {
    Document: 'document',
    Child: 'child',
    ContentDocument: 'content-document',
    ShadowRoot: 'shadow-root',
    PseudoElement: 'pseudo-element',
    TemplateContent: 'template-content',
    ImportedDocument: 'imported-document',
};
