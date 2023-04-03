import { useEffect, useState } from "react";
import { ForecastType } from "../api/types";
import ChartComponent from './Chart'

type Props = {
    data: ForecastType
}

const Forecast = ({data}: Props) => {
    const [dates, setDates] = useState<Date[]>([])


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
                <h3 key={index}>{dates[index]?.toLocaleString()}-{today.main.temp}&#176;F</h3>
                )})}
        </section>
        <ChartComponent dates={dates} />
        </>
    )
}

export default Forecast