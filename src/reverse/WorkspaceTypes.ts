// SPDX-FileCopyrightText: 2026 Nexa contributors
// SPDX-License-Identifier: LicenseRef-Proprietary

/** Native working views shared by model tools and Chat's RE panel. */
export const ReverseWorkspaceView = {
    Pseudocode: 'Pseudocode',
    Assembly: 'Assembly',
    Graph: 'Graph',
    Bytes: 'Hex / bytes',
    Evidence: 'All evidence',
    Browser: 'Browser activity',
    Screenshot: 'Screenshot',
    Comparison: 'Comparison',
    Storage: 'Storage',
    StorageChanges: 'Storage changes',
    WebMcp: 'WebMCP',
    Dom: 'DOM',
    Scripts: 'Scripts',
    Resources: 'Resources',
    Imports: 'Imports',
    Accessibility: 'Accessibility',
} as const;

/** One native RE representation. */
export type ReverseWorkspaceView = (typeof ReverseWorkspaceView)[keyof typeof ReverseWorkspaceView];

/** Bottom docks use the same names as Chat's controls. */
export const ReverseWorkspaceDock = {
    Agents: 'Agents',
    References: 'References',
    Output: 'Output',
} as const;

/** A native bottom dock. */
export type ReverseWorkspaceDock = (typeof ReverseWorkspaceDock)[keyof typeof ReverseWorkspaceDock];

/** Independent presentation revisions never interfere with execution checkpoint revisions. */
export interface ReverseWorkspaceState {
    readonly revision: string;
    readonly evidenceId: string | null;
    readonly view: ReverseWorkspaceView;
    readonly navigation: boolean;
    readonly graph: boolean;
    readonly dock: ReverseWorkspaceDock | null;
    readonly follow: boolean;
}
