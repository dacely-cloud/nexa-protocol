/** Shared boundary primitives keep the portable visual decoder strict and bounded. */
export declare class VisualValue {
    static record(raw: unknown, fields: readonly string[], complete?: boolean): Readonly<Record<string, unknown>>;
    static text(raw: unknown, limit: number, fallback?: string): string;
    static id(raw: unknown): string;
    static number(raw: unknown, min: number, max: number): number;
    static choice<T extends string>(raw: unknown, values: Readonly<Record<string, T>>, fallback: T): T;
    static array(raw: unknown, max: number): readonly unknown[];
}
