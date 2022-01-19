// Performs Dijkstra's algorithm; returns *all* nodes in the order

import { algorithm, node } from '../constants';
import { getUnvisitedNeighbours } from '../utils/getUnvisitedNeighbors';

export class dijkstra implements algorithm {
    public pathfind = (grid: node[][], startNode: node, finishNode: node) => {
        const visitedNodesInOrder = [];
        startNode.distance = 0;
        const unvisitedNodes = this.getAllNodes(grid);
        while (!!unvisitedNodes.length) {
            this.sortNodesByDistance(unvisitedNodes);
            const closestNode = unvisitedNodes.shift();
            if (!closestNode)
                throw new Error('Something went wrong in dijkstra');
            // If we encounter a wall, we skip it.
            if (closestNode.isWall) continue;
            // If the closest node is at a distance of infinity,
            // we must be trapped and should therefore stop.
            if (closestNode.distance === Infinity) return visitedNodesInOrder;
            closestNode.isVisited = true;
            visitedNodesInOrder.push(closestNode);
            if (closestNode === finishNode) return visitedNodesInOrder;
            this.updateUnvisitedNeighbors(closestNode, grid);
        }
        return false;
    };

    private sortNodesByDistance = (unvisitedNodes: node[]) => {
        unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
    };

    private updateUnvisitedNeighbors(node: node, grid: node[][]) {
        const unvisitedNeighbors = getUnvisitedNeighbours(node, grid);
        for (const neighbor of unvisitedNeighbors) {
            neighbor.distance = node.distance + 1;
            neighbor.previousNode = node;
        }
    }

    private getAllNodes(grid: node[][]) {
        const nodes = [];
        for (const row of grid) {
            for (const node of row) {
                nodes.push(node);
            }
        }
        return nodes;
    }
}
