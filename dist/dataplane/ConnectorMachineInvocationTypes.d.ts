import type { ConnectorArgumentKind } from './ConnectorArgumentKind.js';
/** This index refers only to the owning program's pinned [program, ...children] table. */
export interface ConnectorMachineCommand {
    readonly alias: string;
    readonly executableIndex: number;
}
/** Fixed local switches precede the signed script, without guessing shell syntax from an executable name. */
export interface ConnectorMachineShell {
    readonly executableIndex: number;
    readonly fixedArguments: readonly string[];
}
/** A permitted environment name has its own UTF-8 value ceiling. */
export interface ConnectorMachineEnvironmentGrant {
    readonly name: string;
    readonly maximumBytes: number;
}
/** The complete explicit local opt-in is published under the device's existing signed profile. */
export interface ConnectorMachineInvocationRule {
    readonly kind: typeof ConnectorArgumentKind.MachineInvocation;
    readonly shell: ConnectorMachineShell | null;
    readonly commands: readonly ConnectorMachineCommand[];
    readonly maximumCwdBytes: number;
    readonly environment: readonly ConnectorMachineEnvironmentGrant[];
    readonly maximumEnvironmentBytes: number;
    readonly maximumStdinBytes: number;
    readonly maximumTimeoutMs: number;
    readonly maximumArguments: number;
    readonly maximumArgumentBytes: number;
    readonly maximumArgumentsBytes: number;
    readonly maximumScriptBytes: number;
}
