import React from "react";
import Button from "./Button";
import { Link } from "react-router-dom";
import cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function NavbarLanding() {
  const navigate = useNavigate();
  const handleSignOut = (e) => {
    e.preventDefault();

    cookies.remove("auth");
    navigate("/");
  };

  return (
    <div className="fixed top-0 left-0 w-[100vw] h-20 bg-red-dark shadow-3xl flex items-center justify-between">
      <Link to={"/"}>
        <div className="flex items-center mx-10">
          <img src="/favicon.png" alt="" width={"30px"} height={"30px"} />
          <h1 className="text-3xl mx-3 font-semibold">
            red<span className="text-red-secondary">Flights</span>
          </h1>
        </div>
      </Link>
      {cookies.get("auth") ? (
        <div className="mx-6 my-4" onClick={handleSignOut}>
          <Button text="Sign Out" />
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <div className="mx-3 my-4 ">
            <Link to={"/login"}>
              <Button text="Log In" />
            </Link>
          </div>
          <div className="mr-10 my-4 ">
            <Link to={"/signup"}>
              <Button text="Sign Up" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
