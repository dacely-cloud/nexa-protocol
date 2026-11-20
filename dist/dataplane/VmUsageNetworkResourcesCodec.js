// SPDX-FileCopyrightText: 2026 Nerva contributors
// SPDX-License-Identifier: LicenseRef-Proprietary
/** Validates fleet aggregates at the gateway and before rendering them. */
export class VmUsageNetworkResourcesCodec {
    static read(raw, runningVms) {
        const value = this.#record(raw, [
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
    static #resource(raw, runningVms) {
        const value = this.#record(raw, [
            'observedVms',
            'totalBytes',
            'availableBytes',
        ]);
        const observedVms = this.#decimal(value['observedVms']);
        const totalBytes = this.#decimal(value['totalBytes']);
        const availableBytes = this.#decimal(value['availableBytes']);
        const count = BigInt(observedVms);
        const total = BigInt(totalBytes);
        if (count > runningVms ||
            total < count ||
            total > count * 18446744073709551615n ||
            BigInt(availableBytes) > total) {
            this.#invalid();
        }
        return { observedVms, totalBytes, availableBytes };
    }
    static #record(raw, fields) {
        if (typeof raw !== 'object' ||
            raw === null ||
            Array.isArray(raw) ||
            Object.getPrototypeOf(raw) !== Object.prototype ||
            Object.keys(raw).length !== fields.length ||
            !fields.every((field) => Object.hasOwn(raw, field))) {
            this.#invalid();
        }
        return raw;
    }
    static #decimal(raw) {
        if (typeof raw !== 'string' || !/^(?:0|[1-9][0-9]{0,38})$/u.test(raw))
            this.#invalid();
        return raw;
    }
    static #invalid() {
        throw new Error('Invalid VM network resource totals');
    }
}
