import { useState, useEffect } from 'react';
import { useTasksContext } from '../hooks/useTasksContext';
import useFetch from '../hooks/useFetch';

//Initiate Component
import TaskList from '../component/TaskList';
import Loading from '../component/Loading';
import Searchbar from '../component/Searchbar'
import SortSelection from '../component/SortSelection';
import Pagination from '../component/Pagination';

//Init Task Page
const Task = () => {
    //Fetch API
    const { tasks, dispatch, isPending, error, setLoading, setError, setTasks } = useTasksContext();
    const [popup, setPopup] = useState(false);
    const url = '/api/tasks';

    const togglePopup = () => {
        setPopup(!popup);
    }

    useFetch({ url, dispatch, setError, setLoading, type: 'GET_TASKS' });

    //Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage] = useState(5);

    const indexOfLastTask = currentPage*postPerPage;
    const indexOfFirstTask = indexOfLastTask-postPerPage;
    const currentTask = tasks && tasks.slice(indexOfFirstTask, indexOfLastTask);

    const paginate =(pageNumber)=> setCurrentPage(pageNumber);

    //Sorting
    
    //Seacrhing
    const [searchTerm, setSearchTerm] = useState("");

    //Return Task Page
    return (
        <div className="bg-white justify-center items-center p-7 h-screen">
            <div className="text-4xl font-bold text-orange my-9">
                <h1>Add Your Task Here</h1>
            </div>
            <div className="justify-between flex">
                <div className="align-middle">
                    <button type="button" className="button mb-5">Add Task</button>
                </div>
                <Searchbar search={search}/>
            </div>
            <div className='justify-end flex'>
                <SortSelection/>
            </div>

            {/* create table */}
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
                    {/*Call Task List Component into Table Row*/}
                    {error && <div>Somehing error is occured 🙀</div>}
                    {isPending && <Loading />}
                    {currentTask && currentTask.map(task => (<TaskList key={task._id} task={task} />))}
                </tbody>
            </table>

            {/*Call Pagination Component*/}
            {tasks && <Pagination postPerPage={postPerPage} totalPost={tasks.length} paginate={paginate}/>}
        </div>
    );
}

export default Task;