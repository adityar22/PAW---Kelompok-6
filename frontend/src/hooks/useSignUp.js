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
        const user = await response.json();
        
        if (response.ok) {
            // use local storage to save email and JWT token
            localStorage.setItem('user', JSON.stringify(user));
            dispatch({ type: 'LOGIN', payload: user });
            setIsPending(false);
            // setError('Sign up success!');
            return {
                isError: false,
                message: 'Sign Up Success!'
            }
        }

        if (!response.ok) {
            // setError(data.error);
            setIsPending(false);
            return {
                isError: true,
                message: user.error
            }
        }

    }

    return { signup, isPending, error };
}