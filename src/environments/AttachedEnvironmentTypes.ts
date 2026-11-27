// SPDX-FileCopyrightText: 2026 Dacely <business@dacely.com>
// SPDX-License-Identifier: LicenseRef-Proprietary

/**
 * Environments an API client attaches to its own gateway connection.
 *
 * @remarks
 * A client that owns a sandbox, a container or a build machine can lend it to its turns: it
 * attaches the environment, names it in a turn's `attachedEnvironments`, and answers each
 * `environment.request` event with `environments.respond`. The environment lives as long as the
 * connection that attached it, and only that connection's turns can use it. Nexa never widens
 * what the client chooses to execute: every operation is the client's to run or refuse.
 */

/** Operating systems an attached environment can report. */
export const AttachedEnvironmentPlatform = {
    Linux: 'linux',
    Windows: 'windows',
    Macos: 'macos',
} as const;

/** Union of {@link AttachedEnvironmentPlatform} values. */
export type AttachedEnvironmentPlatform =
    (typeof AttachedEnvironmentPlatform)[keyof typeof AttachedEnvironmentPlatform];

/** Describes an environment to attach. */
export interface AttachEnvironmentParams {
    /** User-facing name, such as "CI container". */
    readonly name: string;
    readonly platform: AttachedEnvironmentPlatform;
    /** Absolute path of the working directory tools start in. */
    readonly root: string;
    /** What the environment is for and what it has installed, shown to the model. */
    readonly description?: string;
}

/** An attached environment. */
export interface AttachedEnvironment {
    readonly id: string;
    readonly name: string;
    readonly platform: AttachedEnvironmentPlatform;
    readonly root: string;
    readonly description?: string;
}

/** Names one attached environment. */
export interface AttachedEnvironmentParams {
    readonly id: string;
}

/** Environments attached on this connection. */
export interface AttachedEnvironmentsPage {
    readonly items: readonly AttachedEnvironment[];
}

/** Runs a command. Without `argv` the command goes to the platform shell. */
export interface AttachedEnvironmentExec {
    readonly kind: 'exec';
    readonly command: string;
    readonly argv?: readonly string[];
    readonly cwd: string;
    readonly env?: Readonly<Record<string, string>>;
    readonly stdin?: string;
    /**
     * @minimum 1
     * @maximum 86400000
     * @TJS-type integer
     */
    readonly timeoutMs?: number;
}

/** Reads a whole file. */
export interface AttachedEnvironmentRead {
    readonly kind: 'read';
    readonly path: string;
}

/** Writes a whole file. */
export interface AttachedEnvironmentWrite {
    readonly kind: 'write';
    readonly path: string;
    /** File bytes, base64. */
    readonly data: string;
    /**
     * @minimum 0
     * @maximum 4095
     * @TJS-type integer
     */
    readonly mode?: number;
    /** Creates missing parent directories. */
    readonly parents?: boolean;
}

/** Lists a directory. */
export interface AttachedEnvironmentList {
    readonly kind: 'list';
    readonly path: string;
}

/** Describes one path. */
export interface AttachedEnvironmentStat {
    readonly kind: 'stat';
    readonly path: string;
}

/** Removes a path. */
export interface AttachedEnvironmentRemove {
    readonly kind: 'remove';
    readonly path: string;
    readonly recursive: boolean;
}

/** One operation Nexa asks the attaching client to run. */
export type AttachedEnvironmentOperation =
    | AttachedEnvironmentExec
    | AttachedEnvironmentRead
    | AttachedEnvironmentWrite
    | AttachedEnvironmentList
    | AttachedEnvironmentStat
    | AttachedEnvironmentRemove;

/** The payload of an `environment.request` event. */
export interface AttachedEnvironmentRequestData {
    readonly environmentId: string;
    readonly requestId: string;
    readonly operation: AttachedEnvironmentOperation;
}

/** How a command ended, with its bounded output. */
export interface AttachedEnvironmentExecResult {
    readonly kind: 'exec';
    /** Null when the command ended on a signal or a timeout. */
    readonly exitCode: number | null;
    readonly signal: string | null;
    readonly timedOut: boolean;
    readonly stdout: string;
    readonly stderr: string;
}

/** A file's bytes. */
export interface AttachedEnvironmentReadResult {
    readonly kind: 'read';
    /** File bytes, base64. */
    readonly data: string;
}

/** A write or remove finished. */
export interface AttachedEnvironmentDoneResult {
    readonly kind: 'done';
}

/** One directory entry. */
export interface AttachedEnvironmentEntry {
    readonly name: string;
    readonly type: 'file' | 'directory' | 'symlink' | 'other';
}

/** A directory listing. */
export interface AttachedEnvironmentListResult {
    readonly kind: 'list';
    readonly entries: readonly AttachedEnvironmentEntry[];
}

/** What one path is. */
export interface AttachedEnvironmentStatResult {
    readonly kind: 'stat';
    readonly type: 'file' | 'directory' | 'symlink' | 'other';
    /**
     * @minimum 0
     * @TJS-type integer
     */
    readonly size: number;
    /** Epoch milliseconds. */
    readonly modifiedAt: number;
    /**
     * @minimum 0
     * @maximum 65535
     * @TJS-type integer
     */
    readonly mode: number;
}

/** Why an operation failed. */
export const AttachedEnvironmentErrorCode = {
    NotFound: 'not-found',
    Denied: 'denied',
    Failed: 'failed',
} as const;

/** Union of {@link AttachedEnvironmentErrorCode} values. */
export type AttachedEnvironmentErrorCode =
    (typeof AttachedEnvironmentErrorCode)[keyof typeof AttachedEnvironmentErrorCode];

/** The operation failed. */
export interface AttachedEnvironmentErrorResult {
    readonly kind: 'error';
    readonly code: AttachedEnvironmentErrorCode;
    readonly message: string;
}

/** Union of every operation result. */
export type AttachedEnvironmentResult =
    | AttachedEnvironmentExecResult
    | AttachedEnvironmentReadResult
    | AttachedEnvironmentDoneResult
    | AttachedEnvironmentListResult
    | AttachedEnvironmentStatResult
    | AttachedEnvironmentErrorResult;

/** Answers one `environment.request`. */
export interface AttachedEnvironmentRespondParams {
    readonly requestId: string;
    readonly result: AttachedEnvironmentResult;
}

/** The answer was accepted. */
export interface AttachedEnvironmentRespondResult {
    readonly accepted: boolean;
}

/** `environments.attach` contract. */
export interface EnvironmentsAttachMethod {
    readonly params: AttachEnvironmentParams;
    readonly result: AttachedEnvironment;
}

/** `environments.detach` contract. */
export interface EnvironmentsDetachMethod {
    readonly params: AttachedEnvironmentParams;
    readonly result: AttachedEnvironmentRespondResult;
}

/** `environments.list` contract. */
export interface EnvironmentsListMethod {
    readonly params: Readonly<Record<string, never>>;
    readonly result: AttachedEnvironmentsPage;
}

/** `environments.respond` contract. */
export interface EnvironmentsRespondMethod {
    readonly params: AttachedEnvironmentRespondParams;
    readonly result: AttachedEnvironmentRespondResult;
}
