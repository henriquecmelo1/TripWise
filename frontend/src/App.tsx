import "./App.css";
import Navbar from "./components/NavBar";
import Dashboard from "./pages/Dashboard";
import Flights from "./pages/Flights";
import ItineraryPage from "./pages/ItineraryPage";
import Questionnaire from "./pages/Questionnaire";
import TravelTips from "./pages/TravelTips";
import ExploreDestinations from "./pages/ExploreDestinations";
import DynamicForm from "./components/DynamicForm/DynamicForm";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route
          path="/forms"
          element={
            <>
              <Navbar />
              <DynamicForm />
            </>
          }
        />
        <Route
          path="/forms-old"
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
        <Route
          path="/tips"
          element={<TravelTips />}
        />
        <Route
          path="/destinations"
          element={<ExploreDestinations />}
        />
      </Routes>
    </>
  );
}

export default App;
