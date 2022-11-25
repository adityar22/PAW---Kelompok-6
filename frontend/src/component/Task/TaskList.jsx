import { useState } from "react";
import TaskDetail from "./TaskDetail";
import { format } from 'date-fns';

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
                <td className="py-3 bg-white-800 p-3 text-sm font-semibold tracking-wide hidden sm:inline-block">{task.taskStat}</td>
                <td className="py-3 bg-white-800 p-3 text-sm font-semibold tracking-wide hidden sm:inline-block">{task.taskPriority}</td>
                <td className="py-3 bg-white-800 p-3 text-sm font-semibold tracking-wide">{format(new Date(task.taskTime), 'MM/dd/yyyy')}</td>
                <td className="py-3 bg-white-800 p-3 text-sm font-semibold tracking-wide">
                    <p onClick={togglePopup} className="cursor-pointer text-orange hover:text-yellow-300">Open</p>
                </td>
            </tr>
        </>
    );
}

export default TaskList;