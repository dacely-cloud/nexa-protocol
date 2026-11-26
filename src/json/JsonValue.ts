// SPDX-FileCopyrightText: 2026 Dacely <business@dacely.com>
// SPDX-License-Identifier: LicenseRef-Proprietary

/** A JSON object: every property value is itself JSON. */
export interface JsonObject {
    readonly [key: string]: JsonValue;
}

/** A JSON value, as it appears in a tool's arguments or a JSON Schema. */
export type JsonValue = string | number | boolean | null | readonly JsonValue[] | JsonObject;
