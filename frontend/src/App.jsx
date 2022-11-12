import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Navbar from './component/Navbar';
import Home from './pages/Home';


function App() {
  return (
    <div className="flex">
      <Navbar/>
      <Home/>
    </div>
  );
}

export default App;
