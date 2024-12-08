import { useCallback, useEffect, useRef, useState } from "react";

export default function UseComponentVisibility() {
    const [isVisible, setVisibility] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const escapeKey = useCallback((e: KeyboardEvent) => {
        if (e.key === "Escape") {
            setVisibility(false);
          }
    }, [])

    const outsideClick = useCallback((e: MouseEvent) => {
      if (ref.current && e.target && !ref.current.contains(e.target as Node)) {
        setVisibility(false);
      }
    }, [])
    
    useEffect(() => {
        document.addEventListener('click', outsideClick, true);
        document.addEventListener("keydown", escapeKey, false);
        return () => {
            document.removeEventListener('click', outsideClick, true);
            document.removeEventListener("keydown", escapeKey, false);
        };
    }, [escapeKey, outsideClick])
    return { ref, isVisible, setVisibility}
}