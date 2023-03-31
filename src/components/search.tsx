import {useState} from 'react'
import {WeatherData, ReturnObject} from '../api/types'
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
  const [selectedCity, setSelectedCity] = useState<ReturnObject>()
  const [toggle, setToggle] = useState(false)
  const [city, setCity] = useState<WeatherData | null>(null) 


//API URLS
  const apiGeocode = (`http://api.openweathermap.org/geo/1.0/direct?q=${searchTerm}&limit=5&appid=${import.meta.env.VITE_API_KEY}`)
  const apiWeather = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=imperial&appid=${import.meta.env.VITE_API_KEY}`

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
    if (value === '') return

    axios.get(apiGeocode)
    .then(response => setQuery(response.data))
    setToggle(!toggle)
    }

  const selectionEvent = (data: ReturnObject) => {
    setSelectedCity(data)
    setToggle(false)
  }

  const getForecast = () => {
   //Using these variables to convert geocode lat lon data for weather api url
  //I think this is unnecessary and I wrote it when I thought the problem with the api may have been related to the length of the values here?
  let latitude = selectedCity.lat
  let longitude = selectedCity.lon
  axios.get(apiWeather)
  .then(response => setCity(response.data))
// data as WeatherData
  }
  
   

  





return (
    <>
    <section>
        <input
            name='q'
            type='search'
            placeholder='Search City'
            onChange={handleChange} />
        <input 
            type='submit' 
            value='Search'
            onClick={getForecast}/>

    </section>
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

{console.log(query)}
{console.log(city)}

    </>
    
)    
}
export default Search