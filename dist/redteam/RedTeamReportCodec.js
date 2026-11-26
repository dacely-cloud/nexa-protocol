// SPDX-FileCopyrightText: 2026 Dacely <business@dacely.com>
// SPDX-License-Identifier: LicenseRef-Proprietary
import { RedTeamInput } from './RedTeamInput.js';
/** Reads report details without inventing values for work that has not been reported. */
export class RedTeamReportCodec {
    /** Each field is optional, but a present field must satisfy its complete contract. */
    static parse(raw) {
        const value = RedTeamInput.record(raw, [], [
            'impact',
            'affectedVersions',
            'prerequisites',
            'expectedBehavior',
            'actualBehavior',
            'remediation',
            'technicalDetails',
            'cveIds',
            'cweIds',
            'references',
        ]);
        return {
            ...(Object.hasOwn(value, 'impact')
                ? { impact: RedTeamInput.text(value['impact'], 16_384) }
                : {}),
            ...(Object.hasOwn(value, 'affectedVersions')
                ? { affectedVersions: RedTeamInput.text(value['affectedVersions'], 16_384) }
                : {}),
            ...(Object.hasOwn(value, 'prerequisites')
                ? {
                    prerequisites: RedTeamInput.list(value['prerequisites'], 100, (item) => RedTeamInput.text(item, 4096)),
                }
                : {}),
            ...(Object.hasOwn(value, 'expectedBehavior')
                ? { expectedBehavior: RedTeamInput.text(value['expectedBehavior'], 16_384) }
                : {}),
            ...(Object.hasOwn(value, 'actualBehavior')
                ? { actualBehavior: RedTeamInput.text(value['actualBehavior'], 16_384) }
                : {}),
            ...(Object.hasOwn(value, 'remediation')
                ? { remediation: RedTeamInput.text(value['remediation'], 16_384) }
                : {}),
            ...(Object.hasOwn(value, 'technicalDetails')
                ? { technicalDetails: RedTeamInput.text(value['technicalDetails'], 64_000) }
                : {}),
            ...(Object.hasOwn(value, 'cveIds')
                ? { cveIds: this.#identifiers(value['cveIds'], /^CVE-[0-9]{4}-[0-9]{4,19}$/u) }
                : {}),
            ...(Object.hasOwn(value, 'cweIds')
                ? { cweIds: this.#identifiers(value['cweIds'], /^CWE-[1-9][0-9]{0,7}$/u) }
                : {}),
            ...(Object.hasOwn(value, 'references')
                ? {
                    references: RedTeamInput.list(value['references'], 64, (item) => this.reference(item)),
                }
                : {}),
        };
    }
    /** Display links must not execute scripts or carry account credentials. */
    static reference(raw) {
        const value = RedTeamInput.record(raw, ['title', 'url']);
        const url = RedTeamInput.text(value['url'], 2048);
        if (!/^https?:\/\//iu.test(url)) {
            throw new TypeError('Report reference must be an absolute HTTP or HTTPS link');
        }
        for (let index = 0; index < url.length; index += 1) {
            const code = url.charCodeAt(index);
            if (code <= 32 || code === 127) {
                throw new TypeError('Report reference URL contains whitespace or control characters');
            }
        }
        const parsed = new URL(url);
        if ((parsed.protocol !== 'https:' && parsed.protocol !== 'http:') ||
            parsed.username !== '' ||
            parsed.password !== '') {
            throw new TypeError('Report reference must be an HTTP or HTTPS link without credentials');
        }
        return { title: RedTeamInput.text(value['title'], 256), url };
    }
    static #identifiers(raw, pattern) {
        const identifiers = RedTeamInput.list(raw, 32, (item) => {
            const value = RedTeamInput.text(item, 32);
            if (!pattern.test(value)) {
                throw new TypeError('Invalid reported vulnerability identifier');
            }
            return value;
        });
        RedTeamInput.unique(identifiers);
        return identifiers;
    }
}
