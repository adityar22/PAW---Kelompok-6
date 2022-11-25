import { createContext, useReducer, useEffect, useState } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
    switch (action.type){
        case 'LOGIN':
            return {
                user: action.payload
            }
        case 'LOGOUT':
            return {
                user: null
            }
        case 'EDIT_USER':
            return {
                user: action.payload
            }
        default:
            return state
    }
}

const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    });

    console.log("context")
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState("");
    const setLoading = (state) => {
        setIsPending(state);
    }
    // method to check whether user has already stored in localStorage or not
    // if yes, use it instead of re-login through login form

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if(user) dispatch({type: 'LOGIN', payload: user});
    },[]);

    return (
        <AuthContext.Provider value={{...state, dispatch, isPending, error, setLoading, setError}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;