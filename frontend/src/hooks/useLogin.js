import { useAuthContext } from "./useAuthContext";
import { useState } from "react";

export const useLogin = () => {
    const { dispatch } = useAuthContext();
    const [isPending, setIsPending] = useState(null);
    const [error, setError] = useState("");
    const url = '/api/user/login';

    const login = async (email, password) => {
        setIsPending(true);
        setError('');

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            // use local storage to save email and JWT token
            localStorage.setItem('user', JSON.stringify(data));
            dispatch({ type: 'LOGIN', payload: data });
            setIsPending(false);
            setError('Log in success!');
        }

        if (!response.ok) {
            setError(data.error);
            setIsPending(false);
        }

    }

    return { login, isPending, error };
}