
import { useAuthContext } from "./useAuthContext";
import { useNotesContext } from "./useNotesContext";

export const useHandleUpdate = (note, updatedNote, setLoading, setError, notify, closeDetailPopup) => {
    const { user } = useAuthContext();
    const { dispatch } = useNotesContext();

    const update = async (isOpen) => {
        if (!user) {
            return;
        }

        setLoading(true);

        const response = await fetch('/api/notes/' + note._id, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(updatedNote)
        });

        const json = await response.json();

        if (response.ok) {
            closeDetailPopup();
            setLoading(false);
            dispatch({ type: 'EDIT_NOTES', payload: json.data });
            notify.info(json.message);
        }
        if (!response.ok) {
            setLoading(false);
            // setError(json.error);
            notify.error(json.error);
        }
    }

    const handleUpdate = async (e) => {
        await update();
    }

    return {update, handleUpdate};
}