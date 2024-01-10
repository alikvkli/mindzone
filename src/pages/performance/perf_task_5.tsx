import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks";
import { generateEyes } from "../../utils";
import { CircularProgress } from "@mui/material";

type TAnswers = {
    id: number;
    emotion: string;
    path: string;
}


const sequences = generateEyes();

export default function PerfTask5() {
    const navigate = useNavigate();
    const { appName } = useAppSelector(state => state.app);
    const [started, setStarted] = useState<boolean>(false);
    const [taskDone, setTaskDone] = useState(false);
    const [seqIndex, setSeqIndex] = useState<number>(0);
    const [answers, setAnswers] = useState<TAnswers[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const handleStart = () => {
        setStarted(true)
    }

    const handleNext = () => {
        let loadingInterval: NodeJS.Timeout;

        setLoading(true);
        loadingInterval = setInterval(() => {
            setSeqIndex(prevState => prevState + 1);
            setLoading(false);
            clearInterval(loadingInterval);
        }, 1000);
    }

    useEffect(() => {
        console.table(answers);
    }, [answers])


    const handleSelect = (emotion: string) => {
        console.log(seqIndex)
        if ((seqIndex + 1) < 37) {
            setAnswers((prevState) => ([...prevState, { id: sequences[seqIndex].id, emotion: emotion, path: sequences[seqIndex].path }]))
            handleNext();
        } else {
            setAnswers((prevState) => ([...prevState, { id: sequences[seqIndex].id, emotion: emotion, path: sequences[seqIndex].path }]))
            setTaskDone(true);
        }
    }



    return (
        <section className="w-full h-full flex flex-col items-start justify-center md:px-14 max-md:px-4 mt-4" >
            <div className="flex w-full bg-white p-4 rounded-md shadow-md items-center justify-between">
                <div>
                    <h1 className="text-3xl text-gradient">{appName}</h1>
                    <h5 className="text-lg text-gray-500">The Eye Test</h5>
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
                    <p>Ekranda "Göz" resimleri gösterilecektir. Resimdeki kişinin ne düşündüğünü ya da hissettiğini en iyi tanımlayan kelimeyi işaretlemeniz gerekmektedir. </p>
                    <p>Birden fazla seçenek doğru gibi gelse de “sadece bir tane” ve en yakın olduğunu düşündüğünüz cevabı işaretleyiniz. </p>
                </div>
            )}

            {started && !taskDone && (
                <div className="relative bg-black flex flex-col p-4 items-center justify-around w-full  mb-4 h-full min-h-[500px]">

                    <div className="flex flex-col items-center justify-center max-md:justify-between gap-2">
                        {loading && (
                            <>
                                <CircularProgress sx={{ zIndex: 10 }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                                <div className="absolute top-0 z-[1] left-0 bg-gray-300/20 w-full h-full"></div>
                            </>
                        )}
                        <div className="flex items-center justify-between w-full">
                            {sequences[seqIndex]?.buttons?.slice(0, 2)?.map((item, key) => (
                                <button
                                    onClick={() => handleSelect(item)}
                                    className="text-white border-[2px] border-[#5068cb] rounded-md p-2" key={key}>
                                    {item}
                                </button>
                            ))}
                        </div>

                        <img
                            className="w-[600px]  h-[300px] object-cover max-md:h-[300px] max-md:object-contain rounded-md"
                            src={`${process.env.PUBLIC_URL}/img/${sequences[seqIndex]?.path}.png`} />

                        <div className="flex items-center gap-4 justify-between w-full">
                            {sequences[seqIndex]?.buttons?.slice(2, 4)?.map((item, key) => (
                                <button
                                    onClick={() => handleSelect(item)}
                                    className="text-white border-[2px] border-[#5068cb] rounded-md transition-all p-2" key={key}>
                                    {item}
                                </button>
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

