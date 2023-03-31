import React from 'react'
import {WeatherData} from '../api/types'
type Props = {
    searchTerm: string,
    query: [],
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
    handleChange}: Props): JSX.Element => {
    
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

    </>
    
)    
}
export default Search