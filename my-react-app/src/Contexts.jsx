import React, { useState } from 'react'

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
      <div className='context-container py-4 px-6 flex justify-center items-center w-full fixed top-0 left-0 z-50'>
        <div className='flex items-center space-x-4 w-full max-w-screen-lg'>  {/*textbox w submit button*/} 
          <input
            type = "text"
            value = {inputVal}
            onChange = {inputChange}
            className='rounded-full py-2 px-4 bg-gray-800 border-none focus:outline-none focus:ring-2 focus:ring-blue-500 w-full'
            placeholder = "tell us about you!"
          />
          <button
            onClick={submit}
            className='bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
          im done!
        </button>
        </div>

        <div>  {/*textbox w submit button*/}

        </div>
      </div>
    </>
  )
}

export default Context
