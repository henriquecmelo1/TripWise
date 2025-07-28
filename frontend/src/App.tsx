import './App.css'
import FlightSelection from './pages/FlightSelection'
import ItineraryPage from './pages/ItineraryPage'
import Questionnaire from './pages/Questionnaire'
import { Routes, Route } from 'react-router-dom'

function App() {

  return (
    <Routes>
      <Route path='/forms' element={<Questionnaire />} />
      <Route path='/flights' element={<FlightSelection />} />
      <Route path='/itinerary' element={<ItineraryPage />} />
    </Routes>
  )
}

export default App
