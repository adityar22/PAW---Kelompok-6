import { useEffect } from "react";
import { useAuthContext } from "./useAuthContext";

const useFetch = ({ url, type, dispatch, setError, setLoading }) => {

    const { user } = useAuthContext();

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch(url, {
                    headers: {
                        'authorization': `Bearer ${user.token}`
                    }
                });
                const data = await response.json();

                if (response.ok) {
                    dispatch({ type, payload: data });
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

