import { useState } from "react";
import { useTasksContext } from "../../hooks/useTasksContext";
import { useHandleAdd } from "../../hooks/useHandleAdd";

import Datetime from 'react-datetime';
import Datepicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AddTask = ({ openPopup, closePopup, setLoading, url, setError, notify }) => {
    const { dispatch } = useTasksContext();

    const [taskName, setTaskName] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [taskPriority, setTaskPriority] = useState("");
    const [taskStat, setTaskStat] = useState("Not Started");
    const [taskTime, setTaskTime] = useState(new Date());

    const newTask = { taskName, taskDescription, taskTime, taskPriority, taskStat }
    const { handleAdd: handleSubmit } = useHandleAdd({ url, type: 'ADD_TASK', dispatch, data: newTask, setLoading, setError, notify, closeAddPopup: closePopup });

    return (
        <div>
            <div className="overlay z-10"></div>
            <div className="container w-fit mx-auto absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hover:scale-105 transition-all duration-700">
                <form className="create w-screen max-w-xl mx-8 bg-white shadow-xl rounded-3xl px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                    <button className="button absolute bg-red-500 border-red-700 -top-4 right-4 hover:bg-red-700" onClick={closePopup}>x</button>
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
                            id="taskDescription"
                            placeholder="Write detail task here..."
                            onChange={(e) => setTaskDescription(e.target.value)}
                            value={taskDescription}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Deadline
                        </label>
                        <Datepicker
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="eventStart"
                            selected={taskTime}
                            onChange={date => setTaskTime(date)}
                            showTimeSelect
                            timeFormat={'p'}
                            timeIntervals={1}
                            dateFormat='Pp'
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Priority
                        </label>
                        <div className="mb-3">
                            <div className="inline-block mr-3">
                                <input
                                    type="radio"
                                    id="taskPriority1"
                                    name="taskPriority"
                                    value="Low"
                                    onClick={(e) => setTaskPriority(e.target.value)} />
                                <label for="taskPriority1">Low</label>
                            </div>
                            <div className="inline-block mr-3">
                                <input
                                    type="radio"
                                    id="taskPriority2"
                                    name="taskPriority"
                                    value="Normal"
                                    onClick={(e) => setTaskPriority(e.target.value)} />
                                <label for="taskPriority2">Normal</label>
                            </div>
                            <div className="inline-block mr-3">
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