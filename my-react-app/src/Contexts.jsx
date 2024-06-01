import React, { useState } from 'react'
import FilterButton from './FilterButton'

function Context() {
  const [inputVal, setInputVal] = useState('');
  const [filters, setFilters] = useState([]);

  const inputChange = (input) => {
    setInputVal(input.target.value);
  };


  const submit = (input) => {
    input.preventDefault();
    if (inputVal.trim() !== '') {
      setInputVal('');
    }
    console.log(inputVal)
  };

  return (
    <>
    <div className = "contexts-container">
      <div className = "filters-area">
        <FilterButton/>
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
          done!
         </button>
        </form>
      </div>
    </div>


    </>
  )
}

export default Context
