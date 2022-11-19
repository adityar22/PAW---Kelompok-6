import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { useAuthContext } from './hooks/useAuthContext';
import { useDisplayContext } from './hooks/useDisplayContext';

import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Home from './pages/Home';


function App() {
  const { user } = useAuthContext();
  const { notify } = useDisplayContext();

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/*" element={!user ? <Login notify={notify} /> : <Home />} />
          <Route exact path="/signup/*" element={!user ? <SignUp notify={notify} /> : <Home />} />
          <Route exact path="/login/*" element={!user ? <Login notify={notify} /> : <Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;