import { useState } from "react";
import FilterButton from "./FilterButton";

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
    <div className="flex flex-col items-center max-w-screen-2xl border border-gray-300 rounded-lg justify-center bg-white w-full md:w-6/12 p-2">
      {filters.length > 0 ? (
        <div className="w-full py-2 overflow-x-auto flex flex-row items-start justify-start">
          {filters.map((filter, index) => (
            <FilterButton key={index} label={filter} />
          ))}
        </div>
      ) : null}
      <div className="flex-1 outline-none m-2 rounded w-full mb-0">
        <form
          onSubmit={submit}
          className="flex items-center bg-gray-100 space-x-4 justify-between m-2 p-2 rounded-lg"
        >
          <input
            type="text"
            value={inputVal}
            onChange={inputChange}
            placeholder="Tell us about yourself to give us context to frame our answers..."
            className="flex-1 bg-transparent outline-none p-2 w-auto"
          />
          <button
            type="submit"
            className="bg-gray-400 text-white p-2 w-10 rounded-full m-1 ml-3 hover:bg-violet-600 active:bg-violet-700"
          >
            ↑
          </button>
        </form>
      </div>
    </div>
  );
}

export default Context;
