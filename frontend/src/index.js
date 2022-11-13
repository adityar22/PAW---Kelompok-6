import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './style.css';
import './component/Loading.css'
import App from './App';
import NotesContextProvider from './contexts/NotesContext';
import TasksContextProvider from './contexts/TasksContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NotesContextProvider>
      <TasksContextProvider>
        <App />
      </TasksContextProvider>
    </NotesContextProvider>
  </React.StrictMode>
);
