import { useState } from "react";

function FilterButton({ label }) {
  const [isVisible, setIsVisible] = useState(true);
  if (!isVisible) return null;
  return (
    <div className="filters-area">
      <button
        onClick={() => setIsVisible(false)}
        className="text-gray-500 hover:bg-red-500 hover:text-white rounded-full flex items-center justify-center btn-filter"
      >
        {label} &times;
      </button>
    </div>
  );
}

export default FilterButton;
