import { useEffect, useState } from "react";
import { ForecastType } from "../api/types";

type Props = {
    data: ForecastType
}

const Forecast = ({data}: Props) => {
    const [dates, setDates] = useState<Date[]>([])

    const convertDate = (index: number) => {

    //    for (let i = 0; i < data.list.length; i++) {
            let unix_timestamp = data.list[index].dt
            let date = new Date(unix_timestamp * 1000)
            return date
        } 
    // }


useEffect(() => {
    const newDates = data.list.map((item: any) => new Date(item.dt * 1000));
    setDates(newDates);
}, [data])

    return (
        <>
        <section>
            <h2>{data.name}</h2>
                {data.list.map((today: any, index: number) => {
                    return (
                <h3 key={index}>{dates[index]?.toLocaleString()}-{today.main.temp}</h3>
                )})}
        </section>
        </>
    )
}

export default Forecast