/** Bounded JSON object validation protects parsing and structured tool dispatch on both sides of the relay. */
export declare class ConnectorHostJson {
    #private;
    /** Accept only a finite UTF-8 JSON object; opaque JSON text remains the signed request representation. */
    static object(raw: unknown, maximumBytes: number): string;
}
