import React from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

const Task = ({ task, onEdit, onDelete, onStatusChange }) => {
  const navigate = useNavigate();

  const handleStatusChange = (e) => {
    const updatedTask = { ...task, Status: e.target.value === 'Completed' };
    onStatusChange(updatedTask);
  };

  return (
    <tr>
      <td>{task.id}</td>
      <td>{task.TaskName}</td>
      <td>{task.Description}</td>
      <td>
        <select className="btn btn-info dropdown-toggle" value={task.Status ? 'Completed' : 'Not Completed'} onChange={handleStatusChange}>
          <option value="Not Completed">Not Completed</option>
          <option value="Completed">Completed</option>
        </select>
      </td>
      <td>
        <button className="btn btn-primary action-btn" onClick={() => navigate(`/edit/${task.id}`)}>Edit</button>
        <button className="btn btn-danger action-btn" onClick={() => onDelete(task.id)}>Delete</button>
      </td>
    </tr>
  );
};

export default Task;
