import { mazeAlg, node, wall } from '../constants';
import { generateOddRandomNumber } from '../utils/generateOddRandomNumber';
import { generateRandomNumber } from '../utils/generateRandomNumber';
import { range } from '../utils/range';

let walls: wall[] = [];

export class recursiveDivisionMaze implements mazeAlg {
    public generate = (grid: node[][], startNode: node, finishNode: node) => {
        if (!startNode || !finishNode || startNode === finishNode) return false;

        const vertical = range(grid[0].length);
        const horinzontal = range(grid.length);
        walls = [];
        this.getRecursiveWalls(
            vertical,
            horinzontal,
            grid,
            startNode,
            finishNode
        );
        return walls;
    };

    private getRecursiveWalls = (
        vertical: number[],
        horinzontal: number[],
        grid: node[][],
        startNode: node,
        finishNode: node
    ) => {
        if (vertical.length < 2 || horinzontal.length < 2) return;

        let dir;
        let num;
        if (vertical.length > horinzontal.length) {
            dir = 0;
            num = generateOddRandomNumber(vertical);
        }
        if (vertical.length <= horinzontal.length) {
            dir = 1;
            num = generateOddRandomNumber(horinzontal);
        }
        if (typeof dir == 'undefined' || typeof num == 'undefined')
            throw new Error(
                'Error in getRecursiveWalls in recursiveDivisionMaze'
            );

        this.addWall(dir, num, vertical, horinzontal, startNode, finishNode);
        if (dir === 0) {
            this.getRecursiveWalls(
                vertical.slice(0, vertical.indexOf(num)),
                horinzontal,
                grid,
                startNode,
                finishNode
            );
            this.getRecursiveWalls(
                vertical.slice(vertical.indexOf(num) + 1),
                horinzontal,
                grid,
                startNode,
                finishNode
            );
        } else {
            this.getRecursiveWalls(
                vertical,
                horinzontal.slice(0, horinzontal.indexOf(num)),
                grid,
                startNode,
                finishNode
            );
            this.getRecursiveWalls(
                vertical,
                horinzontal.slice(horinzontal.indexOf(num) + 1),
                grid,
                startNode,
                finishNode
            );
        }
    };

    private addWall = (
        dir: number,
        num: number,
        vertical: number[],
        horinzontal: number[],
        startNode: node,
        finishNode: node
    ) => {
        let isStartFinish = false;
        const tempWalls = [];
        if (dir === 0) {
            if (horinzontal.length === 2) return;
            for (let temp of horinzontal) {
                if (
                    (temp === startNode.row && num === startNode.col) ||
                    (temp === finishNode.row && num === finishNode.col)
                ) {
                    isStartFinish = true;
                    continue;
                }
                const tempTuple: [number, number] = [temp, num];
                tempWalls.push(tempTuple);
            }
        } else {
            if (vertical.length === 2) return;
            for (let temp of vertical) {
                if (
                    (num === startNode.row && temp === startNode.col) ||
                    (num === finishNode.row && temp === finishNode.col)
                ) {
                    isStartFinish = true;
                    continue;
                }
                const tempTuple: [number, number] = [num, temp];
                tempWalls.push(tempTuple);
            }
        }
        if (!isStartFinish)
            tempWalls.splice(generateRandomNumber(tempWalls.length), 1);

        for (let wall of tempWalls) walls.push(wall);
    };
}
