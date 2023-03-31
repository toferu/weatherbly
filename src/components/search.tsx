import React from 'react'
import {WeatherData} from '../api/types'
type Props = {
    searchTerm: string,
    query: string,
    selectedCity: {},
    toggle: boolean,
    city: WeatherData,
    newSearch: () => void,
    getForecast: () => void,
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Search = ({
    searchTerm,
    query,
    selectedCity,
    toggle,
    city,
    newSearch,
    getForecast,
    handleChange}): JSX.Element => {
    
    const [searchField, setSearchField] = useState('')
    const [query, setQuery] = useState([])
    const [selectedCity, setSelectedCity] = useState({
        name:'',
        lat:0,
        lon:0})
    const [toggle, setToggle] = useState(false)

    const apiGeocode = (`http://api.openweathermap.org/geo/1.0/direct?q=${searchField}&limit=5&appid=${import.meta.env.VITE_API_KEY}`)

    const newSearch = () => {
        axios.get(apiGeocode)
        .then(response => setQuery(response.data))
        setToggle(!toggle)
    }

    const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        setSearchField(event.target.value)
    }

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
            onClick={newSearch}/>

    </section>
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
{console.log(query)}
{console.log(selectedCity)}
<Add selectedCity={selectedCity}/>
    </>
    
)    
}
export default Search