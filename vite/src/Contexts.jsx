import React, { useState } from "react";
import FilterButton from "./FilterButton";
import "./Contexts.css";

function Context({ filters, setFilters }) {
  const [inputVal, setInputVal] = useState("");

  const inputChange = (input) => {
    setInputVal(input.target.value);
  };

  const submit = (input) => {
    input.preventDefault();
    if (inputVal.trim() !== "") {
      setFilters([...filters, inputVal]);
      setInputVal("");
    }
    console.log("Context.submit", inputVal);
  };

  return (
    <>
      <div className="contexts-container">
        <div className="filters-area">
          {filters.map((filter, index) => (
            <FilterButton key={index} label={filter} />
          ))}
        </div>
        <div className="input-area">
          <form onSubmit={submit} className="input-form">
            <input
              type="text"
              value={inputVal}
              onChange={inputChange}
              placeholder="Tell us about yourself to give us context to frame our answers..."
              className="input-field"
            />
            <button type="submit" className="send-button">
              ↑
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Context;
