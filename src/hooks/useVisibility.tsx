import { useState, useCallback } from "react";

const useVisibility = (initialVisible = false) => {
  const [isVisible, setIsVisible] = useState(initialVisible);

  const show = useCallback(() => setIsVisible(true), []);
  const hide = useCallback(() => setIsVisible(false), []);
  const toggle = useCallback(
    () => setIsVisible((prevVisible) => !prevVisible),
    []
  );

  return { isVisible, show, hide, toggle };
};

export default useVisibility;
