// SPDX-FileCopyrightText: 2026 Dacely <business@dacely.com>
// SPDX-License-Identifier: LicenseRef-Proprietary
/**
 * What to do about occurrences that elapsed while the process was down.
 *
 * There is no safe default here, which is exactly why it is a per-job field. A daily digest that
 * missed three days should send ONE digest (`run-once`); a billing rollup that missed three days
 * must process all three (`run-all`); a "remind me at 9am" whose 9am passed six hours ago should
 * probably stay quiet (`skip`). Choosing one globally is wrong for the other two.
 */
export const MisfirePolicy = {
    /** Ignore everything missed; wait for the next scheduled occurrence. */
    Skip: 'skip',
    /** Run exactly once to catch up, no matter how many occurrences were missed. */
    RunOnce: 'run-once',
    /** Run once per missed occurrence, in order. */
    RunAll: 'run-all',
    /** Run once, but only if the most recent missed occurrence is within `graceMs`. */
    RunIfRecent: 'run-if-recent',
};
