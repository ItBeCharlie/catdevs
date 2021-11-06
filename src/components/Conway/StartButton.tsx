import { Button } from '@chakra-ui/react';
import React from 'react';

interface StartButtonProps {
    running: boolean;
    setRunning: React.Dispatch<React.SetStateAction<boolean>>;
    runningRef: React.MutableRefObject<boolean>;
    runSimulation: () => void;
}

export const StartButton: React.FC<StartButtonProps> = ({
    running,
    setRunning,
    runningRef,
    runSimulation,
}) => {
    return (
        <Button
            onClick={() => {
                setRunning(!running);
                if (!running) {
                    runningRef.current = true;
                    runSimulation();
                }
            }}
        >
            start
        </Button>
    );
};
