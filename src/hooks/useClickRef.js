import { useEffect, useRef } from "react";

export function useClickRef(close, listenCapturing = true) {
  const modalRef = useRef();

  useEffect(() => {
    function handleClick(e) {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        close();
      }
    }
    document.addEventListener("click", handleClick, listenCapturing);

    return () => {
      document.removeEventListener("click", handleClick, listenCapturing);
    };
  }, [close, listenCapturing]);

  return modalRef;
}
