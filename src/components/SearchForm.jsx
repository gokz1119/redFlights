import React from "react";
import Button from "./Button";

export default function SearchForm({
  airports,
  onChange,
  onSubmit,
  getFormattedDate,
  searchParams
}) {
  return (
    <form action="" className="flex flex-col" onSubmit={onSubmit}>
      <div className="flex justify-between items-center">
        <label htmlFor="source_id" className="mr-3 font-semibold">
          FROM
        </label>
        <select
          name="source_id"
          className="bg-bg-secondary focus-within:bg-bg-primary cursor-pointer p-3 text-lg rounded-lg outline-none min-w-[16vw]"
          onChange={onChange}
        >
          {airports.map((airport) =>
            airport.airport_id === parseInt(searchParams.source_id) ? (
              <option
                key={airport.airport_id}
                value={airport.airport_id}
                selected
              >
                {airport.location}
              </option>
            ) : (
              <option key={airport.airport_id} value={airport.airport_id}>
                {airport.location}
              </option>
            )
          )}
        </select>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <label htmlFor="destination_id" className="font-semibold">
          TO
        </label>
        <select
          name="destination_id"
          className="bg-bg-secondary focus-within:bg-bg-primary cursor-pointer p-3 text-lg rounded-lg outline-none min-w-[16vw]"
          onChange={onChange}
        >
          {airports.map((airport) =>
            airport.airport_id === parseInt(searchParams.destination_id) ? (
              <option
                key={airport.airport_id}
                value={airport.airport_id}
                selected
              >
                {airport.location}
              </option>
            ) : (
              <option key={airport.airport_id} value={airport.airport_id}>
                {airport.location}
              </option>
            )
          )}
        </select>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <label htmlFor="date" className=" font-semibold">
          DATE
        </label>
        <input
          type="date"
          name="date"
          defaultValue={searchParams.date}
          min={getFormattedDate(new Date())}
          className="bg-bg-secondary focus-within:bg-bg-primary cursor-pointer p-3 text-lg rounded-lg outline-none min-w-[16vw]"
          onChange={onChange}
        />
      </div>
      {/* <div className="mt-4 flex justify-between items-center">
              <label
                htmlFor="no-of-passengers"
                className="uppercase font-semibold"
              >
                Class
              </label>
              <select
                name="no-of-passengers"
                className="bg-bg-secondary focus-within:bg-bg-primary cursor-pointer px-4 py-3 text-lg rounded-lg outline-2 min-w-[16vw]"
              >
                <option value="ECONOMY">ECONOMY</option>
                <option value="BUSINESS">BUSINESS</option>
                <option value="FIRST">FIRST</option>
              </select>
            </div> */}
      <div className="mt-4 flex justify-between items-center">
        <label htmlFor="passenger_count" className="uppercase font-semibold">
          Passenger Count
        </label>
        <select
          name="passenger_count"
          className="bg-bg-secondary focus-within:bg-bg-primary cursor-pointer px-4 py-1 mb-4 text-lg rounded-lg outline-2"
          onChange={onChange}
          defaultValue={searchParams.passenger_count}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
      </div>
      <Button text="Search" />
    </form>
  );
}
