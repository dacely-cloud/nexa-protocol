// SPDX-FileCopyrightText: 2026 Dacely <business@dacely.com>
// SPDX-License-Identifier: LicenseRef-Proprietary

import type { ResourceBinding } from './ResourceTypes.js';

/** JSON configuration is data, not an executable plan or authorization. */
export interface WorkflowObject {
    readonly [key: string]: WorkflowValue;
}

/** Large integers and financial values must use decimal strings. */
export type WorkflowValue =
    null | boolean | string | number | readonly WorkflowValue[] | WorkflowObject;

/** User-owned descriptive fields, independent of run and automation state. */
export interface WorkflowDetails {
    readonly name: string;
    readonly description: string;
    readonly tags: readonly string[];
    readonly folder: string | null;
}

/** Versioned component configuration; unsupported or incomplete components can be saved. */
export interface WorkflowNode {
    readonly id: string;
    readonly component: string;
    readonly componentVersion: string;
    readonly label: string;
    readonly configuration: WorkflowObject;
    readonly resources: readonly ResourceBinding[];
}

/** Personal viewport is excluded; these positions belong to the workflow itself. */
export interface WorkflowPosition {
    readonly id: string;
    readonly x: number;
    readonly y: number;
}

/** Execution, values, and resource attachments have separate connection semantics. */
export const WorkflowEdgeKind = { Flow: 'flow', Data: 'data', Resource: 'resource' } as const;

/** Connection purpose does not depend on visual position. */
export type WorkflowEdgeKind = (typeof WorkflowEdgeKind)[keyof typeof WorkflowEdgeKind];

/** Stable endpoint identities survive cosmetic renames. */
export interface WorkflowEndpoint {
    readonly node: string;
    readonly port: string;
}

/** A draft can retain a dangling edge so validation can explain an unfinished edit. */
export interface WorkflowEdge {
    readonly id: string;
    readonly kind: WorkflowEdgeKind;
    readonly from: WorkflowEndpoint;
    readonly to: WorkflowEndpoint;
}

/** Result retained by command receipts, including after subsequent edits. */
export interface WorkflowReceipt {
    readonly workflowId: string;
    readonly revision: string;
}
