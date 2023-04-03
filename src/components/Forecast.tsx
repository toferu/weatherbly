import { useCallback, useEffect, useState } from "react";
import { ForecastType } from "../api/types";
import ChartComponent from './Chart'

type Props = {
    data: ForecastType
}

const Forecast = ({data}: Props) => {
    const [dates, setDates] = useState<Date[]>([])
    const [toggle, setToggle] = useState(false)

const handleClick = useCallback(() => {
    setToggle(!toggle)
}, [toggle])

useEffect(() => {
    const newDates = data.list.map((item: any) => new Date(item.dt * 1000));
    setDates(newDates);
}, [data])

    return (
        <>
       {toggle? (<section>
            <h2>{data.name}</h2>
                {data.list.map((today: any, index: number) => {
                    return (
                <h3 key={index}>{dates[index]?.toLocaleString()}-{today.main.temp}&#176;F</h3>
                )})}
        </section> 
       ) : (
        <ChartComponent data={data} dates={dates} toggle={toggle}/>  )}
        <button onClick={handleClick}>Toggle</button> 
        </>
    )
}

export default Forecast