import "./App.css";
import Navbar from "./components/NavBar";
import Dashboard from "./pages/Dashboard";
import Flights from "./pages/Flights";
import ItineraryPage from "./pages/ItineraryPage";
import Questionnaire from "./pages/Questionnaire";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/forms"
          element={
            <>
              <Navbar />
              <Questionnaire />
            </>
          }
        />
        <Route
          path="/flights"
          element={
            <>
              <Navbar />
              <Flights />
            </>
          }
        />
        <Route
          path="/itinerary"
          element={
            <>
              <Navbar />
              <ItineraryPage />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
