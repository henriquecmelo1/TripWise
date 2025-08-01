import './App.css'
import Navbar from './components/NavBar'
import Flights from './pages/Flights'
import ItineraryPage from './pages/ItineraryPage'
import Questionnaire from './pages/Questionnaire'
import { Routes, Route } from 'react-router-dom'

function App() {

  return (<>
    <Navbar></Navbar>
    <Routes>
      <Route path='/' element={<Questionnaire />} />
      <Route path='/forms' element={<Questionnaire />} />
      <Route path='/flights' element={<Flights />} />
      <Route path='/itinerary' element={<ItineraryPage />} />

    </Routes>
    </>
  )
}

export default App
