import { createContext, useReducer, useState } from "react";

export const EventContext = createContext();

export const eventReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_EVENT':
            return {
                ...state,
                events: action.payload,
            }
        case 'GET_EVENTS':
            return {
                ...state,
                events: action.payload,
            }
        default:
            return state
    }
}

const EventContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(eventReducer, {
        events: null
    })

    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState("");

    const setLoading = (state) => {
        setIsPending(state);
    }

    return (
        <EventContext.Provider value={{ ...state, dispatch, isPending, error, setLoading, setError }}>
            {children}
        </EventContext.Provider>
    );
}

export default EventContextProvider;