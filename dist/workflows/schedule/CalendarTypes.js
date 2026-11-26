// SPDX-FileCopyrightText: 2026 Dacely <business@dacely.com>
// SPDX-License-Identifier: LicenseRef-Proprietary
/** Calendar times are resolved in the named zone instead of by adding elapsed milliseconds. */
export const WorkflowCalendarGap = { Skip: 'skip', NextValid: 'next-valid' };
/** A repeated local time always contributes at most one scheduled occurrence. */
export const WorkflowCalendarFold = { First: 'first', Second: 'second', Skip: 'skip' };
