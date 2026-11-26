// SPDX-FileCopyrightText: 2026 Dacely <business@dacely.com>
// SPDX-License-Identifier: LicenseRef-Proprietary

/** One architectural responsibility; a leaf references the sole authoritative execution step. */
export interface AgileDesignNode {
    readonly id: string;
    readonly parentId: string | null;
    readonly title: string;
    readonly responsibility: string;
    /** Concrete inputs, outputs and collaboration contracts, not invented implementation evidence. */
    readonly interfaces: readonly string[];
    /** Null for a branch; leaves bind exactly one task whose acceptance and state remain in the plan. */
    readonly stepId: string | null;
}

/** A single rooted tree describes containment independently of the execution dependency graph. */
export interface AgileDesign {
    readonly nodes: readonly AgileDesignNode[];
}
