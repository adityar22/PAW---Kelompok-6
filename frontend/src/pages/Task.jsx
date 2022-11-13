import { useState } from 'react';
import { useTasksContext } from '../hooks/useTasksContext';
import useFetch from '../hooks/useFetch';

import TaskList from '../component/TaskList';
import Loading from '../component/Loading';

import Searchbar from '../component/Searchbar'

const Task = () => {
    const { tasks, dispatch, isPending, error, setLoading, setError } = useTasksContext();
    const [popup, setPopup] = useState(false);
    const url = '/api/tasks';

    const togglePopup = () => {
        setPopup(!popup);
    }

    useFetch({ url, dispatch, setError, setLoading, type: 'GET_TASKS' });

    return (
        <div className="bg-white justify-center items-center p-7 h-screen">
            <div className="text-4xl font-bold text-orange my-9">
                <h1>Add Your Task Here</h1>
            </div>
            <div className="justify-between flex">
                <div className="align-middle">
                    <button type="button" className="button mb-5">Add Task</button>
                </div>
                <Searchbar />
            </div>
            <div className='justify-end flex'>
                <p>Sort by:</p>
                <select>
                    <option>Test</option>
                    <option>Test</option>
                    <option>Test</option>
                    <option>Test</option>
                    <option>Test</option>
                </select>
            </div>
            <table className="shadow-2xl border-2 border-dark-blue-200 text-center w-full my-9">
                <thead className="bg-dark-blue text-white">
                    <tr>
                        <th className="py-3 bg-white-800 p-3 text-sm font-semibold tracking-wide">Task Title</th>
                        <th className="py-3 bg-white-800 p-3 text-sm font-semibold tracking-wide">Status</th>
                        <th className="py-3 bg-white-800 p-3 text-sm font-semibold tracking-wide">Priority</th>
                        <th className="py-3 bg-white-800 p-3 text-sm font-semibold tracking-wide">Deadline</th>
                        <th className="py-3 bg-white-800 p-3 text-sm font-semibold tracking-wide">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {error && <div>Somehing error is occured 🙀</div>}
                    {isPending && <Loading />}
                    {tasks && tasks.map(task => (<TaskList key={task._id} task={task} />))}
                </tbody>
            </table>
        </div>
    );
}

export default Task;