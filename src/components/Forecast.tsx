import { ForecastType } from "../api/types";

type Props = {
    data: ForecastType
}

const Forecast = ({data}: Props) => {
    const convertDate = () => {
        for (let i = 0; i < data.list.length; i++) {
            let unix_timestamp = data.list[i].dt
            let date = new Date(unix_timestamp * 1000)
            console.log(date)
        } 
    }

    return (
        <>
        <section>
            {data.list.map((today: any) => {
                return (
                    <>
            <h2>{data.name}{today.dt}{today.main.temp}</h2>
            <button onClick={convertDate}>date</button>
            </>
            )})}
            
        </section>
        </>
    )
}

export default Forecast