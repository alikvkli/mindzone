import classNames from "classnames";
import { FC } from "react"

type TNumberCard = {
    number: number;
    xl?: boolean
}

const NumberCard: FC<TNumberCard> = (props) => {
    const { number, xl } = props;
    return (
        <div className={classNames('bg-[#f9a925]  rounded-md flex items-center justify-center text-white text-2xl', {
            'w-14 h-14': !xl,
            'w-20 h-20': xl
        })}>
            {number}
        </div>
    )
}

export default NumberCard;