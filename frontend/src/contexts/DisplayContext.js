import { createContext} from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const DisplayContext = createContext();

const DisplayContextProvider = ({ children }) => {

    const notify = {
        info: (msg) => {
            toast.info(msg, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        },
        error: (msg) => {
            toast.error(msg, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

    return (
        <DisplayContext.Provider value={{notify}}>
            {children}
        </DisplayContext.Provider>
    )
}

export default DisplayContextProvider;