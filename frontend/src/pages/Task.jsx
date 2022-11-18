import { useState, useEffect, useRef } from 'react';
import { useTasksContext } from '../hooks/useTasksContext';
import useFetch from '../hooks/useFetch';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Initiate Component
import TaskList from '../component/TaskList';
import Loading from '../component/Loading';
import Searchbar from '../component/Searchbar'
import SortSelection from '../component/SortSelection';
import Pagination from '../component/Pagination';
import AddTask from '../component/AddTask';

//Init Task Page
const Task = () => {
    //Fetch API
    const { tasks, dispatch, isPending, error, setLoading, setError } = useTasksContext();
    const [popup, setPopup] = useState(false);

    //Backend URL
    const url = '/api/tasks';

    const togglePopup = () => {
        setPopup(!popup);
    }

    //Get Data Hooks
    useFetch({ url, dispatch, setError, setLoading, type: 'GET_TASKS' });

    //Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage] = useState(5);

    const indexOfLastTask = currentPage * postPerPage;
    const indexOfFirstTask = indexOfLastTask - postPerPage;
    const currentTask = tasks && tasks.slice(indexOfFirstTask, indexOfLastTask);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    //Sorting

    //Seacrhing
    const [searchTerm, setSearchTerm] = useState("");
    const inputEl = useRef("");
    const [searchResult, setSearchresult] = useState([]);
    const searchHandler = (searchTerm) => {
        setSearchTerm(searchTerm);
        if (searchTerm !== "") {
            const newTasksList = tasks.filter((task) => {
                return Object.values(task)
                    .join(" ")
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());
            });
            setSearchresult(newTasksList);
        } else {
            setSearchresult(tasks);
        }
    };
    const getSearchTerm = () => {
        searchHandler(inputEl.current.value);
    };
    const listTasks = searchTerm < 1 ? currentTask : searchResult

    //Set Notification
    const notify={
        info : (msg)=>{
            toast.info(msg,{
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        },
        error:(msg)=>{
            toast.error(msg, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

    //Return Task Page
    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            {popup && <AddTask togglePopup={togglePopup} setLoading={setLoading} url={url}/>}
            <div className="bg-white justify-center items-center py-10 px-28 h-screen">
                <div className="text-4xl font-bold text-orange my-12 mx-auto">
                    <h1 className='text-5xl font-bold mb-12 text-dark-blue' >Add your daily task here! 📃</h1>
                </div>
                <div className="justify-between flex">
                    <div className="align-middle">
                        <button type="button" className="button mb-3" onClick={togglePopup}>Add Task</button>
                    </div>
                    <Searchbar term={searchTerm} getSearchTerm={getSearchTerm} inputEl={inputEl} />
                </div>
                <div className='justify-end flex'>
                    <SortSelection />
                </div>

                {/* create table */}
                <table className="shadow-2xl border-2 border-dark-blue-200 text-center w-full my-6">
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
                        {error && <div className='font-semibold text-lg text-red-400 my-4'>Somehing error is occured 🙀</div>}
                        {isPending && <Loading />}

                        {listTasks && listTasks.map(task => (<TaskList key={task._id} task={task} notify={notify} setLoading={setLoading} setError={setError} />))}
                    </tbody>
                </table>

                {/*Call Pagination Component*/}
                {tasks && <Pagination postPerPage={postPerPage} totalPost={tasks.length} paginate={paginate} />}
            </div>
        </>
    );
}

export default Task;