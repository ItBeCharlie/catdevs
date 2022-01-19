export type node = {
    col: number;
    row: number;
    isStart: boolean;
    isFinish: boolean;
    distance: number;
    isVisited: boolean;
    isWall: boolean;
    isShortest: boolean;
    previousNode: node | null;
};

export interface algorithm {
    pathfind: (
        grid: node[][],
        startNode: node,
        finishNode: node
    ) => node[] | false;
}

export type wall = [number, number];

export interface mazeAlg {
    generate: (
        grid: node[][],
        startNode: node,
        finishNode: node
    ) => wall[] | false;
}
