import { useEffect, useState } from "react";
import { useAppSelector } from "../hooks"
import NumberCard from "../components/NumberCard";
import Calculator from "../components/Calculator";
import useTimer from "../hooks/useTimer";
import { CiTimer } from "react-icons/ci";
import { CiCircleCheck } from "react-icons/ci";
import { RxCrossCircled } from "react-icons/rx";



type TStats = {
    correctCount: number;
    wrongCount: number;
}

export default function Task() {
    const { appName } = useAppSelector(state => state.app);
    const [started, setStarted] = useState<boolean>(false);
    const [numbers, setNumbers] = useState<string[]>([]);
    const [currentNumberIndex, setCurrentNumberIndex] = useState(0);
    const [selectedNumbers, setSelectedNumbers] = useState<string[]>([]);
    const [showNumbers, setShowNumbers] = useState(true);
    const [isEqual, setIsEqual] = useState<number>(0);
    const [stats, setStats] = useState<TStats>({ correctCount: 0, wrongCount: 0 })
    const { time, startTimer, stopTimer } = useTimer();
    const handleStart = () => {
        setStarted(true)
        startTimer();
        generateAndShowNumbers();
    }


    const generateAndShowNumbers = () => {
        const num1 = generateRandomNumber();
        const num2 = generateRandomNumber([parseInt(num1)]);
        setNumbers([num1, num2]);

        let showNumberInterval: NodeJS.Timeout;
        showNumberInterval = setInterval(() => {
            setCurrentNumberIndex((prevIndex) => {
                if (prevIndex + 1 >= 2) {
                    setShowNumbers(false);
                    clearInterval(showNumberInterval);
                    return prevIndex;
                } else {
                    return prevIndex + 1;
                }
            });
        }, 1000);
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
        let showEqualInterval: NodeJS.Timeout;
        if (areArraysEqual(selectedNumbers, numbers)) {
            setIsEqual(2);
            setStats((prevState) => ({ correctCount: prevState.correctCount + 1, wrongCount: prevState.wrongCount }))
            showEqualInterval = setInterval(() => {
                setIsEqual(0);
                clearInterval(showEqualInterval);
                clearState();
            }, 1500);

        } else {
            setIsEqual(1);
            setStats((prevState) => ({ correctCount: prevState.correctCount, wrongCount: prevState.wrongCount + 1 }))

            showEqualInterval = setInterval(() => {
                setIsEqual(0);
                clearInterval(showEqualInterval);
                clearState();
            }, 1500);
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


    return (
        <section className="w-full h-full flex flex-col items-start justify-center md:px-14 max-md:px-4 mt-4" >
            <div className="flex w-full items-center justify-between">
                <div>
                    <h1 className="text-3xl text-gradient">{appName}</h1>
                    <h5 className="text-lg text-gray-500">Week 1 / Working Memory</h5>
                </div>
                {!started && (
                    <button onClick={handleStart} type="button" className="bg-[#4caf50] rounded-full px-4 py-1.5 text-white hover:bg-[#4caf50]/80 transition-all  flex-none">
                        Start
                    </button>
                )}

                {started && (
                    <div className="flex flex-col items-start justify-center gap-0.5">
                        <p className="flex items-center justify-center gap-1.5 text-[#f9a925] text-sm"><CiTimer size={16} color="#f9a925" /> {time} sn</p>
                        <p className="flex items-center justify-center gap-1.5 text-[#4caf50] text-sm"><CiCircleCheck size={16} color="#4caf50" /> {stats.correctCount}</p>
                        <p className="flex items-center justify-center gap-1.5 text-red-500 text-sm"><RxCrossCircled color="#f56565" /> {stats.wrongCount}</p>
                    </div>
                )}
            </div>
            <hr className="w-full h-[0.5px] my-2 bg-gray-400" />
            {!started && (
                <div className="flex flex-col items-start gap-2">
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
            {started && !showNumbers && (
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

            {started && showNumbers && (
                <div className="bg-black flex flex-col items-center justify-center w-full h-full min-h-[500px]">
                    <NumberCard number={Number(numbers[currentNumberIndex])} />
                </div>
            )}



        </section>
    )
}