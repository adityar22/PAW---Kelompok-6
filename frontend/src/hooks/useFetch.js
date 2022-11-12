import { useEffect } from "react";

const useFetch = ({url, dispatch, setError, setLoading}) => {
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch(url);
                const data = await response.json();
        
                if (response.ok) {
                    dispatch({ type: 'GET_NOTES', payload: data });
                    setLoading(false);
                    setError(null);
                }
            }
            catch (err) {
                setLoading(true);
                setError(err);
            }
        }
        getData();
    }, [url]);
}

export default useFetch;

