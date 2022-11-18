import { useAuthContext } from "./useAuthContext";
import { useState } from "react";

export const useSignUp = () => {
    const { dispatch } = useAuthContext();
    const [isPending, setIsPending] = useState(null);
    const [error, setError] = useState("");
    const url = '/api/user/signup';

    const signup = async (email, username, password) => {
        setIsPending(true);
        setError('');

        console.log(email, username, password);

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ email, username, password })
        });
        const data = await response.json();
        
        if (response.ok) {
            // use local storage to save email and JWT token
            localStorage.setItem('user', JSON.stringify(data));
            dispatch({ type: 'LOGIN', payload: data });
            setIsPending(false);
            setError('Sign up success!');
        }

        if (!response.ok) {
            setError(data.error);
            setIsPending(false);
        }

    }

    return { signup, isPending, error };
}