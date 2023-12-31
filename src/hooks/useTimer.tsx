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
    const startTimeRef = useRef<number>(performance.now());
    const timerRef = useRef<number | null>(null);

    const startTimer = (): void => {
        setIsRunning(true);
        startTimeRef.current = performance.now();
        requestAnimationFrame(updateTimer);
    };

    const stopTimer = (): void => {
        setIsRunning(false);
    };

    const resetTimer = (): void => {
        setTime(initialTime);
        stopTimer();
    };

    const updateTimer = (currentTime: number): void => {
        const elapsedTime = (currentTime - startTimeRef.current) / 1000; // Saniye cinsinden geçen süre
        setTime(Math.abs(initialTime + elapsedTime));

        if (isRunning) {
            timerRef.current = requestAnimationFrame(updateTimer);
        }
    };

    useEffect(() => {
        return (): void => {
            cancelAnimationFrame(timerRef.current as number);
        };
    }, []);

    return {
        time,
        isRunning,
        startTimer,
        stopTimer,
        resetTimer,
    };
};

export default useTimer;
