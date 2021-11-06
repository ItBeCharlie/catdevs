import produce from 'immer';
import React, { useCallback, useRef, useState } from 'react';
import {
    ClearButton,
    generateEmptyGrid,
} from 'src/components/Conway/ClearButton';
import { GenerateGrid } from 'src/components/Conway/GenerateGrid';
import { RandomButton } from 'src/components/Conway/RandomButton';
import { StartButton } from 'src/components/Conway/StartButton';
import { StopButton } from 'src/components/Conway/StopButton';
import { numCols, numRows } from 'src/utils/constants';

interface conwayProps {}
const operations = [
    [0, 1],
    [0, -1],
    [1, -1],
    [-1, 1],
    [-1, -1],
    [1, 1],
    [1, 0],
    [-1, 0],
];

const conway: React.FC<conwayProps> = ({}) => {
    const [grid, setGrid] = useState(() => {
        return generateEmptyGrid();
    });

    const [running, setRunning] = useState(false);

    const runningRef = useRef(running);
    runningRef.current = running;

    const runSimulation = useCallback(() => {
        if (!runningRef.current) {
            return;
        }
        setGrid((grid) => {
            return produce(grid, (gridCopy) => {
                for (let i = 0; i < numRows; i++) {
                    for (let k = 0; k < numCols; k++) {
                        let neighbors = 0;
                        operations.forEach(([x, y]) => {
                            const newI = i + x;
                            const newK = k + y;
                            if (
                                newI >= 0 &&
                                newI < numRows &&
                                newK >= 0 &&
                                newK < numCols
                            ) {
                                neighbors += grid[newI][newK];
                            }
                        });
                        if (neighbors < 2 || neighbors > 3) gridCopy[i][k] = 0;
                        else if (grid[i][k] === 0 && neighbors === 3)
                            gridCopy[i][k] = 1;
                    }
                }
            });
        });
        setTimeout(runSimulation, 50);
    }, []);

    return (
        <>
            <StartButton
                running={running}
                runningRef={runningRef}
                setRunning={setRunning}
                runSimulation={runSimulation}
            />
            <StopButton
                running={running}
                runningRef={runningRef}
                setRunning={setRunning}
            />
            <ClearButton setGrid={setGrid} />
            <RandomButton setGrid={setGrid} />
            <GenerateGrid setGrid={setGrid} grid={grid} />
        </>
    );
};

export default conway;
