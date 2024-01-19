import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../hooks";
import { useEffect, useState } from "react";
import { generateColor, generateExpression, getRuleDetail } from "../../../utils";
import useTimer from "../../../hooks/useTimer";
import classNames from "classnames";
import { Fade } from "@mui/material";
import WeekLayout from "../../../components/WeekLayout";

type TAnswers = {
    question: string;
    user_answer: string;
    status: boolean;
    time: number;
}


export default function Task3() {
    const { appName, step } = useAppSelector(state => state.app);
    const [started, setStarted] = useState<boolean>(false);
    const [taskDone, setTaskDone] = useState(false);
    const [expression, setExpression] = useState(generateColor());
    const [round, setRound] = useState<number>(0);
    const [answers, setAnswers] = useState<TAnswers[]>([]);
    const { time, startTimer, stopTimer, resetTimer } = useTimer();
    const [result, setResult] = useState<string>("");


    const handleStart = () => {
        setStarted(true)
        generateSequence();
    }


    const generateSequence = () => {
        setResult("")

        let showSequenceInterval: NodeJS.Timeout;
        showSequenceInterval = setInterval(() => {
            setExpression(generateColor())
            setRound(prevState => prevState + 1);
            startTimer();
            clearInterval(showSequenceInterval);
        }, 1000)
    }

    const [loading, setLoading] = useState<boolean>(false);


    useEffect(() => {
        if (round > 0 && round < 15) {
            let loadingTimeout: NodeJS.Timeout;
            setLoading(true);
            loadingTimeout = setTimeout(() => {
                setLoading(false);
                generateSequence();
                clearTimeout(loadingTimeout);
            }, 500);

        } else if (round === 15) {
            setTaskDone(true);
        }
    }, [round])


    const handleCheck = (userAnswer: string) => {
        stopTimer();
        setResult("");

        setResult(userAnswer === expression.text ? "Doğru cevapladınız!" : "Yanlış cevapladınız!")

        setAnswers((prevState) => ([...prevState, {
            question: expression.text,
            user_answer: userAnswer,
            status: userAnswer === expression.text,
            time: time
        }]))

        resetTimer();
    }

    useEffect(() => {
        console.table(answers);
    }, [answers])


    useEffect(() => {
        console.table(expression);
    }, [expression])

    return (
        <WeekLayout
            started={started}
            subject="Hafta 1 / Cognitive Flexibility"
            handleStart={handleStart}
            taskDone={taskDone}
            guidelines={guideline}>
            {started && (
                <div className="relative bg-black mb-4 flex flex-col gap-4 items-center justify-center w-full h-full min-h-[500px]">

                    {result !== "" && (
                        <div className="absolute  bg-slate-300/30 w-full h-full flex items-start justify-center">
                            <p className={classNames(' text-3xl my-2', {
                                'text-[#4caf50]': result.includes('Doğru'),
                                'text-red-500': result.includes('Yanlış')
                            })}>{result}</p>
                        </div>
                    )}


                    <div className="text-3xl" style={{ color: expression.colorCode }}>
                        {expression.text}
                    </div>

                    <div className="grid grid-cols-3 gap-4 mt-4">
                        <button
                            onClick={() => handleCheck("SARI")}
                            className="text-white h-[40px] bg-[#dfdf00]  min-w-[100px] rounded-md p-2">

                        </button>

                        <button
                            onClick={() => handleCheck("YEŞİL")}
                            className="text-white h-[40px] bg-[#008000]  min-w-[100px] rounded-md p-2">

                        </button>
                        <button
                            onClick={() => handleCheck("MAVİ")}
                            className="text-white h-[40px] bg-[#0000FF]  min-w-[100px] rounded-md p-2">

                        </button>
                        <button
                            onClick={() => handleCheck("KIRMIZI")}
                            className="text-white h-[40px] bg-[#FF0000]  min-w-[100px] rounded-md p-2">

                        </button>

                        <button
                            onClick={() => handleCheck("PEMBE")}
                            className="text-white h-[40px] bg-[#ff00ff]  min-w-[100px] rounded-md p-2">

                        </button>

                        <button
                            onClick={() => handleCheck("TURUNCU")}
                            className="text-white h-[40px] bg-[#FFA500]  min-w-[100px] rounded-md p-2">

                        </button>

                    </div>
                </div>
            )}
        </WeekLayout>
    )
}

const guideline = <>
    <p>
        Şimdi size bazı kelimeler göstereceğiz.  'Başlayın' dedikten hemen sonra, sizden, bu kartlarda yazılı olan kelimelerin hangi renkte yazıldığını aşağıdaki butona bakarak olabildiğince hızlı yanıtlamanız gerekmektedir.
    </p>
    <p>
        Renk ve kelimeler uyumsuz olduğunda cevap vermek zor olabilir, o yüzden odaklanarak dikkatli ve hızlı yanıtlamaya çalışın
    </p>
    <ul className="ml-8">
        <li className="list-decimal text-[#dfdf00]">YEŞİL  - (sarı)’ya tıklamanız gerekmektedir.</li>
        <li className="list-decimal text-[#008000]">MAVİ – (yeşil)’e tıkmalamanız gerekmektedir.</li>
        <li className="list-decimal text-[#0000FF]">KIRMIZI – Maviye tıklamanız gerekmektedir.</li>
        <li className="list-decimal text-[#FF0000]">SARI  - (kırmızıya) tıklamanız gerekmektedir. </li>
        <li className="list-decimal text-[#ff00ff]">MOR – pembe ye tıklaması gerekmektedir.</li>
        <li className="list-decimal text-[#FFA500]">PEMBE (turuncuya tıklaması gerekmektedir)</li>
    </ul>
</>