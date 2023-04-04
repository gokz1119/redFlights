import React, { useEffect } from "react";
import NavbarLanding from "../components/NavbarLanding";
import { useParams, useSearchParams } from "react-router-dom";
import { useState } from "react";
import PassengerDetailsFormCard from "../components/PassengerDetailsFormCard";

export default function Booking() {
  const [passengerDetails, setPassengerDetails] = useState([]);
  const [classType, setClassType] = useState("ECONOMY");
  const { flight_schedule_id } = useParams();

  const [seats, setSeats] = useState([])

  const [queryParams, setQueryParams] = useSearchParams();
  const no_of_passengers = parseInt(queryParams.get("no_of_passengers"));

  useEffect(() => {

    const seatsUrl = `http://localhost:3000/`

    console.log("useEffect");
    for (let i = 0; i < no_of_passengers; i++) {
      const detail = {
        passenger_id: i,
        passenger_name: "",
        passenger_age: null,
        passenger_gender: "",
        flight_seat_detail_id: null,
      };
      setPassengerDetails((pd) => [...pd, detail]);
    }
  }, []);

  const changeFlightClass = (e) => {
    setClassType(e.target.value)
  }

  return (
    <>
      <NavbarLanding />
      <div className="mt-28 w-[100vw] flex flex-col">
        <div className="mx-auto mb-4">
          <label htmlFor="class_type" className="font-semibold mr-3 text-xl">
            Class
          </label>
          <select
            name="class_type"
            className="bg-bg-secondary focus-within:bg-bg-primary cursor-pointer p-3 text-lg rounded-lg outline-2"
            onChange={changeFlightClass}
            // defaultValue={searchParams.passenger_count}
          >
            <option value="ECONOMY">Economy</option>
            <option value="BUSINESS">Business</option>
            <option value="FIRST">First</option>
          </select>
        </div>
        {console.log(passengerDetails)}
        {passengerDetails.map((passenger, i) => {
          return (
            <PassengerDetailsFormCard
              key={i}
              passenger={passenger}
              passengerDetails={passengerDetails}
              setPassengerDetails={setPassengerDetails}
            />
          );
        })}
      </div>
    </>
  );
}
