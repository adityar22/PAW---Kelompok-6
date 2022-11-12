import { useEffect, useState } from 'react';

import TaskList from '../component/TaskList';

const Task = () => {
    const Tasks = [];

    useEffect(()=>{

    }, [])

    return (
        <div className="bg-white justify-center items-center h-screen w-full m-9">
            <div className="text-4xl font-bold text-orange my-9">
                <h1>MY TASK</h1>
            </div>
            <div className="justify-between w-full">
                <div>
                    <button>New Task</button>
                </div>
            </div>
            <table className="shadow-2xl border-2 border-dark-blue-200 text-center w-full my-9">
                <thead className="bg-dark-blue text-white">
                    <tr>
                        <th className="py-3 bg-white-800 p-3 text-sm font-semibold tracking-wide">No.</th>
                        <th className="py-3 bg-white-800">Task Title</th>
                        <th className="py-3 bg-white-800">Status</th>
                        <th className="py-3 bg-white-800">Priority</th>
                        <th className="py-3 bg-white-800">Deadline</th>
                        <th className="py-3 bg-white-800">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {Tasks.map((task, index) =>(
                        <TaskList/>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Task;