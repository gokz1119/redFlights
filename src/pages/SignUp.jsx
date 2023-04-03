import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import aircraftImg from "../assets/aircraft.svg";
import { Link, useNavigate } from "react-router-dom";
import GenericNavbar from "../components/GenericNavbar";
import axios from "axios";

export default function SignUp() {
  const [countryCodes, setCountryCodes] = useState([]);
  const [isValidUser, setIsValidUser] = useState(null);
  const [isNameEntered, setIsNameEntered] = useState(null);
  const [isEmailValid, setIsEmailValid] = useState(null);
  const [isPasswordValid, setIsPasswordValid] = useState(null);
  const [isPhoneNoValid, setIsPhoneNoValid] = useState(null);
  const [isSignupSuccess, setIsSignupSuccess] = useState(null);

  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    country_code_id: "10",
    phone_no: "",
    password: "",
  });

  const togglePasswordVisibility = () => {
    let x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };

  const onChange = (e) => {
    setUserDetails((details) => ({
      ...details,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (userDetails.name.length) {
      setIsNameEntered(true);
      if (
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userDetails.email)
      ) {
        setIsEmailValid(true);
        if (/^\d{10}$/.test(userDetails.phone_no)) {
          setIsPhoneNoValid(true);
          if (
            userDetails.password.length >= 8 &&
            userDetails.password.length <= 15
          ) {
            setIsPasswordValid(true);

            const signupUrl = `http://localhost:3000/api/signup`;
            axios
              .post(signupUrl, userDetails)
              .then((response) => {
                console.log(response.data);
                if (response.data.userAlreadyExists) {
                  setIsValidUser(false);
                } else if (response.data.status) {
                  setIsSignupSuccess(true);
                  alert(
                    "Yay! Account created successfully. Please login to continue"
                  );
                  navigate("/login");
                } else {
                  setIsSignupSuccess(false);
                }
              })
              .catch((err) => console.log(err));
          } else {
            setIsPasswordValid(false);
          }
        } else {
          setIsPhoneNoValid(false);
        }
      } else {
        setIsEmailValid(false);
      }
    } else {
      setIsNameEntered(false);
    }
  };

  useEffect(() => {
    const countryCodesUrl = "http://localhost:3000/api/countryCodes";
    axios
      .get(countryCodesUrl)
      .then((response) => {
        setCountryCodes(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <GenericNavbar />
      <div className="w-screen h-[90vh] flex items-center justify-evenly mt-14">
        <img
          src={aircraftImg}
          alt="Book Flights"
          width={"400px"}
          height={"400px"}
          className="m-7 hidden md:block"
        />
        <div className="min-w-[25vw] bg-red-dark mx-7 rounded-xl shadow-2xl">
          <div className="p-4 flex flex-col items-center justify-center">
            <h1 className="text-3xl m-3 mb-5 font-normal">
              Sign Up for{" "}
              <span className="font-semibold">
                red<span className="text-red-primary">Flights</span>
              </span>
            </h1>
            <form
              action=""
              className="flex flex-col max-w-[20vw]"
              onSubmit={onSubmit}
            >
              <div className="flex justify-center items-center">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  onChange={onChange}
                  className="p-3 rounded-lg outline-none text-xl bg-bg-secondary placeholder-white"
                />
              </div>
              {isNameEntered === false && (
                <p className="text-red-primary ml-1">Please enter your name</p>
              )}

              <div className="mt-4 flex justify-center items-center">
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  onChange={onChange}
                  className="p-3 rounded-lg outline-none text-xl bg-bg-secondary placeholder-white"
                />
              </div>
              {isEmailValid === false && (
                <p className="text-red-primary ml-1">
                  Please enter a valid email address
                </p>
              )}

              <div className="mt-4 flex justify-center items-center">
                <select
                  name="country_code_id"
                  onChange={onChange}
                  className="bg-bg-secondary focus-within:bg-bg-primary cursor-pointer py-3 px-1 text-lg rounded-lg outline-none"
                >
                  {countryCodes.map((country) =>
                    country.country_code_id === 10 ? (
                      <option value={country.country_code_id} selected>
                        +{country.code_no}
                      </option>
                    ) : (
                      <option value={country.country_code_id}>
                        +{country.code_no}
                      </option>
                    )
                  )}
                </select>

                <input
                  type="tel"
                  name="phone_no"
                  placeholder="Phone No."
                  onChange={onChange}
                  className="p-3 ml-2 rounded-lg outline-none text-xl bg-bg-secondary placeholder-white max-w-[15vw]"
                />
              </div>
              {isPhoneNoValid === false && (
                <p className="text-red-primary ml-1">
                  Please enter a valid phone no.
                </p>
              )}

              <div className="my-4">
                <div className="flex justify-center items-center">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    id="password"
                    onChange={onChange}
                    className="p-3 rounded-lg outline-none text-xl bg-bg-secondary placeholder-white"
                  />
                </div>
                <div>
                  <input
                    type="checkbox"
                    name="toggle-visibility"
                    className="mr-2 mt-4"
                    onClick={togglePasswordVisibility}
                  />
                  Show Password
                </div>
              </div>
              {isPasswordValid === false && (
                <p className="text-red-primary ml-1">
                  Password has to be between 8 and 15 characters
                </p>
              )}

              {isValidUser === false && (
                <p className="text-red-primary ml-1">
                  Hmm... This user already exists
                </p>
              )}

              {isSignupSuccess === false && (
                <p className="text-red-primary ml-1">
                  Uh-oh! Unable to sign up. Please try again :(
                </p>
              )}

              <Button text="Sign Up" />
            </form>
          </div>
          <p className="text-center text-lg mb-8">
            Already have an account?&nbsp;
            <Link to={"/login"}>
              <span className="text-red-primary hover:text-white">Log In</span>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
