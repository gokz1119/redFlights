import { Route, Routes } from "react-router-dom";
import "./App.css";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Flights from "./pages/Flights";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/flights" element={<Flights />}></Route>
      <Route path="/" element={<Landing />}></Route>
    </Routes>
  );
}

export default App;
