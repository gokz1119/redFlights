import axios from "axios";
import React, { useEffect, useState } from "react";
import bookingImg from "../assets/booking.svg";
import NavbarLanding from "../components/NavbarLanding";
import { useNavigate } from "react-router-dom";
import SearchForm from "../components/SearchForm";
import cookies from 'js-cookie';

export default function Landing() {
  const navigate = useNavigate()
  const [airports, setAirports] = useState([]);

  const getFormattedDate = (date) => {
    const yyyy = date.getFullYear();
    let mm = date.getMonth() + 1;
    let dd = date.getDate();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    const formattedToday = yyyy + "-" + mm + "-" + dd;
    return formattedToday;
  };

  const [searchParams, setSearchParams] = useState({
    source_id: "1",
    destination_id: "2",
    date: getFormattedDate(new Date()),
    passenger_count: "1",
  });
  const onChange = (e) => {
    setSearchParams((sp) => ({ ...sp, [e.target.name]: e.target.value }));
  };

  // Let's handle the form submit
  const onSubmit = (e) => {
    e.preventDefault();
    
    navigate(`/flights?source_id=${parseInt(searchParams.source_id)}&destination_id=${parseInt(searchParams.destination_id)}&date=${searchParams.date}&passenger_count=${parseInt(searchParams.passenger_count)}`)

  };
  useEffect(() => {
    const airportUrl = "http://localhost:3000/api/airports";
    axios
      .get(airportUrl)
      .then((response) => {
        setAirports(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <NavbarLanding />
      <div className="w-screen flex items-center justify-evenly h-[85vh] mt-20">
        <div className="min-w-[27vw] bg-red-dark m-7 rounded-xl shadow-2xl">
          <div className="p-4 pb-10 flex flex-col items-center justify-center">
            <h1 className="text-3xl m-3 mb-5 font-normal">
              Find Your{" "}
              <span className="text-red-primary font-semibold">Flight</span>{" "}
              Path
            </h1>
            <SearchForm airports={airports} onChange={onChange} onSubmit={onSubmit} getFormattedDate={getFormattedDate} searchParams={searchParams} />
          </div>
        </div>
        <img
          src={bookingImg}
          alt="Book Flights"
          width={"400px"}
          height={"400px"}
          className="m-7 hidden md:block"
        />
      </div>
    </>
  );
}
