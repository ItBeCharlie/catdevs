import { node } from '../constants';

// Backtracks from the finishNode to find the shortest path.
// Only works when called *after* the dijkstra method above.
export function getNodesInShortestPathOrder(finishNode: node) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null && currentNode.previousNode !== null) {
        nodesInShortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
}
