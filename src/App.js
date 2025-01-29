import React, { useState, useEffect } from "react";
import './App.css';
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (taskText) => {
    if (!taskText.trim()) return; // Prevent adding empty tasks

    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
      priority: "low", // Default priority
    };
    setTasks([...tasks, newTask]);
  };

  const removeTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const editTask = (id, newText) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: newText } : task
      )
    );
  };

  const changePriority = (id, priority) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, priority } : task
      )
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "active") return !task.completed;
    return true; // "all" filter
  });

  return (
    <div className="App">
      {/* Header */}
      <header className="header">
        <h1 className="app-title">To-Do List</h1>
        <p className="header-tagline">Stay organized and get things done!</p>
      </header>

      <TodoForm addTask={addTask} />
      
      <div className="filter-buttons">
        <button onClick={() => setFilter("all")} className="filter-btn">All</button>
        <button onClick={() => setFilter("active")} className="filter-btn">Active</button>
        <button onClick={() => setFilter("completed")} className="filter-btn">Completed</button>
      </div>
      
      <ul>
        {filteredTasks.map((task) => (
          <TodoItem
            key={task.id}
            task={task}
            removeTask={removeTask}
            toggleTaskCompletion={toggleTaskCompletion}
            editTask={editTask}
            changePriority={changePriority}
          />
        ))}
      </ul>

      {/* Footer */}
      <footer>
        <p>&copy; {new Date().getFullYear()} Chanmeet Singh Oberoi. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default App;
