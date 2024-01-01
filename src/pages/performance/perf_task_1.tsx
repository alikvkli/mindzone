import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks";
import { TRandomImage, generateRandomImage } from "../../utils";
import useTimer from "../../hooks/useTimer";
import { Box, Collapse, Drawer, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Info, KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import classNames from "classnames";
import React from "react";

const cardLimit = 5;

type TGues = Pick<TRandomImage, 'color' | 'number' | 'shape'>;

type TAnswers = Pick<TRandomImage, 'shape' | 'number' | 'color' | 'rule' | 'id'> & {
    guess: TGues;
    status: boolean;
    time: number;
    subGuess?: TAnswers[]
}







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


    useEffect(() => {
        if (answers.length >= cardLimit) {
            console.log("task done")
            setTimeout(() => {
                setTaskDone(true);
            }, 1000)
        }
    }, [answers])



    const checkImage = (guess: TGues) => {
        if(result !== ""){
            return;
        }

        //rule 1 -> shape
        //rule 2 -> color
        //rule 3 -> number,
        let userResult = false;

        if (activeData.rule === 'Rule1') {
            userResult = guess.shape === activeData.shape
        } else if (activeData.rule === 'Rule2') {
            userResult = guess.color === activeData.color
        } else {
            userResult = guess.number === activeData.number;
        }

        let showNumberInterval: NodeJS.Timeout;

        stopTimer();

        if (userResult) {
            let checkGuess = answers.find(item => item.id === activeData.id);

            if (checkGuess) {
                setAnswers((prevState) => {
                    const updatedAnswers = prevState.map(item => {

                        let firstTime = item.time;
                        if (item.subGuess) {
                            const subGuessTimes = item.subGuess.map(subItem => subItem.time);
                            const totalSubGuessTime = subGuessTimes.reduce((acc, time) => acc + time, 0);
                            firstTime += totalSubGuessTime;
                        }

                        return item.id === activeData.id
                            ? {
                                ...item,
                                time: firstTime,
                                subGuess: [...(item.subGuess || []), {
                                    id: activeData.id,
                                    rule: activeData.rule,
                                    shape: activeData.shape,
                                    number: activeData.number,
                                    color: activeData.color,
                                    guess: guess,
                                    status: userResult,
                                    time: time
                                }]
                            }
                            : item
                    }


                    );
                    return updatedAnswers;
                });
            } else {
                setAnswers((prevState) => ([...prevState, { id: activeData.id, rule: activeData.rule, shape: activeData.shape, number: activeData.number, color: activeData.color, guess: guess, status: userResult, time: time }]))
            }

            setResult("Doğru!");
            showNumberInterval = setInterval(() => {
                setResult("");
                resetTimer();
                setActiveData(generateRandomImage())
                startTimer()
                clearInterval(showNumberInterval);
            }, 1000);
        } else {

            let findData = answers.find(item => item.id === activeData.id);
            if (findData) {
                setAnswers((prevState) => {
                    const updatedAnswers = prevState.map(item =>
                        item.id === activeData.id
                            ? {
                                ...item,
                                subGuess: [...(item.subGuess || []), {
                                    id: activeData.id,
                                    rule: activeData.rule,
                                    shape: activeData.shape,
                                    number: activeData.number,
                                    color: activeData.color,
                                    guess: guess,
                                    status: userResult,
                                    time: time
                                }]
                            }
                            : item
                    );
                    return updatedAnswers;
                });
            } else {
                setAnswers((prevState) => ([...prevState, {
                    id: activeData.id,
                    rule: activeData.rule,
                    shape: activeData.shape,
                    number: activeData.number,
                    color: activeData.color,
                    guess: guess,
                    subGuess: [{
                        id: activeData.id,
                        rule: activeData.rule,
                        shape: activeData.shape,
                        number: activeData.number,
                        color: activeData.color,
                        guess: guess,
                        status: userResult,
                        time: time
                    }],
                    status: userResult,
                    time: time
                }]));
            }

            setResult("Yanlış!");
            showNumberInterval = setInterval(() => {
                resetTimer();
                setResult("");
                startTimer();
                clearInterval(showNumberInterval);
            }, 1000);
        }

    }

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

                        <button disabled={result !== ""} onClick={() => checkImage({ shape: 'dot', number: 1, color: 'red' })} type="button" className="w-20 h-20 relative disabled:after:content-[''] disabled:after:w-20 disabled:after:h-20 disabled:after:bg-red-500/40 disabled:after:absolute disabled:after:left-0 disabled:after:top-0 disabled:after:rounded-md disabled:cursor-not-allowed">
                            <img className="w-full h-full rounded-md" src={`${process.env.PUBLIC_URL}/img/perf_1_img/1redDots.jpg`} />
                        </button>

                        <button disabled={result !== ""}  onClick={() => checkImage({ shape: 'triangle', number: 2, color: 'green' })} type="button" className="w-20 h-20 relative disabled:after:content-[''] disabled:after:w-20 disabled:after:h-20 disabled:after:bg-red-500/40 disabled:after:absolute disabled:after:left-0 disabled:after:top-0 disabled:after:rounded-md disabled:cursor-not-allowed">
                            <img className="w-full h-full rounded-md" src={`${process.env.PUBLIC_URL}/img/perf_1_img/2greenTriangles.jpg`} />

                        </button>
                        <button disabled={result !== ""}  onClick={() => checkImage({ shape: 'cross', number: 3, color: 'blue' })} type="button" className="w-20 h-20 relative disabled:after:content-[''] disabled:after:w-20 disabled:after:h-20 disabled:after:bg-red-500/40 disabled:after:absolute disabled:after:left-0 disabled:after:top-0 disabled:after:rounded-md disabled:cursor-not-allowed">
                            <img className="w-full h-full rounded-md" src={`${process.env.PUBLIC_URL}/img/perf_1_img/3blueCrosses.jpg`} />
                        </button>

                        <button disabled={result !== ""}  onClick={() => checkImage({ shape: 'star', number: 4, color: 'yellow' })} type="button" className="w-20 h-20 relative disabled:after:content-[''] disabled:after:w-20 disabled:after:h-20 disabled:after:bg-red-500/40 disabled:after:absolute disabled:after:left-0 disabled:after:top-0 disabled:after:rounded-md disabled:cursor-not-allowed">
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

            {started && taskDone && (
                <div className="flex bg-white w-full p-4 rounded-md shadow-md flex-col items-start gap-2">
                    <div className="bg-[#5068cb]/20 rounded-full my-2 px-2.5 py-1.5 ">
                        <h5 className="text-lg text-gradient">Sonuçlar</h5>
                    </div>
                    <div>
                        <p><b>Toplam Soru:</b> {answers.length} </p>
                        <p><b>İlk Seferde Doğru Tahmin:</b> {answers.filter(item => item.status).length} </p>
                        <p><b>İlk Seferde Yanlış Tahmin:</b> {answers.filter(item => !item.status).length} </p>
                        <p><b>Toplam Tahmin:</b> {answers.length + answers.filter(item => item.subGuess).length} </p>
                        <p><b>Yanlış Tahmin:</b> {answers.filter(item => item.subGuess?.filter(item => !item.status)).length} </p>
                        <p><b>Doğru Tahmin:</b> {answers.filter(item => item.status).length + answers.filter(item => item.subGuess?.filter(item => item.status)).length} </p>
                    </div>
                    <button onClick={() => navigate('/')} type="button" className="bg-[#4caf50] rounded-full px-4 py-1.5 text-white hover:bg-[#4caf50]/80 transition-all  flex-none">
                       Ana Ekrana Dön
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
                <TableContainer className="flex items-start justify-center w-full h-[400px] overflow-auto" component={Paper}>
                    <Table stickyHeader sx={{ maxWidth: 600, overflow: "auto" }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>Kural</TableCell>
                                <TableCell>Şekil</TableCell>
                                <TableCell align="right">Sayı</TableCell>
                                <TableCell align="right">Renk</TableCell>
                                <TableCell align="right">Cevap S.</TableCell>
                                <TableCell align="right">Süre</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {answers.map((row, key) => (
                                <Row key={key} index={key + 1} row={row} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Drawer>
        </section>
    )
}



function Row(props: { row: TAnswers, index: number }) {
    const { row, index } = props;
    const [open, setOpen] = useState(false);

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <div className="flex items-center justify-center">
                        {index}
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setOpen(!open)}
                        >
                            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                        </IconButton>

                    </div>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.rule}
                </TableCell>
                <TableCell align="right">{row.shape}</TableCell>
                <TableCell align="right">{row.number}</TableCell>
                <TableCell align="right">{row.color}</TableCell>
                <TableCell align="right">{row.subGuess?.length ?? 1}</TableCell>
                <TableCell align="right">{row.time.toFixed(4)} ms</TableCell>

            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            {row.subGuess && row.subGuess?.length > 0 ? (
                                <>
                                    <Typography variant="h6" gutterBottom component="div">
                                        Diğer Tahminler
                                    </Typography>
                                    <Table size="small" aria-label="purchases">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Şekil</TableCell>
                                                <TableCell>Renk</TableCell>
                                                <TableCell align="right">Sayı</TableCell>
                                                <TableCell align="right">Sonuç</TableCell>
                                                <TableCell align="right">Süre</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {row.subGuess?.map((subGuess, key) => (
                                                <TableRow key={key}>
                                                    <TableCell component="th" scope="row">
                                                        {subGuess.guess.shape}
                                                    </TableCell>
                                                    <TableCell>{subGuess.guess.color}</TableCell>
                                                    <TableCell align="right">{subGuess.guess.number}</TableCell>
                                                    <TableCell align="right">{subGuess.status ? 'Doğru' : 'Yanlış'}</TableCell>
                                                    <TableCell align="right">
                                                        {subGuess.time.toFixed(4)} ms
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </>
                            ) : (
                                <>
                                    <Typography variant="h6" gutterBottom component="div">
                                        Tahmin
                                    </Typography>
                                    <Table size="small" aria-label="purchases">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Şekil</TableCell>
                                                <TableCell>Renk</TableCell>
                                                <TableCell align="right">Sayı</TableCell>
                                                <TableCell align="right">Sonuç</TableCell>
                                                <TableCell align="right">Süre</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow >
                                                <TableCell component="th" scope="row">
                                                    {row.guess.shape}
                                                </TableCell>
                                                <TableCell>{row.guess.color}</TableCell>
                                                <TableCell align="right">{row.guess.number}</TableCell>
                                                <TableCell align="right">{row.status ? 'Doğru' : 'Yanlış'}</TableCell>
                                                <TableCell align="right">
                                                    {row.time.toFixed(4)} ms
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </>
                            )}

                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}