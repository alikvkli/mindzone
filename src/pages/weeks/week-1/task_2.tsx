import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../hooks";
import { useEffect, useState } from "react";

export default function Task2() {
    const navigate = useNavigate();
    const { appName, step } = useAppSelector(state => state.app);
    const [started, setStarted] = useState<boolean>(false);
    const [taskDone, setTaskDone] = useState(false);


    useEffect(() => {
        if (step.task !== 1) {
            navigate(`/week/${step.week}/task-${step.task}`)
        }
    }, [step])

    const handleStart = () => {
        setStarted(true)
    }

    return (
        <section className="w-full h-full flex flex-col items-start justify-center md:px-14 max-md:px-4 mt-4" >
            <div className="flex w-full items-center justify-between">
                <div>
                    <h1 className="text-3xl text-gradient">{appName}</h1>
                    <h5 className="text-lg text-gray-500">Week 1 / Cognitive Flexibility</h5>
                </div>
                {!started && (
                    <button onClick={handleStart} type="button" className="bg-[#4caf50] rounded-full px-4 py-1.5 text-white hover:bg-[#4caf50]/80 transition-all  flex-none">
                        Start
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
                <div className="flex flex-col items-start gap-2">
                    <div className="bg-[#5068cb]/20 rounded-full my-2 px-2.5 py-1.5 ">
                        <h5 className="text-lg text-gradient">Task 2  - Description</h5>
                    </div>
                    <p>In this demonstration you will learn about cued task switching.Next,Cued task switching differs from the alternate run type of task switching.<br /> Next, you will read the instructions and then do two different tasks that
                        are regularly switched between.The level of difficulty with switching depends on<br /> the time between the cue and the imperative stimulus (the one you need to respond to immediately)</p>
                    <hr className="w-full h-[0.5px] my-2 bg-gray-400" />
                    <div className="bg-[#5068cb]/20 rounded-full my-2 px-2.5 py-1.5 ">
                        <h5 className="text-lg text-gradient">Introduction</h5>
                    </div>
                    <div className="flex max-md:flex-col w-full items-start justify-normal gap-8">
                        <div>
                            <p className="font-semibold text-gradient">Instructions 1</p>
                            <hr className="w-full h-[0.5px] my-2 bg-gray-400" />
                            <p>In the <b>shape</b> task:</p>
                            <p>If you see a circle, press the <b>b</b> key</p>
                            <p>If you see a rectangle, press the <b>n</b> key</p>
                            <br />
                            <p>In the <b>color</b> task:</p>
                            <p>If the stimulus is yellow, press the <b>b</b> key</p>
                            <p>If the stimulus is blue, press the <b>n</b> key</p>
                        </div>
                        <div>
                            <p className="font-semibold text-gradient">Instructions 2</p>
                            <hr className="w-full h-[0.5px] my-2 bg-gray-400" />
                            <p>In each trial of a few seconds, you will first see a +,<br /> followed by the word "shape" or "color".<br /> Next, you will see a yellow or blue circle or square.</p>
                            <br />
                            <p>Respond in accordance to the task instruction.</p>
                        </div>
                        <div>
                            <p className="font-semibold text-gradient">Instructions 3</p>
                            <hr className="w-full h-[0.5px] my-2 bg-gray-400" />
                            <p>Example:</p>
                            <p className="ml-2 text-red-900 bg-green-600 w-fit px-2 py-0.5">SHAPE</p>
                            <p>followed by:</p>
                            <div className="ml-2 rounded-full w-8 h-8 bg-blue-600"></div>
                            <p>Press the b key, because in the shape task,<br/> you need to respond with the b key to circles.The color is irrelevant<br/> when doing the shape task.</p>
                            <p>Respond in accordance to the task instruction.</p>
                        </div>
                        <div>
                            <p className="font-semibold text-gradient">Instructions 4</p>
                            <hr className="w-full h-[0.5px] my-2 bg-gray-400" />
                            <p>That is all! You can now "browse" back to the previous<br/> screen to be reminded of the exact instructions.<br/> Just go back and forth with the arrow keys of your keyboard.<br/> Press the key "q" from the keyboard to start with the task.</p>
                        </div>
                    </div>
                </div>
            )}

            {started && (
                <p>Task 2 here!</p>
            )}







        </section>
    )
}