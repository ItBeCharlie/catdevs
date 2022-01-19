import React from 'react';
import styled from 'styled-components';

const NavbarContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2em 5em 0em 5em;

    & > * {
        margin-left: 2em;
        margin-right: 2em;
    }
`;

const SelectContainer = styled.select`
    appearance: none;
    outline: 0;
    border: 0;
    box-shadow: 0 0 1em 0 rgba(0, 0, 0, 0.2);
    border-radius: 0.25em;
    padding: 0 1em;
    color: #fff;
    background-color: #2c3e50;
    background-image: none;
    cursor: pointer;
    width: 15em;
    height: 3em;
    padding: 0 4em 0 1em;
    cursor: pointer;

    &::-ms-expand {
        display: none;
    }

    &:focus {
        outline: none;
    }

    & > option {
        color: inherit;
        background-color: #320a28;
    }
`;

const ButtonContainer = styled.button`
    letter-spacing: 1px;
    padding: 1em 1em 1em;
    outline: 0;
    border: 1px solid black;
    cursor: pointer;
    position: relative;
    background-color: rgba(0, 0, 0, 0);

    &::after {
        content: '';
        background-color: #dcbaff;
        width: 100%;
        z-index: -1;
        position: absolute;
        height: 100%;
        top: 7px;
        left: 7px;
        transition: 0.2s;
    }

    &:hover::after {
        top: 0px;
        left: 0px;
    }
`;

interface NavbarProps {
    selected: string;
    setSelected: React.Dispatch<React.SetStateAction<string>>;
    selectedMaze: string;
    setSelectedMaze: React.Dispatch<React.SetStateAction<string>>;
    speed: number;
    setSpeed: React.Dispatch<React.SetStateAction<number>>;
    isVisualizing: boolean;
    resetGrid: () => void;
    visualize: (alg: string) => void;
    generateMaze: (mazeAlg: string) => void;
    style?: React.CSSProperties;
}

export const Navbar: React.FC<NavbarProps> = ({
    selected,
    setSelected,
    selectedMaze,
    setSelectedMaze,
    speed,
    setSpeed,
    isVisualizing,
    resetGrid,
    visualize,
    generateMaze,
    style,
}) => {
    return (
        <NavbarContainer style={style}>
            <SelectContainer
                name='algs'
                id='algs'
                value={selected}
                onChange={(e) => {
                    setSelected(e.target.value);
                }}
            >
                <option value='Dijkstra'>Dijkstra</option>
                <option value='A-star'>A-Star</option>
                <option value='DFS'>Depth First Search</option>
                <option value='BFS'>Breadth First Search</option>
                <option value='greedyBFS'>Greedy Breadth First Search</option>
            </SelectContainer>
            <ButtonContainer onClick={() => visualize(selected)}>
                Visualize {selected}'s Algorithm
            </ButtonContainer>
            <SelectContainer
                name='mazeAlgs'
                id='mazeAlgs'
                value={selectedMaze}
                onChange={(e) => {
                    setSelectedMaze(e.target.value);
                }}
            >
                <option value='Random'>Random</option>
                <option value='Recursive'>Recursive Division Maze</option>
                <option value='Vertical'>Vertical Division Maze</option>
                <option value='Horinzontal'>Horinzontal Division Maze</option>
            </SelectContainer>
            <ButtonContainer onClick={() => generateMaze(selectedMaze)}>
                Generate {selectedMaze} maze
            </ButtonContainer>
            <ButtonContainer onClick={() => resetGrid()}>
                Reset Grid
            </ButtonContainer>
            <SelectContainer
                name='speed'
                id='speed'
                value={speed}
                onChange={(e: any) => {
                    if (isVisualizing) return;
                    setSpeed(e.target.value);
                }}
            >
                <option value='20'>Slow</option>
                <option value='10'>Medium</option>
                <option value='7'>Fast</option>
            </SelectContainer>
        </NavbarContainer>
    );
};
