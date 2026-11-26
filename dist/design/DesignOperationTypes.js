// SPDX-FileCopyrightText: 2026 Dacely <business@dacely.com>
// SPDX-License-Identifier: LicenseRef-Proprietary
/** Atomic scene operations shared by agents and the editor. */
export const DesignOperationKind = {
    Insert: 'insert',
    Update: 'update',
    Resize: 'resize',
    Position: 'position',
    Translate: 'translate',
    Rotate: 'rotate',
    Scale: 'scale',
    Tidy: 'tidy',
    Layout: 'layout',
    Sizing: 'sizing',
    Typography: 'typography',
    TypographyStyle: 'typography-style',
    TextStyle: 'text-style',
    Text: 'text',
    Move: 'move',
    Reparent: 'reparent',
    Remove: 'remove',
    Page: 'page',
    Guide: 'guide',
    Metadata: 'metadata',
    Comment: 'comment',
    Token: 'token',
    Recolor: 'recolor',
    PaintColor: 'paint-color',
    PaintGradient: 'paint-gradient',
    PaintImage: 'paint-image',
    PaintPattern: 'paint-pattern',
    Stroke: 'stroke',
    Polygon: 'polygon',
    Arc: 'arc',
    Style: 'style',
};
/** Existing fill and stroke colors share one compact native edit. */
export const DesignPaintColorTarget = { Fill: 'fill', Stroke: 'stroke' };
