import { useEffect, useState } from "react";
import { CiTimer } from "react-icons/ci";
import { CiCircleCheck } from "react-icons/ci";
import { RxCrossCircled } from "react-icons/rx";
import { useAppSelector } from "../../../hooks";
import useTimer from "../../../hooks/useTimer";
import Calculator from "../../../components/Calculator";
import NumberCard from "../../../components/NumberCard";
import { useNavigate } from "react-router-dom";



type TStats = {
    correctCount: number;
    wrongCount: number;
}
const _TIMER = 1000; // 1000
const _NOTIFIER_TIME = 1500; // 1500
export default function Task1() {
    const navigate = useNavigate();
    const { appName, step } = useAppSelector(state => state.app);
    const [started, setStarted] = useState<boolean>(false);
    const [numbers, setNumbers] = useState<string[]>([]);
    const [currentNumberIndex, setCurrentNumberIndex] = useState(0);
    const [selectedNumbers, setSelectedNumbers] = useState<string[]>([]);
    const [showNumbers, setShowNumbers] = useState(true);
    const [taskDone, setTaskDone] = useState(false);
    const [isEqual, setIsEqual] = useState<number>(0);
    const [stats, setStats] = useState<TStats>({ correctCount: 0, wrongCount: 0 })
    const { time, startTimer, stopTimer, resetTimer } = useTimer();

    const handleStart = () => {
        setStarted(true)
        startTimer();
        generateAndShowNumbers();
    }

    useEffect(() => {
        if (step.task !== 1) {
            navigate(`/week/${step.week}/task-${step.task}`)
        }
    }, [step])


    const generateAndShowNumbers = () => {
        let qCount = stats.correctCount + stats.wrongCount;
        let numberLength = 0;

        if (qCount < 3) {
            const num1 = generateRandomNumber();
            const num2 = generateRandomNumber([parseInt(num1)]);
            numberLength = 2;
            setNumbers([num1, num2]);
        } else if (qCount >= 3 && qCount < 6) {
            const num1 = generateRandomNumber();
            const num2 = generateRandomNumber([parseInt(num1)]);
            const num3 = generateRandomNumber([parseInt(num1), parseInt(num2)]);
            numberLength = 3;
            setNumbers([num1, num2, num3]);
        } else if (qCount >= 6 && qCount < 9) {
            const num1 = generateRandomNumber();
            const num2 = generateRandomNumber([parseInt(num1)]);
            const num3 = generateRandomNumber([parseInt(num1), parseInt(num2)]);
            const num4 = generateRandomNumber([parseInt(num1), parseInt(num2), parseInt(num3)]);
            numberLength = 4;
            setNumbers([num1, num2, num3, num4]);
        } else if (qCount >= 9 && qCount < 12) {
            const num1 = generateRandomNumber();
            const num2 = generateRandomNumber([parseInt(num1)]);
            const num3 = generateRandomNumber([parseInt(num1), parseInt(num2)]);
            const num4 = generateRandomNumber([parseInt(num1), parseInt(num2), parseInt(num3)]);
            const num5 = generateRandomNumber([parseInt(num1), parseInt(num2), parseInt(num3), parseInt(num4)]);
            numberLength = 5;
            setNumbers([num1, num2, num3, num4, num5]);
        } else if (qCount >= 12 && qCount < 15) {
            const num1 = generateRandomNumber();
            const num2 = generateRandomNumber([parseInt(num1)]);
            const num3 = generateRandomNumber([parseInt(num1), parseInt(num2)]);
            const num4 = generateRandomNumber([parseInt(num1), parseInt(num2), parseInt(num3)]);
            const num5 = generateRandomNumber([parseInt(num1), parseInt(num2), parseInt(num3), parseInt(num4)]);
            const num6 = generateRandomNumber([parseInt(num1), parseInt(num2), parseInt(num3), parseInt(num4), parseInt(num5)]);
            numberLength = 6;
            setNumbers([num1, num2, num3, num4, num5, num6]);
        } else if (qCount >= 15 && qCount < 18) {
            const num1 = generateRandomNumber();
            const num2 = generateRandomNumber([parseInt(num1)]);
            const num3 = generateRandomNumber([parseInt(num1), parseInt(num2)]);
            const num4 = generateRandomNumber([parseInt(num1), parseInt(num2), parseInt(num3)]);
            const num5 = generateRandomNumber([parseInt(num1), parseInt(num2), parseInt(num3), parseInt(num4)]);
            const num6 = generateRandomNumber([parseInt(num1), parseInt(num2), parseInt(num3), parseInt(num4), parseInt(num5)]);
            const num7 = generateRandomNumber([parseInt(num1), parseInt(num2), parseInt(num3), parseInt(num4), parseInt(num5), parseInt(num6)]);
            numberLength = 7;
            setNumbers([num1, num2, num3, num4, num5, num6, num7]);
        } else if (qCount >= 18 && qCount < 21) {
            const num1 = generateRandomNumber();
            const num2 = generateRandomNumber([parseInt(num1)]);
            const num3 = generateRandomNumber([parseInt(num1), parseInt(num2)]);
            const num4 = generateRandomNumber([parseInt(num1), parseInt(num2), parseInt(num3)]);
            const num5 = generateRandomNumber([parseInt(num1), parseInt(num2), parseInt(num3), parseInt(num4)]);
            const num6 = generateRandomNumber([parseInt(num1), parseInt(num2), parseInt(num3), parseInt(num4), parseInt(num5)]);
            const num7 = generateRandomNumber([parseInt(num1), parseInt(num2), parseInt(num3), parseInt(num4), parseInt(num5), parseInt(num6)]);
            const num8 = generateRandomNumber([parseInt(num1), parseInt(num2), parseInt(num3), parseInt(num4), parseInt(num5), parseInt(num6), parseInt(num7)]);
            numberLength = 8;
            setNumbers([num1, num2, num3, num4, num5, num6, num7, num8]);
        } else if (qCount >= 21 && qCount < 24) {
            const num1 = generateRandomNumber();
            const num2 = generateRandomNumber([parseInt(num1)]);
            const num3 = generateRandomNumber([parseInt(num1), parseInt(num2)]);
            const num4 = generateRandomNumber([parseInt(num1), parseInt(num2), parseInt(num3)]);
            const num5 = generateRandomNumber([parseInt(num1), parseInt(num2), parseInt(num3), parseInt(num4)]);
            const num6 = generateRandomNumber([parseInt(num1), parseInt(num2), parseInt(num3), parseInt(num4), parseInt(num5)]);
            const num7 = generateRandomNumber([parseInt(num1), parseInt(num2), parseInt(num3), parseInt(num4), parseInt(num5), parseInt(num6)]);
            const num8 = generateRandomNumber([parseInt(num1), parseInt(num2), parseInt(num3), parseInt(num4), parseInt(num5), parseInt(num6), parseInt(num7)]);
            const num9 = generateRandomNumber([parseInt(num1), parseInt(num2), parseInt(num3), parseInt(num4), parseInt(num5), parseInt(num6), parseInt(num7), parseInt(num8)]);
            numberLength = 9;
            setNumbers([num1, num2, num3, num4, num5, num6, num7, num8, num9]);
        }

        if (qCount < 24) {
            let showNumberInterval: NodeJS.Timeout;
            showNumberInterval = setInterval(() => {
                setCurrentNumberIndex((prevIndex) => {
                    if (prevIndex + 1 >= numberLength) {
                        setShowNumbers(false);
                        clearInterval(showNumberInterval);
                        return prevIndex;
                    } else {
                        return prevIndex + 1;
                    }
                });
            }, _TIMER);
        } else {
            setTaskDone(true);
            stopTimer();
        }


    };

    const clearState = () => {
        setSelectedNumbers([]);
        generateAndShowNumbers();
        setShowNumbers(true);
        setCurrentNumberIndex(0);
    }

    const generateRandomNumber = (exclude?: number[]): string => {
        const min = 1;
        const max = 9;
        let randomNumber: number;
        do {
            randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
        } while (exclude && exclude.includes(randomNumber));

        return randomNumber.toString();
    };

    const checkNumbers = () => {

        if (selectedNumbers.length === 0) return;

        let showEqualInterval: NodeJS.Timeout;
        if (areArraysEqual(selectedNumbers, numbers)) {
            setIsEqual(2);
            setStats((prevState) => ({ correctCount: prevState.correctCount + 1, wrongCount: prevState.wrongCount }))
            showEqualInterval = setInterval(() => {
                setIsEqual(0);
                clearInterval(showEqualInterval);
                clearState();
            }, _NOTIFIER_TIME);

        } else {
            setIsEqual(1);
            setStats((prevState) => ({ correctCount: prevState.correctCount, wrongCount: prevState.wrongCount + 1 }))

            showEqualInterval = setInterval(() => {
                setIsEqual(0);
                clearInterval(showEqualInterval);
                clearState();
            }, _NOTIFIER_TIME);
        }
    }


    const areArraysEqual = (arr1: string[], arr2: string[]): boolean => {
        if (arr1.length !== arr2.length) {
            return false;
        }

        const sortedArr1 = [...arr1].sort();
        const sortedArr2 = [...arr2].sort();

        return JSON.stringify(sortedArr1) === JSON.stringify(sortedArr2);
    }


    const handleNextTask = () => {
        setStarted(false);
        setNumbers([]);
        setCurrentNumberIndex(0);
        setSelectedNumbers([]);
        setShowNumbers(true);
        setTaskDone(false);
        setStats({ correctCount: 0, wrongCount: 0 });
        resetTimer();
        navigate('/week/1/task-2')
    }


    return (
        <section className="w-full h-full flex flex-col items-start justify-center md:px-14 max-md:px-4 mt-4" >
            <div className="flex w-full bg-white p-4 rounded-md shadow-md items-center justify-between">
                <div>
                    <h1 className="text-3xl text-gradient">{appName}</h1>
                    <h5 className="text-lg text-gray-500">Week 1 / Working Memory</h5>
                </div>
                {!started && (
                    <button onClick={handleStart} type="button" className="bg-[#4caf50] rounded-full px-4 py-1.5 text-white hover:bg-[#4caf50]/80 transition-all  flex-none">
                        Start
                    </button>
                )}

                {started && !taskDone && (
                    <div className="flex flex-col items-start justify-center gap-0.5">
                        <p className="flex items-center justify-center gap-1.5 text-[#f9a925] text-sm"><CiTimer size={16} color="#f9a925" /> {time} sn</p>
                        <p className="flex items-center justify-center gap-1.5 text-[#4caf50] text-sm"><CiCircleCheck size={16} color="#4caf50" /> {stats.correctCount}</p>
                        <p className="flex items-center justify-center gap-1.5 text-red-500 text-sm"><RxCrossCircled color="#f56565" /> {stats.wrongCount}</p>
                    </div>
                )}

                {started && taskDone && (
                    <div className="bg-[#4caf50] rounded-full my-2 px-2.5 py-1.5 ">
                        <h5 className="text-lg text-white">Task 1  - Done</h5>
                    </div>
                )}
            </div>
            <hr className="w-full h-[0.5px] my-2 bg-gray-400" />
            {!started && (
                <div className="flex bg-white w-full p-4 rounded-md shadow-md flex-col items-start gap-2">
                    <div className="bg-[#5068cb]/20 rounded-full my-2 px-2.5 py-1.5 ">
                        <h5 className="text-lg text-gradient">Task 1  - Description</h5>
                    </div>
                    <p>In this experiment you will try to memorize numbers you see on the screen. All numbers are between 0 and 9.</p>
                    <p>We call such numbers <b>digits</b></p>
                    <p >You will see a sequence of <b>digits</b>, one after another.</p>
                    <p>Once you have remembered the digits, you need to repeat them.</p>
                    <p>If you make a mistake, you can <span className="bg-[#4caf50] text-white text-sm rounded-full px-2">Clear</span> the last one you entered.</p>
                    <p>After you have entered all the letters, you click <span className="bg-[#4caf50] text-sm text-white rounded-full px-2">Continue</span></p>

                    <p className="mt-2">The computer will tell you if you remembered the letters correctly or not.</p>
                </div>
            )}
            {started && !showNumbers && !taskDone && (
                <div className="bg-black flex flex-col items-center justify-center w-full h-full min-h-[500px]">
                    {isEqual === 2 && (
                        <p className="text-[#4caf50] my-2">Correct!</p>
                    )}
                    {isEqual === 1 && (
                        <p className="text-red-500 my-2">Wrong!</p>
                    )}

                    <Calculator checkNumbers={checkNumbers} selectedNumbers={selectedNumbers} setSelectedNumbers={setSelectedNumbers} />
                </div>
            )}

            {started && showNumbers && !taskDone && (
                <div className="bg-black flex flex-col items-center justify-center w-full h-full min-h-[500px]">
                    <NumberCard xl={true} number={Number(numbers[currentNumberIndex])} />
                </div>
            )}

            {started && showNumbers && taskDone && (
                <div className="flex flex-col items-start gap-2">
                    <p>Time : <b>{time} sn.</b> </p>
                    <p>Correct count: <b>{stats.correctCount}</b></p>
                    <p>Wrong count: <b>{stats.wrongCount}</b></p>

                    <button onClick={handleNextTask} type="button" className="bg-[#5068cb] rounded-full px-4 py-1.5 text-white hover:bg-[#5068cb]/80 transition-all  flex-none">
                        Next Task
                    </button>
                </div>
            )}



        </section>
    )
}