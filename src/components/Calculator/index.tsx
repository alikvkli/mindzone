import { FC, useEffect, useState } from "react";
import NumberCard from "../NumberCard";
import { FaDeleteLeft } from "react-icons/fa6";

type TCalculator = {
    selectedNumbers: string[],
    setSelectedNumbers: React.Dispatch<React.SetStateAction<string[]>>;
    checkNumbers: () => void;
}

const Calculator: FC<TCalculator> = (props) => {
    const { selectedNumbers, setSelectedNumbers, checkNumbers } = props;
    const handleClick = (selected: number): void => {
        setSelectedNumbers((prevState: string[]) => [...prevState, selected.toString()]);
    }

    const clearPreviousNumber = () => {
        if (selectedNumbers.length === 0) {
            return;
        }
        selectedNumbers.pop();
        setSelectedNumbers([...selectedNumbers]);

    }

    return (
        <div>
            <div className="flex flex-col items-center justify-center gap-4">

                <div className="flex items-center gap-2 justify-center">
                    {selectedNumbers?.map((number, key) => (
                        <NumberCard xl={false} key={key} number={Number(number)} />
                    ))}
                </div>

                <hr className="w-full h-[0.5px] my-2 bg-gray-400" />
                <div className="grid grid-cols-3 gap-4 place-items-center">
                    {Array.from({ length: 9 }).map((_, key) => (
                        <button key={key} type="button" disabled={!!selectedNumbers.find(number => number === (key + 1).toString())} onClick={() => handleClick(key + 1)} className="bg-[#f9a925] disabled:bg-[#f9a925]/50 w-14 h-14 rounded-md flex items-center justify-center text-white text-2xl">
                            {key + 1}
                        </button>
                    ))}
                </div>
                <button disabled={!!selectedNumbers.find(number => number === "0")} onClick={() => handleClick(0)} className="bg-[#f9a925] disabled:bg-[#f9a925]/50 w-14 h-14 rounded-md flex items-center justify-center text-white text-2xl">
                    0
                </button>
            </div>

            <div className="flex items-center gap-4 justify-between mt-4">
                <button onClick={clearPreviousNumber} type="button" className="bg-[#4caf50] text-white rounded-full px-4 py-1 flex items-center justify-center gap-1.5 flex-none">
                    Clear
                    <FaDeleteLeft />
                </button>
                <button onClick={checkNumbers} type="button" className="bg-[#4caf50] text-white rounded-full px-4 py-1">
                    Continue
                </button>
            </div>
        </div>
    )
}

export default Calculator;