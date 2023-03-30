import React, {useEffect, useState} from "react";
import axios from 'axios';

// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

const Search = () => {
    const [apiEndpoint, setApiEndpoint] = useState('http://api.openweathermap.org/geo/1.0/direct?q=')
    const [searchField, setSearchField] = useState('')
    const [cityData, setCityData] = useState([])
    const [resultArray, setResultArray] = useState([])
    const [toggle, setToggle] = useState(false)


    const newSearch = () => {
        axios.get(apiEndpoint + `${searchField}&limit=5&appid=${import.meta.env.VITE_API_KEY}`)
        .then(response => setCityData(response.data.results))
    }

    const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        setSearchField(event.target.value)
        setToggle(true)
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
        {toggle? cityData.map(() => {
            return(
                <span>
                    <p onClick={ () => {
                        setResultArray(resultArray.concat([]))
                        setToggle(false)}}>
                    
                    </p>
                    
                </span>
            )
        }):null}
    </>
    </>
)    
}
export default Search