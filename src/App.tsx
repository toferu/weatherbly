import { useState } from 'react'
import axios from 'axios'
import './App.css'
import Search from './components/Search'


function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [query, setQuery] = useState([])
  const [selectedCity, setSelectedCity] = useState({
        name:'',
        lat:0,
        lon:0})
  const [toggle, setToggle] = useState(false)

  const apiGeocode = (`http://api.openweathermap.org/geo/1.0/direct?q=${searchTerm}&limit=5&appid=${import.meta.env.VITE_API_KEY}`)

  const newSearch = () => {
    axios.get(apiGeocode)
    .then(response => setQuery(response.data))
    setToggle(!toggle)
    }

    const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value)
    }

  return (
    <div className="App">
      <>
      <div className='header'>Weatherbly</div>
      < Search />

      </>
    </div>
  )
}

export default App
