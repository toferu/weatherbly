import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Search from './components/search'

function App() {
  // states for toggling display
  const [chart, setChart] = useState(false)
  const [table, setTable] = useState(false)
  
  // hook for api calls
  const cityUrl = 'https://openweatherapp.org/api/geo/1.0/direct?q='
  // const getCityWeather = () => {
  //   axios.get('https://openweatherapp')
  // }

  return (
    <div className="App">
      <>
      < Search />
      <p>hello</p>
      </>
    </div>
  )
}

export default App
