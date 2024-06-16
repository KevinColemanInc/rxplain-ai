import { useRef, useState } from "react";
import clsx from "clsx";
import { useOutsideClick } from "./useClickOutSide.js";

export default function DropdownButton({ onCopy }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();

  useOutsideClick([dropdownRef], () => {
    setShowDropdown(false);
  });

  return (
    <span className="relative">
      <button
        id="dropdownMenuIconButton"
        data-dropdown-toggle="dropdownDots"
        data-dropdown-placement="bottom-start"
        className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-600"
        onClick={() => setShowDropdown(!showDropdown)}
        type="button"
      >
        <svg
          className="w-4 h-4 text-gray-500 dark:text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 4 15"
        >
          <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
        </svg>
      </button>
      <div
        ref={dropdownRef}
        className={clsx(
          "z-10 absolute top-[calc(100%+0.5rem)] bg-white right-0 divide-y divide-gray-100 rounded-lg shadow w-44",
          {
            hidden: !showDropdown,
          },
        )}
      >
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownDefaultButton"
        >
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Reply
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Forward
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Report
            </a>
          </li>
          <li>
            <a
              href="#"
              role="button"
              onClick={() => {
                onCopy();
                setShowDropdown(false);
              }}
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Copy
            </a>
          </li>

          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-red-500 hover:text-white text-red-500"
            >
              Delete
            </a>
          </li>
        </ul>
      </div>
    </span>
  );
}
