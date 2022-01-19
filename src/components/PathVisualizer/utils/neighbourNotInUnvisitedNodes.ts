import { node } from '../constants';
export const neighbourNotInUnvisitedNodes = (
    neighbour: node,
    unvisitedNodes: node[]
) => {
    for (let node of unvisitedNodes) {
        if (node.row === neighbour.row && node.col === neighbour.col) {
            return false;
        }
    }
    return true;
};
