import React from "react";
import NavbarLanding from "../components/NavbarLanding";
import SearchForm from "../components/SearchForm";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Button from "../components/Button";
import FlightListingCard from "../components/FlightListingCard";

export default function Flights() {
  const navigate = useNavigate();
  const [airports, setAirports] = useState([]);
  const [flights, setFlights] = useState([]);
  const [queryParams, setQueryParams] = useSearchParams();

  const [searchParams, setSearchParams] = useState({
    source_id: queryParams.get("source_id"),
    destination_id: queryParams.get("destination_id"),
    date: queryParams.get("date"),
    passenger_count: queryParams.get("passenger_count"),
  });

  const getFlightTime = (dateTimeString) => {
    let dateTime = new Date(dateTimeString);
    let minutes = dateTime.getMinutes();
    if (minutes < 10) minutes = "0" + minutes;

    let hours = dateTime.getHours();
    if (hours < 10) hours = "0" + hours;

    let time = hours + ":" + minutes;
    return time;
  };

  const getFlightDate = (dateTimeString) => {
    const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    let dateTime = new Date(dateTimeString);
    let month = dateTime.toLocaleString("default", { month: "short" });

    let date = dateTime.getDate();
    if (date < 10) {
      date = "0" + date;
    }
    let day = weekday[dateTime.getDay()];

    return date + " " + month + ", " + day;
  };

  const getFormattedDate = (date) => {
    const yyyy = date.getFullYear();
    let mm = date.getMonth() + 1;
    let dd = date.getDate();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    const formattedToday = yyyy + "-" + mm + "-" + dd;
    return formattedToday;
  };

  const onChange = (e) => {
    setSearchParams((sp) => ({ ...sp, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    navigate(
      `/flights?source_id=${parseInt(
        searchParams.source_id
      )}&destination_id=${parseInt(searchParams.destination_id)}&date=${
        searchParams.date
      }&passenger_count=${parseInt(searchParams.passenger_count)}`
    );
  };

  useEffect(() => {
    const airportUrl = "http://localhost:3000/api/airports";
    axios
      .get(airportUrl)
      .then((response) => {
        setAirports(response.data);
      })
      .catch((err) => console.log(err));

    const flightUrl = `http://localhost:3000/api/schedule?source=${parseInt(
      searchParams.source_id
    )}&destination=${parseInt(searchParams.destination_id)}&date='${
      searchParams.date
    }'`;
    axios
      .get(flightUrl)
      .then((response) => {
        setFlights(response.data);
        console.log(response.data);
      })
      .catch((err) => console.log(err));
  }, [queryParams]);

  return (
    <>
      <NavbarLanding />
      <div className="w-screen flex flex-col md:flex-row md:items-center md:justify-between md:h-[85vh] mt-20">
        <div className="min-w-[20vw] p-4 px-6 bg-red-dark m-7 rounded-xl shadow-2xl">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-3xl m-3 mb-5 font-normal">
              Modify Your Search
            </h1>
            <SearchForm
              airports={airports}
              onChange={onChange}
              onSubmit={onSubmit}
              getFormattedDate={getFormattedDate}
              searchParams={searchParams}
            />
          </div>
        </div>
        {flights.length > 0 ? (
          <FlightListingCard flights={flights} />
        ) : (
          <div className="mx-auto text-3xl text-center">
            Uh-oh we couldn't find any flights for you :(
            <br />
            <span className="text-gray text-lg">
              Please try booking on a different date
            </span>
          </div>
        )}
      </div>
    </>
  );
}
