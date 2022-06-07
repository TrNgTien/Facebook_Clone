import { useEffect, useState } from "react";
export default function useClickOutSide(ref: any) {
  const [isClickOutside, setIsClickOutside] = useState(false);
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsClickOutside(true);
      } else {
        setIsClickOutside(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
  return isClickOutside;
}
