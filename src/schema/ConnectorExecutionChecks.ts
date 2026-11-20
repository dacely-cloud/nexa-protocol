// SPDX-FileCopyrightText: 2026 Nexa contributors
// SPDX-License-Identifier: LicenseRef-Proprietary

import type { ConnectorExecutionStatus } from '../dataplane/ConnectorExecutionTypes.js';
import { ExecutionArgumentKind } from 'nerva-connector-protocol/execution/ExecutionArgumentKind.js';
import { ExecutionInputKind } from 'nerva-connector-protocol/execution/ExecutionInput.js';
import { ExecutionInteractiveTransport } from 'nerva-connector-protocol/execution/ExecutionInteractive.js';
import type { ExecutionMachineInvocationRule } from 'nerva-connector-protocol/execution/ExecutionMachineInvocation.js';
import type { ExecutionInteractiveInvocationRule } from 'nerva-connector-protocol/execution/ExecutionInteractiveInvocation.js';
import type { ExecutionInputRule } from 'nerva-connector-protocol/execution/ExecutionJobs.js';

/** Dependent checks supplement generated closed shapes; published permission never proves native availability. */
export class ConnectorExecutionChecks {
    static readonly #encoder: TextEncoder = new TextEncoder();

    /** The generated schema boundary must accept every scalar and collection before this typed check runs. */
    public static status(value: ConnectorExecutionStatus): boolean {
        for (const lane of value.lanes) {
            if (lane.profile === null) {
                continue;
            }
            for (const program of lane.profile.programs) {
                for (const rule of program.arguments) {
                    if (
                        this.#isInteractive(rule) &&
                        (program.arguments.length !== 1 ||
                            !this.#interactive(rule, lane.profile.timeoutMs))
                    ) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    static #isInteractive(
        rule: ExecutionInputRule<string>,
    ): rule is ExecutionInteractiveInvocationRule<string> {
        return rule.kind === ExecutionArgumentKind.InteractiveInvocation.valueOf();
    }

    static #interactive(
        rule: ExecutionInteractiveInvocationRule<string>,
        timeoutMs: number,
    ): boolean {
        const transports: ReadonlySet<ExecutionInteractiveTransport> = new Set(rule.transports);
        const controls: ReadonlySet<ExecutionInputKind> = new Set(rule.controls);
        return (
            transports.size > 0 &&
            transports.size === rule.transports.length &&
            controls.size === rule.controls.length &&
            controls.has(ExecutionInputKind.Data) &&
            (!controls.has(ExecutionInputKind.End) ||
                transports.has(ExecutionInteractiveTransport.Pipe)) &&
            (!controls.has(ExecutionInputKind.Resize) ||
                transports.has(ExecutionInteractiveTransport.Pty)) &&
            controls.has(ExecutionInputKind.Resize) === rule.maximumResizes > 0 &&
            rule.maximumResizes < rule.maximumControls &&
            BigInt(rule.maximumInputBytes) <= 65536n &&
            this.#machine(rule.invocation, timeoutMs)
        );
    }

    static #machine(rule: ExecutionMachineInvocationRule, timeoutMs: number): boolean {
        return (
            rule.maximumTimeoutMs <= timeoutMs &&
            (rule.shell !== null || rule.commands.length > 0) &&
            (rule.shell === null || rule.maximumScriptBytes >= 1) &&
            new Set(
                rule.commands.map(
                    (command: ExecutionMachineInvocationRule['commands'][number]): string =>
                        command.alias,
                ),
            ).size === rule.commands.length &&
            new Set(
                rule.environment.map(
                    (grant: ExecutionMachineInvocationRule['environment'][number]): string =>
                        grant.name,
                ),
            ).size === rule.environment.length &&
            (rule.shell === null ||
                (rule.shell.fixedArguments.every(
                    (argument: string): boolean =>
                        argument.isWellFormed() &&
                        !argument.includes('\0') &&
                        this.#encoder.encode(argument).byteLength <= 1024,
                ) &&
                    rule.shell.fixedArguments.reduce(
                        (bytes: number, argument: string): number =>
                            bytes + this.#encoder.encode(argument).byteLength,
                        0,
                    ) <= 2048))
        );
    }
}
