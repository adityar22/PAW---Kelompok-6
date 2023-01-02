
import { useAuthContext } from "./useAuthContext";

export const useHandleUpdate = ({url, data, updatedData, type, dispatch, setLoading, setError, notify, closeDetailPopup}) => {
    const { user } = useAuthContext();

    const update = async () => {
        if (!user) {
            notify.info('You must be logged in');
            return;
        }

        setLoading(true);

        const response = await fetch(url + data._id, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(updatedData)
        });

        const json = await response.json();

        if (json.success) {
            closeDetailPopup();
            setLoading(false);
            setError(null);
            dispatch({ type: type, payload: json.data });
            notify.info(json.message);
        }
        if (!json.success) {
            setLoading(false);
            setError(json.error);
            notify.error(json.error);
        }
    }

    const handleUpdate = async (e) => {
        e.stopPropagation();
        e.preventDefault();
        await update();
    }

    return {update, handleUpdate};
}