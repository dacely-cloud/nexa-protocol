// SPDX-FileCopyrightText: 2026 Dacely <business@dacely.com>
// SPDX-License-Identifier: LicenseRef-Proprietary

/** Source grammars are explicit; bytecode formats use separate version-aware adapters. */
export const SourceLanguage = {
    JavaScript: 'javascript',
    C: 'c',
    Cpp: 'cpp',
    Lua: 'lua',
    Luau: 'luau',
} as const;

/** One source language. */
export type SourceLanguage = (typeof SourceLanguage)[keyof typeof SourceLanguage];
