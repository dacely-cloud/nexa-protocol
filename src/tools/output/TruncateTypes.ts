// SPDX-FileCopyrightText: 2026 Nexa contributors
// SPDX-License-Identifier: LicenseRef-Proprietary

/**
 * Tool-result truncation: what to keep, where to cut, and what the model is told it lost.
 *
 * Four decisions carry this file, in the order they matter.
 *
 * 1. **The default cut is MIDDLE-out, not tail-first.** A tool result reads like a build log: the
 *    head says what ran, the tail says how it ended, and the middle is the repetitive part. Keeping
 *    only a prefix — the obvious implementation — discards the compiler error and the exit status,
 *    which is precisely why an agent handed a head-truncated build log cannot debug the build.
 * 2. **The model is TOLD what was removed, in numbers.** A bare "output truncated" leaves the model
 *    guessing whether it saw 1% or 99%, and a model that guesses high reasons about a fragment as
 *    if it were the whole result — it reports a green test run from the third of the output that
 *    happened to contain no failures. Every marker states shown and total in both characters and
 *    lines and says in words that the result is incomplete.
 * 3. **Structured content degrades differently from a log.** A prefix of a JSON document is not
 *    JSON. Returned unannounced it is handed to `JSON.parse`, which fails, and the model concludes
 *    the tool is broken rather than that the output was cut. {@link summarizeJsonShape} puts the
 *    root type, the top-level keys and the element count in front of the prefix, and the marker
 *    says the body must be read as text.
 * 4. **Cuts land on structure, never mid-anything.** The budget is spent one whole code point at a
 *    time, so a surrogate pair is never split (a lone surrogate is invalid UTF-8 once encoded and
 *    some providers reject the request outright); the cut snaps to a nearby line boundary; and a
 *    cut that would fall inside an ANSI escape moves clear of it, because half an escape sequence
 *    leaves every downstream renderer in a broken state.
 *
 * Budgets here are in CHARACTERS, weighted per script by {@link estimateChars}: counting is exact
 * and free, while counting tokens per result is a per-provider round trip on the hot path. The
 * weighting exists because an unweighted character budget under-counts a CJK log by roughly 2.5x in
 * tokens, which is the difference between a budget that holds and one that overflows the window.
 */

/** How the content is reduced. Declared by the tool, which knows what it produced. */
export type TruncationStrategy = 'head' | 'tail' | 'head-tail' | 'summary-head' | 'hunk-head';

/** What a truncation did, in numbers the marker quotes and a UI can render. */
export interface TruncationRecord {
    readonly strategy: TruncationStrategy;
    /**
     * Characters of the ORIGINAL text that survive, excluding anything this module synthesized.
     * Counted literally rather than script-weighted: a marker whose numbers disagree with what the
     * model can count for itself teaches it to distrust the whole marker.
     */
    readonly shownChars: number;
    readonly totalChars: number;
    readonly shownLines: number;
    readonly totalLines: number;
    /**
     * Whether a cut fell mid-line, so one of the shown lines is a fragment.
     *
     * `read` propagates this so `edit` never anchors a replacement on a fragment — an anchor that
     * matches half a line matches the wrong place in the file. For `tail` the fragment is the first
     * shown line rather than the last; it is one flag because one flag is all a consumer acts on.
     */
    readonly lastLinePartial: boolean;
    /** Where the complete content was written, when a spill store wrote it. */
    readonly spillPath?: string;
    /**
     * The exact call the model should make to see more, pre-rendered by the ORIGINATING tool.
     *
     * Built by the tool because only the tool knows its own argument names; a shared builder would
     * guess `offset` for a tool that calls it `start` and hand the model a call that fails.
     */
    readonly continuation?: string;
}
