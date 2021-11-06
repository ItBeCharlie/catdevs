import { Button } from '@chakra-ui/react';
import React from 'react';
import { numCols, numRows } from '../../utils/constants';

interface ClearButtonProps {
    setGrid: React.Dispatch<React.SetStateAction<number[][]>>;
}

export const generateEmptyGrid = () => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
        rows.push(Array.from(Array(numCols), () => 0));
    }

    return rows;
};

export const ClearButton: React.FC<ClearButtonProps> = ({ setGrid }) => {
    return (
        <Button
            onClick={() => {
                setGrid(generateEmptyGrid());
            }}
        >
            clear
        </Button>
    );
};
