import { Button } from '@chakra-ui/react';
import React from 'react';
import { numCols, numRows } from '../../utils/constants';

interface RandomButtonProps {
    setGrid: React.Dispatch<React.SetStateAction<number[][]>>;
}

export const RandomButton: React.FC<RandomButtonProps> = ({ setGrid }) => {
    return (
        <Button
            onClick={() => {
                const rows = [];
                for (let i = 0; i < numRows; i++) {
                    rows.push(
                        Array.from(Array(numCols), () =>
                            Math.random() >= 0.5 ? 1 : 0
                        )
                    );
                }

                setGrid(rows);
            }}
        >
            random
        </Button>
    );
};
