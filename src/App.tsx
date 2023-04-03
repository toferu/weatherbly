import Search from './components/Search'
import Forecast from './components/Forecast'
import useWeather from './hooks/useWeather'
import './App.css'

const App = (): JSX.Element => {
  const { cityData, query, searchTerm, querySelection, onSubmit, handleChange } = useWeather()


return (
  <main className="App">
    <div className='header'>Weatherbly</div>
    {cityData ? (
    <Forecast data={cityData} />
    ):(
    < Search
        searchTerm={searchTerm}
        query={query}
        handleChange={handleChange}
        querySelection={querySelection}
        onSubmit={onSubmit} 
        />
    )}

  </main>
  )
}

export default App

//I am wondering if I can use selectedCity as a regular variable instead because I don't really pass it's state and I may be able to use the 'new' operator as a shortcut for storing multiple cities? If it worked, it would require me to restructure some conditionals below and I basically would not need the onSubmit.
//API URL