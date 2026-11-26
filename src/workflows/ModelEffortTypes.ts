// SPDX-FileCopyrightText: 2026 Dacely <business@dacely.com>
// SPDX-License-Identifier: LicenseRef-Proprietary

/** Saved reasoning levels shared by workflows and provider requests; null uses the service default. */
export const WorkflowModelEffort = {
    Off: 'off',
    Minimal: 'minimal',
    Low: 'low',
    Medium: 'medium',
    High: 'high',
    XHigh: 'xhigh',
    Max: 'max',
} as const;
/** One explicit effort level, independent of model-selection policy. */
export type WorkflowModelEffort = (typeof WorkflowModelEffort)[keyof typeof WorkflowModelEffort];
