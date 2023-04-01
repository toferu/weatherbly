import Search from './components/Search'
import Forecast from './components/Forecast'
import useWeather from './hooks/useWeather'


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
