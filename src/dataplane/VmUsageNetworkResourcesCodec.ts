// SPDX-FileCopyrightText: 2026 Nerva contributors
// SPDX-License-Identifier: LicenseRef-Proprietary

import type { VmUsageNetworkResource, VmUsageNetworkResources } from './VmUsageNetworkTypes.js';

/** Validates fleet aggregates at the gateway and before rendering them. */
export class VmUsageNetworkResourcesCodec {
    public static read(raw: unknown, runningVms: bigint): VmUsageNetworkResources {
        const value: Readonly<Record<string, unknown>> = this.#record(raw, [
            'memory',
            'root',
            'workspace',
        ]);
        return {
            memory: this.#resource(value['memory'], runningVms),
            root: this.#resource(value['root'], runningVms),
            workspace: this.#resource(value['workspace'], runningVms),
        };
    }

    static #resource(raw: unknown, runningVms: bigint): VmUsageNetworkResource {
        const value: Readonly<Record<string, unknown>> = this.#record(raw, [
            'observedVms',
            'totalBytes',
            'availableBytes',
        ]);
        const observedVms: string = this.#decimal(value['observedVms']);
        const totalBytes: string = this.#decimal(value['totalBytes']);
        const availableBytes: string = this.#decimal(value['availableBytes']);
        const count: bigint = BigInt(observedVms);
        const total: bigint = BigInt(totalBytes);
        if (
            count > runningVms ||
            total < count ||
            total > count * 18_446_744_073_709_551_615n ||
            BigInt(availableBytes) > total
        ) {
            this.#invalid();
        }
        return { observedVms, totalBytes, availableBytes };
    }

    static #record(raw: unknown, fields: readonly string[]): Readonly<Record<string, unknown>> {
        if (
            typeof raw !== 'object' ||
            raw === null ||
            Array.isArray(raw) ||
            Object.getPrototypeOf(raw) !== Object.prototype ||
            Object.keys(raw).length !== fields.length ||
            !fields.every((field: string): boolean => Object.hasOwn(raw, field))
        ) {
            this.#invalid();
        }
        return raw as Readonly<Record<string, unknown>>;
    }

    static #decimal(raw: unknown): string {
        if (typeof raw !== 'string' || !/^(?:0|[1-9][0-9]{0,38})$/u.test(raw)) this.#invalid();
        return raw;
    }

    static #invalid(): never {
        throw new Error('Invalid VM network resource totals');
    }
}
