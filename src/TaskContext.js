import React, { createContext, useState, useEffect } from 'react';

const apiUrl = "https://665c240b3e4ac90a04d8c2de.mockapi.io/todo_api/todo_api";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await fetch(apiUrl);
    const data = await response.json();
    setTasks(data);
  };

  const updateTask = async (updatedTask) => {
    const response = await fetch(`${apiUrl}/${updatedTask.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedTask)
    });
    const data = await response.json();
    setTasks(tasks.map(task => (task.id === data.id ? data : task)));
  };

  return (
    <TaskContext.Provider value={{ tasks, setTasks, updateTask }}>
      {children}
    </TaskContext.Provider>
  );
};
