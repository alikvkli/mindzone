import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../hooks";
import { useEffect, useState } from "react";

export default function Task2() {
    const navigate = useNavigate();
    const { appName, step } = useAppSelector(state => state.app);
    const [started, setStarted] = useState<boolean>(false);
    const [taskDone, setTaskDone] = useState(false);


    // useEffect(() => {
    //     if (step.task !== 1) {
    //         navigate(`/week/${step.week}/task-${step.task}`)
    //     }
    // }, [step])

    const handleStart = () => {
        setStarted(true)
    }

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
                <p>Task 2 here!</p>
            )}







        </section>
    )
}