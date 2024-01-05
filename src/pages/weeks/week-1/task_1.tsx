import { useEffect, useState } from "react";
import { CiTimer } from "react-icons/ci";
import { CiCircleCheck } from "react-icons/ci";
import { RxCrossCircled } from "react-icons/rx";
import { useAppSelector } from "../../../hooks";
import useTimer from "../../../hooks/useTimer";
import Calculator from "../../../components/Calculator";
import NumberCard from "../../../components/NumberCard";
import { useNavigate } from "react-router-dom";
import { Button, Drawer, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Info } from "@mui/icons-material";

type TAnswers = {
    answer: string;
    question: string;
    status: boolean;
    time: number;
}

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
    const [answers, setAnswers] = useState<TAnswers[]>([]);

    const handleStart = () => {
        setStarted(true)
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
        } else if (qCount >= 21 && qCount < 23) {
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

        if (qCount < 23) {
            let showNumberInterval: NodeJS.Timeout;
            showNumberInterval = setInterval(() => {
                setCurrentNumberIndex((prevIndex) => {
                    if (prevIndex + 1 >= numberLength) {
                        setShowNumbers(false);
                        startTimer();
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

    useEffect(() => {
        console.table(answers)
    }, [answers])

    const checkNumbers = () => {

        if (selectedNumbers.length === 0) return;

        stopTimer();

        let showEqualInterval: NodeJS.Timeout;
        if (areArraysEqual(selectedNumbers, numbers)) {
            setIsEqual(2);
            setStats((prevState) => ({ correctCount: prevState.correctCount + 1, wrongCount: prevState.wrongCount }))
            setAnswers((prevState) => ([...prevState, { question: [...numbers].sort().join(""), answer: [...selectedNumbers].sort().join(""), status: true, time }]))
            showEqualInterval = setInterval(() => {
                setIsEqual(0);
                resetTimer();
                clearInterval(showEqualInterval);
                clearState();
            }, _NOTIFIER_TIME);
        } else {
            setIsEqual(1);
            setStats((prevState) => ({ correctCount: prevState.correctCount, wrongCount: prevState.wrongCount + 1 }))
            setAnswers((prevState) => ([...prevState, { question: [...numbers].sort().join(""), answer: [...selectedNumbers].sort().join(""), status: false, time }]))
            showEqualInterval = setInterval(() => {
                setIsEqual(0);
                resetTimer();
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
        navigate('/hafta/1/task-2')
    }
    const [drawer, setDrawer] = useState<boolean>(false);
    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }
        setDrawer(open);
    };



    return (
        <section className="w-full h-full flex flex-col items-start justify-center md:px-14 max-md:px-4 mt-4" >
            <div className="flex w-full bg-white p-4 rounded-md shadow-md items-center justify-between">
                <div>
                    <h1 className="text-3xl text-gradient">{appName}</h1>
                    <h5 className="text-lg text-gray-500">Hafta 1 / Digit Span</h5>
                </div>
                {!started && (
                    <button onClick={handleStart} type="button" className="bg-[#4caf50] rounded-full px-4 py-1.5 text-white hover:bg-[#4caf50]/80 transition-all  flex-none">
                        Başlat
                    </button>
                )}

                {started && !taskDone && (
                    <div className="flex flex-col items-start justify-center gap-0.5">
                        <p className="flex items-center justify-center gap-1.5 text-[#4caf50] text-sm"><CiCircleCheck size={16} color="#4caf50" /> {stats.correctCount}</p>
                        <p className="flex items-center justify-center gap-1.5 text-red-500 text-sm"><RxCrossCircled color="#f56565" /> {stats.wrongCount}</p>
                    </div>
                )}

                {started && taskDone && (
                    <div className="bg-[#4caf50] rounded-full my-2 px-2.5 py-1.5 ">
                        <h5 className="text-lg text-white">Tamamlandı</h5>
                    </div>
                )}
            </div>
            <hr className="w-full h-[0.5px] my-2 bg-gray-400" />
            {!started && (
                <div className="flex bg-white w-full p-4 rounded-md shadow-md flex-col items-start gap-2">
                    <div className="bg-[#5068cb]/20 rounded-full my-2 px-2.5 py-1.5 ">
                        <h5 className="text-lg text-gradient">Takip etmeniz gereken yönergeler:</h5>
                    </div>
                    <p>Bu egzersizde ekranda gördüğünüz sayıları ezberlemeye çalışacaksınız. Tüm sayılar 0 ile 9 arasındadır.</p>
                    <p>Bu tür sayılara <b>rakam</b> diyoruz.</p>
                    <p>Birbiri ardına bir dizi <b>rakam</b> göreceksiniz.</p>
                    <p>Rakamları hatırladıktan sonra sizlerden o rakamları sırayla yazmanızı isteyeceğiz.</p>
                    <p>Ör. 1 - 2 - 3 - 4 = 1234 yazmanız gerekmektedir.</p>
                    <p>Tüm sayıları girdikten sonra <span className="bg-[#4caf50] text-white text-sm rounded-full px-2">Devam</span> butonuna tıklayarak sonraki admına geçeceksiniz.</p>
                    <p>Rakamları girdikten sonra yanıtınızın doğru olup olmadığı söylenecektir.</p>

                    <p className="mt-2">Hadi başlayalım!</p>
                </div>
            )}
            {started && !showNumbers && !taskDone && (
                <div className="bg-black mb-4 flex flex-col items-center justify-center w-full h-full min-h-[500px]">
                    {isEqual === 2 && (
                        <p className="text-[#4caf50] text-3xl my-2">Doğru!</p>
                    )}
                    {isEqual === 1 && (
                        <p className="text-red-500 text-3xl my-2">Yanlış!</p>
                    )}

                    {isEqual === 0 && <Calculator checkNumbers={checkNumbers} selectedNumbers={selectedNumbers} setSelectedNumbers={setSelectedNumbers} />
                    }

                </div>
            )}

            {started && showNumbers && !taskDone && (
                <div className="bg-black flex flex-col items-center justify-center w-full h-full min-h-[500px]">
                    <NumberCard xl={true} number={Number(numbers[currentNumberIndex])} />
                </div>
            )}

            {started && showNumbers && taskDone && (
                <div className="flex flex-col items-start gap-2">
                    <p>Correct count: <b>{stats.correctCount}</b></p>
                    <p>Wrong count: <b>{stats.wrongCount}</b></p>

                    <button onClick={handleNextTask} type="button" className="bg-[#5068cb] rounded-full px-4 py-1.5 text-white hover:bg-[#5068cb]/80 transition-all  flex-none">
                        Sıradaki Oyun
                    </button>
                </div>
            )}

            <IconButton style={{ position: "fixed", background: "#5068cb", color: "white", bottom: 10, right: 10, zIndex: 10, height: "60px", width: "60px" }} onClick={toggleDrawer(true)}>
                <Info />
            </IconButton>
            <Drawer
                anchor="bottom"
                open={drawer}
                onClose={toggleDrawer(false)}>
                <TableContainer className="flex items-start justify-center h-[400px] overflow-auto" component={Paper}>
                    <Table stickyHeader sx={{ maxWidth: 650, overflow: "auto" }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Index</TableCell>
                                <TableCell>Soru</TableCell>
                                <TableCell align="right">Cevap</TableCell>
                                <TableCell align="right">Sonuç</TableCell>
                                <TableCell align="right">Süre</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {answers.map((row, key) => (
                                <TableRow
                                    key={key}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {key + 1}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {row.question}
                                    </TableCell>
                                    <TableCell align="right">{row.answer}</TableCell>
                                    <TableCell align="right">{row.status ? 'Doğru' : 'Yanlış'}</TableCell>
                                    <TableCell align="right">{row.time.toFixed(6)} ms</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Drawer>

        </section>
    )
}