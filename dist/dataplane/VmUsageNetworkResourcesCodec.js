// SPDX-FileCopyrightText: 2026 Dacely <business@dacely.com>
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
    static hosts(raw, runningVms) {
        const value = this.#record(raw, [
            'hosts',
            'complete',
            'memory',
            'localStorage',
        ]);
        const hosts = this.#decimal(value['hosts']);
        const complete = value['complete'];
        if (typeof complete !== 'boolean' || BigInt(hosts) > runningVms)
            this.#invalid();
        return {
            hosts,
            complete,
            memory: this.#hostResource(value['memory'], BigInt(hosts)),
            localStorage: this.#hostResource(value['localStorage'], BigInt(hosts)),
        };
    }
    static #hostResource(raw, hosts) {
        const value = this.#record(raw, [
            'observedHosts',
            'totalBytes',
            'availableBytes',
        ]);
        const observedHosts = this.#decimal(value['observedHosts']);
        const totalBytes = this.#decimal(value['totalBytes']);
        const availableBytes = this.#decimal(value['availableBytes']);
        this.#validateResource(BigInt(observedHosts), totalBytes, availableBytes, hosts);
        return { observedHosts, totalBytes, availableBytes };
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
        this.#validateResource(BigInt(observedVms), totalBytes, availableBytes, runningVms);
        return { observedVms, totalBytes, availableBytes };
    }
    static #validateResource(count, totalBytes, availableBytes, possible) {
        const total = BigInt(totalBytes);
        if (count > possible ||
            total < count ||
            total > count * 18446744073709551615n ||
            BigInt(availableBytes) > total) {
            this.#invalid();
        }
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
