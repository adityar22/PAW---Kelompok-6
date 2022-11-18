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

        const user = await response.json();

        if (response.ok) {
            // use local storage to save email and JWT token
            localStorage.setItem('user', JSON.stringify(user));
            dispatch({ type: 'LOGIN', payload: user });
            setIsPending(false);
            setError('Log in success!');
        }

        if (!response.ok) {
            setError(user.error);
            setIsPending(false);
        }

    }

    return { login, isPending, error };
}