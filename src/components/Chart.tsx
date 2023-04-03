import Forecast from "./Forecast";
import Chart from 'react-apexcharts'
import { ChartType } from "../api/types";
import {useState} from 'react'

type Props = {
    dates: []
}

const ChartComponent = ({dates}: Props) => {

const [chartData, setChartData] = useState<ChartType[]>([])

const setAxisX = dates.map((data: any) => {
    //this aint right
    setChartData(data.xaxis.categories)
}

}

export default ChartComponent