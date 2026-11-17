/** JSON objects exclude arrays and null at the external envelope boundary. */
function isJsonObject(value) {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}
/** Remove redundant bridge envelopes before risk assessment, authorization and dispatch. */
export function resolveBridgeInput(input) {
    let target = input;
    for (let depth = 0; depth < 8; depth += 1) {
        if (target.name !== 'tool_call') {
            return target;
        }
        const envelope = target.arguments;
        if (!isJsonObject(envelope)) {
            return null;
        }
        if (typeof envelope['name'] !== 'string' || envelope['name'].length === 0) {
            return null;
        }
        if (Object.hasOwn(envelope, 'arguments')) {
            if (Object.keys(envelope).some((key) => key !== 'name' && key !== 'arguments')) {
                return null;
            }
            target = { name: envelope['name'], arguments: envelope['arguments'] ?? {} };
        }
        else {
            const args = Object.fromEntries(Object.entries(envelope).filter(([key]) => key !== 'name'));
            target = { name: envelope['name'], arguments: args };
        }
    }
    return null;
}
