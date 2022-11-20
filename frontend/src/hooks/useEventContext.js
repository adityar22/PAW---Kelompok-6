import { useContext } from "react";
import { EventContext } from "../contexts/EventContext";

export const useEventContext=()=>{
    const context = useContext(EventContext);

    if(!context){
        throw Error('Something bad occured on useEventContext 😟')
    };

    return context;
}