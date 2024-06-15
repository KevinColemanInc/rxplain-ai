import { useState } from "react";

function FilterButton({ label }) {
  const [isVisible, setIsVisible] = useState(true);
  if (!isVisible) return null;
  return (
    <div className="p-2 flex flex-row justify-center flex-shrink-0">
      <button
        onClick={() => setIsVisible(false)}
        className="text-gray-500 hover:bg-slate-700 hover:text-white rounded-full flex items-center justify-center bg-slate-200"
      >
        {label} &times;
      </button>
    </div>
  );
}

export default FilterButton;
