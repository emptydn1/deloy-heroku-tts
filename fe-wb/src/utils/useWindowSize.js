import { useState, useEffect } from "react";

const getBreakPoint = (windowWidth) => {
  if (windowWidth) {
    if (windowWidth < 600) {
      return "xs";
    } else if (windowWidth < 960) {
      return "sm";
    } else if (windowWidth < 1280) {
      return "md";
    } else if (windowWidth < 1920) {
      return "lg";
    } else {
      return "xl";
    }
  } else {
    return undefined;
  }
};

const useWindowSize = () => {
  const isWindowClient = typeof window === "object";

  const [windowSize, setWindowSize] = useState(
    isWindowClient ? getBreakPoint(window.innerWidth) : undefined
  );

  const setSize = () => {
    setWindowSize(getBreakPoint(window.innerWidth));
  };

  useEffect(() => {
    window.addEventListener("resize", setSize);

    return () => {
      window.removeEventListener("resize", setSize);
    };
  }, [setWindowSize]);

  return windowSize;
};

export default useWindowSize;
