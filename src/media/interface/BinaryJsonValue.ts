// SPDX-FileCopyrightText: 2026 Nexa contributors
// SPDX-License-Identifier: LicenseRef-Proprietary

/** Finite JSON values and byte carriers borrowed for the duration of synchronous framing. */
export type BinaryJsonValue =
    null | boolean | number | string | Uint8Array | BinaryJsonValue[] | BinaryJsonObject;

/** Validated JSON fields; undefined fields are omitted when producing metadata. */
export interface BinaryJsonObject {
    readonly [key: string]: BinaryJsonValue | undefined;
}
