import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { useAuthContext } from './hooks/useAuthContext';

import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Home from './pages/Home';


function App() {

  const { user } = useAuthContext();

  return (
    <BrowserRouter>
        <Routes>
          <Route exact path="/*" element={!user ? <Login /> : <Home />}/>
          <Route exact path="/signup/*" element={!user ? <SignUp /> : <Home />} />
          <Route exact path="/login/*" element={!user ? <Login /> : <Home />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;