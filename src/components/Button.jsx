import React from "react";

export default function Button(props) {
  return (
    <button className="py-2.5 px-4 bg-red-secondary rounded-lg cursor-pointer border border-1 border-red-dark hover:border-red-secondary hover:bg-transparent transition-all duration-200">
      {props.text}
    </button>
  )
}
