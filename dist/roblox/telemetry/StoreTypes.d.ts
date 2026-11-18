/** Project identity returned to authenticated owners; contains no ingestion secret. */
export interface TelemetryProject {
    readonly id: string;
    readonly userId: string;
    readonly universeId: string;
    readonly name: string;
}
