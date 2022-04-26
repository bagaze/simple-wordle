import { useState, useEffect } from "react";

export function useStateWithLocalStorage(localStorageKey, initialValue) {
    const [ value, setValue ] = useState(JSON.parse(localStorage.getItem(localStorageKey)) || initialValue);

    useEffect( () => {
        localStorage.setItem(localStorageKey, JSON.stringify(value));
    }, [value, localStorageKey]);
    return [ value, setValue ];
}
