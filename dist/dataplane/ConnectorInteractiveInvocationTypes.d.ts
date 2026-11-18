import type { ConnectorArgumentKind } from './ConnectorArgumentKind.js';
import type { ConnectorMachineInvocationRule } from './ConnectorMachineInvocationTypes.js';
/** An explicit signed grant selects the native I/O mechanism. */
export declare enum ConnectorInteractiveTransport {
    Pipe = "pipe",
    Pty = "pty"
}
/** Data, pipe EOF and terminal resize are distinct immutable operations. */
export declare enum ConnectorInputKind {
    Data = "data",
    End = "end",
    Resize = "resize"
}
/** The complete live-input policy supplements one independently bounded Machine invocation. */
export interface ConnectorInteractiveInvocationRule {
    readonly kind: typeof ConnectorArgumentKind.InteractiveInvocation;
    readonly invocation: ConnectorMachineInvocationRule;
    readonly transports: readonly ConnectorInteractiveTransport[];
    readonly controls: readonly ConnectorInputKind[];
    /** Canonical decimal bytes include the explicitly admitted initial input. */
    readonly maximumInputBytes: string;
    readonly maximumControls: number;
    readonly maximumResizes: number;
}
