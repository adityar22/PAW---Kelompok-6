import { useAuthContext } from "./useAuthContext";

export const useHandleUpdateUser = (user, updatedUser, setLoading, setError, notify, closeDetailPopup) => {
    const { dispatch } = useAuthContext();

    const update = async (isOpen) => {
        if (!user) {
            return;
        }

        setLoading(true);

        const response = await fetch('/api/profile/' + user._id, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(updatedUser)
        });

        const json = await response.json();

        if (response.ok) {
            closeDetailPopup();
            setLoading(false);
            dispatch({ type: 'EDIT_USER', payload: json.data });
            notify.info(json.message);
        }
        if (!response.ok) {
            setLoading(false);
            // setError(json.error);
            notify.error(json.error);
        }
    }

    const handleUpdateUser = async (e) => {
        await update();
    }

    return {update, handleUpdateUser};
}