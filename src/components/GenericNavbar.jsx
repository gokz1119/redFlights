import React from "react";
import { Link } from "react-router-dom";

export default function GenericNavbar() {
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
    </div>
  );
}
