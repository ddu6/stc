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
export function removeBefore(node, parent) {
    while (true) {
        while (true) {
            if (node.previousSibling === null) {
                break;
            }
            node.previousSibling.remove();
        }
        if (node.parentNode === null || node.parentNode === parent) {
            break;
        }
        node = node.parentNode;
    }
}
export function removeAfter(node, parent) {
    while (true) {
        while (true) {
            if (node.nextSibling === null) {
                break;
            }
            node.nextSibling.remove();
        }
        if (node.parentNode === null || node.parentNode === parent) {
            break;
        }
        node = node.parentNode;
    }
}
