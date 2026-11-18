// SPDX-FileCopyrightText: 2026 Nexa contributors
// SPDX-License-Identifier: LicenseRef-Proprietary
import { ConnectorArgumentKind } from '../dataplane/ConnectorArgumentKind.js';
import { ConnectorInputKind, ConnectorInteractiveTransport, } from '../dataplane/ConnectorInteractiveInvocationTypes.js';
/** Dependent checks supplement generated closed shapes; published permission never proves native availability. */
export class ConnectorExecutionChecks {
    static #encoder = new TextEncoder();
    /** The generated schema boundary must accept every scalar and collection before this typed check runs. */
    static status(value) {
        for (const lane of value.lanes) {
            if (lane.profile === null) {
                continue;
            }
            for (const program of lane.profile.programs) {
                for (const rule of program.arguments) {
                    if (this.#isInteractive(rule) &&
                        (program.arguments.length !== 1 ||
                            !this.#interactive(rule, lane.profile.timeoutMs))) {
                        return false;
                    }
                }
            }
        }
        return true;
    }
    static #isInteractive(rule) {
        return rule.kind === ConnectorArgumentKind.InteractiveInvocation.valueOf();
    }
    static #interactive(rule, timeoutMs) {
        const transports = new Set(rule.transports);
        const controls = new Set(rule.controls);
        return (transports.size > 0 &&
            transports.size === rule.transports.length &&
            controls.size === rule.controls.length &&
            controls.has(ConnectorInputKind.Data) &&
            (!controls.has(ConnectorInputKind.End) ||
                transports.has(ConnectorInteractiveTransport.Pipe)) &&
            (!controls.has(ConnectorInputKind.Resize) ||
                transports.has(ConnectorInteractiveTransport.Pty)) &&
            controls.has(ConnectorInputKind.Resize) === rule.maximumResizes > 0 &&
            rule.maximumResizes < rule.maximumControls &&
            BigInt(rule.maximumInputBytes) <= 65536n &&
            this.#machine(rule.invocation, timeoutMs));
    }
    static #machine(rule, timeoutMs) {
        return (rule.maximumTimeoutMs <= timeoutMs &&
            (rule.shell !== null || rule.commands.length > 0) &&
            (rule.shell === null || rule.maximumScriptBytes >= 1) &&
            new Set(rule.commands.map((command) => command.alias)).size === rule.commands.length &&
            new Set(rule.environment.map((grant) => grant.name)).size === rule.environment.length &&
            (rule.shell === null ||
                (rule.shell.fixedArguments.every((argument) => argument.isWellFormed() &&
                    !argument.includes('\0') &&
                    this.#encoder.encode(argument).byteLength <= 1024) &&
                    rule.shell.fixedArguments.reduce((bytes, argument) => bytes + this.#encoder.encode(argument).byteLength, 0) <= 2048)));
    }
}
