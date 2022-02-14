export function parsePositionStr(string) {
    return string.trim().split(/\s+/).map(value => {
        if (/^\d+$/.test(value)) {
            return Number(value);
        }
        if (value.startsWith('"')) {
            return value.slice(1, -1);
        }
        return value;
    });
}
export function stringifyPosition(position) {
    return position.map(value => {
        if (typeof value === 'number') {
            return value;
        }
        if (/^\d+$/.test(value)) {
            return `'${value}'`;
        }
        return value;
    }).join(' ');
}
export function positionToUnitOrLines(offset, position, stdn) {
    const out = [];
    if (position.length === 0 || stdn.length === 0) {
        return out;
    }
    const line = position[0];
    if (typeof line !== 'number') {
        return out;
    }
    let unitOrLine = stdn[Math.min(line + offset, stdn.length - 1)];
    out.push(unitOrLine);
    for (let i = 1; i < position.length; i++) {
        const step = position[i];
        if (typeof step === 'number') {
            if (Array.isArray(unitOrLine)) {
                const unit = unitOrLine[step];
                if (typeof unit !== 'object') {
                    break;
                }
                out.push(unitOrLine = unit);
                continue;
            }
            const line = unitOrLine.children[step];
            if (line === undefined) {
                break;
            }
            out.push(unitOrLine = line);
            continue;
        }
        if (Array.isArray(unitOrLine)) {
            break;
        }
        const stdn = unitOrLine.options[step];
        if (!Array.isArray(stdn)) {
            break;
        }
        const nextStep = position[++i];
        if (typeof nextStep !== 'number') {
            break;
        }
        const line = stdn[nextStep];
        if (line === undefined) {
            break;
        }
        out.push(unitOrLine = line);
    }
    return out;
}
