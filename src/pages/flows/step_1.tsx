import { useEffect, useRef, useState } from "react";
import { answerQuestion } from "../../features/autism";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setInitialFlow } from "../../features/app";
import brainAnimation from "../../assets/animations/brain-2.json";
import Lottie from "lottie-react";

export default function Step1() {
    const { appName } = useAppSelector(state => state.app);
    const { currentQuestion, questions, done } = useAppSelector(state => state.autism);
    const getQuestion = questions.find(item => item.id === currentQuestion);
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState<boolean>(false);

    const handleAnswer = (answer: string) => {
        setLoading(true);
        dispatch(answerQuestion(answer))
        let timeOut = Math.floor(Math.random() * (1000 - 500 + 1)) + 500;
        setTimeout(() => {
            setLoading(false)
        }, timeOut)
    }

    useEffect(() => {
        if (done) {
            dispatch(setInitialFlow({ step_1: true }))
        }
    }, [done])

    return (
        <section className="w-full h-full flex gap-4 flex-col items-start justify-center md:px-14 max-md:px-4 mt-4" >
            <div className="flex bg-white shadow-md p-4 rounded-md w-full items-center justify-between">
                <div>
                    <h1 className="text-3xl text-gradient">{appName}</h1>
                </div>
            </div>
            {!done && (
                <div className="flex flex-col bg-white shadow-md p-4 md:min-h-[300px]  rounded-md w-full items-center justify-center">
                    {!loading && (
                        <div>
                            <h4 className="text-sm text-gray-500">Soru</h4>
                            <p className="mt-2 font-semibold">{getQuestion?.qa}</p>
                            <div className="flex max-md:flex-col mt-4 items-start justify-start gap-4 w-full">
                                <button onClick={() => handleAnswer("Kesinlikle katılıyorum")} type="button" className="border-[1px] cursor-pointer max-md:w-full text-sm p-4 rounded-md shadow-md border-[#5068cb]  hover:text-[#5068cb] transition-all">
                                    Kesinlikle katılıyorum
                                </button>
                                <button onClick={() => handleAnswer("Sıklıkla katılıyorum")} type="button" className="border-[1px] cursor-pointer max-md:w-full text-sm p-4 rounded-md shadow-md border-[#5068cb]  hover:text-[#5068cb] transition-all">
                                    Sıklıkla katılıyorum
                                </button>
                                <button onClick={() => handleAnswer("Bazen katılıyorum")} type="button" className="border-[1px] cursor-pointer max-md:w-full text-sm p-4 rounded-md shadow-md border-[#5068cb]  hover:text-[#5068cb] transition-all">
                                    Bazen katılıyorum
                                </button>
                                <button onClick={() => handleAnswer("Kesinlikle katılmıyorum")} type="button" className="border-[1px] cursor-pointer max-md:w-full text-sm p-4 rounded-md shadow-md border-[#5068cb]  hover:text-[#5068cb] transition-all">
                                    Kesinlikle katılmıyorum
                                </button>
                            </div>
                        </div>
                    )}
                    {loading && <div className="flex w-full p-4 gap-2 flex-col items-center justify- center">
                        <Lottie animationData={brainAnimation} />
                        <p className="text-2xl text-gray-500">Yükleniyor...</p>
                    </div>}
                </div>
            )}

            {done && (
                <div> bitti</div>
            )}


        </section>
    )
}