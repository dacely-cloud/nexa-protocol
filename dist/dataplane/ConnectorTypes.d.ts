import type { ConnectorFileMode } from './ConnectorFileMode.js';
import type { ConnectorOperationAuthorization } from './ConnectorOperationTypes.js';
/** Enrollment state is separate from a current authenticated transport or file grant. */
export declare const ConnectorPhase: {
    readonly Pending: 'pending';
    readonly EnrolledOffline: 'enrolled-offline';
    readonly Revoked: 'revoked';
};
/** One ConnectorPhase value. */
export type ConnectorPhase = (typeof ConnectorPhase)[keyof typeof ConnectorPhase];
/** Safe metadata includes no device key, workload proof, controller endpoint or host pathname. */
export interface ConnectorView {
    readonly id: string;
    readonly environmentId: string;
    readonly name: string;
    readonly phase: ConnectorPhase;
    readonly revision: string;
    readonly issuedAtMs: string;
    readonly expiresAtMs: string;
    readonly enrolledAtMs: string | null;
    readonly revokedAtMs: string | null;
}
/** The backend independently binds every list element to the current account. */
export interface ConnectorList {
    readonly enrollments: readonly ConnectorView[];
}
/** Entering a short device code requires the current account's write authority. */
export interface ConnectorLinkReviewParams {
    readonly requestId: string;
    readonly code: string;
}
/** Only public machine identity and the original finite approval window are disclosed. */
export interface ConnectorLinkReview {
    readonly code: string;
    readonly linkId: string;
    readonly publicKey: string;
    readonly deviceName: string;
    readonly expiresAtMs: string;
}
/** Approval binds the exact identity reviewed by this signed-in user, retaining its original operation ID. */
export interface ConnectorLinkApproveParams extends ConnectorLinkReviewParams {
    readonly linkId: string;
    readonly publicKey: string;
    readonly name: string;
}
/** Registered metadata establishes neither an online connection nor file or execution permission. */
export interface ConnectorLinkApproved {
    readonly linkId: string;
    readonly publicKey: string;
    readonly enrollment: ConnectorView;
}
/** Rejection is bound to the exact reviewed identity and original operation, never an account override. */
export interface ConnectorLinkDenyParams extends ConnectorLinkReviewParams {
    readonly linkId: string;
    readonly publicKey: string;
}
/** Retained rejection conveys no enrollment or execution authority. */
export interface ConnectorLinkDenied {
    readonly linkId: string;
    readonly publicKey: string;
    readonly deniedAtMs: string;
    readonly retainUntilMs: string;
}
/** IDs cannot override the authenticated account. */
export interface ConnectorGetParams {
    readonly enrollmentId: string;
}
/** Exact revision and operation ID must be preserved after an uncertain response. */
export interface ConnectorRevokeParams extends ConnectorGetParams {
    readonly requestId: string;
    readonly observedRevision: string;
}
/** File operations explicitly select an account-owned logical environment, never a network host. */
export interface ConnectorEnvironmentParams {
    readonly environmentId: string;
}
/** Root aliases and commitments keep absolute private paths on the customer machine. */
export interface ConnectorProfile {
    readonly mode: ConnectorFileMode;
    readonly revision: string;
    readonly policySha256: string;
    readonly roots: readonly string[];
    readonly maximumReadBytes: number;
    readonly maximumWriteBytes: number;
}
/** A recent matching signed profile is separate from installed tooling and execution permission. */
export interface ConnectorFilesystem extends ConnectorEnvironmentParams {
    readonly sequence: string;
    readonly acknowledgedSequence: string;
    readonly online: boolean;
    readonly profile: ConnectorProfile | null;
}
/** Finite file operations retain separate read and mutation authorization. */
export declare const ConnectorFileAction: {
    readonly Read: 'read';
    readonly Stat: 'stat';
    readonly List: 'list';
    readonly Write: 'write';
    readonly Remove: 'remove';
    readonly Mkdir: 'mkdir';
    readonly Chmod: 'chmod';
    readonly Rename: 'rename';
};
/** One ConnectorFileAction value. */
export type ConnectorFileAction = (typeof ConnectorFileAction)[keyof typeof ConnectorFileAction];
/** Permission changes never add access for another OS user or set special bits. */
export declare const ConnectorFilePermissionMode: {
    readonly Private: 384;
    readonly Executable: 448;
};
/** One ConnectorFilePermissionMode value. */
export type ConnectorFilePermissionMode = (typeof ConnectorFilePermissionMode)[keyof typeof ConnectorFilePermissionMode];
/** Atomic publication choices never grant append, removal or program execution. */
export declare const ConnectorWriteMode: {
    readonly Create: 'create';
    readonly Replace: 'replace';
};
/** One ConnectorWriteMode value. */
export type ConnectorWriteMode = (typeof ConnectorWriteMode)[keyof typeof ConnectorWriteMode];
/** Original targets bind the exact locally published policy. */
export interface ConnectorFileTarget {
    readonly requestId: string;
    readonly policySha256: string;
    readonly rootId: string;
    readonly path: string;
}
/** Reads are bounded chunks; offsets remain exact decimal strings. */
export interface ConnectorRead extends ConnectorFileTarget {
    readonly action: typeof ConnectorFileAction.Read;
    readonly offset: string;
    readonly limit: number;
}
/** Metadata never follows links or opens devices. */
export interface ConnectorStat extends ConnectorFileTarget {
    readonly action: typeof ConnectorFileAction.Stat;
}
/** Directory cursors are opaque exact offsets, not a promise of snapshot consistency. */
export interface ConnectorListDirectory extends ConnectorFileTarget {
    readonly action: typeof ConnectorFileAction.List;
    readonly cursor: string;
}
/** Each admitted operation has its original finite action and complete authority fields. */
export type ConnectorFileRequest = ConnectorRead | ConnectorStat | ConnectorListDirectory | ConnectorWrite | ConnectorRemove | ConnectorMkdir | ConnectorChmod | ConnectorRename;
/** Changes permissions only on a pinned single-link regular file. */
export interface ConnectorChmod extends ConnectorFileTarget {
    readonly action: typeof ConnectorFileAction.Chmod;
    readonly mode: ConnectorFilePermissionMode;
}
/** Both paths use one captured root alias and preserve explicit replacement intent. */
export interface ConnectorRename extends ConnectorFileTarget {
    readonly action: typeof ConnectorFileAction.Rename;
    readonly destination: string;
    readonly mode: ConnectorWriteMode;
}
/** One private directory beneath an existing parent; no implicit recursion or replacement. */
export interface ConnectorMkdir extends ConnectorFileTarget {
    readonly action: typeof ConnectorFileAction.Mkdir;
}
/** Explicit recursive intent cannot select the root itself, follow links or cross mounts. */
export interface ConnectorRemove extends ConnectorFileTarget {
    readonly action: typeof ConnectorFileAction.Remove;
    readonly recursive: boolean;
}
/** Complete file contents are bounded by the explicit local read-write grant. */
export interface ConnectorWrite extends ConnectorFileTarget {
    readonly action: typeof ConnectorFileAction.Write;
    readonly mode: ConnectorWriteMode;
    readonly dataBase64: string;
}
/** Retrying never silently substitutes a newer sequence or policy commitment. */
export interface ConnectorSubmitParams extends ConnectorEnvironmentParams {
    readonly previousSequence: string;
    readonly request: ConnectorFileRequest;
}
/** A job-ID lookup remains restricted to the explicitly selected environment. */
export interface ConnectorResultParams extends ConnectorEnvironmentParams {
    readonly jobId: string;
}
/** Listed links and special files carry no authority to follow or execute them. */
export declare const ConnectorFileKind: {
    readonly File: 'file';
    readonly Directory: 'directory';
    readonly SymbolicLink: 'symbolic-link';
    readonly Other: 'other';
};
/** One ConnectorFileKind value. */
export type ConnectorFileKind = (typeof ConnectorFileKind)[keyof typeof ConnectorFileKind];
/** Exact sizes and nanosecond timestamps remain strings at JSON boundaries. */
export interface ConnectorMetadata {
    readonly kind: typeof ConnectorFileKind.File | typeof ConnectorFileKind.Directory;
    readonly sizeBytes: string;
    readonly modifiedAtNs: string;
    readonly mode: number;
}
/** Successful read data is canonical base64 with its original identity and exact offset. */
export interface ConnectorReadResult {
    readonly action: typeof ConnectorFileAction.Read;
    readonly requestId: string;
    readonly offset: string;
    readonly dataBase64: string;
    readonly metadata: ConnectorMetadata;
}
/** Only bounded safe metadata is returned to the account. */
export interface ConnectorStatResult {
    readonly action: typeof ConnectorFileAction.Stat;
    readonly requestId: string;
    readonly metadata: ConnectorMetadata;
}
/** Untrusted names remain display/path data. */
export interface ConnectorDirectoryEntry {
    readonly name: string;
    readonly kind: ConnectorFileKind;
}
/** A directory page has a finite entry count and original request identity. */
export interface ConnectorDirectoryResult {
    readonly action: typeof ConnectorFileAction.List;
    readonly requestId: string;
    readonly entries: readonly ConnectorDirectoryEntry[];
    readonly nextCursor: string | null;
    readonly metadata: ConnectorMetadata;
}
/** No backend or native error text is forwarded as file diagnostics. */
export declare const ConnectorFileFailure: {
    readonly Invalid: 'invalid';
    readonly Denied: 'denied';
    readonly Unavailable: 'unavailable';
    readonly Changed: 'changed';
    readonly Indeterminate: 'indeterminate';
};
/** One ConnectorFileFailure value. */
export type ConnectorFileFailure = (typeof ConnectorFileFailure)[keyof typeof ConnectorFileFailure];
/** Successful atomic writes retain exact original byte counts and published metadata. */
export interface ConnectorWriteResult {
    readonly action: typeof ConnectorFileAction.Write;
    readonly requestId: string;
    readonly bytesWritten: string;
    readonly metadata: ConnectorMetadata;
}
/** Complete bounded removal includes the selected target in its exact decimal entry count. */
export interface ConnectorRemoveResult {
    readonly action: typeof ConnectorFileAction.Remove;
    readonly requestId: string;
    readonly entriesRemoved: string;
}
/** Confirms one directory creation and parent synchronization under the original request. */
export interface ConnectorMkdirResult {
    readonly action: typeof ConnectorFileAction.Mkdir;
    readonly requestId: string;
}
/** Permission success reports the actual requested private mode on the original regular file. */
export interface ConnectorChmodResult {
    readonly action: typeof ConnectorFileAction.Chmod;
    readonly requestId: string;
    readonly metadata: ConnectorMetadata;
}
/** Successful movement reports regular-file metadata after source identity verification and parent sync. */
export interface ConnectorRenameResult {
    readonly action: typeof ConnectorFileAction.Rename;
    readonly requestId: string;
    readonly metadata: ConnectorMetadata;
}
/** Successful file results cannot contain an error branch. */
export interface ConnectorFileSuccess {
    readonly ok: true;
    readonly result: ConnectorReadResult | ConnectorStatResult | ConnectorDirectoryResult | ConnectorWriteResult | ConnectorRemoveResult | ConnectorMkdirResult | ConnectorChmodResult | ConnectorRenameResult;
}
/** Denied file results cannot carry an accidental content payload. */
export interface ConnectorFileError {
    readonly ok: false;
    readonly error: ConnectorFileFailure;
}
/** Shared dispatch state is independent of the Nexa process handling the request. */
export declare enum ConnectorJobPhase {
    Queued = "queued",
    Dispatched = "dispatched",
    Completed = "completed"
}
/** Retained results belong to the original request and exact sequence. */
export interface ConnectorJob extends ConnectorEnvironmentParams {
    readonly id: string;
    readonly sequence: string;
    readonly phase: ConnectorJobPhase;
    readonly request: ConnectorFileRequest;
    readonly authorization: ConnectorOperationAuthorization;
    readonly admissionHash: string;
    readonly response: ConnectorFileSuccess | ConnectorFileError | null;
}
/** Account list accepts no identity override. */
export interface ConnectorListMethod {
    readonly params: Readonly<Record<string, never>>;
    readonly result: ConnectorList;
}
/** Code lookup uses the protected controller and never contacts the customer device directly. */
export interface ConnectorLinkReviewMethod {
    readonly params: ConnectorLinkReviewParams;
    readonly result: ConnectorLinkReview;
}
/** Explicit approval retains the reviewed key and cannot replace a machine after an uncertain response. */
export interface ConnectorLinkApproveMethod {
    readonly params: ConnectorLinkApproveParams;
    readonly result: ConnectorLinkApproved;
}
/** An uncertain rejection must be checked under the same original request. */
export interface ConnectorLinkDenyMethod {
    readonly params: ConnectorLinkDenyParams;
    readonly result: ConnectorLinkDenied;
}
/** Enrollment metadata remains account-authorized. */
export interface ConnectorGetMethod {
    readonly params: ConnectorGetParams;
    readonly result: ConnectorView;
}
/** Permanent revocation is an explicit write operation. */
export interface ConnectorRevokeMethod {
    readonly params: ConnectorRevokeParams;
    readonly result: ConnectorView;
}
/** File grants are read through the authenticated account proxy. */
export interface ConnectorFilesystemMethod {
    readonly params: ConnectorEnvironmentParams;
    readonly result: ConnectorFilesystem;
}
/** New local reads require write-level RPC authority as well as the backend read-only file scope. */
export interface ConnectorSubmitMethod {
    readonly params: ConnectorSubmitParams;
    readonly result: ConnectorJob;
}
/** Reading an existing result never redispatches or advances its sequence. */
export interface ConnectorResultMethod {
    readonly params: ConnectorResultParams;
    readonly result: ConnectorJob;
}
