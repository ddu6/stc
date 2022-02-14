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