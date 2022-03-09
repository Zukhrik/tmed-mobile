import {useCallback, useEffect, useState} from "react";

export function useOutsideClicker(ref) {
    const [clicked, setClicked] = useState(false)

    const handleClickOutside = useCallback((event) => {
        if (ref && ref.current && !ref.current.contains(event.target)) {
            setClicked(true)
        } else {
            setClicked(false)
        }
    }, [ref])

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [handleClickOutside]);

    return {clicked}
}