// SPDX-License-Identifier: LicenseRef-Proprietary

/** A file delivered to an application through the gateway. */
export interface DeliveredAttachment {
    /**
     * Stable delivery identifier shared by the event and terminal result.
     * @maxLength 36
     */
    readonly id: string;
    /** @maxLength 8192 */
    readonly filename: string;
    /** @maxLength 512 */
    readonly mimeType: string;
    /**
     * Size of the accompanying binary WebSocket payload.
     * @minimum 0
     * @maximum 314572800
     */
    readonly byteLength: number;
    /** @maxLength 65536 */
    readonly description?: string;
    readonly asFile?: boolean;
    /** The server verified that the bounded ZIP contains a website entry page. */
    readonly website?: boolean;
}
