import {useCallback, useEffect, useState} from "react"
import axios from 'axios'
import Search from "./Search"

interface CityObject {
    name: string,
    lat: number,
    lon: number
}

interface SearchProps {
    selectedCity: CityObject
}
export default function Add(props:SearchProps) {
    const [weatherData, setWeatherData] = useState({
        'cnt': Number,
        'list': []
    })
    let latNum = props.selectedCity.lat
    let latitude = latNum.toFixed(2)
    console.log(latitude)
    let lonNum = props.selectedCity.lon
    let longitude = lonNum.toFixed(2)
    console.log(longitude)
    const apiWeather = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${import.meta.env.VITE_API_KEY}`

    const addCity = useCallback(() => {
        axios.get(apiWeather)
        .then(response => setWeatherData(response.data))
    }, [])
useEffect(() => {
 if (latNum > 0 || latNum < 0 && lonNum > 0 || lonNum < 0) {   
addCity()}
}, [])
return (
<>
{JSON.stringify(weatherData.list)} added
</>
)
}