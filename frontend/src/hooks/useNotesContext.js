import { useContext } from "react";
import { NotesContext } from "../contexts/NotesContext";

export const useNotesContext = () => {
    const context = useContext(NotesContext);

    if (!context) {
        throw Error('Something bad occured on useNotesContext 😟')
    };

    return context;
}