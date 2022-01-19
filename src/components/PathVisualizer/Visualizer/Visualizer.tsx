import React, { useState } from 'react';
import styled from 'styled-components';
import { astar } from '../algorithms/astar';
import { bfs } from '../algorithms/bfs';
import { dfs } from '../algorithms/dfs';
import { dijkstra } from '../algorithms/dijkstra';
import { greedyBfs } from '../algorithms/greedyBfs';
import { algorithm, mazeAlg, node, wall } from '../constants';
import { randomMaze } from '../mazeAlgorithms/randomMaze';
import { recursiveDivisionMaze } from '../mazeAlgorithms/recursiveDivisionMaze';
import { verticalHorinzontalMaze } from '../mazeAlgorithms/verticalHorinzontalMaze';
import { clearClasses } from '../utils/clearClasses';
import { getNodesInShortestPathOrder } from '../utils/shortestOrder';
import { Navbar } from './Navbar';
import { Node } from './Node/Node';

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

const GridContainer = styled.div`
    margin: 100px 0 0;
    font-size: 0.8vw;
    display: grid;
    place-content: center;
`;

const VisualizerContainer = styled.div``;

export const Visualizer: React.FC = () => {
    const [grid, setGrid] = useState(() => genInitialGrid(20, 50));
    const [selected, setSelected] = useState('Dijkstra');
    const [selectedMaze, setSelectedMaze] = useState('Random');
    const [mouseIsPressed, setMouseIsPressed] = useState(false);
    const [isVisualizing, setIsVisualizing] = useState(false);
    const [generatingMaze, setGeneratingMaze] = useState(false);
    const [mazeGenerated, setMazeGenerated] = useState(false);
    const [speed, setSpeed] = useState(10);
    const [canEdit, setCanEdit] = useState(true);

    const visualize = (alg: string) => {
        if (isVisualizing || generatingMaze) return;
        setIsVisualizing(true);
        setCanEdit(false);

        let algorithm: algorithm;
        switch (alg) {
            case 'Dijkstra':
                algorithm = new dijkstra();
                break;
            case 'A-star':
                //@ts-ignore
                algorithm = new astar();
                break;
            case 'DFS':
                algorithm = new dfs();
                break;
            case 'BFS':
                algorithm = new bfs();
                break;
            case 'greedyBFS':
                algorithm = new greedyBfs();
                break;
            default:
                algorithm = new dijkstra();
        }

        setTimeout(() => {
            const startNode = grid[START_NODE_ROW][START_NODE_COL];
            const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
            const visitedNodesInOrder = algorithm.pathfind(
                grid,
                startNode,
                finishNode
            );
            if (!visitedNodesInOrder) throw new Error('Error in visualize');
            const nodesInShortestPathOrder =
                getNodesInShortestPathOrder(finishNode);
            animate(visitedNodesInOrder, nodesInShortestPathOrder);
        }, speed);
    };

    const animate = (
        visitedNodesInOrder: node[],
        nodesInShortestPathOrder: node[]
    ) => {
        removeVisuals();
        for (let i = 0; i <= visitedNodesInOrder.length; i++) {
            if (i === visitedNodesInOrder.length) {
                setTimeout(() => {
                    animateShortestPath(
                        nodesInShortestPathOrder,
                        visitedNodesInOrder
                    );
                }, speed * i);
                return;
            }
            setTimeout(() => {
                const node = visitedNodesInOrder[i];
                const nodeElement = document.getElementById(
                    `node-${node.row}-${node.col}`
                );
                if (!nodeElement) throw new Error('Problem in animate');
                if (
                    !(
                        (node.row === START_NODE_ROW &&
                            node.col === START_NODE_COL) ||
                        (node.row === FINISH_NODE_ROW &&
                            node.col === FINISH_NODE_COL)
                    )
                )
                    clearClasses(nodeElement, 'node-visited');
            }, speed * i);
        }
    };

    const animateShortestPath = (
        nodesInShortestPathOrder: node[],
        visitedNodesInOrder: node[]
    ) => {
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
            if (i === nodesInShortestPathOrder.length - 1) {
                setTimeout(() => {
                    let newGrid = updateNodesForRender(
                        grid,
                        nodesInShortestPathOrder,
                        visitedNodesInOrder
                    );
                    if (!newGrid) return;
                    setGrid(newGrid);
                    setIsVisualizing(false);
                }, i * (3 * speed));
                return;
            }
            setTimeout(() => {
                const node = nodesInShortestPathOrder[i];
                const nodeElement = document.getElementById(
                    `node-${node.row}-${node.col}`
                );
                if (!nodeElement)
                    throw new Error('Error in animateShortestPath');

                clearClasses(nodeElement, 'node-shortest-path');
            }, speed * i);
        }
    };

    const animateMazeGen = (walls: wall[]) => {
        for (let i = 0; i <= walls.length; i++) {
            if (i === walls.length) {
                setTimeout(() => {
                    // resetGrid();
                    const newGrid = getNewGridWithMaze(grid, walls);
                    setGrid(newGrid);
                    setGeneratingMaze(false);
                }, i * speed);
                return;
            }
            const wall = walls[i];
            const { row, col } = grid[wall[0]][wall[1]];
            setTimeout(() => {
                const nodeElement = document.getElementById(
                    `node-${row}-${col}`
                );
                if (!nodeElement) return;
                clearClasses(nodeElement, 'node-wall-animated');
            }, i * speed);
        }
    };

    const generateMaze = (mazeAlg: string) => {
        if (isVisualizing || generatingMaze || mazeGenerated) return;

        setMazeGenerated(true);

        let algorithm: mazeAlg;
        switch (mazeAlg) {
            case 'Random':
                algorithm = new randomMaze();
                break;
            case 'Recursive':
                algorithm = new recursiveDivisionMaze();
                break;
            case 'Vertical':
                algorithm = new verticalHorinzontalMaze(true);
                break;
            case 'Horinzontal':
                algorithm = new verticalHorinzontalMaze(false);
                break;
            default:
                algorithm = new randomMaze();
        }

        setGeneratingMaze(true);
        setTimeout(() => {
            const startNode = grid[START_NODE_ROW][START_NODE_COL];
            const endNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
            const walls = algorithm.generate(grid, startNode, endNode);
            if (!walls) throw new Error('Error in generateMaze');
            animateMazeGen(walls);
        }, speed);
    };

    const handleMouseDown = (row: number, col: number) => {
        if (isVisualizing || generatingMaze) return;
        if (!canEdit) return;
        const newGrid = getNewGridWithWallToggled(grid, row, col);
        setGrid(newGrid);
        setMouseIsPressed(true);
    };

    const handleMouseEnter = (row: number, col: number) => {
        if (!mouseIsPressed) return;
        if (isVisualizing || generatingMaze) return;
        if (!canEdit) return;
        const newGrid = getNewGridWithWallToggled(grid, row, col);
        setGrid(newGrid);
    };

    const handleMouseUp = () => {
        setMouseIsPressed(false);
    };

    const resetGrid = () => {
        if (isVisualizing || generatingMaze) return;
        setCanEdit(true);
        setMazeGenerated(false);
        for (let row = 0; row < grid.length; row++) {
            for (let col = 0; col < grid[0].length; col++) {
                if (
                    !(
                        (row === START_NODE_ROW && col === START_NODE_COL) ||
                        (row === FINISH_NODE_ROW && col === FINISH_NODE_COL)
                    )
                ) {
                    const nodeElement = document.getElementById(
                        `node-${row}-${col}`
                    );
                    if (!nodeElement) return;

                    clearClasses(nodeElement);
                }
            }
        }
        const newGrid = genInitialGrid(20, 50);
        setGrid(newGrid);
        setIsVisualizing(false);
    };

    const removeVisuals = () => {
        if (isVisualizing || generatingMaze) return;
        for (let row = 0; row < grid.length; row++) {
            for (let col = 0; col < grid[0].length; col++) {
                if (
                    !(
                        (row === START_NODE_ROW && col === START_NODE_COL) ||
                        (row === FINISH_NODE_ROW && col === FINISH_NODE_COL) ||
                        grid[row][col].isWall
                    )
                ) {
                    const nodeElement = document.getElementById(
                        `node-${row}-${col}`
                    );
                    if (!nodeElement) return;

                    clearClasses(nodeElement);
                }
            }
        }
        const newGrid = genInitialGrid(20, 50);
        for (let row of newGrid) {
            for (let col of row) {
                const nodeElement = document.getElementById(
                    `node-${row}-${col}`
                );
                if (!nodeElement) return;

                if (col.isWall) clearClasses(nodeElement, 'node-element');
            }
        }
        setGrid(newGrid);
        setIsVisualizing(false);
    };

    return (
        <VisualizerContainer>
            <Navbar
                generateMaze={generateMaze}
                isVisualizing
                resetGrid={resetGrid}
                selected={selected}
                selectedMaze={selectedMaze}
                setSelected={setSelected}
                setSelectedMaze={setSelectedMaze}
                setSpeed={setSpeed}
                speed={speed}
                visualize={visualize}
                style={{}}
            ></Navbar>
            <GridContainer>
                {grid.map((row: node[], rowIdx) => {
                    return (
                        <div key={rowIdx}>
                            {row.map((node: node, nodeIdx) => {
                                const {
                                    row,
                                    col,
                                    isFinish,
                                    isStart,
                                    isWall,
                                    isVisited,
                                    isShortest,
                                } = node;
                                return (
                                    <Node
                                        key={nodeIdx}
                                        col={col}
                                        isFinish={isFinish}
                                        isStart={isStart}
                                        isWall={isWall}
                                        isVisited={isVisited}
                                        isShortest={isShortest}
                                        // mouseIsPressed={mouseIsPressed}
                                        onMouseDown={(row, col) =>
                                            handleMouseDown(row, col)
                                        }
                                        onMouseEnter={(row, col) =>
                                            handleMouseEnter(row, col)
                                        }
                                        onMouseUp={() => handleMouseUp()}
                                        row={row}
                                    ></Node>
                                );
                            })}
                        </div>
                    );
                })}
            </GridContainer>
        </VisualizerContainer>
    );
};

const genInitialGrid = (rows: number, cols: number): node[][] => {
    const grid = [];
    for (let row = 0; row < rows; row++) {
        const currentRow = [];
        for (let col = 0; col < cols; col++) {
            currentRow.push(createNode(col, row));
        }
        grid.push(currentRow);
    }
    return grid;
};

const createNode = (col: number, row: number): node => {
    return {
        col,
        row,
        isStart: row === START_NODE_ROW && col === START_NODE_COL,
        isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
        distance: Infinity,
        isVisited: false,
        isShortest: false,
        isWall: false,
        previousNode: null,
    };
};

const getNewGridWithWallToggled = (
    grid: node[][],
    row: number,
    col: number
) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
        ...node,
        isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
    return newGrid;
};

const getNewGridWithMaze = (grid: node[][], walls: wall[]) => {
    const newGrid = grid.slice();
    walls.forEach((wall) => {
        const node = newGrid[wall[0]][wall[1]];
        const newNode = {
            ...node,
            isWall: !node.isWall,
        };
        newGrid[wall[0]][wall[1]] = newNode;
    });
    return newGrid;
};

const updateNodesForRender = (
    grid: node[][],
    nodesInShortestPathOrder: node[],
    visitedNodesInOrder: node[]
) => {
    let newGrid = grid.slice();
    for (let node of visitedNodesInOrder) {
        if (
            (node.row === START_NODE_ROW && node.col === START_NODE_COL) ||
            (node.row === FINISH_NODE_ROW && node.col === FINISH_NODE_COL)
        )
            continue;
        let newNode = {
            ...node,
            isVisited: true,
        };
        newGrid[node.row][node.col] = newNode;
    }
    for (let node of nodesInShortestPathOrder) {
        if (node.row === FINISH_NODE_ROW && node.col === FINISH_NODE_COL) {
            return newGrid;
        }
        let newNode = {
            ...node,
            isVisited: false,
            isShortest: true,
        };
        newGrid[node.row][node.col] = newNode;
    }
    return undefined;
};
