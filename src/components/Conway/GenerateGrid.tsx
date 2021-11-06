import { produce } from 'immer';
import React, { useState } from 'react';
import { numCols, numRows } from '../../utils/constants';
interface GenerateGridProps {
    grid: number[][];
    setGrid: React.Dispatch<React.SetStateAction<number[][]>>;
}

export const GenerateGrid: React.FC<GenerateGridProps> = ({
    grid,
    setGrid,
}) => {
    const [img, setImg] = useState(
        'https://c.tenor.com/jFn8sS1Et-0AAAAM/cat.gif'
    );
    return (
        <>
            <input
                type="text"
                value={img}
                style={{ width: '50ch', padding: '.5em 1em' }}
                onChange={(e) => setImg(e.target.value)}
            />
            <div className="parent" style={{ position: 'relative' }}>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: `repeat(${numCols}, 20px)`,
                        backgroundColor: 'transparent',
                        position: 'absolute',
                        zIndex: 2,
                    }}
                >
                    {grid.map((rows, i) =>
                        rows.map((col, k) => (
                            <div
                                key={`${i}-${k}`}
                                onClick={() => {
                                    const newGrid = produce(
                                        grid,
                                        (gridCopy) => {
                                            gridCopy[i][k] = grid[i][k] ? 0 : 1;
                                        }
                                    );
                                    setGrid(newGrid);
                                }}
                                style={{
                                    width: 20,
                                    height: 20,
                                    backgroundColor: grid[i][k]
                                        ? 'transparent'
                                        : 'rgba(0,0,255, .7)',
                                    border: 'solid 1px black',
                                }}
                            />
                        ))
                    )}
                </div>
                <div
                    className="cat"
                    style={{
                        position: 'relative',
                        zIndex: 1,
                    }}
                >
                    <img
                        src={img}
                        alt="c a a a t"
                        width={`${numCols * 20}px`}
                        height={`${numRows * 20}px`}
                    />
                </div>
            </div>
        </>
    );
};
