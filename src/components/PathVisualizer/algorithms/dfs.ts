import { algorithm, node } from '../constants';
import { getUnvisitedNeighbours } from '../utils/getUnvisitedNeighbors';

export class dfs implements algorithm {
    public pathfind = (grid: node[][], startNode: node, finishNode: node) => {
        if (!startNode || !finishNode || startNode === finishNode) return false;
        let unvisitedNodes = [];
        let visitedNodesInOrder = [];
        unvisitedNodes.push(startNode);
        while (unvisitedNodes.length !== 0) {
            let closestNode = unvisitedNodes.shift();
            if (!closestNode) throw new Error('Error in dfs pathfind');
            if (closestNode.isWall) continue;
            if (closestNode === finishNode) return visitedNodesInOrder;
            visitedNodesInOrder.push(closestNode);
            closestNode.isVisited = true;
            let unvisitedNeighbours = getUnvisitedNeighbours(closestNode, grid);
            for (let unvisitedNeighbour of unvisitedNeighbours) {
                unvisitedNeighbour.previousNode = closestNode;
                unvisitedNodes.unshift(unvisitedNeighbour);
            }
        }
        return visitedNodesInOrder;
    };
}
