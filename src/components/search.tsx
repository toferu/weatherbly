import {ReturnObject} from '../api/types'
import QueryMatch from './QueryMatch'

type Props = {
    searchTerm: string
    query: []
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    querySelection: (data: ReturnObject) => void
    onSubmit: () => void
}


const Search = ({
    searchTerm,
    query,
    handleChange,
    querySelection,
    onSubmit}: Props) => (
    
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
            onClick={onSubmit}/>

    </section> 
    <QueryMatch query={query} querySelection={querySelection} />

    </>
    
)    

export default Search