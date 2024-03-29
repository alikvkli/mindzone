import { useNavigate } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import { useAppSelector } from "../../hooks";
import { generateSelfManikin } from "../../utils";
import { Radio, useMediaQuery } from "@mui/material";
import Lottie from "lottie-react";
import brainAnimation from "../../assets/animations/brain-3.json";
import classNames from "classnames";

type TAnswers = {
    emotion: string;
    path: string;
    point: number;
}


const sequences = generateSelfManikin();

export default function PerfTask4() {
    const navigate = useNavigate();
    const isMobile = useMediaQuery('(max-width: 768px)');
    const { appName } = useAppSelector(state => state.app);
    const [started, setStarted] = useState<boolean>(false);
    const [taskDone, setTaskDone] = useState(false);
    const [seqIndex, setSeqIndex] = useState<number>(0);
    const [answers, setAnswers] = useState<TAnswers[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [selected, setSelected] = useState<number | null>(null);

    const handleStart = () => {
        setStarted(true)
    }

    const handleNext = () => {
        let loadingInterval: NodeJS.Timeout;

        setLoading(true);
        loadingInterval = setInterval(() => {
            setLoading(false);
            setSelected(null);
            setSeqIndex(prevState => prevState + 1);
            clearInterval(loadingInterval);
        }, 1000);
    }


    useEffect(() => {
        console.table(answers);
    }, [answers])



    const handleSelect = (point: number) => {
        setSelected(point);
        if (seqIndex + 1 < 30) {
            setAnswers((prevState) => ([...prevState, { emotion: sequences[seqIndex].emotion, path: sequences[seqIndex].path, point: point }]))
            handleNext();
        } else {
            setAnswers((prevState) => ([...prevState, { emotion: sequences[seqIndex].emotion, path: sequences[seqIndex].path, point: point }]))
            setTaskDone(true);
        }
    }



    return (
        <section className="w-full h-full flex flex-col items-start justify-center md:px-14 max-md:px-4 mt-4" >
            <div className="flex w-full bg-white p-4 rounded-md shadow-md items-center justify-between">
                <div>
                    <h1 className="text-3xl text-gradient">{appName}</h1>
                    <h5 className="text-lg text-gray-500">Self-Assessment Manikin</h5>
                </div>

                {!started && (
                    <>
                        <button onClick={handleStart} type="button" className="bg-[#4caf50] rounded-full px-4 py-1.5 text-white hover:bg-[#4caf50]/80 transition-all  flex-none">
                            Başla
                        </button>
                    </>
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
                        <h5 className="text-lg text-gradient">Yönergeler</h5>
                    </div>
                    <p>Ekranda bazı insan fotoğrafları göreceksiniz. Fotoğrafı gördükten sonra "sizlerin nasıl hissettiğinizi" puanlamanızı istiyoruz.</p>
                    <p>Bu puanlamayı aşağıdaki 9 küçük şekilli seçenekler üzerinden yapmanız gerekmektedir. Bu küçük insan şekilleri olumsuz hissetmekten olumlu hissetmeye doğru puanlamayı işaret etmektedir.</p>
                    <p><b>(1)</b> çok olumsuz <b>(5)</b> nötr ve <b>(9)</b> çok olumlu seçeneklerini ifade etmektedir.</p>
                    <img src={`${process.env.PUBLIC_URL}/img/self_assesment/intro.png`} />
                </div>
            )}

            {started && !taskDone && (
                <div className={classNames(' flex flex-col p-4 relative items-center justify-around w-full  mb-4 h-full min-h-[500px]', {
                    'bg-[#f5f9ff]': loading,
                    'bg-black': !loading
                })}>

                    <div className="flex flex-col items-center justify-center gap-2">

                        {loading ? (
                            <Lottie style={{ height: isMobile ? "300px" : "375px", width: "100%", flexShrink: 0 }} animationData={brainAnimation} />
                        ) : (
                            <img
                                className="w-fit h-[375px] max-md:h-[300px] rounded-md"
                                src={`${process.env.PUBLIC_URL}/img/self_assesment/${sequences[seqIndex].path}.JPG`} />
                        )}

                        <div className="bg-white/80 rounded-md flex flex-wrap items-center justify-center p-2 max-md:px-0 gap-2">

                            {Array.from(Array(9)).map((_, key) => (
                                <div key={key} className="flex flex-col items-center justify-center gap-2">
                                    <img
                                        onClick={() => {
                                            if (!loading) {
                                                handleSelect(key + 1)
                                            }
                                        }}
                                        className={classNames('w-14 h-20 rounded-sm object-cover cursor-pointer', {
                                            'opacity-[0.5] cursor-not-allowed': loading
                                        })}
                                        src={`${process.env.PUBLIC_URL}/img/self_assesment/points/${key + 1}.png`} />
                                    <Radio
                                        disabled={loading}
                                        checked={selected === key + 1}
                                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                            handleSelect(Number(event.target.value))
                                        }}
                                        value={key + 1}
                                        name="radio-buttons"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
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


        </section>
    )
}

