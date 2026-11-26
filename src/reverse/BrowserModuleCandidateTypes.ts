// SPDX-FileCopyrightText: 2026 Dacely <business@dacely.com>
// SPDX-License-Identifier: LicenseRef-Proprietary

/** Captured URL match strength is independent of execution and content identity. */
export const BrowserModuleMatch = {
    Exact: 'exact-reported-url',
    Response: 'response-url-without-fragment',
} as const;

/** Browser URL candidate matching provenance. */
export type BrowserModuleMatch = (typeof BrowserModuleMatch)[keyof typeof BrowserModuleMatch];
