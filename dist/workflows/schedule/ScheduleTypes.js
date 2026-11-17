// SPDX-FileCopyrightText: 2026 Nexa contributors
// SPDX-License-Identifier: LicenseRef-Proprietary
/** Fixed schedules and completion-relative delays have distinct activation semantics. */
export const WorkflowScheduleKind = {
    Interval: 'interval',
    Once: 'once',
    Calendar: 'calendar',
    Completion: 'after-completion',
};
/** Late occurrences are skipped, coalesced into the latest, or replayed up to a configured cap. */
export const WorkflowScheduleMissed = {
    Skip: 'skip',
    Latest: 'latest',
    CatchUp: 'catch-up',
};
/** UI and runtime share these lifecycle meanings. */
export const WorkflowScheduleStatus = {
    Enabled: 'enabled',
    Disabled: 'disabled',
    Blocked: 'blocked',
    Complete: 'complete',
};
/** Last dispatch outcome is bounded metadata; accepted work remains in the run journal. */
export const WorkflowScheduleOutcome = {
    Accepted: 'accepted',
    Skipped: 'skipped',
    Blocked: 'blocked',
};
