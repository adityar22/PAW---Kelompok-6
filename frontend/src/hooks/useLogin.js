import { useAuthContext } from "./useAuthContext";
import { useState } from "react";

export const useLogin = ({setError, setLoading}) => {
    const { dispatch } = useAuthContext();
    const [isPending, setIsPending] = useState(null);
    const url = '/api/user/login';

    const login = async (email, password) => {
        setIsPending(true);

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const user = await response.json();

        if (user.success) {
            // use local storage to save email and JWT token
            localStorage.setItem('user', JSON.stringify(user.data));
            dispatch({ type: 'LOGIN', payload: user.data });
            setLoading(false);
            return {
                isError: false,
                message: 'Login success!'
            }
        }

        if (!user.success) {
            setLoading(false);
            return {
                isError: true,
                message: user.error
            }
        }

    }

    return { login, isPending};
}