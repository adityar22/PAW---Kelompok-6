import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './style.css';
import './component/Loading.css'
import App from './App';
import NotesContextProvider from './contexts/NotesContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NotesContextProvider>
      <App />
    </NotesContextProvider>
  </React.StrictMode>
);
