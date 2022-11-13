import { tasksReducer } from "../contexts/TasksContext";

const TaskList = ({task}) => {
    return (
        <div>
            <tr key={task._id}>
                <td>{task.taskName}</td>
                <td>{task.taskStat}</td>
                <td>{task.taskPriority}</td>
                <td>{task.taskTime}</td>
                <td>
                    
                </td>
            </tr>
        </div>
    );
}
 
export default TaskList;