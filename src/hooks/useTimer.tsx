import { useState, useEffect, useRef } from 'react';

interface TimerHook {
    time: number;
    isRunning: boolean;
    startTimer: () => void;
    stopTimer: () => void;
    resetTimer: () => void;
}

const useTimer = (initialTime: number = 0): TimerHook => {
    const [time, setTime] = useState<number>(initialTime);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const timerRef = useRef<number | null>(null);

    const startTimer = (): void => {
        setIsRunning(true);
    };

    const stopTimer = (): void => {
        setIsRunning(false);
    };

    const resetTimer = (): void => {
        setTime(initialTime);
        stopTimer();
    };

    useEffect(() => {
        if (isRunning) {
            timerRef.current = window.setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);
        } else {
            // TypeScript expects clearInterval to receive a number or null
            window.clearInterval(timerRef.current as number);
        }

        return (): void => {
            // TypeScript expects clearInterval to receive a number or null
            window.clearInterval(timerRef.current as number);
        };
    }, [isRunning]);

    return {
        time,
        isRunning,
        startTimer,
        stopTimer,
        resetTimer,
    };
};

export default useTimer;
