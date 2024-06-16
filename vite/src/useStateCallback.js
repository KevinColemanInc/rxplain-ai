import { useEffect, useRef, useState } from "react";

export function useStateCallback(initialValue) {
  const callbackRef = useRef();
  const [state, setState] = useState(initialValue);

  useEffect(() => {
    if (callbackRef.current) {
      callbackRef.current(state);
      callbackRef.current = undefined;
    }
  }, [state]);

  return [
    state,
    (value, callback) => {
      callbackRef.current = callback;
      setState(value);
    },
  ];
}
