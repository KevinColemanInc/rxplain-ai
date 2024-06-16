import { useEffect } from "react";

export function useOutsideClick(refs, callback) {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        refs &&
        refs.length &&
        refs.every((ref) => ref.current && !ref.current.contains(event.target))
      ) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [refs, callback]);
}
