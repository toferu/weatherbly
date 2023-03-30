import React, {useEffect, useState} from "react";
import axios from 'axios';


const Search = () => {
    const apiEndpoint = ('http://api.openweathermap.org/geo/1.0/direct?q=')
    
    const [searchField, setSearchField] = useState('')
    const [query, setQuery] = useState([])
    const [selectedCities, setSelectedCities] = useState([])
    const [toggle, setToggle] = useState(false)


    const newSearch = () => {
        axios.get(apiEndpoint + `${searchField}&limit=5&appid=${import.meta.env.VITE_API_KEY}`)
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

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const cachedResult = JSON.parse(localStorage.getItem(url))

    //         let result
    //         if (cachedResult) {
    //             result = cachedResult
    //         } else {
    //             result = await axios(url)
    //             localStorage.setItem(url, JSON.stringify(result))
    //         }
    //     };

    //     fetchData()
    // }, [url])
return (
    <>
    <section>
        <input
            name='q'
            type='search'
            placeholder='Search City'
            onChange={handleChange} />

        <br />
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
                        setSelectedCities(selectedCities.concat([data]))
                        setToggle(false)}}>
                        {data['name']}, {data['country']}
                    </p>
                    
                </span>
            )
        }):null}
    </>
{console.log(query)}
{console.log(selectedCities)}
    </>
)    
}
export default Search