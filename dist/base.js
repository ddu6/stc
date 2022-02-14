export function unitToPlainString(unit) {
    return stdnToPlainString(unit.children);
}
export function lineToPlainString(line) {
    let string = '';
    for (const inline of line) {
        if (typeof inline === 'string') {
            string += inline;
            continue;
        }
        string += unitToPlainString(inline);
    }
    return string;
}
export function stdnToPlainString(stdn) {
    const array = [];
    for (const line of stdn) {
        array.push(lineToPlainString(line));
    }
    return array.join('\n');
}
export function unitToInlinePlainString(unit) {
    return stdnToInlinePlainString(unit.children);
}
export function lineToInlinePlainString(line) {
    let string = '';
    for (const inline of line) {
        if (typeof inline === 'string') {
            string += inline;
            continue;
        }
        string += unitToInlinePlainString(inline);
    }
    return string;
}
export function stdnToInlinePlainString(stdn) {
    for (const line of stdn) {
        const string = lineToInlinePlainString(line);
        if (string.length > 0) {
            return string;
        }
    }
    return '';
}
export function stdnToInlinePlainStringLine(stdn) {
    for (const line of stdn) {
        const string = lineToInlinePlainString(line);
        if (string.length > 0) {
            return line;
        }
    }
    return [];
}
export function stringToId(string) {
    return Array.from(string.slice(0, 100).matchAll(/[a-zA-Z0-9]+/g)).join('-').toLowerCase();
}
