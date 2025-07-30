import './App.css'
import FlightSelection from './pages/FlightSelection'
import ItineraryPage from './pages/ItineraryPage'
import Questionnaire from './pages/Questionnaire'
import { Routes, Route } from 'react-router-dom'
// import UserProfile from './pages/UserProfile'

function App() {

  return (
    <Routes>
      <Route path='/forms' element={<Questionnaire />} />
      <Route path='/flights' element={<FlightSelection />} />
      <Route path='/itinerary' element={<ItineraryPage />} />
      <Route path='/' element={<Questionnaire />} />

    </Routes>
  )
}

export default App
