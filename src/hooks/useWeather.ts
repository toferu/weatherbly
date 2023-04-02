import {useEffect, useState} from 'react'
import {ReturnObject, ForecastType} from '../api/types'
import axios from 'axios'

const useWeather = () => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [query, setQuery] = useState<[]>([])
  const [selectedCity, setSelectedCity] = useState<ReturnObject | null>()
  const [cityData, setCityData] = useState<ForecastType | null>() 

//I am wondering if I can use selectedCity as a regular variable instead because I don't really pass it's state and I may be able to use the 'new' operator as a shortcut for storing cities? If it worked, it would require me to restructure some conditionals below and I basically would not need the onSubmit.
//API URL
  const apiGeocode = (`http://api.openweathermap.org/geo/1.0/direct?q=${searchTerm}&limit=5&appid=${import.meta.env.VITE_API_KEY}`)
 
    
  const getSearchMatches = (term: string) => {
    axios.get(apiGeocode)
    .then(response => setQuery(response.data))
    }

  const onSubmit = () => {
    if (!selectedCity) return
       
    getForecast(selectedCity)
   }

  const getForecast = (selectedCity: ReturnObject) => {
    let latitude = selectedCity.lat
    let longitude = selectedCity.lon
    const apiWeather = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=imperial&appid=${import.meta.env.VITE_API_KEY}`
    
    axios.get(apiWeather)
    //this spreading of response in to an object array variable is new to me.
    .then(response => {
        const forecastData = {
        ...response.data.city,
        list: response.data.list.slice(0,16)
        }
        setCityData(forecastData)
    })

    setSelectedCity(null)
  }

  const querySelection = (data: ReturnObject) => {
    setSelectedCity(data)
    setQuery([])
   }

   const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value.trim()
    setSearchTerm(value)

    if (value !== '') {
        getSearchMatches(value)
    }
   }

   useEffect(() => {
    if(selectedCity) {
        setSearchTerm(selectedCity.name)
        setQuery([])
    }
   }, [selectedCity])

  return {
    cityData,
    query,
    searchTerm,
    querySelection,
    onSubmit,
    handleChange
  }
}  
export default useWeather