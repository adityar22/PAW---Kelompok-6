import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Navbar from './component/Navbar';
import Home from './pages/Home';
import Task from './pages/Task';
import Calendar from './pages/Calendar';
import Notes from './pages/Notes';
import About from './pages/About';
import Profile from './pages/Profile';


function App() {
  return (
    <BrowserRouter>
      <div className="flex">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="task" element={<Task />}/>
          <Route path='calendar' element={<Calendar />}/>
          <Route path='notes' element={<Calendar />} />
          <Route path='about' element={<About />} />
          <Route path='profile' element={<Profile />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
