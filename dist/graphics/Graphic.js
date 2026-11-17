// SPDX-FileCopyrightText: 2026 Nexa contributors
// SPDX-License-Identifier: LicenseRef-Proprietary
/** Native data visualization families. Rich visual explanations use render_visual. */
export const GraphicKind = {
    Line: 'line',
    Area: 'area',
    Bar: 'bar',
    StackedBar: 'stacked-bar',
    Scatter: 'scatter',
    Pie: 'pie',
    Donut: 'donut',
    Radar: 'radar',
    Heatmap: 'heatmap',
    Treemap: 'treemap',
    Funnel: 'funnel',
    Metric: 'metric',
};
/** Curated palettes and surface treatments, with Nerva's homepage as the default. */
export const GraphicStyle = {
    Studio: 'studio',
    Midnight: 'midnight',
    Blueprint: 'blueprint',
    Aurora: 'aurora',
    Minimal: 'minimal',
};
/** Shared browser-safe validation before native delivery, wire acceptance and history rendering. */
export class Graphics {
    /** Copy validated fields into an immutable specification with bounded aggregate work. */
    static parse(raw) {
        this.#record(raw, [
            'version',
            'id',
            'title',
            'description',
            'kind',
            'style',
            'xLabel',
            'yLabel',
            'unit',
            'source',
            'series',
        ]);
        if (Reflect.get(raw, 'version') !== 1) {
            throw new Error('Unsupported graphic version. Expected 1.');
        }
        const kind = Object.values(GraphicKind).find((entry) => entry === Reflect.get(raw, 'kind'));
        const style = Object.values(GraphicStyle).find((entry) => entry === Reflect.get(raw, 'style'));
        if (kind === undefined || style === undefined) {
            throw new Error('Unsupported graphic kind or style.');
        }
        const id = this.#text(Reflect.get(raw, 'id'), 80, false);
        if (!/^[a-zA-Z0-9_-]+$/u.test(id)) {
            throw new Error('Graphic id must use letters, numbers, underscores or hyphens.');
        }
        const entries = Reflect.get(raw, 'series');
        if (!Array.isArray(entries) || entries.length < 1 || entries.length > 8) {
            throw new Error('A graphic requires 1–8 series.');
        }
        const single = ['pie', 'donut', 'treemap', 'funnel', 'metric'].includes(kind);
        if (single && entries.length !== 1) {
            throw new Error(`${kind} requires exactly one series.`);
        }
        const names = new Set();
        const series = Object.freeze(entries.map((entry) => {
            this.#record(entry, ['name', 'points']);
            const name = this.#text(Reflect.get(entry, 'name'), 100, false);
            if (names.has(name)) {
                throw new Error('Series names must be unique.');
            }
            names.add(name);
            const values = Reflect.get(entry, 'points');
            const limit = kind === 'radar' ? 24 : kind === 'metric' ? 12 : 256;
            if (!Array.isArray(values) || values.length < 1 || values.length > limit) {
                throw new Error(`Each ${kind} series requires 1–${limit} points.`);
            }
            if (kind === 'radar' && values.length < 3) {
                throw new Error('Radar charts require at least three axes.');
            }
            const labels = new Set();
            const points = Object.freeze(values.map((point) => {
                this.#record(point, ['label', 'value', 'x']);
                const label = this.#text(Reflect.get(point, 'label'), 100, false);
                if (labels.has(label)) {
                    throw new Error('Point labels must be unique within a series.');
                }
                labels.add(label);
                const value = this.#number(Reflect.get(point, 'value'));
                if (['pie', 'donut', 'treemap', 'funnel', 'radar'].includes(kind) &&
                    value < 0) {
                    throw new Error(`${kind} values must be nonnegative.`);
                }
                const x = Reflect.get(point, 'x');
                if (kind === GraphicKind.Scatter && x === undefined) {
                    throw new Error('Scatter points require numeric x coordinates.');
                }
                return Object.freeze({
                    label,
                    value,
                    ...(x === undefined ? {} : { x: this.#number(x) }),
                });
            }));
            return Object.freeze({ name, points });
        }));
        const first = series[0];
        if (kind !== GraphicKind.Scatter && first !== undefined) {
            for (const entry of series) {
                if (entry.points.length !== first.points.length ||
                    entry.points.some((point, index) => point.label !== first.points[index]?.label)) {
                    throw new Error('Categorical series must use the same labels in the same order.');
                }
            }
        }
        const result = Object.freeze({
            version: 1,
            id,
            kind,
            style,
            title: this.#text(Reflect.get(raw, 'title'), 160, false),
            description: this.#text(Reflect.get(raw, 'description'), 1000, true),
            xLabel: this.#text(Reflect.get(raw, 'xLabel'), 100, true),
            yLabel: this.#text(Reflect.get(raw, 'yLabel'), 100, true),
            unit: this.#text(Reflect.get(raw, 'unit'), 24, true),
            source: this.#text(Reflect.get(raw, 'source'), 500, true),
            series,
        });
        if (new TextEncoder().encode(JSON.stringify(result)).byteLength > 256 * 1024) {
            throw new Error('Graphic exceeds the 256 KiB delivery limit.');
        }
        return result;
    }
    /** A predicate for network validators that must reject rather than throw. */
    static isValid(raw) {
        try {
            this.parse(raw);
            return true;
        }
        catch {
            return false;
        }
    }
    static #record(raw, fields) {
        if (typeof raw !== 'object' || raw === null || Array.isArray(raw)) {
            throw new Error('Expected a graphic record.');
        }
        const keys = Object.keys(raw);
        if (keys.length > fields.length ||
            keys.some((key) => !fields.includes(key))) {
            throw new Error('Unexpected graphic fields. Only the documented fields are accepted.');
        }
    }
    static #text(raw, limit, empty) {
        if (typeof raw !== 'string' || raw.length > limit || (!empty && raw.trim().length === 0)) {
            throw new Error(`Graphic text must contain ${empty ? '0' : '1'}–${limit} characters.`);
        }
        return raw;
    }
    static #number(raw) {
        if (typeof raw !== 'number' || !Number.isFinite(raw) || Math.abs(raw) > 1e15) {
            throw new Error('Graphic measurements must be finite numbers between -1e15 and 1e15. Use scaled units for larger quantities.');
        }
        return raw;
    }
}
