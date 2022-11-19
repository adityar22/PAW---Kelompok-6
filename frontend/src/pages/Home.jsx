import { Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from '../component/Navbar';
import LandingPage from '../pages/LandingPage';
import Task from '../pages/Task';
import Calendar from '../pages/Calendar';
import Notes from '../pages/Notes';
import About from '../pages/About';
import Profile from '../pages/Profile';
import NotFound from '../pages/NotFound';

const Home = () => {
    return (
        <div className="flex">
            <Navbar />
            <div className='w-full max-h-screen overflow-y-scroll'>
                <Routes>
                    <Route path='task' element={<Task />} />
                    <Route path='calendar' element={<Calendar />} />
                    <Route path='notes' element={<Notes />} />
                    <Route path='about' element={<About />} />
                    <Route path='profile' element={<Profile />} />
                    <Route path="/" element={<LandingPage />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </div>
        </div>
    );
}

export default Home;