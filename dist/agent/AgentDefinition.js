// SPDX-FileCopyrightText: 2026 Nexa contributors
// SPDX-License-Identifier: LicenseRef-Proprietary
/** How much the agent asks before acting. */
export const ApprovalMode = {
    /** Ask before anything with a side effect. */
    Cautious: 'cautious',
    /** Ask before executing code or writing outside the workspace. */
    Standard: 'standard',
    /** Ask only before destructive actions. */
    Permissive: 'permissive',
    /**
     * Never ask.
     *
     * A deliberate, named choice rather than a `--force` flag, so an unattended deployment can
     * select it explicitly and a UI can show plainly that nothing will be confirmed.
     */
    Unattended: 'unattended',
};
