import { Button } from '@chakra-ui/react';
import React from 'react';

interface StopButtonProps {
    running: boolean;
    setRunning: React.Dispatch<React.SetStateAction<boolean>>;
    runningRef: React.MutableRefObject<boolean>;
}

export const StopButton: React.FC<StopButtonProps> = ({
    running,
    setRunning,
    runningRef,
}) => {
    return (
        <Button
            onClick={() => {
                setRunning(!running);
                if (running) {
                    runningRef.current = false;
                }
            }}
        >
            stop
        </Button>
    );
};
