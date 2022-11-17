import { useState } from "react";
import { useTasksContext } from "../hooks/useTasksContext";

const AddTask = ({ togglePopup, setLoading, url }) => {
    const { dispatch, setError } = useTasksContext();

    const [taskName, setTaskName] = useState("");
    const [taskDesc, setTaskDesc] = useState("");
    const [taskPriority, setTaskPriority] = useState("");
    const [taskStat, setTaskStat] = useState("Not Started");
    const [taskTime, setTaskTime] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newTask = { taskName, taskDesc, taskPriority, taskStat, taskTime }

        setLoading(true);

        const response = await fetch(url, {
            method: 'POST',
            header: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newTask),
        })

        const data = await response.json();

        if (response.ok) {
            setTaskName("");
            setTaskDesc("");
            setTaskPriority("");
            setTaskTime("");
            setLoading(false);
            togglePopup();
            dispatch({ type: 'ADD_TASK', payload: data });
        }
        if (!response.ok) {
            throw Error('Could not fetch the data for that resource')
        }
    }

    return (
        <div>
            <div className="overlay z-10"></div>
            <div className="container w-fit mx-aito absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hover:scale-105 transition-all duration-700">
                <form className="create w-screen max-w-xl mx-8 bg-white shadow-xl rounded-3xl px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                    <button className="button absolute bg-red-500 border-red-700 -top-4 right-4 hover:bg-red-700" onClick={togglePopup}>x</button>
                    <h3 className="text-center text-2xl font -bold mb-12">Add New Task</h3>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Title
                        </label>
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
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Description
                        </label>
                        <textarea
                            required
                            className="resize-none shadow border appearance-none rounded w-full h-48 py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="taskDesc"
                            placeholder="Write detail task here..."
                            onChange={(e) => setTaskDesc(e.target.value)}
                            value={taskDesc}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Deadline
                        </label>
                        <input
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="taskTime"
                            type="date"
                            onChange={(e) => setTaskTime(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Priority
                        </label>
                        <div className="flex-row justify-between">
                            <div>
                                <input
                                    type="radio"
                                    id="taskPriority1"
                                    name="taskPriority"
                                    value="Low"
                                    onClick={(e) => setTaskPriority(e.target.value)} />
                                <label for="taskPriority1">Low</label>
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    id="taskPriority2"
                                    name="taskPriority"
                                    value="Normal"
                                    onClick={(e) => setTaskPriority(e.target.value)} />
                                <label for="taskPriority2">Normal</label>
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    id="taskPriority3"
                                    name="taskPriority"
                                    value="High"
                                    onClick={(e) => setTaskPriority(e.target.value)} />
                                <label for="taskPriority3">High</label>
                            </div>
                        </div>
                    </div>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus :outline-none focus:shadow-outline"
                        type="submit">
                        Add New Task
                    </button>
                </form>
            </div>
        </div>
    );
}
export default AddTask;