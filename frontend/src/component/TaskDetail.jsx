import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useTasksContext } from "../hooks/useTasksContext";

const TaskDetail = ({task, togglePopup, setLoading, url, setError }) => {
    const { dispatch } = useTasksContext();
    const { user } = useAuthContext();

    const [taskName, setTaskName] = useState(task.taskName);
    const [taskDescription, setTaskDescription] = useState(task.taskDescription);
    const [taskPriority, setTaskPriority] = useState("");
    const [taskStat, setTaskStat] = useState("Not Started");
    const [taskTime, setTaskTime] = useState("");

    const handleSubmit = () => {

    }

    return (
        <div>
            <div className="overlay z-10"></div>
            <div className="container w-fit mx-auto absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hover:scale-105 transition-all duration-700">
                <form className="create w-screen max-w-xl mx-8 bg-white shadow-xl rounded-3xl px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                    <button className="button absolute bg-red-500 border-red-700 -top-4 right-4 hover:bg-red-700" onClick={togglePopup}>x</button>
                    <div className="mb-4">
                        <input
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="taskName"
                            type="text"
                            placeholder="Write your task title here..."
                            onChange={(e) => setTaskName(e.target.value)}
                            value={taskName}
                        />
                    </div>
                    <div>
                        <textarea
                            required
                            className="resize-none shadow border appearance-none rounded w-full h-48 py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="taskDescription"
                            placeholder="Write detail task here..."
                            onChange={(e) => setTaskDescription(e.target.value)}
                            value={taskDescription}
                        />
                    </div>
                    <div className="flex-row items-end">
                        <button
                            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus :outline-none focus:shadow-outline"
                            type="submit">
                            Save
                        </button>
                        <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus :outline-none focus:shadow-outline"
                            type="submit">
                            Delete
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
}

export default TaskDetail;