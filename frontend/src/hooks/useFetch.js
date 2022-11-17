import { useEffect } from "react";
import { useAuthContext } from "./useAuthContext";

const useFetch = ({ url, type, dispatch, setError, setLoading }) => {

    const { user } = useAuthContext();

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch(url, {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                const json = await response.json();

                if (response.ok) {
                    dispatch({ type, payload: json });
                    setLoading(false);
                    setError(null);
                }
            }
            catch (err) {
                setLoading(false);
                setError(err);
            }
        }
        getData();
    }, [dispatch]);
}

export default useFetch;

