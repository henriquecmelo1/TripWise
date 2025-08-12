import "./App.css";
import Navbar from "./components/NavBar";
import Home from "./pages/Home";
import Flights from "./pages/Flights";
import ItineraryPage from "./pages/ItineraryPage";
import TravelTips from "./pages/TravelTips";
import ExploreDestinations from "./pages/ExploreDestinations";
import MyTrips from "./pages/MyTrips";
import DynamicForm from "./components/DynamicForm/DynamicForm";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
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
        <Route
          path="/my-trips"
          element={
            <>
              <Navbar />
              <MyTrips />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
