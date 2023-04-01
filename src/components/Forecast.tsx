import { ForecastType } from "../api/types";

type Props = {
    data: ForecastType
}

const Forecast = ({data}: Props) => {
    const today = data.list[0]

    return (
        <>
        <section>
            <h2>{data.name}{today.main.temp}</h2>
        </section>
        </>
    )
}

export default Forecast