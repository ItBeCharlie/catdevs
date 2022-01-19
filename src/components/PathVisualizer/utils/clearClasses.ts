export const clearClasses = (node: HTMLElement, newClasses: string = '') => {
    node.classList.remove(
        'node-finish',
        'node-start',
        'node-wall',
        'node-shortest-path',
        'node-visited'
    );
    if (newClasses) node.classList.add(newClasses);
};
