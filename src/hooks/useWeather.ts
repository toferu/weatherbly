import {useEffect, useState} from 'react'
import {ReturnObject, ForecastType} from '../api/types'
import axios from 'axios'

type CachedCityData = Map<string, ForecastType>

const useWeather = () => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [query, setQuery] = useState<ReturnObject[]>([])
  const [selectedCity, setSelectedCity] = useState<ReturnObject | null>()
  const [cityData, setCityData] = useState<ForecastType | null>() 

  const localStorageSaveData = (key: string, value: unknown) => {
    localStorage.setItem(key, JSON.stringify(value))
  }

  const apiGeocode = (`http://api.openweathermap.org/geo/1.0/direct?q=${searchTerm}&limit=5&appid=${import.meta.env.VITE_API_KEY}`)
    
  const getSearchMatches = (term: string) => {
    axios.get(apiGeocode)
    .then(response => setQuery(response.data))
    }

  const onSubmit = () => {
    if (!selectedCity) return
       
    getForecast(selectedCity)
   }

   const getLocalData = (key: string) => {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : null
   }

  const getForecast = (selectedCity: ReturnObject) => {
    const localStorageKey = `weatherData-${selectedCity.name}-${selectedCity.lat}-${selectedCity.lon}`
    const cachedData = getLocalData(localStorageKey)

    if (cachedData) {
        setCityData(cachedData)
        setSelectedCity(null)
    } else {

    let latitude = selectedCity.lat
    let longitude = selectedCity.lon
    const apiWeather = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=imperial&appid=${import.meta.env.VITE_API_KEY}`
    
    axios
    .get(apiWeather)
    .then((response) => {
        const forecastData = {
        ...response.data.city,
        list: response.data.list.slice(0,30)
        }
        setCityData(forecastData)
        localStorageSaveData(localStorageKey, forecastData)
    })
    .finally(() => setSelectedCity(null))
   }
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

//    useEffect(() => {
//     const localKeys = Object.keys(localStorage).filter((key: string) => key.startsWith('weatherData-'
//     ))
//     const cachedData = localKeys.map((key: string) =>
//     getLocalData(key)
//     )

//     if (cachedData.length > 0) {
//         setCityData(cachedData[0])
//     } else {
//         setCityData(null)
//     }

//     const cachedCityData: CachedCityData = {}
//     cachedData.forEach((data: ReturnObject | null) => {
//         if(data !== null){
//         cachedCityData[data.name] = data
//         }
//     })

//     localStorage.setItem('cachedCityData', JSON.stringify(cachedCityData))

//    }, [])

useEffect(() => {
    const localKeys = Object.keys(localStorage).filter((key: string) => key.startsWith('weatherData-'))
    const cachedData = localKeys.map((key: string) => getLocalData(key))
  
    if (cachedData.length > 0) {
      const cityDataCache: {[key: string]: ForecastType} = {}
      cachedData.forEach((data: ForecastType | null) => {
        if (data !== null) {
          cityDataCache[data.name] = data
        }
      })
      setCityData(cityDataCache[selectedCity?.name || Object.keys(cityDataCache)[0]])
    } else {
      setCityData(null)
    }
  
    const cachedCityData: CachedCityData = new Map()
    cachedData.forEach((data: ForecastType | null) => {
      if (data !== null) {
        const key: string = `${data.name}-${data.country}`
        cachedCityData.set(key,data)
      }
    })
  
    localStorage.setItem('cachedCityData', JSON.stringify([...cachedCityData]))
  
  }, [selectedCity])
  

//    useEffect(() => {
//     if(selectedCity) {
//         setSearchTerm(selectedCity.name)
//         setQuery([])
//     }
//    }, [selectedCity])

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