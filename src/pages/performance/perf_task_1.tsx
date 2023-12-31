import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks";
import { TRandomImage, generateRandomImage } from "../../utils";
import useTimer from "../../hooks/useTimer";
import { Drawer, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Info } from "@mui/icons-material";
import classNames from "classnames";

type TAnswers = Pick<TRandomImage, 'shape' | 'number' | 'color'> & {
    guess: number;
    status: boolean;
    time: number;
};

export default function PerfTask1() {
    const navigate = useNavigate();
    const { appName, step } = useAppSelector(state => state.app);
    const [started, setStarted] = useState<boolean>(false);
    const [taskDone, setTaskDone] = useState(false);
    const [activeData, setActiveData] = useState<TRandomImage>(generateRandomImage())
    const [answers, setAnswers] = useState<TAnswers[]>([]);
    const [result, setResult] = useState<string>("");
    const { time, startTimer, stopTimer, resetTimer } = useTimer();

    useEffect(() => {
        if (step.task !== 1) {
            navigate(`/week/${step.week}/task-${step.task}`)
        }
    }, [step])

    const handleStart = () => {
        startTimer();
        setStarted(true)
    }



    const checkImage = (guess: number) => {
        const userResult = activeData.number === guess;
        stopTimer();
        setAnswers((prevState) => ([...prevState, { shape: activeData.shape, number: activeData.number, color: activeData.color, guess: guess, status: userResult, time: time }]))
        setResult(userResult ? "Doğru!" : "Yanlış!");
        let showNumberInterval: NodeJS.Timeout;
        showNumberInterval = setInterval(() => {
            setResult("");
            resetTimer();
            setActiveData(generateRandomImage())
            startTimer()
            clearInterval(showNumberInterval);
        }, 1000);
    }

    useEffect(() => {
        console.log(activeData)
    }, [activeData])

    useEffect(() => {
        console.table(answers)
    }, [answers])

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
                    <h5 className="text-lg text-gray-500">Wisconsin Card Sorting</h5>
                </div>
                {!started && (
                    <button onClick={handleStart} type="button" className="bg-[#4caf50] rounded-full px-4 py-1.5 text-white hover:bg-[#4caf50]/80 transition-all  flex-none">
                        Başla
                    </button>
                )}


                {started && taskDone && (
                    <div className="bg-[#4caf50] rounded-full my-2 px-2.5 py-1.5 ">
                        <h5 className="text-lg text-white">Wisconsin Card Sorting  - Done</h5>
                    </div>
                )}
            </div>
            <hr className="w-full h-[0.5px] my-2 bg-gray-400" />
            {!started && (
                <div className="flex bg-white w-full p-4 rounded-md shadow-md flex-col items-start gap-2">
                    <div className="bg-[#5068cb]/20 rounded-full my-2 px-2.5 py-1.5 ">
                        <h5 className="text-lg text-gradient">Wisconsin Card Sorting  - Description</h5>
                    </div>
                    <p>In this task, you need to match a card to one of four tasks presented at the top of the screen.</p>
                    <p>Click one of the four cards that match the card on the left. Follow your selection, you will get feedback.</p>
                    <p>If your match was not correct, you need to try a different rule.</p>
                </div>
            )}

            {started && !taskDone && (
                <div className="bg-black flex flex-col relative items-center justify-around w-full h-full min-h-[500px]">

                    <div className="rounded-md grid grid-cols-2 md:grid-cols-4 gap-4 items-center justify-center">

                        <button onClick={() => checkImage(1)} type="button" className="w-20 h-20">
                            <img className="w-full h-full rounded-md" src={`${process.env.PUBLIC_URL}/img/perf_1_img/1redDots.jpg`} />
                        </button>

                        <button onClick={() => checkImage(2)} type="button" className="w-20 h-20">
                            <img className="w-full h-full rounded-md" src={`${process.env.PUBLIC_URL}/img/perf_1_img/2greenTriangles.jpg`} />

                        </button>
                        <button onClick={() => checkImage(3)} type="button" className="w-20 h-20">
                            <img className="w-full h-full rounded-md" src={`${process.env.PUBLIC_URL}/img/perf_1_img/3blueCrosses.jpg`} />
                        </button>

                        <button onClick={() => checkImage(4)} type="button" className="w-20 h-20">
                            <img className="w-full h-full rounded-md" src={`${process.env.PUBLIC_URL}/img/perf_1_img/4yellowStars.jpg`} />
                        </button>

                    </div>


                    {activeData.image && result === "" && (
                        <button type="button" className=" w-20 h-20">
                            <img className="w-full h-full rounded-md" src={`${process.env.PUBLIC_URL}/img/perf_1_img/${activeData.image}`} />
                        </button>
                    )}

                    {result !== "" && (
                        <p className={classNames('my-2', {
                            'text-[#4caf50]': result === "Doğru!",
                            'text-red-500': result === "Yanlış!"
                        })}>{result}</p>
                    )}


                </div>
            )}

            <IconButton style={{ position: "fixed", background: "#5068cb", color: "white", bottom: 10, right: 10, zIndex: 10, height: "60px", width: "60px" }} onClick={toggleDrawer(true)}>
                <Info />
            </IconButton>
            <Drawer
                anchor="bottom"
                open={drawer}
                onClose={toggleDrawer(false)}>
                <TableContainer className="flex items-start justify-center w-full h-[400px] overflow-auto" component={Paper}>
                    <Table stickyHeader sx={{ maxWidth: 500, overflow: "auto" }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Soru</TableCell>
                                <TableCell>Şekil</TableCell>
                                <TableCell align="right">Sayı</TableCell>
                                <TableCell align="right">Renk</TableCell>
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
                                        {row.shape}
                                    </TableCell>
                                    <TableCell align="right">{row.number}</TableCell>
                                    <TableCell align="right">{row.color}</TableCell>
                                    <TableCell align="right">{row.guess}</TableCell>
                                    <TableCell align="right">{row.status ? 'Doğru' : 'Yanlış'}</TableCell>
                                    <TableCell align="right">{row.time} ms</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Drawer>
        </section>
    )
}