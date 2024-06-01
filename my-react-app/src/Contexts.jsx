import React, { useState } from 'react'
import FilterButton from './FilterButton'
import './Contexts.css'

function Context() {
  const [inputVal, setInputVal] = useState('');
  const [filters, setFilters] = useState([]);

  const inputChange = (input) => {
    setInputVal(input.target.value);
  };


  const submit = (input) => {
    input.preventDefault();
    if (inputVal.trim() !== '') {
      setFilters([...filters, inputVal]);
      setInputVal('');
    }
    console.log(inputVal)
  };

  return (
    <>
    <div className = "contexts-container">
      <div className = "filters-area">
        {filters.map((filter, index) => (
          <FilterButton key = {index} label={filter}/>
        ))}
      </div>
      <div className="input-area">
        <form onSubmit={submit} className="input-form">
          <input
            type="text"
            value={inputVal}
            onChange={inputChange}
            placeholder="Tell us about yourself..."
            className="input-field"
          />
          <button type="submit" className="send-button">
            ↑
          </button>
        </form>
      </div>
    </div>


    </>
  )
}

export default Context
