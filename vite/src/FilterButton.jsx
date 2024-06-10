import { useState } from 'react'

function FilterButton({ label }) {
    const [isVisible, setIsVisible] = useState(true);
    if (!isVisible) return null;
    return (
      <>
        <div className="filters-area">
          <button
            onClick={() => setIsVisible(false)}
            className="ml-2 text-white hover:bg-red-500 rounded-full w-4 h-4 flex items-center justify-center btn-filter"
          >
            {label} &times;
          </button>
        </div>
      </>
    );
  }

export default FilterButton
