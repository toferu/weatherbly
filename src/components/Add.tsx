import {useCallback, useEffect, useState} from "react"
import axios from 'axios'
import Search from "./Search"
import {WeatherData} from "../api/types"

interface CityObject {
    name: string,
    lat: number,
    lon: number
}

interface SearchProps {
    selectedCity: CityObject
}
export default function Add(props:SearchProps) {
    // const [weatherData, setWeatherData] = useState({
    //     main: {
    //         temp: 0
    //     }
    // })
    let latNum = props.selectedCity.lat
    let latitude = latNum.toFixed(2)

    let lonNum = props.selectedCity.lon
    let longitude = lonNum.toFixed(2)
    
    const apiWeather = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=imperial&appid=${import.meta.env.VITE_API_KEY}`

    const [city, setCity] = useState<WeatherData | null>(null) 

//     const addCity = useCallback(() => {
//         axios.get(apiWeather)
//         .then(response => (response.data))
//     }, [])


    const getForecast = () => {
        axios.get(apiWeather)
        .then(response => setCity(response.data))
        // data as WeatherData
        console.log(city)
    }

    useEffect(() => {
 if (latNum > 0 || latNum < 0 && lonNum > 0 || lonNum < 0) {   
getForecast()}
}, [])


return (
<>
<p>{city?.main.temp}</p>
</>
)
}