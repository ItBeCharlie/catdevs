//@ts-nocheck
import { algorithm, node } from '../constants';
import { getNeighbours } from '../utils/getNeighbors';
import { manhattenDistance } from '../utils/manhattenDistance';
import { neighbourNotInUnvisitedNodes } from '../utils/neighbourNotInUnvisitedNodes';

export class astar implements algorithm {
    public pathfind = (grid: node[][], startNode: node, finishNode: node) => {
        if (!startNode || !finishNode || startNode === finishNode) return false;
        let unvisitedNodes = []; //open list
        let visitedNodesInOrder = []; //closed list
        startNode.distance = 0;
        unvisitedNodes.push(startNode);

        while (unvisitedNodes.length !== 0) {
            unvisitedNodes.sort((a, b) => a.totalDistance - b.totalDistance);
            let closestNode = unvisitedNodes.shift();
            if (closestNode === finishNode) return visitedNodesInOrder;

            closestNode.isVisited = true;
            visitedNodesInOrder.push(closestNode);

            let neighbours = getNeighbours(closestNode, grid);
            for (let neighbour of neighbours) {
                let distance = closestNode.distance + 1;
                //f(n) = g(n) + h(n)
                if (neighbourNotInUnvisitedNodes(neighbour, unvisitedNodes)) {
                    unvisitedNodes.unshift(neighbour);
                    neighbour.distance = distance;
                    neighbour.totalDistance =
                        distance + manhattenDistance(neighbour, finishNode);
                    neighbour.previousNode = closestNode;
                } else if (distance < neighbour.distance) {
                    neighbour.distance = distance;
                    neighbour.totalDistance =
                        distance + manhattenDistance(neighbour, finishNode);
                    neighbour.previousNode = closestNode;
                }
            }
        }
        return visitedNodesInOrder;
    };
}
