// SPDX-FileCopyrightText: 2026 Nexa contributors
// SPDX-License-Identifier: LicenseRef-Proprietary

/** Browser-safe background job receipt, without host pids or log paths. */
export interface BackgroundProcess {
    /** Stop remains available because native cleanup has not been confirmed. */
    readonly cleanupUnconfirmed?: boolean;
    /** A command still attached to its launching tool has an inline terminal. */
    readonly foreground?: boolean;
    readonly processId: string;
    readonly command: string;
    readonly cwd: string;
    readonly startedAt: string;
    readonly endedAt: string | null;
    readonly running: boolean;
    readonly exitCode: number | null;
    readonly signal: string | null;
}

/** A process must always be addressed inside its owning conversation. */
export interface BackgroundProcessRef {
    readonly sessionId: string;
    readonly processId: string;
}

/** Keystrokes are bounded and addressed through the owning session. */
export interface ProcessInput extends BackgroundProcessRef {
    readonly data: string;
}

/** Terminal dimensions are small positive integers. */
export interface ProcessResize extends BackgroundProcessRef {
    readonly cols: number;
    readonly rows: number;
}

/** Incremental reads share the same bounded log endpoint as background job tails. */
export interface ProcessLogRef extends BackgroundProcessRef {
    readonly offset?: string;
}

/** A bounded tail and complete byte boundary, represented losslessly on the wire. */
export interface BackgroundProcessLog {
    readonly text: string;
    readonly endOffset: string;
    readonly truncated: boolean;
}
