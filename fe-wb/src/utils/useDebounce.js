import { useState, useRef } from "react";

const useDebounce = (init, fn) => {
  const [state, setState] = useState(init);
  const typingTimeOut = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
    if (!fn) return;

    if (typingTimeOut.current) clearTimeout(typingTimeOut.current);

    typingTimeOut.current = setTimeout(() => {
      fn({ name, value });
    }, 500);
  };

  return { state, handleChange };
};

export default useDebounce;
