import { useEffect, useState } from "react";

const useDebounce = (values: string, delay = 2000) => {
    const [debounced, setDebounced] = useState(values);
    useEffect(() => {
        const id = setTimeout(() => {
            setDebounced(values);
        }, delay);
        return (() => clearTimeout(id));
    }, [values, delay]);
    return debounced;
}

export default useDebounce;