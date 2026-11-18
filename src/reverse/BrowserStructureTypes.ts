// SPDX-FileCopyrightText: 2026 Nexa contributors
// SPDX-License-Identifier: LicenseRef-Proprietary

import type { ReverseBrowserReference } from './BrowserCaptureTypes.js';
import type { BrowserPageProjection } from './BrowserPageTypes.js';

/** Independent tree representations use the same immutable document capture. */
export const BrowserStructureView = { Dom: 'dom', Accessibility: 'accessibility' } as const;

/** The finite browser structure representations. */
export type BrowserStructureView = (typeof BrowserStructureView)[keyof typeof BrowserStructureView];

/** The containment relation preserves the difference between light DOM, shadow and embedded documents. */
export const BrowserDomRelation = {
    Document: 'document',
    Child: 'child',
    ContentDocument: 'content-document',
    ShadowRoot: 'shadow-root',
    PseudoElement: 'pseudo-element',
    TemplateContent: 'template-content',
    ImportedDocument: 'imported-document',
} as const;

/** Finite DOM containment relations. */
export type BrowserDomRelation = (typeof BrowserDomRelation)[keyof typeof BrowserDomRelation];

/** DOM node identity is local to this capture, with attribute values and text excluded. */
export interface BrowserDomNode {
    readonly kind: 'dom';
    readonly relation: BrowserDomRelation;
    readonly id: string;
    readonly backendNodeId: string | null;
    readonly parentId: string | null;
    readonly depth: number;
    readonly nodeType: number;
    readonly name: string;
    readonly localName: string;
    readonly valueLength: string;
    readonly attributeCount: string;
    readonly childCount: string;
    readonly missingChildren: string;
}

/** Accessibility node identity and backend links never imply that names or values were read. */
export interface BrowserAccessibilityNode {
    readonly kind: 'accessibility';
    readonly id: string;
    readonly backendNodeId: string | null;
    readonly parentId: string | null;
    readonly depth: number | null;
    readonly role: string | null;
    readonly ignored: boolean;
    readonly childCount: string;
    readonly missingChildren: string;
}

/** An attribute directory contains names only. */
export interface BrowserAttributeName {
    readonly kind: 'attribute';
    readonly nodeId: string;
    readonly index: number;
    readonly name: string;
}

/** Each response row has an explicit representation discriminator. */
export type BrowserStructureRow = BrowserDomNode | BrowserAccessibilityNode | BrowserAttributeName;

/** A progress receipt references structure without carrying complete trees. */
export interface BrowserStructureSnapshot extends BrowserPageProjection {
    readonly reference: ReverseBrowserReference;
}

/** Selectors are all, roots, node:ID, children:ID or attributes:ID; authority is never supplied by a selector. */
export interface BrowserStructureQuery {
    readonly id: string;
    readonly runId: string;
    readonly evidenceId: string;
    readonly view: BrowserStructureView;
    readonly selector?: string;
    readonly cursor?: string;
}

/** One independently selected, bounded topology or attribute directory. */
export interface BrowserStructurePage {
    readonly runId: string;
    readonly sha256: string;
    readonly evidenceId: string;
    readonly captureSha256: string;
    readonly metadata: BrowserPageProjection;
    readonly view: BrowserStructureView;
    readonly selector: string;
    readonly cursor: string;
    readonly nextCursor: string | null;
    readonly total: string;
    readonly records: readonly BrowserStructureRow[];
}
