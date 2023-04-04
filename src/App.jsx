import { Route, Routes } from "react-router-dom";
import "./App.css";
import cookies from "js-cookie";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Flights from "./pages/Flights";
import Booking from "./pages/Booking";

function App() {
  return (
    <Routes>
      {cookies.get("auth") && (
        <>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/flights" element={<Flights />}></Route>
          <Route path="/search" element={<Landing />}></Route>
          <Route path="/book/:flight_schedule_id" element={<Booking />}></Route>
        </>
      )}
      <Route path="/book/:flight_schedule_id" element={<Login />}></Route>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/flights" element={<Login />}></Route>
      <Route path="/search" element={<Login />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/" element={<Login />}></Route>
    </Routes>
  );
}

export default App;
