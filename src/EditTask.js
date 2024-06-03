import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TaskContext } from './TaskContext';
import './App.css'

const apiUrl = "https://665c240b3e4ac90a04d8c2de.mockapi.io/todo_api/todo_api";

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateTask } = useContext(TaskContext);
  const [task, setTask] = useState({
    TaskName: '',
    Description: '',
    Status: false
  });

  useEffect(() => {
    fetchTask();
  }, []);

  const fetchTask = async () => {
    const response = await fetch(`${apiUrl}/${id}`);
    const data = await response.json();
    setTask(data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateTask(task);
    navigate('/');
  };

  return (
    <div className="vh-100 gradient-custom-2">
      <div className="container py-5 h-100">
        <div className="container mt-4">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label textLabelColor font-weight-bold">Task Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="TaskName"
                    value={task.TaskName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label textLabelColor">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    name="Description"
                    value={task.Description}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-check-label d-block textLabelColor" >Status</label>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={task.Status}
                      onChange={(e) => setTask({ ...task, Status: e.target.checked })}
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-warning">Update Task</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTask;



