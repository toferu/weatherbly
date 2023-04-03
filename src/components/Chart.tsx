import Forecast from "./Forecast";
import Chart from 'react-apexcharts'
import { ChartType, ForecastType } from "../api/types";
import {useState} from 'react'

type Props = {
    data: ForecastType
    dates: Date[]
}

const ChartComponent = ({data, dates}: Props) => {
    const tempData = data.list.map((item) => item.main.temp)
    
    const [chartData, setChartData] = useState({
            options: {
                chart: {
                  id: "basic-line"
                },
                xaxis: {
                  categories: dates.map((date) => date.toLocaleString())
                }
              },
              series: [
                {
                  name: "Temperature",
                  data: tempData
                }
              ]
            }
    );

    return (
        <div className="app">
        <div className="row">
            <div className="mixed-chart">
            <Chart
                options={chartData.options}
                series={chartData.series}
                type="line"
                width="500"
            />
            </div>
        </div>
        </div>
    )

}

export default ChartComponent