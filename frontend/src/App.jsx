import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Navbar from './component/Navbar';
import Home from './pages/Home';
import Task from './pages/Task';
import Calendar from './pages/Calendar';
import Notes from './pages/Notes';
import About from './pages/About';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';


function App() {
  return (
    <BrowserRouter>
      <div className="flex">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />}/>
          <Route path="task" element={<Task />}/>
          <Route path='calendar' element={<Calendar />}/>
          <Route path='notes' element={<Notes />} />
          <Route path='about' element={<About />} />
          <Route path='profile' element={<Profile />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;