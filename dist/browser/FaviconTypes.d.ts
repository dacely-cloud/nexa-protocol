/** Only server-fetched raster bytes cross the gateway; clients never fetch the visited host. */
export interface SitePreview {
    readonly origin: string;
    readonly favicon: string;
}
