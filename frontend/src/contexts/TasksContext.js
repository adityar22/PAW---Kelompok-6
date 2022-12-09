import { createContext, useReducer } from 'react';

export const TasksContext = createContext();

export const tasksReducer = (state, action) => {
    switch (action.type) {
        case 'GET_TASKS':
            return {
                tasks: action.payload
            }
        case 'ADD_TASK':
            return {
                tasks: [action.payload, ...state.tasks]
            }
        case 'EDIT_TASK':
            return {
                tasks: state.tasks.map((item) => { return item._id !== action.payload._id ? item : action.payload })
            }
        case 'DELETE_TASK':
            return {
                tasks: state.tasks.filter((item) => { return item._id !== action.payload._id })
            }
        default:
            return state
    }
}

const TasksContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(tasksReducer, {
        tasks: null
    })

    return (
        <TasksContext.Provider value={{ ...state, dispatch }}>
            {children}
        </TasksContext.Provider>
    );
}

export default TasksContextProvider;