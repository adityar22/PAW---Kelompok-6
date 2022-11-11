import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Navbar from './component/shared/Navbar';
import Home from './component/pages/Home';


function App() {
  return (
    <div className="">
      <Navbar/>
      <Home/>
    </div>
  );
}

export default App;
