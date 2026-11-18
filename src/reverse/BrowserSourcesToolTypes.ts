// SPDX-FileCopyrightText: 2026 Nexa contributors
// SPDX-License-Identifier: LicenseRef-Proprietary

import type { BrowserSourceScript } from './BrowserSourcesTypes.js';

/** Metadata and source content are selected independently, with distinct cursors. */
export const BrowserSourcesView = {
    Scripts: 'scripts',
    Resources: 'resources',
    Source: 'source',
} as const;

/** Saved capture views do not attach or execute page code. */
export type BrowserSourcesView = (typeof BrowserSourcesView)[keyof typeof BrowserSourcesView];

/** Script listings never inline their source bodies. */
export interface BrowserSourceScriptSummary extends Omit<BrowserSourceScript, 'source'> {
    readonly source: Omit<BrowserSourceScript['source'], 'text'>;
}
