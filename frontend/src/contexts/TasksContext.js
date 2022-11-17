import{createContext, useReducer,useState} from 'react';

export const TasksContext = createContext();

export const tasksReducer = (state, action)=>{
    switch(action.type){
        case 'GET_TASKS':
            return{
                tasks: action.payload
            }
        case 'ADD_TASK':
            return{
                tasks: [action.payload, ...state.tasks]
            }
        default:
            return state
    }
}

const TasksContextProvider = ({children})=>{
    const [state,dispatch]=useReducer(tasksReducer,{
        tasks:null
    })
    const [isPending, setIsPending]=useState(true);
    const [error, setError]=useState("");
    const setLoading = (state)=>{
        setIsPending(state);
    }

    return(
        <TasksContext.Provider value={{...state, dispatch, isPending, error, setLoading, setError}}>
            {children}
        </TasksContext.Provider>
    );
}

export default TasksContextProvider;