
import { useAuthContext } from "./useAuthContext";

export const useHandleDeleteUser = ({logout, dispatch, setLoading, setError, notify }) => {
    const {user} = useAuthContext();
    
    const remove = async () =>{
    
        if (!user) {
            return;
        }

        setLoading(true);
        const response = await fetch('/api/user/profile/' + user.id, {
            method: 'DELETE'
        });

        const json = await response.json();

        if (json.success) {
            setLoading(false);
            setError(null);
            localStorage.removeItem('user');
            dispatch({ type: 'DELETE_USER', payload: json.data });
            notify.info(json.message);
        }
        if (!json.success) {
            setLoading(false);
            setError(json.error);
            notify.error(json.error);
        }
        logout();
    }
    
    const handleDeleteUser = async (e) => {
        e.stopPropagation();
        e.preventDefault();
        await remove();
    }

    return{remove, handleDeleteUser};
}