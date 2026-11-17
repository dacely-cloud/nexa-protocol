import type { WorkflowApplication } from './ApplicationTypes.js';
export declare const ApplicationConnection: {
    readonly Connected: 'connected';
    readonly Setup: 'setup-required';
    readonly Unavailable: 'unavailable';
};
export type ApplicationConnection = (typeof ApplicationConnection)[keyof typeof ApplicationConnection];
export interface WorkflowApplicationStatus {
    readonly application: WorkflowApplication;
    readonly title: string;
    readonly status: ApplicationConnection;
}
export interface WorkflowTerminalRequest {
    readonly sessionId: string;
}
export declare const TerminalAction: {
    readonly Input: 'input';
    readonly Resize: 'resize';
    readonly Stop: 'stop';
};
export type TerminalAction = (typeof TerminalAction)[keyof typeof TerminalAction];
export interface WorkflowTerminalCommand extends WorkflowTerminalRequest {
    readonly commandId: string;
    readonly expectedRevision: string;
    readonly action: TerminalAction;
    readonly input: string;
    readonly cols: number;
    readonly rows: number;
}
export declare const TerminalStatus: {
    readonly Starting: 'starting';
    readonly Running: 'running';
    readonly Exited: 'exited';
    readonly Interrupted: 'interrupted';
};
export type TerminalStatus = (typeof TerminalStatus)[keyof typeof TerminalStatus];
export interface WorkflowTerminalSnapshot extends WorkflowTerminalRequest {
    readonly application: WorkflowApplication;
    readonly status: TerminalStatus;
    readonly setup: boolean;
    readonly screen: string;
    readonly cols: number;
    readonly rows: number;
    readonly revision: string;
    readonly commandRevision: string;
    readonly commandId: string;
    readonly error: string;
}
