import { useEffect, useRef, useState } from "react";

export default function useOutsideClick(initialIsOpen:boolean) {
  const [isOpen, setIsOpen] = useState(initialIsOpen)
  const ref = useRef(null)
  const handleClickOutside = (event:MouseEvent) => {
    if (ref.current && !(ref.current as any).contains(event.target)){
      setIsOpen(false)
    }
  }  

  useEffect(()=>{
    document.addEventListener('click', handleClickOutside, true)
    return()=> {
      document.removeEventListener('click', handleClickOutside, true)
    }
  },[])
  return {ref, isOpen, setIsOpen}
};
