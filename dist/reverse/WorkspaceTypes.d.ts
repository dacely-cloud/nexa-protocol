/** Native working views shared by model tools and Chat's RE panel. */
export declare const ReverseWorkspaceView: {
    readonly Pseudocode: 'Pseudocode';
    readonly Assembly: 'Assembly';
    readonly Graph: 'Graph';
    readonly Bytes: 'Hex / bytes';
    readonly Evidence: 'All evidence';
    readonly Browser: 'Browser activity';
    readonly Screenshot: 'Screenshot';
    readonly Comparison: 'Comparison';
    readonly Storage: 'Storage';
    readonly StorageChanges: 'Storage changes';
    readonly WebMcp: 'WebMCP';
    readonly Dom: 'DOM';
    readonly Scripts: 'Scripts';
    readonly Resources: 'Resources';
    readonly Imports: 'Imports';
    readonly Accessibility: 'Accessibility';
};
/** One native RE representation. */
export type ReverseWorkspaceView = (typeof ReverseWorkspaceView)[keyof typeof ReverseWorkspaceView];
/** Bottom docks use the same names as Chat's controls. */
export declare const ReverseWorkspaceDock: {
    readonly Agents: 'Agents';
    readonly References: 'References';
    readonly Output: 'Output';
};
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
