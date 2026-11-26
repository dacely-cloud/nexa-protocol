// SPDX-FileCopyrightText: 2026 Dacely <business@dacely.com>
// SPDX-License-Identifier: LicenseRef-Proprietary
/** Raster formats are identified from bytes before becoming usable design assets. */
export const DesignAssetMime = {
    Png: 'image/png',
    Jpeg: 'image/jpeg',
    Webp: 'image/webp',
    Gif: 'image/gif',
};
/** All asset transfers use one acknowledged bounded chunk at a time. */
export class DesignAssetLimits {
    /** Library previews never need original-resolution bytes in the browser. */
    static thumbnailEdge = 192;
    /** One preview remains smaller than an existing acknowledged image slice. */
    static thumbnailBytes = 192 * 1024;
    static chunkBytes = 192 * 1024;
    static fileBytes = 16n * 1024n * 1024n;
    static ownerBytes = 1024n * 1024n * 1024n;
    static ownerCount = 256;
    static pixels = 16 * 1024 * 1024;
    static edge = 8192;
}
