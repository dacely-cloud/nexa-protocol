/** Source grammars are explicit; bytecode formats use separate version-aware adapters. */
export declare const SourceLanguage: {
    readonly JavaScript: 'javascript';
    readonly C: 'c';
    readonly Cpp: 'cpp';
    readonly Lua: 'lua';
    readonly Luau: 'luau';
};
/** One source language. */
export type SourceLanguage = (typeof SourceLanguage)[keyof typeof SourceLanguage];
