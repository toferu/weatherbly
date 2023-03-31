import { useState } from 'react'
import axios from 'axios'
import './App.css'
import Search from './components/Search'
import {WeatherData} from './api/types'

function App() {

  //This should all be a hook, but first it needs fixing
  const [searchTerm, setSearchTerm] = useState('')
  const [query, setQuery] = useState<[]>([])
  const [selectedCity, setSelectedCity] = useState({
        name:'',
        lat:0,
        lon:0})
  const [toggle, setToggle] = useState(false)
  const [city, setCity] = useState<WeatherData | null>(null) 



  //This searches the geocode api for the lat lon data
  const newSearch = () => {
    axios.get(apiGeocode)
    .then(response => setQuery(response.data))
    setToggle(!toggle)
    }
    
  const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
    }

  const getForecast = (city: WeatherData) => {
      //Using these variables to convert geocode lat lon data for weather api url
  //I think this is unnecessary and I wrote it when I thought the problem with the api may have been related to the length of the values here?
  let latNum = selectedCity.lat
  let latitude = latNum.toFixed(2)

  let lonNum = selectedCity.lon
  let longitude = lonNum.toFixed(2)

    axios.get(apiWeather)
    .then(response => setCity(response.data))
    // data as WeatherData
    console.log(city)
  }
  
    //API URLS
    const apiGeocode = (`http://api.openweathermap.org/geo/1.0/direct?q=${searchTerm}&limit=5&appid=${import.meta.env.VITE_API_KEY}`)
    const apiWeather = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=imperial&appid=${import.meta.env.VITE_API_KEY}`
  




  return (
    <div className="App">
      <>
      <div className='header'>Weatherbly</div>
      < Search searchTerm={searchTerm} query={query} selectedCity={selectedCity} toggle={toggle} city={city} newSearch={newSearch} getForecast={getForecast} handleChange={handleChange} />
      <>
        {toggle? query.map((data) => {
            return(
                <span>
                    <p onClick={ () => {
                        setSelectedCity(data)
                        setToggle(false)}}>
                        {data['name']}, {data['state']}, {data['country']}
                    </p>
                    
                </span>
            )
        }):null}
    </>

      </>
    </div>
  )
}

export default App
