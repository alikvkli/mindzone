import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks";
import { TRandomImage, generateRandomImage, generateRandomSequence } from "../../utils";
import useTimer from "../../hooks/useTimer";
import { Box, Collapse, Drawer, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Info, KeyboardArrowDown, KeyboardArrowUp, Visibility } from "@mui/icons-material";
import classNames from "classnames";
import React from "react";

const _LETTER_GENERATE_TIME = 3000;
const _LETTER_SHOW_TIME = 500;
const _MAX_ROUND = 5; //15

type TAnswers = {
    status: 'match' | 'false' | 'missing';
}

export default function PerfTask2() {
    const navigate = useNavigate();
    const { appName, step } = useAppSelector(state => state.app);
    const [started, setStarted] = useState<boolean>(false);
    const [taskDone, setTaskDone] = useState(false);
    const [result, setResult] = useState<string>("");
    const { time, startTimer, stopTimer, resetTimer } = useTimer();
    const [sequence, setSequence] = useState<string[]>([]);
    const [showSequence, setShowSequence] = useState<boolean>(false);
    const [round, setRound] = useState<number>(0);
    const [answers, setAnswers] = useState<TAnswers[]>([]);

    const handleStart = () => {
        //startTimer();
        setStarted(true)
        generateSequence();
    }

    const generateSequence = () => {
        setSequence((prevState) => ([...prevState, ...generateRandomSequence(1, sequence)]))
        setShowSequence(true);
        setResult("")

        let showSequenceInterval: NodeJS.Timeout;
        showSequenceInterval = setInterval(() => {
            setShowSequence(false);
            clearInterval(showSequenceInterval);
        }, _LETTER_SHOW_TIME)

        let generateSequenceInterval: NodeJS.Timeout;
        generateSequenceInterval = setInterval(() => {
            setRound(prevState => prevState + 1);
            clearInterval(generateSequenceInterval);
        }, _LETTER_GENERATE_TIME);

    }

    useEffect(() => {
        if (round > 0 && round < _MAX_ROUND) {
            generateSequence();
        } else if (round === _MAX_ROUND) {
            setTaskDone(true);
        }
    }, [round])


    const checkInput = () => {
        const lastItem = sequence[sequence.length - 1];
        const n2Item = sequence[sequence.length - 3];
        console.log(sequence);

        if (lastItem === n2Item) {
            setAnswers((prevState) => [...prevState, { status: 'match' }])
            setResult("ok")
        } else {
            setAnswers((prevState) => [...prevState, { status: 'false' }])
            setResult("no")
        }
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
                    <h5 className="text-lg text-gray-500">N Back</h5>
                </div>
                {!started && (
                    <button onClick={handleStart} type="button" className="bg-[#4caf50] rounded-full px-4 py-1.5 text-white hover:bg-[#4caf50]/80 transition-all  flex-none">
                        Başla
                    </button>
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
                        <h5 className="text-lg text-gradient">N Back  - Description</h5>
                    </div>
                    <p>In this task, you need to match a card to one of four tasks presented at the top of the screen.</p>
                    <p>Click one of the four cards that match the card on the left. Follow your selection, you will get feedback.</p>
                    <p>If your match was not correct, you need to try a different rule.</p>
                </div>
            )}

            {started && !taskDone && (
                <div className="bg-black flex flex-col relative items-center justify-around w-full  mb-4 h-full min-h-[500px]">
                    <div className="flex flex-col items-center justify-center gap-2">
                        <div className={classNames("w-14 h-4 ", {
                            'bg-[#4caf50]': result === "ok",
                            'bg-red-600': result === "no",
                            'bg-gray-400': result === ""
                        })}></div>
                        {showSequence ? (
                            <div className="bg-yellow-500 text-white h-14 w-14 text-4xl rounded-sm p-4 flex  items-center justify-center">
                                {sequence[sequence.length - 1]}
                            </div>
                        ) : (
                            <div className="h-14 w-14"> </div>
                        )}
                        <div className={classNames("w-14 h-4 ", {
                            'bg-[#4caf50]': result === "ok",
                            'bg-red-600': result === "no",
                            'bg-gray-400': result === ""
                        })}></div>
                    </div>

                    <IconButton style={{ background: "#5068cb", color: "white", height: "60px", width: "60px" }} onClick={checkInput}>
                        <Visibility />
                    </IconButton>

                </div>
            )}

            {started && taskDone && (
                <div className="flex bg-white w-full p-4 rounded-md shadow-md flex-col items-start gap-2">
                    <div className="bg-[#5068cb]/20 rounded-full my-2 px-2.5 py-1.5 ">
                        <h5 className="text-lg text-gradient">Sonuçlar</h5>
                    </div>
                    <pre>
                        {JSON.stringify(answers, null, 2)}

                    </pre>
                    <button onClick={() => navigate('/')} type="button" className="bg-[#4caf50] rounded-full px-4 py-1.5 text-white hover:bg-[#4caf50]/80 transition-all  flex-none">
                        Ana Ekrana Dön
                    </button>
                </div>
            )}

            <IconButton style={{ position: "fixed", background: "#5068cb", color: "white", bottom: 10, right: 10, zIndex: 10, height: "60px", width: "60px" }} onClick={toggleDrawer(true)}>
                <Info />
            </IconButton>

        </section>
    )
}

