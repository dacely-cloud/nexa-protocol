// SPDX-FileCopyrightText: 2026 Nexa contributors
// SPDX-License-Identifier: LicenseRef-Proprietary

/** Log severity, least → most severe. */
export const LogLevel = {
    Debug: 'debug',
    Info: 'info',
    Warn: 'warn',
    Error: 'error',
} as const;

/** One log level. */
export type LogLevel = (typeof LogLevel)[keyof typeof LogLevel];

/**
 * Structured fields carried alongside a line. Scalars only, like a span's attributes.
 *
 * A message is prose and prose cannot be filtered. `trace_id` and `request_id` are what turn a pile
 * of lines back into "everything that happened while serving THIS request", which is the question
 * anyone reading a log during an incident is actually asking.
 */
export type LogFields = Readonly<Record<string, string | number | boolean>>;
