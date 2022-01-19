import React from 'react';
import styled from 'styled-components';

const NodeContainer = styled.div`
    width: 2em;
    height: 2em;
    outline: 1px solid rgb(175, 216, 248);
    display: inline-block;

    &.node-finish {
        background-color: red;
    }

    &.node-start {
        background-color: green;
    }

    &.node-visited {
        animation-name: visitedAnimation;
        animation-duration: 1.5s;
        animation-timing-function: ease-out;
        animation-delay: 0;
        animation-direction: alternate;
        animation-iteration-count: 1;
        animation-fill-mode: forwards;
        animation-play-state: running;
    }

    &.node-wall-animated {
        animation-name: wallAnimation;
        animation-duration: 0.5s;
        animation-timing-function: ease-out;
        animation-direction: alternate;
        animation-fill-mode: forwards;
    }

    @keyframes wallAnimation {
        0% {
            transform: scale(0.4);
            background-color: rgb(2, 36, 51);
            border-radius: 100%;
        }

        50% {
            transform: scale(0.6);
            background-color: rgb(2, 36, 51);
        }

        75% {
            transform: scale(0.8);
            background-color: rgb(2, 36, 51);
        }

        100% {
            transform: scale(1);
            background-color: rgb(2, 36, 51);
        }
    }

    @keyframes visitedAnimation {
        0% {
            transform: scale(0.3);
            background-color: rgba(0, 0, 66, 0.75);
            border-radius: 100%;
        }

        50% {
            background-color: rgba(17, 104, 217, 0.75);
        }

        75% {
            transform: scale(1.2);
            background-color: rgba(0, 217, 159, 0.75);
        }

        100% {
            transform: scale(1);
            background-color: rgba(0, 190, 218, 0.75);
        }
    }

    &.node-wall {
        background-color: rgb(12, 53, 71);
    }

    &.node-shortest-path {
        animation-name: shortestPath;
        animation-duration: 1.5s;
        animation-timing-function: ease-out;
        animation-delay: 0;
        animation-direction: alternate;
        animation-iteration-count: 1;
        animation-fill-mode: forwards;
        animation-play-state: running;
    }

    @keyframes shortestPath {
        0% {
            transform: scale(0.6);
            background-color: rgb(255, 254, 106);
        }

        50% {
            transform: scale(1.2);
            background-color: rgb(255, 254, 106);
        }

        100% {
            transform: scale(1);
            background-color: rgb(255, 254, 106);
        }
    }
`;

interface NodeProps {
    col: number;
    row: number;
    isFinish: boolean;
    isStart: boolean;
    isWall: boolean;
    isVisited: boolean;
    isShortest: boolean;
    onMouseDown: (row: number, col: number) => void;
    onMouseEnter: (row: number, col: number) => void;
    onMouseUp: (row: number, col: number) => void;
}

export const Node: React.FC<NodeProps> = ({
    col,
    row,
    isFinish,
    isStart,
    isWall,
    isVisited,
    isShortest,
    onMouseDown,
    onMouseEnter,
    onMouseUp,
}) => {
    const item = isFinish
        ? 'node-finish'
        : isStart
        ? 'node-start'
        : isWall
        ? 'node-wall'
        : isShortest
        ? 'node-shortest-path'
        : isVisited
        ? 'node-visited'
        : '';

    return (
        <NodeContainer
            id={`node-${row}-${col}`}
            className={`${item}`}
            onMouseDown={() => onMouseDown(row, col)}
            onMouseEnter={() => onMouseEnter(row, col)}
            onMouseUp={() => onMouseUp(row, col)}
        />
    );
};
