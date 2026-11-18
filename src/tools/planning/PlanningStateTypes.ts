// SPDX-FileCopyrightText: 2026 Nexa contributors
// SPDX-License-Identifier: LicenseRef-Proprietary

/** Where a plan step is. */
export type PlanStepStatus = 'pending' | 'active' | 'done' | 'skipped' | 'blocked';

/** One step of a plan. */
export interface PlanStep {
    /** A native delegated run owning this step; absence means parent work. */
    readonly assignedRunId?: string;
    readonly id: string;
    readonly title: string;
    readonly status: PlanStepStatus;
    /** Ids of steps that must be settled before this one may start. */
    readonly dependsOn: readonly string[];
    readonly blocker?: string;
}

/** Whether a plan is still being worked. */
export type PlanStatus = 'active' | 'complete' | 'abandoned';
