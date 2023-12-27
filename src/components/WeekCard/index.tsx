import { FC } from "react";
import { TWeekCard } from "./index.types";
import { MdDone } from "react-icons/md";
import { GrInProgress } from "react-icons/gr";

import classNames from "classnames";
import { Link, useNavigate } from "react-router-dom";


const WeekCard: FC<TWeekCard> = (props) => {
    const navigate = useNavigate();
    const { title, subtitle, done } = props;
    return (
        <div onClick={() => navigate("/task/item--1")} className="week-card cursor-pointer relative shadow-md bg-cover bg-center border-[1px] rounded-md py-2 px-4 flex flex-col items-center justify-center  w-[300px] h-52 hover:border-[#5068cb] hover:border-2 transition-all">
            <p className="text-gradient font-semibold text-3xl">{title}</p>
            <hr className="w-full h-[3.5px] bg-[#5068cb] rounded-lg" />
            <div className="flex flex-col items-start justify-start mt-2">
                {subtitle.map((item, key) => (
                    <p key={key} className=" font-semibold text-lg with-bullet text-black/70">{item}</p>
                ))}
            </div>
            <div className={classNames('absolute top-0 right-0 rounded-tr-sm  flex items-center justify-center w-8 h-8', {
                'bg-[#22EB5D]': done,
                'bg-[#F9A825]': !done
            })}>
                {done ? <MdDone color="white" size={24} /> : <GrInProgress color="white" size={18} />}


            </div>
        </div>
    )
}

export default WeekCard;