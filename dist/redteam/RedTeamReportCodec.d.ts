import type { RedTeamFindingReport, RedTeamReportReference } from './RedTeamTypes.js';
/** Reads report details without inventing values for work that has not been reported. */
export declare class RedTeamReportCodec {
    #private;
    /** Each field is optional, but a present field must satisfy its complete contract. */
    static parse(raw: unknown): RedTeamFindingReport;
    /** Display links must not execute scripts or carry account credentials. */
    static reference(raw: unknown): RedTeamReportReference;
}
