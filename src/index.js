import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import EditTask from './EditTask';
import { TaskProvider } from './TaskContext';

const rootElement = document.getElementById('root');

ReactDOM.createRoot(rootElement).render(
  <Router>
    <TaskProvider>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/edit/:id" element={<EditTask />} />
      </Routes>
    </TaskProvider>
  </Router>
);
