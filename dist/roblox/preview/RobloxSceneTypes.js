// SPDX-FileCopyrightText: 2026 Nexa contributors
// SPDX-License-Identifier: LicenseRef-Proprietary
/** Native Roblox property encodings shared by the authoring, export and preview engines. */
export const RobloxValueKind = {
    Instance: 'Instance',
    Vector2: 'Vector2',
    Rect: 'Rect',
    Vector3: 'Vector3',
    Color3: 'Color3',
    UDim: 'UDim',
    UDim2: 'UDim2',
    NumberRange: 'NumberRange',
    NumberSequence: 'NumberSequence',
    ColorSequence: 'ColorSequence',
    CFrame: 'CFrame',
    Enum: 'Enum',
};
/** Explicit supported instance classes. */
export const RobloxClass = {
    Folder: 'Folder',
    Model: 'Model',
    WorldModel: 'WorldModel',
    ObjectValue: 'ObjectValue',
    PointLight: 'PointLight',
    SpecialMesh: 'SpecialMesh',
    BlockMesh: 'BlockMesh',
    CylinderMesh: 'CylinderMesh',
    FileMesh: 'FileMesh',
    Beam: 'Beam',
    Trail: 'Trail',
    Part: 'Part',
    WedgePart: 'WedgePart',
    CornerWedgePart: 'CornerWedgePart',
    MeshPart: 'MeshPart',
    Attachment: 'Attachment',
    ParticleEmitter: 'ParticleEmitter',
    ScreenGui: 'ScreenGui',
    Frame: 'Frame',
    ScrollingFrame: 'ScrollingFrame',
    TextLabel: 'TextLabel',
    TextButton: 'TextButton',
    TextBox: 'TextBox',
    ImageLabel: 'ImageLabel',
    ImageButton: 'ImageButton',
    UICorner: 'UICorner',
    UIStroke: 'UIStroke',
    UIListLayout: 'UIListLayout',
    UIPadding: 'UIPadding',
    UISizeConstraint: 'UISizeConstraint',
    UIAspectRatioConstraint: 'UIAspectRatioConstraint',
    UIScale: 'UIScale',
};
/** Native capture schemas include services observed outside the projected model hierarchy. */
export const RobloxSchemaClass = { ...RobloxClass, Lighting: 'Lighting' };
/** Logical input events whose callbacks run in the native VM. Pointer hit testing is separate. */
export const RobloxInputEvent = {
    Activated: 'Activated',
    MouseButton1Click: 'MouseButton1Click',
    MouseButton1Down: 'MouseButton1Down',
    MouseButton1Up: 'MouseButton1Up',
};
export const RobloxInputDevice = { Mouse: 'Mouse', Touch: 'Touch', Gamepad: 'Gamepad' };
/** Physical gesture phases owned by the preview protocol, separate from Roblox signal names. */
export const RobloxPointerPhase = {
    Press: 'Press',
    Move: 'Move',
    Release: 'Release',
    Cancel: 'Cancel',
};
/** Native history mutation discriminators. */
export const RobloxTrailMutation = { Reset: 'reset', Step: 'step' };
