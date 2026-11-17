// SPDX-FileCopyrightText: 2026 Nexa contributors
// SPDX-License-Identifier: LicenseRef-Proprietary
/** Wire types are explicit; decimal integers never masquerade as floating point numbers. */
export const SchemaKind = {
    Text: 'text',
    Number: 'number',
    Integer: 'integer',
    Boolean: 'boolean',
    Timestamp: 'timestamp',
    Datetime: 'datetime',
    Json: 'json',
    Object: 'object',
    List: 'list',
    File: 'file',
    Image: 'image',
    Audio: 'audio',
    Video: 'video',
    Message: 'message',
    Table: 'table',
    Resource: 'resource',
    Flow: 'flow',
};
