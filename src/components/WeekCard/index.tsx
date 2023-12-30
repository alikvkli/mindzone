import { FC } from "react";
import { TWeekCard } from "./index.types";
import { MdDone } from "react-icons/md";
import { GrInProgress } from "react-icons/gr";
import { CiLock } from "react-icons/ci";

import classNames from "classnames";
import { Link, useNavigate } from "react-router-dom";


const WeekCard: FC<TWeekCard> = (props) => {
    const navigate = useNavigate();
    const { title, done, link, enabled } = props;

    const handleCardClick = () => {
        if (!enabled) return;
        navigate(link)
    }

    return (
        <div onClick={handleCardClick} className="week-card bg-white cursor-pointer relative shadow-md bg-cover bg-center border-[1px] border-[#5068cb] rounded-md py-2 px-4 flex flex-col items-center justify-center  w-[300px] h-52 hover:border-[#5068cb] hover:border-2 transition-all">
            <p className="text-gradient font-semibold text-3xl">{title}</p>
            <hr className="w-full h-[3.5px] bg-[#5068cb] rounded-lg" />
            {!enabled && (
                <div className={classNames('absolute border-[1.5px] border-black/20   top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2  bg-gray-400/80 rounded-full flex items-center justify-center  w-14 h-14')}>
                    <CiLock color="white" size={22} />

                </div>
            )}

            {done && (
                <div className={classNames('absolute border-[1.5px] border-black/20  top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2  bg-[#22EB5D]/80 rounded-full flex items-center justify-center  w-14 h-14')}>
                    <MdDone color="white" size={24} />

                </div>
            )}

            {/* <div className={classNames('absolute top-0 right-0 rounded-tr-sm  flex items-center justify-center w-8 h-8', {
                'bg-[#22EB5D]': done,
                'bg-[#F9A825]': !done
            })}>
                {done ? <MdDone color="white" size={24} /> : <GrInProgress color="white" size={18} />}


            </div> */}
        </div>
    )
}

export default WeekCard;