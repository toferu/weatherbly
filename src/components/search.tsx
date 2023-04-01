import {useState} from 'react'
import {WeatherData, ReturnObject, ForecastType} from '../api/types'
import axios from 'axios'

const Search = (): JSX.Element => {
    
//This was a snippet I found in my search on how to store things in cache for a more robust and persistent data storage in lieu of using a db for selected cities. I clearly was far and away from ever implementing it.
    // const fetchData = async () => {
    //     const cachedResult = JSON.parse(localStorage.getItem(url))

    //     let result
    //     if (cachedResult) {
    //         result = cachedResult
    //     } else {
    //         await newSearch()
    //         result = cityData
    //         localStorage.setItem(url, JSON.stringify(result))
    //     }
    // };

  //This should all be a hook, but first it needs fixing
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [query, setQuery] = useState<[]>([])
  const [selectedCity, setSelectedCity] = useState<ReturnObject | null>()
  const [toggle, setToggle] = useState(false)
  const [cityData, setCityData] = useState<ForecastType | null>() 
  const [submitToggle, setSubmitToggle] = useState(true)


//API URLS
  const apiGeocode = (`http://api.openweathermap.org/geo/1.0/direct?q=${searchTerm}&limit=5&appid=${import.meta.env.VITE_API_KEY}`)
 

  //This searches the geocode api for the lat lon data
//   const newSearch = () => {
//     axios.get(apiGeocode)
//     .then(response => setQuery(response.data))
//     setToggle(!toggle)
//     }
    
  const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value
    setSearchTerm(value)
    //this is supposed to prevent extra unnecessary api calls but i'm not sure it's actually doing that
    // if (value === '') return

    axios.get(apiGeocode)
    .then(response => setQuery(response.data))
    setToggle(!toggle)
    }

  const selectionEvent = (data: ReturnObject) => {
    setSelectedCity(data)
    setQuery([])
    setToggle(false)
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
  }
  
  const onSubmit = () => {
    if (!selectedCity) return

    getForecast(selectedCity)
    setSubmitToggle(false)
  } 

  
//this part can probably be a different component


    const today = cityData.list[0]




return (
    <>
    {!cityData ? <section>
        <input
            name='q'
            type='search'
            placeholder='Search City'
            onChange={handleChange} />
        <input 
            type='submit' 
            value='Search'
            onClick={onSubmit}/>

    </section> :<><p>{`${cityData.name}`}</p><p>{`${today.main.temp}`}</p></>}
    <>
        {toggle? query.map((data: ReturnObject) => {
            return(
                <span>
                    <p onClick={ () => {
                       selectionEvent(data)}}>
                        {data['name']}, {data['state']}, {data['country']}
                    </p>
                    
                </span>
            )
        }):null}
    </>

{/* {console.log(query)} */}
{console.log(cityData)}
    </>
    
)    
}
export default Search