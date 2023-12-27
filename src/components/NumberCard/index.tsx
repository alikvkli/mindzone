import { FC } from "react"

type TNumberCard = {
    number: number;
}

const NumberCard: FC<TNumberCard> = (props) => {
    const { number } = props;
    return (
        <div className="bg-[#f9a925] w-14 h-14 rounded-md flex items-center justify-center text-white text-2xl">
            {number}
        </div>
    )
}

export default NumberCard;