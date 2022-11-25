import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useTasksContext } from "../../hooks/useTasksContext";
import ModalDelete from "../Public/ModalDelete";


const TaskDetail = ({ task, togglePopup, setLoading, url, setError, notify }) => {
    const { dispatch } = useTasksContext();
    const { user } = useAuthContext();

    const [isEdited, setIsedited] = useState(false);

    const [taskName, setTaskName] = useState(task.taskName);
    const [taskDescription, setTaskDescription] = useState(task.taskDescription);
    const [taskPriority, setTaskPriority] = useState(task.taskPriority);
    const [taskStat, setTaskStat] = useState(task.taskStat);
    const [taskTime, setTaskTime] = useState(task.taskTime);

    const[confirm, setConfirm] = useState(false);

    const toggleConfirm=()=>{
        setConfirm(!confirm);
    }

    //Delete Handler
    const handleDelete = async (e) => {
        e.stopPropagation();
        e.preventDefault();

        if (!user) {
            return;
        }

        setLoading(true);
        const response = await fetch('api/tasks/' + task._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        });

        const json = await response.json();
        console.log(json);
        if (response.ok) {
            setLoading(false);
            dispatch({ type: 'DELETE_TASK', payload: json.data });
            notify.info(json.message);
            togglePopup()
        }
        if (!response.ok) {
            setLoading(false);
            notify.error(json.error);
        }
    }

    //Edit Handler
    const handleEdit = async (e) => {
        e.stopPropagation();
        e.preventDefault();

        if (!user) {
            return;
        }

        setLoading(true);
        console.log(task)
        const updateTask = { taskName, taskDescription, taskTime, taskPriority, taskStat }
        const response = await fetch('/api/tasks/' + task._id, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(updateTask)
        });
        const json = await response.json();
        console.log(json);
        if (response.ok) {
            setLoading(false);
            togglePopup();
            dispatch({ type: 'EDIT_TASK', payload: json.data });
            notify.info(json.message);
        }
        if (!response.ok) {
            setLoading(false);
        }
        setLoading(false);
    }

    const toggleEdit = () => {
        setIsedited(!isEdited);
    }

    return (
        <div>
            <div className="overlay z-10"></div>
            <div className="container w-fit mx-auto absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hover:scale-105 transition-all duration-700">
                <div className="w-screen max-w-xl mx-8 bg-white shadow-xl rounded-3xl px-8 pt-6 pb-8 mb-4">
                    <button className="button absolute bg-red-500 border-red-700 -top-4 right-4 hover:bg-red-700" onClick={togglePopup}>x</button>
                    {isEdited ?
                        <div>
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
                            <div className="mb-4">
                                <input
                                    required
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="taskTime"
                                    type="date"
                                    onChange={(e) => setTaskTime(e.target.value)}
                                    value={taskTime}
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
                            <div>
                                <div className="mb-3">
                                    <div className="inline-block mr-3">
                                        <input
                                            type="radio"
                                            className="mr-2"
                                            id="taskStat1"
                                            name="taskStat"
                                            value="Not Started"
                                            onClick={(e) => setTaskStat(e.target.value)} />
                                        <label for="taskStat1">Not Started</label>
                                    </div>
                                    <div className="inline-block mr-3">
                                        <input
                                            type="radio"
                                            className="mr-2"
                                            id="taskStat2"
                                            name="taskStat"
                                            value="In Progress"
                                            onClick={(e) => setTaskStat(e.target.value)} />
                                        <label for="taskStat">In Progress</label>
                                    </div>
                                    <div className="inline-block mr-3">
                                        <input
                                            type="radio"
                                            className="mr-2"
                                            id="taskStat3"
                                            name="taskStat"
                                            value="Completed"
                                            onClick={(e) => setTaskStat(e.target.value)} />
                                        <label for="taskPriority3">Completed</label>
                                    </div>
                                </div>
                            </div>
                            <div className="">
                                <div className="inline-block mr-3">
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 mr-3 text-white font-bold py-2 px-4 rounded focus :outline-none focus:shadow-outline"
                                        onClick={handleEdit}>
                                        Save
                                    </button>
                                </div>
                                <div className="inline-block mr-3">
                                    <button
                                        className="bg-white text-gray-500 font-bold py-2 px-4 rounded focus :outline-none focus:shadow-outline"
                                        onClick={toggleEdit}>
                                        Back
                                    </button>
                                </div>
                            </div>
                        </div>
                        :
                        <div>
                            <h2 className="text-center text-2xl font -bold mb-2">{taskName}</h2>
                            <p className="text-center text-sm font -bold mb-6" >
                                To Due: 
                                <span className="text-orange mx-2">{taskTime}</span>
                                ||
                                <span 
                                    className={`ml-2
                                    ${taskStat === "Not Started" && "text-red-500"}
                                    ${taskStat === "In Progress" && "text-yellow-500"}
                                    ${taskStat === "Completed" && "text-green-500"}
                                    `}>
                                    {taskStat}
                                </span>
                            </p>
                            <p className="text-center text-sm mb-12" >{taskDescription}</p>

                            <div className="">
                                <div className="inline-block mr-3">
                                    <button
                                        className="bg-yellow-500 hover:bg-yellow-700 mr-3 text-white font-bold py-2 px-4 rounded focus :outline-none focus:shadow-outline"
                                        onClick={toggleEdit}>
                                        Edit
                                    </button>
                                </div>
                                <div className="inline-block mr-3">
                                    <button
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus :outline-none focus:shadow-outline"
                                        onClick={toggleConfirm}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
            {confirm && <ModalDelete handleDelete={handleDelete} togglePopup={toggleConfirm}/>}
        </div>
    );
}

export default TaskDetail;