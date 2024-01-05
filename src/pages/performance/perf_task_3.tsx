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
const _LETTER_SHOW_TIME = 2000;
const _MAX_ROUND = 31; //15

type TAnswers = {
    id: number;
    sequence: string;
    status: 'true' | 'false' | 'missing';
}

type TSequence = {
    id: number;
    value: string;
    text: string;
}

export default function PerfTask3() {
    const navigate = useNavigate();
    const { appName, step } = useAppSelector(state => state.app);
    const [started, setStarted] = useState<boolean>(false);
    const [taskDone, setTaskDone] = useState(false);
    const [result, setResult] = useState<string>("");
    const { time, startTimer, stopTimer, resetTimer } = useTimer();
    const [sequence, setSequence] = useState<TSequence[]>(
        [
            {
                "id": 1,
                "value": "G",
                "text": "Go"
            },
            {
                "id": 2,
                "value": "NG",
                "text": "No-go"
            },
            {
                "id": 3,
                "value": "NG",
                "text": "No-go"
            },
            {
                "id": 4,
                "value": "G",
                "text": "Go"
            },
            {
                "id": 5,
                "value": "NG",
                "text": "No-go"
            },
            {
                "id": 6,
                "value": "G",
                "text": "Go"
            },
            {
                "id": 7,
                "value": "G",
                "text": "Go"
            },
            {
                "id": 8,
                "value": "G",
                "text": "Go"
            },
            {
                "id": 9,
                "value": "G",
                "text": "Go"
            },
            {
                "id": 10,
                "value": "NG",
                "text": "No-go"
            },
            {
                "id": 11,
                "value": "NG",
                "text": "No-go"
            },
            {
                "id": 12,
                "value": "G",
                "text": "Go"
            },
            {
                "id": 13,
                "value": "G",
                "text": "Go"
            },
            {
                "id": 14,
                "value": "G",
                "text": "Go"
            },
            {
                "id": 15,
                "value": "G",
                "text": "Go"
            },
            {
                "id": 16,
                "value": "G",
                "text": "Go"
            },
            {
                "id": 17,
                "value": "G",
                "text": "Go"
            },
            {
                "id": 18,
                "value": "G",
                "text": "Go"
            },
            {
                "id": 19,
                "value": "G",
                "text": "Go"
            },
            {
                "id": 20,
                "value": "G",
                "text": "Go"
            },
            {
                "id": 21,
                "value": "G",
                "text": "Go"
            },
            {
                "id": 22,
                "value": "NG",
                "text": "No-go"
            },
            {
                "id": 23,
                "value": "G",
                "text": "Go"
            },
            {
                "id": 24,
                "value": "G",
                "text": "Go"
            },
            {
                "id": 25,
                "value": "G",
                "text": "Go"
            },
            {
                "id": 26,
                "value": "NG",
                "text": "No-go"
            },
            {
                "id": 27,
                "value": "G",
                "text": "Go"
            },
            {
                "id": 28,
                "value": "G",
                "text": "Go"
            },
            {
                "id": 29,
                "value": "G",
                "text": "Go"
            },
            {
                "id": 30,
                "value": "G",
                "text": "Go"
            },
            {
                "id": 31,
                "value": "NG",
                "text": "No-go"
            }
        ]
    );
    const [showSequence, setShowSequence] = useState<boolean>(false);
    const [round, setRound] = useState<number>(0);
    const [answers, setAnswers] = useState<TAnswers[]>([]);

    const handleStart = () => {
        setStarted(true)
        generateSequence();
    }

    const generateSequence = () => {
        setShowSequence(true)
        setResult("")

        let showSequenceInterval: NodeJS.Timeout;
        showSequenceInterval = setInterval(() => {
            setRound(prevState => prevState + 1);
            setShowSequence(false);
            clearInterval(showSequenceInterval);
        }, sequence[round + 1].value === "G" ? 1000 : _LETTER_SHOW_TIME)
    }

    useEffect(() => {
        if (round > 0 && round < _MAX_ROUND) {
            generateSequence();
        } else if (round === _MAX_ROUND) {
            setTaskDone(true);
        }
    }, [round])


    useEffect(() => {
        console.table(answers.sort((a, b) => a.id - b.id))
    }, [answers])

    useEffect(() => {
        if (taskDone) {
            sequence.forEach(item => {
                let findAnswer = answers.findIndex(ans => ans.id === item.id);
                if (findAnswer === -1) {
                    setAnswers((prevState) => [...prevState, { id: item.id, sequence: item.value, status: 'missing' }])
                }
            })
        }
    }, [taskDone, answers, sequence])


    const checkInput = () => {
        const checkAns = answers.findIndex(ans => ans.id === sequence[round].id);
        if (checkAns === -1) {
            if (sequence[round].value === "G") {
                setAnswers((prevState) => [...prevState, { id: sequence[round].id, sequence: sequence[round].value, status: 'true' }])
            } else if (sequence[round].value === "NG") {
                setResult("Hata: basmamanız gerekirken tuşa bastınız.")
                setAnswers((prevState) => [...prevState, { id: sequence[round].id, sequence: sequence[round].value, status: 'false' }])
            }
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
                    <h5 className="text-lg text-gray-500">Go/No-go</h5>
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
                        <h5 className="text-lg text-gradient">Go/No-go  - Description</h5>
                    </div>
                    <p>açıklama</p>
                </div>
            )}

            {started && !taskDone && (
                <div className="bg-black flex flex-col relative items-center justify-around w-full  mb-4 h-full min-h-[500px]">
                    <div className="flex flex-col items-center justify-center gap-2">
                        {showSequence && result === "" && (
                            <div className="bg-yellow-500 text-white h-14 min-w-14 w-fit flex-none text-4xl rounded-sm py-4 px-8 flex  items-center justify-center">
                                {sequence[round].text}
                                {sequence[round].id}
                            </div>
                        )}
                        {result.toLowerCase().includes("hata") && (
                            <p className="text-red-600 text-center max-md:text-xl text-3xl ">
                                {result}
                            </p>
                        )}
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

