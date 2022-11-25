import { useState, useRef } from 'react';
import { useTasksContext } from '../hooks/useTasksContext';
import { useDisplayContext } from '../hooks/useDisplayContext';
import useFetch from '../hooks/useFetch';

//Initiate Component
import TaskList from '../component/Task/TaskList';
import Loading from '../component/Loading';
import Searchbar from '../component/Public/Searchbar'
// import SortSelection from '../component/Public/SortSelection';
import Pagination from '../component/Public/Pagination';
import AddTask from '../component/Task/AddTask';


//Init Task Page
const Task = () => {
    //Fetch API
    const { tasks, dispatch, isPending, error, setLoading, setError } = useTasksContext();
    const { notify } = useDisplayContext();
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

    //Return Task Page
    return (
        <>
            {popup && < AddTask togglePopup={togglePopup} setLoading={setLoading} url={url} notify={notify} />}
            <div className="justify-center items-center py-20 lg:py-10 px-3 lg:px-28 h-screen" >
                <div className="text-4xl font-bold text-orange my-12 mx-auto" >
                    <h1 className='text-3xl sm:text-5xl font-bold mb-12 text-dark-blue' > Add Your Daily Task Here!📃 </h1>
                </div>
                <div className="justify-end sm:justify-between flex-row sm:flex" >
                    <div className="align-middle" >
                        <button
                            type="button"
                            className="button p-3 mb-10 sm:mb-12 mr-7 relative"
                            onClick={togglePopup}
                        > Add Task + </button>
                    </div>
                    <Searchbar term={searchTerm} getSearchTerm={getSearchTerm} inputEl={inputEl} />
                </div>
                {/* <div className='justify-end flex' >
                    <SortSelection />
                </div> */}

                { /* create table */}
                <table className="shadow-2xl border-2 border-dark-blue-200 text-center w-full my-6" >
                    <thead className="bg-dark-blue text-white" >
                        <tr >
                            <th className="py-3 bg-white-800 p-3 text-sm font-semibold tracking-wide" > Task Title </th>
                            <th className="py-3 bg-white-800 p-3 text-sm font-semibold tracking-wide hidden sm:inline-block" > Status </th>
                            <th className="py-3 bg-white-800 p-3 text-sm font-semibold tracking-wide hidden sm:inline-block" > Priority </th>
                            <th className="py-3 bg-white-800 p-3 text-sm font-semibold tracking-wide" > Deadline </th>
                            <th className="py-3 bg-white-800 p-3 text-sm font-semibold tracking-wide" > Act </th>
                        </tr>
                    </thead>
                    <tbody > { /*Call Task List Component into Table Row*/}
                        {error && < div className='font-semibold text-lg text-red-400 my-4' > Somehing error is occured🙀 </div>}
                        {isPending && < Loading />}

                        {listTasks && listTasks.map(task => (< TaskList key={task._id} task={task} notify={notify} setLoading={setLoading} setError={setError} />))}
                    </tbody>
                </table>

                { /*Call Pagination Component*/}
                <div className="justify-center">
                    {tasks && < Pagination postPerPage={postPerPage} totalPost={tasks.length} paginate={paginate} />}
                </div>
            </div>
        </>
    );
}

export default Task;