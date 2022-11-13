import { useContext } from "react";
import { TasksContext } from "../contexts/TasksContext";

export const useTasksContext=()=>{
    const context = useContext(TasksContext);

    if(!context){
        throw Error('Something bad occured on useNotesContext 😟')
    };

    return context;
}