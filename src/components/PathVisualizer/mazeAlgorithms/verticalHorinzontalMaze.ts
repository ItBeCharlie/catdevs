import { mazeAlg, node, wall } from '../constants';
import { range } from '../utils/range';

let walls: wall[];
export class verticalHorinzontalMaze implements mazeAlg {
    constructor(private isVertical: boolean) {}

    public generate = (grid: node[][], startNode: node, finishNode: node) => {
        if (!startNode || !finishNode || startNode === finishNode) return false;

        let vertical = range(grid[0].length);
        let horinzontal = range(grid.length);
        walls = [];
        this.getWalls(vertical, horinzontal, startNode, finishNode);
        return walls;
    };

    private getWalls = (
        vertical: number[],
        horinzontal: number[],
        startNode: node,
        finishNode: node
    ) => {
        if (vertical.length < 2) return;

        const choice = Math.floor(Math.random() * 2);
        if (this.isVertical) {
            vertical.forEach((num) => {
                if (
                    (choice === 0 && num % 2 !== 0) ||
                    (choice === 1 && num % 2 === 0)
                )
                    this.addWall(num, horinzontal, startNode, finishNode);
            });
        } else {
            horinzontal.forEach((num) => {
                if (
                    (choice === 0 && num % 2 !== 0) ||
                    (choice === 1 && num % 2 === 0)
                )
                    this.addWall(num, vertical, startNode, finishNode);
            });
        }
    };

    private addWall = (
        num: number,
        horinzontalOrVertical: number[],
        startNode: node,
        finishNode: node
    ) => {
        let isStartFinish = false;
        const tempWalls = [];
        if (this.isVertical) {
            for (let temp of horinzontalOrVertical) {
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
            for (let temp of horinzontalOrVertical) {
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
            tempWalls.splice(Math.floor(Math.random() * tempWalls.length), 1);
        for (let wall of tempWalls) walls.push(wall);
    };
}
