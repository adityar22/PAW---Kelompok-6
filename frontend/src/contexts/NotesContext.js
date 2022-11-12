import { createContext, useReducer, useState } from "react";

export const NotesContext = createContext();

export const notesReducer = (state, action) => {
    switch (action.type){
        case 'GET_NOTES':
            return {
                notes: action.payload
            }
        case 'ADD_NOTES':
            return {
                notes: [action.payload, ...state.notes]
            }
        default:
            return state
    }
}

const NotesContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(notesReducer, {
        notes: null
    })

    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState("");
    
    const setLoading = (state) => {
        setIsPending(state);
    }

    return ( 
        <NotesContext.Provider value={{...state, dispatch, isPending, error, setLoading, setError}}>
            {children}
        </NotesContext.Provider>
     );
}
 
export default NotesContextProvider;


