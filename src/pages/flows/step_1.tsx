import { useEffect } from "react";
import { answerQuestion } from "../../features/autism";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setInitialFlow } from "../../features/app";

export default function Step1() {
    const { appName } = useAppSelector(state => state.app);
    const { currentQuestion, questions, done } = useAppSelector(state => state.autism);
    const getQuestion = questions.find(item => item.id === currentQuestion);
    const dispatch = useAppDispatch();

    const handleAnswer = (answer: string) => {
        dispatch(answerQuestion(answer))
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
                    <h5 className="text-lg text-gray-500">Otizim Bölümü</h5>
                </div>
                <div className="flex flex-col items-start justify-center gap-0.5">
                    <p className="flex items-center justify-center gap-1.5 text-[#4caf50] text-md">{currentQuestion} / {questions.length}</p>
                </div>
            </div>
            {!done && (
                <div className="flex flex-col bg-white shadow-md p-4 md:min-h-[300px]  rounded-md w-full items-center justify-center">
                    <div>
                        <h4 className="text-sm text-gray-500">Soru {currentQuestion}:</h4>
                        <p className="mt-2 font-semibold">{getQuestion?.qa}</p>
                        <div className="flex max-md:flex-col mt-4 items-start justify-start gap-4 w-full">
                            <button onClick={() => handleAnswer("Kesinlikle katılıyorum")} type="button" className="border-[1px] cursor-pointer max-md:w-full text-sm p-4 rounded-md shadow-md border-[#5068cb] hover:bg-[#5068cb] hover:text-white transition-all">
                                Kesinlikle katılıyorum
                            </button>
                            <button onClick={() => handleAnswer("Sıklıkla katılıyorum")} type="button" className="border-[1px] cursor-pointer max-md:w-full text-sm p-4 rounded-md shadow-md border-[#5068cb] hover:bg-[#5068cb] hover:text-white transition-all">
                                Sıklıkla katılıyorum
                            </button>
                            <button onClick={() => handleAnswer("Bazen katılıyorum")} type="button" className="border-[1px] cursor-pointer max-md:w-full text-sm p-4 rounded-md shadow-md border-[#5068cb] hover:bg-[#5068cb] hover:text-white transition-all">
                                Bazen katılıyorum
                            </button>
                            <button onClick={() => handleAnswer("Kesinlikle katılmıyorum")} type="button" className="border-[1px] cursor-pointer max-md:w-full text-sm p-4 rounded-md shadow-md border-[#5068cb] hover:bg-[#5068cb] hover:text-white transition-all">
                                Kesinlikle katılmıyorum
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {done && (
                <div> bitti</div>
            )}


        </section>
    )
}