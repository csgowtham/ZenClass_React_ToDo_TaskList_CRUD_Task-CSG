import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';
import Task from './Task';
import { TaskContext } from './TaskContext';

const apiUrl = "https://665c240b3e4ac90a04d8c2de.mockapi.io/todo_api/todo_api";

function App() {
  const { tasks, setTasks, updateTask } = useContext(TaskContext);
  const [filter, setFilter] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    TaskName: '',
    Description: '',
    Status: false
  });

  const navigate = useNavigate();

  const createTask = async () => {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    const newTask = await response.json();
    setTasks([...tasks, newTask]);
    setFormData({
      TaskName: '',
      Description: '',
      Status: false
    });
    setShowForm(false);
  };

  const deleteTask = async (id) => {
    await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleStatusChange = async (updatedTask) => {
    await updateTask(updatedTask);
  };

  const handleFilterChange = (status) => {
    setFilter(status);
  };

  const handleAddTask = () => {
    setShowForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    createTask();
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'All') return true;
    return filter === 'Completed' ? task.Status : !task.Status;
  });

  return (
    <div className="App">
      <div className="vh-100 gradient-custom-2">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-12 col-xl-10">
              <div className="card mask-custom">
                <div className="card-body p-4 text-white">
                  <div className="text-center pt-3 pb-2">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-todo-list/check1.webp"
                      alt="Check"
                      width="60"
                    />
                    <h2 className="my-4">TODO Task List</h2>
                    <button className="btn btn-primary me-2" onClick={() => handleFilterChange('All')}>
                      All
                    </button>
                    <button className="btn btn-primary me-2" onClick={() => handleFilterChange('Completed')}>
                      Completed
                    </button>
                    <button className="btn btn-primary" onClick={() => handleFilterChange('Not Completed')}>
                      Not Completed
                    </button>
                  </div>
                  
                  <div className="text-center py-3">
                    <button className="btn btn-success" onClick={handleAddTask}>
                      Add Task
                    </button>
                  </div>

                  {showForm && (
                    <form className="mb-4" onSubmit={handleFormSubmit}>
                      <div className="mb-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Task Name"
                          name="TaskName"
                          value={formData.TaskName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Task Description"
                          name="Description"
                          value={formData.Description}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <button type="submit" className="btn btn-primary">
                        Submit
                      </button>
                    </form>
                  )}

                  <table className="table table-auto text-white mb-0 text-center">
                    <thead>
                      <tr>
                        <th scope="col">TaskID</th>
                        <th scope="col">Task</th>
                        <th scope="col">Description</th>
                        <th scope="col">Status</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTasks.map(task => (
                        <Task
                          key={task.id}
                          task={task}
                          onEdit={updateTask}
                          onDelete={deleteTask}
                          onStatusChange={handleStatusChange}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
