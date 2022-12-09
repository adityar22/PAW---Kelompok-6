
import { useAuthContext } from "./useAuthContext";

export const useHandleUpdateUser = ({updateUser, dispatch, setLoading, setError, notify, setShowModal3 }) => {
    const {user} = useAuthContext();
    
    const update = async () =>{
    
        if (!user) {
            return;
        }
    
        setLoading(true);
        const response = await fetch('/api/user/profile/' + user.id, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updateUser)
        });
    
        const json = await response.json();

        if (json.success) {
            setLoading(false);
            localStorage.setItem('user', JSON.stringify(json.data));
            dispatch({ type: 'EDIT_USER', payload: json.data });
            notify.info(json.message);
        }
        if (!json.success) {
            setLoading(false);
            setError(json.error);
            notify.error(json.error);
        }
        setLoading(false);
        setShowModal3(false);
    }

    const handleUpdateUser = async (e) => {
        e.stopPropagation();
        e.preventDefault();
        await update();
    }

    return{update, handleUpdateUser}
}
