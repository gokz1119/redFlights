import React from "react";

export default function PassengerDetailsFormCard(props) {
  const passenger = props.passenger;

  const onChange = (e) => {
    // const updatedPassengers = props.passengerDetails.map(person => {
    //   if(person.passenger_id === passenger.passenger_id) {
    //     return {}
    //   }
    // })
    console.log("passenger_id: ", props.passenger_id);
    const updatedPassenger = {
      ...props.passengerDetails[passenger.passenger_id],
      [e.target.name]: e.target.value,
    };
    console.log("Updated Passengers: ",updatedPassenger);
    const newPassengerDetails = [
      ...props.passengerDetails.slice(0, passenger.passenger_id),
      updatedPassenger,
      ...props.passengerDetails.slice(passenger.passenger_id+1),
    ];
    console.log("New Passenger Details:", newPassengerDetails);
    props.setPassengerDetails(newPassengerDetails);
  };

  return (
    <>
      <div className="w-[80vw] bg-red-dark p-5 mx-auto mb-5 rounded-xl shadow-2xl">
        <h1 className="text-xl">
          Details of Passenger {passenger.passenger_id + 1}
        </h1>
        <form action="" className="flex justify-evenly items-center mt-2">
          <input
            type="text"
            name="passenger_name"
            placeholder="Full Name"
            onChange={(e) => {
              e.preventDefault();
              onChange(e);
            }}
            className="p-3 rounded-lg outline-none text-xl bg-bg-secondary placeholder-white"
          />
          <input
            type="number"
            name="passenger_age"
            placeholder="Age"
            min={0}
            onChange={onChange}
            className="p-3 rounded-lg outline-none text-xl bg-bg-secondary placeholder-white"
          />
          <div>
            <label htmlFor="passenger_gender" className="font-semibold mr-3">
              Gender
            </label>
            <select
              name="passenger_gender"
              className="bg-bg-secondary focus-within:bg-bg-primary cursor-pointer p-3 text-lg rounded-lg outline-2"
              onChange={onChange}
              // defaultValue={searchParams.passenger_count}
            >
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="O">Other</option>
            </select>
          </div>
        </form>
      </div>
    </>
  );
}
