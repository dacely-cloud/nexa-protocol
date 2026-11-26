// SPDX-FileCopyrightText: 2026 Dacely <business@dacely.com>
// SPDX-License-Identifier: LicenseRef-Proprietary

/** Locations choose a server-resolved account root, never a host path or machine ID. */
export const BrowserFilesLocation = { Account: 'account', Vm: 'vm' } as const;

/** Persistent account storage remains available independently of VM execution. */
export type BrowserFilesLocation = (typeof BrowserFilesLocation)[keyof typeof BrowserFilesLocation];

/** Each operation retains the selected storage location, including staged upload acknowledgments. */
export interface BrowserFilesContext {
    readonly location?: BrowserFilesLocation;
    /** An owned Chat/project workspace ID, never an absolute filesystem path. */
    readonly workspaceId?: string;
}

/** Relative UTF-8 path; an empty path denotes the workspace directory. */
export interface BrowserFilesPath extends BrowserFilesContext {
    readonly path: string;
}

/** Directory cursors bind both position and directory revision. */
export interface BrowserFilesListParams extends BrowserFilesPath {
    readonly cursor?: string;
}

/** All operations after discovery retain the original account assignment. */
export interface BrowserFilesTarget extends BrowserFilesPath {
    readonly assignment: string;
}

/** Rename targets another sibling name and refuses replacement of existing data. */
export interface BrowserFilesRenameParams extends BrowserFilesTarget {
    readonly destination: string;
}

/** Bounded reads retain the opened file's exact revision across download chunks. */
export interface BrowserFilesReadParams extends BrowserFilesTarget {
    readonly offset: string;
    readonly revision?: string;
}

/** Uploads publish a new file or extract a ZIP into a new directory, without replacing existing data. */
export interface BrowserFilesStartParams extends BrowserFilesTarget {
    readonly byteLength: string;
    readonly extractZip: boolean;
}

/** Opaque upload handles are scoped to the authenticated account and captured assignment. */
export interface BrowserFilesUploadParams extends BrowserFilesContext {
    readonly uploadId: string;
}

/** One acknowledged slice; retries must contain the same bytes at the same offset. */
export interface BrowserFilesChunkParams extends BrowserFilesUploadParams {
    readonly offset: string;
    readonly data: string;
}

/** Metadata never follows symlinks, devices or mounts. */
export interface BrowserFilesEntry {
    readonly name: string;
    readonly kind: string;
    readonly byteLength: string;
    readonly modifiedAtNs: string;
}

/** Only one bounded directory page is materialized. */
export interface BrowserFilesPage {
    readonly assignment: string;
    readonly entries: readonly BrowserFilesEntry[];
    readonly nextCursor: string | null;
}

/** One bounded binary slice encoded for the existing gateway codec. */
export interface BrowserFilesRead {
    readonly assignment: string;
    readonly revision: string;
    readonly byteLength: string;
    readonly data: string;
}

/** Upload acknowledgement advertises its bounded chunk size. */
export interface BrowserFilesUpload {
    readonly uploadId: string;
    readonly chunkBytes: number;
}

/** Exact acknowledged byte position. */
export interface BrowserFilesPosition {
    readonly offset: string;
}

/** Publication succeeds only after the complete new file or directory is committed. */
export interface BrowserFilesDone {
    readonly ok: boolean;
}
