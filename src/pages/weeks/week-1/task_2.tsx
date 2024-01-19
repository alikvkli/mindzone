import { useEffect, useState } from "react";
import { generateExpression, getRuleDetail } from "../../../utils";
import useTimer from "../../../hooks/useTimer";
import classNames from "classnames";
import WeekLayout from "../../../components/WeekLayout";


export default function Task2() {
    const [started, setStarted] = useState<boolean>(false);
    const [taskDone, setTaskDone] = useState(false);
    const [expression, setExpression] = useState(generateExpression('letter'));
    const [round, setRound] = useState<number>(0);
    const [answers, setAnswers] = useState<TAnswers[]>([]);
    const { time, startTimer, stopTimer, resetTimer } = useTimer();
    const [result, setResult] = useState<string>("");


    const handleStart = () => {
        startTimer();
        setStarted(true)
    }

    const handleCheck = (userAnswer: string) => {
        stopTimer();

        setResult("");

        let correctAnswer = "";

        if (expression.rule === "letter") {
            correctAnswer = vowels.includes(expression.output.charAt(0)) ? "Y" : "X";
        } else {
            correctAnswer = evenNumbers.includes(Number(expression.output.charAt(1))) ? "Y" : "X";
        }

        setResult(userAnswer === correctAnswer ? "Doğru cevapladınız!" : "Yanlış cevapladınız!")

        setAnswers((prevState) => ([...prevState, {
            rule: expression.rule,
            question: expression.output,
            user_answer: userAnswer,
            correct_answer: correctAnswer,
            status: userAnswer === correctAnswer,
            time: time
        }]))

        resetTimer();

        let showResultInterval: NodeJS.Timeout;

        showResultInterval = setInterval(() => {
            setRound(round => round + 1);
            setResult("");
            if (round + 1 <= 15) {
                setExpression(generateExpression('letter'))
            } else if (round + 1 > 15 && round + 1 <= 30) {
                setExpression(generateExpression('number'))
            } else if (round + 1 > 30) {
                setExpression(generateExpression(Math.random() < 0.5 ? 'letter' : 'number'))
            }
            startTimer();
            clearInterval(showResultInterval);
        }, 1000);



    }

    useEffect(() => {
        console.table(answers);
    }, [answers])

    return (
        <WeekLayout
            started={started}
            subject="Hafta 1 / Cognitive Flexibility"
            handleStart={handleStart}
            taskDone={taskDone}
            guidelines={guideline}>
            {started && (
                <div className="relative bg-black mb-4 flex flex-col items-center justify-center w-full h-full min-h-[500px]">

                    {result !== "" && (
                        <div className="absolute  bg-slate-300/30 w-full h-full flex items-center justify-center">
                            <p className={classNames(' text-3xl my-2', {
                                'text-[#4caf50]': result.includes('Doğru'),
                                'text-red-500': result.includes('Yanlış')
                            })}>{result}</p>
                        </div>
                    )}

                    {round < 30 && (
                        <div className="mb-4 flex flex-col items-center justify-center">
                            <p className="text-white font-semibold">Kural</p>
                            <p className="text-white">
                                {getRuleDetail(expression.rule)}
                            </p>
                        </div>
                    )}

                    <div >
                        <div className="border-[1px] border-[#f9a925] w-[300px] h-[300px] grid grid-cols-2">
                            <div className="border-r-[1px] border-b-[1px]  border-[#f9a925] w-[150px] h-[150px] flex items-center justify-center text-white text-3xl">
                                {expression.rule === "letter" && round % 2 === 0 && (
                                    expression.output
                                )}
                            </div>
                            <div className="border-b-[1px] border-[#f9a925] w-[150px] h-[150px] flex items-center justify-center text-white text-3xl">
                                {expression.rule === "letter" && round % 2 !== 0 && (
                                    expression.output
                                )}
                            </div>
                            <div className="border-r-[1px] border-[#f9a925] w-[150px] h-[150px] flex items-center justify-center text-white text-3xl">
                                {expression.rule === "number" && round % 2 !== 0 && (
                                    expression.output
                                )}
                            </div>
                            <div className=" w-[150px] h-[150px] flex items-center justify-center text-white text-3xl">
                                {expression.rule === "number" && round % 2 === 0 && (
                                    expression.output
                                )}
                            </div>
                        </div>

                        <div className="flex items-center justify-center gap-4 mt-4">
                            <button
                                onClick={() => handleCheck("X")}
                                className="text-white border-[2px] min-w-[100px] border-[#5068cb] rounded-md p-2">
                                X
                            </button>

                            <button
                                onClick={() => handleCheck("Y")}
                                className="text-white border-[2px]  min-w-[100px] border-[#5068cb] rounded-md p-2">
                                Y
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </WeekLayout>
    )
}


type TAnswers = {
    rule: string;
    question: string;
    user_answer: string;
    correct_answer: string;
    status: boolean;
    time: number;
}

const vowels = ['A', 'E', 'I', 'U'];
const evenNumbers = [2, 4, 6, 8];

const guideline = <>
    <p>Bu egzersizde ekranda harfler ve sayılar göreceksiniz. Takip etmeniz gereken birkaç kural belirledik ve bunlara göre yanıtlamanız gerekmektedir.<br />
        4'e bölünmüş ekran göreceksiniz.
    </p>
    <ul className="ml-8">
        <li className="list-decimal">Bu ekranda harflerin yukarıda olması, sayıların aşağıda olması gerekmektedir.</li>
        <li className="list-decimal">Sessiz harf ve tek sayı ise X butonuna basmanız gerekirken,</li>
        <li className="list-decimal">Sesli harf ve çift sayı ise Y butonuna basılması gerekmektedir.</li>
    </ul>
    <p>Ör: G8 sayısı ekranda göründüğünde sol yukarıda ise X tuşuna basılacaktır.Sağ aşağıda göründüyse bu sefer çift sayı 8 olduğu için ona odaklanılarak Y tuşuna basılacaktır.</p>
    <p>Ör: G8 sayısı üstte göründüyse harfe odaklanılacak ve X'e basılacaktır. Ama aşağıda görünürse çift sayı olduğu için Y'ye basılacaktır. </p>
    <p className="font-semibold mt-4">Tek harf örneği (15 Tane)</p>
    <p>Şimdi daha iyi anlamak için sadece harfleri deneyelim. Sessiz harf ise X, sesli harf ise Y'ye basın.</p>
    <p className="font-semibold mt-4">Tek sayı örneği (15 Tane)</p>
    <p>Şimdi daha iyi anlamak için sadece sayıları deneyelim. Tek sayı ise X, çift sayı ise Y'ye basın.</p>
</>
