import { useAuthContext } from "./useAuthContext";
import { useNotesContext } from "./useNotesContext";

export const useLogout = () => {
    const { dispatch: authDispatch } = useAuthContext();
    const { dispatch: notesDispatch } = useNotesContext();

    const logout = () => {
        // remove user from localStorage
        localStorage.removeItem('user');

        authDispatch({ type: 'LOGOUT' });
        notesDispatch({ type: 'GET_NOTES', payload: null })
    }

    return { logout };
} 