import type { RobloxCoordinateGesture } from './RobloxCoordinateTypes.js';
import type { RobloxKeyboardGesture } from './RobloxKeyboardTypes.js';
import type { RobloxLiveActivation } from './RobloxLiveProcessTypes.js';
import type { RobloxNativeGuiViewport } from './RobloxNativeVmTypes.js';
import type { RobloxTextEditRequest } from './RobloxTextEditTypes.js';
import type { RobloxWheelGesture } from './RobloxWheelTypes.js';
/** Start identifies an existing conversation attachment, never a server path or account. */
export interface RobloxLiveStartRequest {
    readonly id: string;
    readonly attachmentId: string;
    readonly previewId: string;
}
/** Every handle action is bound to its conversation and transport consumer. */
export interface RobloxLiveHandleRequest {
    readonly id: string;
    readonly handle: string;
}
/** One serialized native step and optional logical activation. */
export interface RobloxLiveStepRequest extends RobloxLiveHandleRequest {
    readonly wheel?: RobloxWheelGesture;
    readonly keyboard?: RobloxKeyboardGesture;
    readonly edit?: RobloxTextEditRequest;
    readonly point?: RobloxCoordinateGesture;
    readonly seconds: number;
    readonly input?: RobloxLiveActivation;
    readonly viewport?: RobloxNativeGuiViewport;
}
/** Bounded JSON state has its own portable native-value codec. */
export interface RobloxLiveFrame {
    /** The retained executable supports native wheel events and bounded canvas travel. */
    readonly wheel?: true;
    /** The retained executable supports uncaptured mouse motion and native GUI hover events. */
    readonly pointerHover?: true;
    /** The retained executable supports captured motion and native TextBox drag selection. */
    readonly pointerMove?: true;
    /** The retained executable, rather than gateway source, supports held-key commands. */
    readonly keyboard?: true;
    /** The retained executable supports editing repeats without another Begin. */
    readonly keyboardRepeat?: true;
    readonly handle: string;
    readonly state: string;
    readonly elapsedUs: string;
    readonly memoryBytes: string;
    readonly output: readonly string[];
}
/** Current native model bytes are returned only on an explicit export. */
export interface RobloxLiveExport {
    readonly modelXml: string;
    readonly scene: string;
}
/** A completed lifecycle release. */
export interface RobloxLiveClosed {
    readonly closed: boolean;
}
