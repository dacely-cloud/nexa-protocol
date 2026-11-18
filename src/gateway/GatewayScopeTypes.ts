// SPDX-FileCopyrightText: 2026 Nexa contributors
// SPDX-License-Identifier: LicenseRef-Proprietary

/** What a caller may do. */
export const Scope = {
    /** Read state: sessions, transcripts, agents, jobs, spend. */
    Read: 'read',
    /** Act: run turns, add and remove jobs, delete sessions. Implies read. */
    Write: 'write',
    /** Change the deployment: define agents. Implies everything. */
    Admin: 'admin',
} as const;

/** One gateway authorization scope. */
export type Scope = (typeof Scope)[keyof typeof Scope];
