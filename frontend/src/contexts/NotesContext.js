import { createContext, useReducer } from "react";

export const NotesContext = createContext();

export const notesReducer = (state, action) => {
    switch (action.type) {
        case 'GET_NOTES':
            return {
                notes: action.payload
            }
        case 'ADD_NOTES':
            return {
                notes: [action.payload, ...state.notes]
            }
        case 'EDIT_NOTES':
            return {
                notes: state.notes.map((item) => {return item._id !== action.payload._id ? item : action.payload}).sort((a, b) => {return Number(b.isPinned) - Number(a.isPinned)})
            }
        case 'DELETE_NOTES':
            return {
                notes: state.notes.filter((item) => { return item._id !== action.payload._id })
            }
        default:
            return state
    }
}

const NotesContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(notesReducer, {
        notes: null
    })

    return (
        <NotesContext.Provider value={{ ...state, dispatch}}>
            {children}
        </NotesContext.Provider>
    );
}

export default NotesContextProvider;


