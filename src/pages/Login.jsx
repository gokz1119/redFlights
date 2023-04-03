import React, { useState } from "react";
import Button from "../components/Button";
import aircraftImg from "../assets/aircraft.svg";
import { Link, useNavigate } from "react-router-dom";
import GenericNavbar from "../components/GenericNavbar";
import axios from "axios";
import cookies from "js-cookie";

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordEntered, setIsPasswordEntered] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  const togglePasswordVisibility = () => {
    let x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };
  const onChange = (e) => {
    setCredentials((cred) => ({ ...cred, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(credentials.email)
    ) {
      setIsEmailValid(true);
      if (credentials.password.length) {
        setIsPasswordEntered(true);
      } else {
        setIsPasswordEntered(false);
        return;
      }
      const loginUrl = "http://localhost:3000/api/login";
      axios
        .post(loginUrl, credentials)
        .then((response) => {
          console.log(response.data);
          if (response.data.token) {
            setIsLoggedIn(true);
            cookies.set("auth", response.data.token, { path: "/" });
            navigate("/");
          } else {
            setIsLoggedIn(false);
          }
        })
        .catch((err) => console.log(err));
    } else {
      setIsEmailValid(false);
    }
  };

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
        <div className="min-w-[27vw] bg-red-dark mx-7 rounded-xl shadow-2xl">
          <div className="p-4 flex flex-col items-center justify-center">
            <h1 className="text-3xl m-3 mb-5 font-normal">
              Login to{" "}
              <span className="font-semibold">
                red<span className="text-red-primary">Flights</span>
              </span>
            </h1>
            <form action="" className="flex flex-col" onSubmit={onSubmit}>
              <div className="flex justify-between items-center">
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  onChange={onChange}
                  className="p-3 rounded-lg outline-none text-xl bg-bg-secondary placeholder-white"
                />
              </div>
              {!isEmailValid && (
                <p className="text-red-primary ml-1">
                  Please enter a valid email
                </p>
              )}

              <div className="my-4">
                <div className="flex justify-between items-center">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
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
                {!isPasswordEntered && (
                  <p className="text-red-primary ml-1">
                    Please enter your password
                  </p>
                )}
                {isLoggedIn === false && (
                  <p className="text-red-primary ml-1">
                    Invalid email/password
                  </p>
                )}
              </div>

              <Button text="Log In" type="1" />
            </form>
          </div>
          <p className="text-center text-lg mb-8">
            Don't have an account?&nbsp;
            <Link to={"/signup"}>
              <span className="text-red-primary hover:text-white">Sign Up</span>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
