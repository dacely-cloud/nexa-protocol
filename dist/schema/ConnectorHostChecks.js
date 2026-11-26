// SPDX-FileCopyrightText: 2026 Dacely <business@dacely.com>
// SPDX-License-Identifier: LicenseRef-Proprietary
import { ConnectorHostJson } from 'nerva-connector-protocol/protocol/ConnectorHostJson.js';
/** Dependent int64, native-path and JSON limits complement the closed full-host wire schemas. */
export class ConnectorHostChecks {
    /** Exact server clocks and finite future transitions fence one conditional connector snapshot. */
    static context(raw) {
        const now = this.#integer(this.#field(raw, 'serverNowMs'));
        const rawNext = this.#field(raw, 'nextTransitionAtMs');
        const next = rawNext === null ? null : this.#integer(rawNext);
        return now !== null && (rawNext === null || (next !== null && next > now));
    }
    /** Inventory publishes only consent/tool metadata, never the private native working directory. */
    static inventory(raw) {
        const items = this.#field(raw, 'items');
        return (Array.isArray(items) &&
            items.every((item) => {
                const host = this.#field(item, 'host');
                return host === null || this.#summary(host);
            }));
    }
    /** Permanent acknowledgments cannot advance beyond the host's exact accepted sequence. */
    static status(raw) {
        const sequence = this.#integer(this.#field(raw, 'sequence'));
        const acknowledged = this.#integer(this.#field(raw, 'acknowledgedSequence'));
        const profile = this.#field(raw, 'profile');
        return (sequence !== null &&
            acknowledged !== null &&
            acknowledged <= sequence &&
            (profile === null || this.#profile(profile)));
    }
    /** Admission never truncates grant revisions or accepts unbounded nested argument JSON. */
    static submit(raw) {
        const sequence = this.#integer(this.#field(raw, 'previousSequence'));
        return (sequence !== null &&
            sequence < 9223372036854775807n &&
            this.#request(this.#field(raw, 'request')));
    }
    /** Full-host placement pins one finite positive grant revision without accepting local authority fields. */
    static select(raw) {
        const revision = this.#integer(this.#field(raw, 'grantRevision'));
        return revision !== null && revision > 0n;
    }
    /** Host placement keeps exact revisions and native absolute paths while other kinds keep their own schemas. */
    static workspace(raw) {
        const selection = this.#field(raw, 'selection');
        return (this.#field(selection, 'kind') !== 'host' ||
            (this.select(selection) && this.#directory(this.#field(selection, 'directory'))));
    }
    /** Terminal uncertainty stays explicit; successful native data must be one bounded JSON object. */
    static job(raw) {
        const sequence = this.#integer(this.#field(raw, 'sequence'));
        const phase = this.#field(raw, 'phase');
        const response = this.#field(raw, 'response');
        if (sequence === null ||
            sequence === 0n ||
            !this.#request(this.#field(raw, 'request')) ||
            (phase === 'completed') !== (response !== null)) {
            return false;
        }
        if (response === null) {
            return true;
        }
        const outcome = this.#field(response, 'outcome');
        const result = this.#field(response, 'resultJson');
        const errorCode = this.#field(response, 'errorCode');
        return outcome === 'succeeded'
            ? errorCode === null && this.#json(result, 131072)
            : errorCode !== null && errorCode !== undefined && result === null;
    }
    static #profile(raw) {
        return this.#summary(raw) && this.#directory(this.#field(raw, 'directory'));
    }
    static #directory(directory) {
        return (typeof directory === 'string' &&
            directory.length > 0 &&
            directory.length <= 4096 &&
            directory.isWellFormed() &&
            !Array.from(directory).some((character) => character.charCodeAt(0) < 32 || character.charCodeAt(0) === 127) &&
            (directory.startsWith('/') ||
                /^[A-Za-z]:[\\/]/u.test(directory) ||
                directory.startsWith('\\\\')));
    }
    static #summary(raw) {
        const revision = this.#integer(this.#field(raw, 'grantRevision'));
        const tools = this.#field(raw, 'tools');
        return (revision !== null &&
            revision > 0n &&
            Array.isArray(tools) &&
            tools.length > 0 &&
            new Set(tools).size === tools.length);
    }
    static #request(raw) {
        const revision = this.#integer(this.#field(raw, 'grantRevision'));
        return (revision !== null &&
            revision > 0n &&
            this.#json(this.#field(raw, 'argumentsJson'), 65536));
    }
    static #json(raw, maximum) {
        try {
            ConnectorHostJson.object(raw, maximum);
            return true;
        }
        catch {
            return false;
        }
    }
    static #integer(raw) {
        if (typeof raw !== 'string' || !/^(0|[1-9][0-9]{0,18})$/u.test(raw)) {
            return null;
        }
        const value = BigInt(raw);
        return value <= 9223372036854775807n ? value : null;
    }
    static #field(raw, key) {
        if (typeof raw !== 'object' || raw === null) {
            return undefined;
        }
        const descriptor = Object.getOwnPropertyDescriptor(raw, key);
        return descriptor !== undefined && Object.hasOwn(descriptor, 'value')
            ? descriptor.value
            : undefined;
    }
}
