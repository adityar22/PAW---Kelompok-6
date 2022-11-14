import { tasksReducer } from "../contexts/TasksContext";

const TaskList = ({ task }) => {
    return (
        <tr key={task._id} className="">
            <td className="py-3 bg-white-800 p-3 text-sm font-semibold tracking-wide">{task.taskName}</td>
            <td className="py-3 bg-white-800 p-3 text-sm font-semibold tracking-wide">{task.taskStat}</td>
            <td className="py-3 bg-white-800 p-3 text-sm font-semibold tracking-wide">{task.taskPriority}</td>
            <td className="py-3 bg-white-800 p-3 text-sm font-semibold tracking-wide">{task.taskTime}</td>
            <td className="py-3 bg-white-800 p-3 text-sm font-semibold tracking-wide">
                
            </td>
        </tr>
    );
}

export default TaskList;