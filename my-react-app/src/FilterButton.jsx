import { useState } from 'react'

function FilterButton() {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    
  
    return (
      <>
        <div className="inline-flex items-center bg-blue-500 text-white font-bold py-2 px-4 rounded">
          <span>Filter</span>
          <button
            onClick={() => setIsVisible(false)}
            className="ml-2 text-white bg-transparent hover:bg-red-500 rounded-full w-6 h-6 flex items-center justify-center"
          >
            &times;
          </button>
        </div>
      </>
    );
  }

export default FilterButton
