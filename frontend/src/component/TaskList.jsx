import { useState } from "react";
import { tasksReducer } from "../contexts/TasksContext";
import TaskDetail from "./TaskDetail";

const TaskList = ({ task, notify, setLoading, setError }) => {
    const [popup, setPopup] = useState(false);
    const togglePopup = () => {
        setPopup(!popup);
    }
    return (
        <>
            {popup && <TaskDetail togglePopup={togglePopup} task={task} notify={notify} setLoading={setLoading} setError={setError} />}
            <tr key={task._id} className="">
                <td className="py-3 bg-white-800 p-3 text-sm font-semibold tracking-wide">{task.taskName}</td>
                <td className="py-3 bg-white-800 p-3 text-sm font-semibold tracking-wide">{task.taskStat}</td>
                <td className="py-3 bg-white-800 p-3 text-sm font-semibold tracking-wide">{task.taskPriority}</td>
                <td className="py-3 bg-white-800 p-3 text-sm font-semibold tracking-wide">{task.taskTime}</td>
                <td className="py-3 bg-white-800 p-3 text-sm font-semibold tracking-wide">
                    <p onClick={togglePopup} className="cursor-pointer text-orange hover:text-yellow-300">Open</p>
                </td>
            </tr>
        </>
    );
}

export default TaskList;