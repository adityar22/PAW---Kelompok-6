import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useAuthContext } from './hooks/useAuthContext';

import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Home from './pages/Home';


function App() {
  const { user } = useAuthContext();
  const notify = {
    info: (msg) => {
      toast.info(msg, {
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
    error: (msg) => {
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
      <BrowserRouter>
        <Routes>
          <Route exact path="/*" element={!user ? <Login notify={notify}/> : <Home />} />
          <Route exact path="/signup/*" element={!user ? <SignUp notify={notify}/> : <Home />} />
          <Route exact path="/login/*" element={!user ? <Login notify={notify}/> : <Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;