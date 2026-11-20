import type { ConnectorEnrollmentList, ConnectorEnrollmentRevocation, ConnectorEnrollmentView } from 'nerva-connector-protocol/protocol/ConnectorEnrollment.js';
import type { ConnectorLinkApproval, ConnectorLinkApproved, ConnectorLinkReview } from 'nerva-connector-protocol/protocol/ConnectorLink.js';
import type { ConnectorFileDescription, ConnectorFileError, ConnectorFileOutput, ConnectorFileSuccess } from 'nerva-connector-protocol/protocol/ConnectorFiles.js';
import type { ConnectorFileJobView, ConnectorFileOperation, ConnectorFileStatus } from 'nerva-connector-protocol/protocol/ConnectorFileJobs.js';
import type { ConnectorUploadOutput, ConnectorUploadRequest } from 'nerva-connector-protocol/protocol/ConnectorUpload.js';
/** Entering a short device code requires the current account's write authority. */
export interface ConnectorLinkReviewParams {
    readonly requestId: string;
    readonly code: string;
}
/** Approval binds the exact identity reviewed by this signed-in user, retaining its original operation ID. */
export interface ConnectorLinkApproveParams extends ConnectorLinkApproval {
    readonly requestId: string;
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
export interface ConnectorRevokeParams extends ConnectorGetParams, ConnectorEnrollmentRevocation<string> {
    readonly requestId: string;
}
/** File operations explicitly select an account-owned logical environment, never a network host. */
export interface ConnectorEnvironmentParams {
    readonly environmentId: string;
}
/** Each admitted operation has its original finite action and complete authority fields. */
export type ConnectorAccountFileRequest = Exclude<ConnectorFileOperation<string>, ConnectorUploadRequest<string>>;
/** Retrying never silently substitutes a newer sequence or policy commitment. */
export interface ConnectorSubmitParams extends ConnectorEnvironmentParams {
    readonly previousSequence: string;
    readonly request: ConnectorAccountFileRequest;
}
/** A job-ID lookup remains restricted to the explicitly selected environment. */
export interface ConnectorResultParams extends ConnectorEnvironmentParams {
    readonly jobId: string;
}
/** The results of the file actions an account can submit. */
export type ConnectorAccountFileResult = Exclude<ConnectorFileOutput<string>, ConnectorFileDescription<string> | ConnectorUploadOutput<string>>;
/** Successful file results cannot contain an error branch. */
export interface ConnectorAccountFileSuccess extends Omit<ConnectorFileSuccess<string>, 'result'> {
    readonly result: ConnectorAccountFileResult;
}
/** Retained results belong to the original request and exact sequence. */
export interface ConnectorJob extends Omit<ConnectorFileJobView<string>, 'request' | 'response'> {
    readonly request: ConnectorAccountFileRequest;
    readonly response: ConnectorAccountFileSuccess | ConnectorFileError | null;
}
/** Account list accepts no identity override. */
export interface ConnectorListMethod {
    readonly params: Readonly<Record<string, never>>;
    readonly result: ConnectorEnrollmentList<string>;
}
/** Code lookup uses the protected controller and never contacts the customer device directly. */
export interface ConnectorLinkReviewMethod {
    readonly params: ConnectorLinkReviewParams;
    readonly result: ConnectorLinkReview<string>;
}
/** Explicit approval retains the reviewed key and cannot replace a machine after an uncertain response. */
export interface ConnectorLinkApproveMethod {
    readonly params: ConnectorLinkApproveParams;
    readonly result: ConnectorLinkApproved<string>;
}
/** An uncertain rejection must be checked under the same original request. */
export interface ConnectorLinkDenyMethod {
    readonly params: ConnectorLinkDenyParams;
    readonly result: ConnectorLinkDenied;
}
/** Enrollment metadata remains account-authorized. */
export interface ConnectorGetMethod {
    readonly params: ConnectorGetParams;
    readonly result: ConnectorEnrollmentView<string>;
}
/** Permanent revocation is an explicit write operation. */
export interface ConnectorRevokeMethod {
    readonly params: ConnectorRevokeParams;
    readonly result: ConnectorEnrollmentView<string>;
}
/** File grants are read through the authenticated account proxy. */
export interface ConnectorFilesystemMethod {
    readonly params: ConnectorEnvironmentParams;
    readonly result: ConnectorFileStatus<string>;
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
