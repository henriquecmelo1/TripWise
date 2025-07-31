import './App.css'
import Navbar from './components/NavBar'
import Flights from './pages/Flights'
import ItineraryPage from './pages/ItineraryPage'
import Questionnaire from './pages/Questionnaire'
import { Routes, Route } from 'react-router-dom'
// import UserProfile from './pages/UserProfile'

function App() {

  return (<>
    <Navbar></Navbar>
    <Routes>
      <Route path='/forms' element={<Questionnaire />} />
      <Route path='/flights' element={<Flights />} />
      <Route path='/itinerary' element={<ItineraryPage />} />
      <Route path='/' element={<Questionnaire />} />

    </Routes>
    </>
  )
}

export default App
