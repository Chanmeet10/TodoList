// src/TodoItem.js
import React, { useState } from "react";

function TodoItem({ task, removeTask, toggleTaskCompletion, editTask, changePriority }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);

  const handleEditChange = (e) => setEditedText(e.target.value);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    editTask(task.id, editedText);
    setIsEditing(false);
  };

  const handlePriorityChange = (e) => {
    changePriority(task.id, e.target.value);
  };

  return (
    <li style={{ textDecoration: task.completed ? "line-through" : "none" }}>
      {isEditing ? (
        <form onSubmit={handleEditSubmit}>
          <input
            type="text"
            value={editedText}
            onChange={handleEditChange}
            autoFocus
          />
          <button type="submit">Save</button>
        </form>
      ) : (
        <>
          <span onClick={() => toggleTaskCompletion(task.id)}>{task.text}</span>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </>
      )}
      <select value={task.priority} onChange={handlePriorityChange}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button onClick={() => removeTask(task.id)}>Delete</button>
    </li>
  );
}

export default TodoItem;
