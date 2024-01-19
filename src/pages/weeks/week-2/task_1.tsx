import { useEffect, useState } from "react";
import WeekLayout from "../../../components/WeekLayout";
import classNames from "classnames";
import { generateWeek2Task1 } from "../../../utils";

const data = generateWeek2Task1()

export default function Task1() {
    const [started, setStarted] = useState<boolean>(false);
    const [taskDone, setTaskDone] = useState(false);

    const [images, setImages] = useState(data);
    const [selected, setSelected] = useState<number[]>([]);

    const handleStart = () => {
        setStarted(true);
        generateImage();

    }



    const generateImage = () => {

        let hideInterval: NodeJS.Timeout;
        hideInterval = setInterval(() => {
            setImages((prevState) => ({
                gender: prevState.gender,
                output: prevState.output.map((item) => ({ name: item.name, show: false }))
            }))
            clearInterval(hideInterval);
        }, 1000);
    }


    const handleSelect = (index: number) => {

        setSelected((prevState: number[]) => ([...prevState, index]))

        if (selected.length === 1) {
            const firstSelectDataInfo = images.output[selected[0]].name.split("/")[1];
            const currentSelectDataInfo = images.output[index].name.split("/")[1];
            if (firstSelectDataInfo === currentSelectDataInfo) {
                //eşleşme ok yenisini gönder
                setImages((prevState) => ({
                    gender: prevState.gender,
                    output: prevState.output.map((item, key) => {
                        if (key === index) {
                            return { name: item.name, show: true }
                        } else {
                            return item;
                        }
                    })
                }))

                let hideInterval: NodeJS.Timeout;

                hideInterval = setInterval(() => {
                    setSelected([]);
                    setImages(generateWeek2Task1())
                    clearInterval(hideInterval);
                }, 500);


                let hideInterval2: NodeJS.Timeout;
                
                hideInterval2 = setInterval(() => {
                    console.log('id')
                    setImages((prevState) => ({
                        gender: prevState.gender,
                        output: prevState.output.map((item) => ({ name: item.name, show: false }))
                    }))
                    clearInterval(hideInterval2);
                }, 4500);

                return;

            } else {

                setImages((prevState) => ({
                    gender: prevState.gender,
                    output: prevState.output.map((item, key) => {
                        if (key === index) {
                            return { name: item.name, show: true }
                        } else {
                            return item;
                        }
                    })
                }))

                let hideInterval: NodeJS.Timeout;

                hideInterval = setInterval(() => {
                    setSelected([]);
                    setImages((prevState) => ({
                        gender: prevState.gender,
                        output: prevState.output.map((item) => {
                            return { name: item.name, show: false }
                        })
                    }))
                    clearInterval(hideInterval);
                }, 500);

                return;
            }
        }



        setImages((prevState) => ({
            gender: prevState.gender,
            output: prevState.output.map((item, key) => {
                if (key === index) {
                    return { name: item.name, show: true }
                } else {
                    return { name: item.name, show: item.show }
                }
            })
        }))
    };



    useEffect(() => {
        console.log(images);
    }, [images])

    return (
        <WeekLayout
            subject="Hafta 2 / Working Memory"
            started={started}
            handleStart={handleStart}
            taskDone={taskDone}
            guidelines={guideline}>
            {started && !taskDone && (
                <div className="bg-black mb-4 flex flex-col items-center justify-center w-full h-full min-h-[500px]">

                    <div className="grid grid-cols-2 gap-4">
                        {images?.output?.map((item, key) => (
                            <div key={key + 1} onClick={() => handleSelect(key)} className={classNames('card cursor-pointer', { 'flip': item.show })}>
                                <div className="front">
                                    <div className="w-full h-full bg-gray-500  rounded-md p-4 shadow-md">
                                    </div>
                                </div>
                                <div className="back">
                                    <div className="w-full h-full bg-white  rounded-md p-4 shadow-md">
                                        <img src={`${process.env.PUBLIC_URL}/img/week_2/task_1/${item.name}.JPG`} alt="" />
                                    </div>
                                </div>

                            </div>

                        ))}
                    </div>


                </div>
            )}
        </WeekLayout>
    )
}

type TAnswers = {
    answer: string;
    question: string;
    status: boolean;
    time: number;
}

const guideline = <>
    <p className="mt-2">Hadi başlayalım!</p>
</>