import React from "react";
import Button from "./Button";

export default function FlightListingCard({ flights }) {
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

  return (
    <div className="flex flex-col">
      {flights.map((flight) => (
        <div
          key={flight._id}
          className="w-[90vw] md:w-[60vw] min-h-[25vh] bg-red-dark my-4 mr-20 rounded-lg flex justify-evenly items-center"
        >
          <div className="flex flex-col">
            <span className="text-3xl">{flight.airlines}</span>
            <span className="text-lg text-gray">{flight.model}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-3xl">
              {getFlightTime(flight.departure_datetime)}
            </span>
            <span className="text-sm text-gray">
              {getFlightDate(flight.departure_datetime)}
            </span>
            <span className="text-sm text-gray">
              {flight.source_airport_location}
            </span>
          </div>
          <div className="flex flex-col items-center justify-center pb-3">
            <div>{flight.flight_duration}h</div>
            <div className="w-16 h-1 bg-red-primary"></div>
          </div>
          <div className="flex flex-col">
            <span className="text-3xl">
              {getFlightTime(flight.arrival_datetime)}
            </span>
            <span className="text-sm text-gray">
              {getFlightDate(flight.arrival_datetime)}
            </span>
            <span className="text-sm text-gray">
              {flight.destination_airport_location}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl">
              <span className="text-gray text-base mr-2">Starts at</span>
              &#8377;{flight.price}
            </span>
            <Button text="Book Now" />
          </div>
        </div>
      ))}
    </div>
  );
}
