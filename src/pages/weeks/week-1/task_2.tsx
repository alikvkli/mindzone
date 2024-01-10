import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../hooks";
import { useEffect, useState } from "react";
import { generateExpression } from "../../../utils";
import useTimer from "../../../hooks/useTimer";
import classNames from "classnames";

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

export default function Task2() {
    const navigate = useNavigate();
    const { appName, step } = useAppSelector(state => state.app);
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
            if (round + 1 <= 10) {
                setExpression(generateExpression('letter'))
            } else if (round + 1 > 10 && round + 1 <= 20) {
                setExpression(generateExpression('number'))
            } else if (round + 1 > 20) {
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
        <section className="w-full h-full flex flex-col items-start justify-center md:px-14 max-md:px-4 mt-4" >
            <div className="flex w-full bg-white p-4 rounded-md shadow-md items-center justify-between">
                <div>
                    <h1 className="text-3xl text-gradient">{appName}</h1>
                    <h5 className="text-lg text-gray-500">Hafta 1 / Cognitive Flexibility</h5>
                </div>
                {!started && (
                    <button onClick={handleStart} type="button" className="bg-[#4caf50] rounded-full px-4 py-1.5 text-white hover:bg-[#4caf50]/80 transition-all  flex-none">
                        Başla
                    </button>
                )}


                {started && taskDone && (
                    <div className="bg-[#4caf50] rounded-full my-2 px-2.5 py-1.5 ">
                        <h5 className="text-lg text-white">Task 2  - Done</h5>
                    </div>
                )}
            </div>
            <hr className="w-full h-[0.5px] my-2 bg-gray-400" />
            {!started && (
                <div className="flex bg-white w-full p-4 rounded-md shadow-md flex-col items-start gap-2">
                    <div className="bg-[#5068cb]/20 rounded-full my-2 px-2.5 py-1.5 ">
                        <h5 className="text-lg text-gradient">Takip etmeniz gereken yönergeler</h5>
                    </div>
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
                </div>
            )}

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
            )}







        </section>
    )
}