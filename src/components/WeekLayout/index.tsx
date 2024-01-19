import { FC, ReactNode } from "react";
import { useAppSelector } from "../../hooks";

type TWeekLayout = {
    subject: string;
    started: boolean;
    handleStart: () => void;
    taskDone: boolean;
    header?: ReactNode;
    guidelines: ReactNode;
    children: ReactNode
}

const WeekLayout: FC<TWeekLayout> = (props) => {
    const { subject, started, taskDone, guidelines, header, children, handleStart } = props;
    const { appName } = useAppSelector(state => state.app);

    return (
        <section className="w-full h-full flex flex-col items-start justify-center md:px-14 max-md:px-4 mt-4" >
            <div className="flex w-full bg-white p-4 rounded-md shadow-md items-center justify-between">
                <div>
                    <h1 className="text-3xl text-gradient">{appName}</h1>
                    <h5 className="text-lg text-gray-500">{subject}</h5>
                </div>
                {!started && (
                    <button onClick={handleStart} type="button" className="bg-[#4caf50] rounded-full px-4 py-1.5 text-white hover:bg-[#4caf50]/80 transition-all  flex-none">
                        Başlat
                    </button>
                )}

                {header}

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
                        <h5 className="text-lg text-gradient">Takip etmeniz gereken yönergeler:</h5>
                    </div>
                    {guidelines}
                </div>
            )}
            {children}
        </section>
    )
}

export default WeekLayout;