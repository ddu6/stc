import type {STDN, STDNLine, STDNUnit} from 'stdn'
export function unitToPlainString(unit: STDNUnit) {
    return stdnToPlainString(unit.children)
}
export function lineToPlainString(line: STDNLine) {
    let string = ''
    for (const inline of line) {
        if (typeof inline === 'string') {
            string += inline
            continue
        }
        string += unitToPlainString(inline)
    }
    return string
}
export function stdnToPlainString(stdn: STDN) {
    const array: string[] = []
    for (const line of stdn) {
        array.push(lineToPlainString(line))
    }
    return array.join('\n')
}
export function unitToInlinePlainString(unit: STDNUnit) {
    return stdnToInlinePlainString(unit.children)
}
export function lineToInlinePlainString(line: STDNLine) {
    let string = ''
    for (const inline of line) {
        if (typeof inline === 'string') {
            string += inline
            continue
        }
        string += unitToInlinePlainString(inline)
    }
    return string
}
export function stdnToInlinePlainString(stdn: STDN) {
    for (const line of stdn) {
        const string = lineToInlinePlainString(line)
        if (string.length > 0) {
            return string
        }
    }
    return ''
}
export function stdnToInlinePlainStringLine(stdn: STDN) {
    for (const line of stdn) {
        const string = lineToInlinePlainString(line)
        if (string.length > 0) {
            return line
        }
    }
    return []
}
export function stringToId(string: string) {
    return Array.from(string.slice(0, 100).matchAll(/[a-zA-Z0-9]+/g)).join('-').toLowerCase()
}
export function removeBefore(node: Node, parent: Node) {
    while (true) {
        while (true) {
            if (node.previousSibling === null) {
                break
            }
            node.previousSibling.remove()
        }
        if (node.parentNode === null || node.parentNode === parent) {
            break
        }
        node = node.parentNode
    }
}
export function removeAfter(node: Node, parent: Node) {
    while (true) {
        while (true) {
            if (node.nextSibling === null) {
                break
            }
            node.nextSibling.remove()
        }
        if (node.parentNode === null || node.parentNode === parent) {
            break
        }
        node = node.parentNode
    }
}