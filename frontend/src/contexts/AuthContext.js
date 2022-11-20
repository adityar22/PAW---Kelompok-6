import { createContext, useReducer, useEffect } from "react";

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
        default:
            return state
    }
}

const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    });

    // method to check whether user has already stored in localStorage or not
    // if yes, use it instead of re-login through login form

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if(user) dispatch({type: 'LOGIN', payload: user});
    },[]);

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;