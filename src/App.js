import React, { useState, useEffect } from "react";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all"); // all | active | completed

  // Load tasks from localStorage
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) setTasks(JSON.parse(savedTasks));
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add new task
  const handleAddTask = () => {
    if (task.trim() !== "") {
      setTasks([...tasks, { text: task, completed: false }]);
      setTask("");
    }
  };

  // Toggle task completion
  const handleToggleComplete = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  // Clear all completed tasks
  const handleClearCompleted = () => {
    setTasks(tasks.filter((t) => !t.completed));
  };

  // Filter tasks based on current filter
  const filteredTasks = tasks.filter((t) => {
    if (filter === "all") return true;
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "450px",
        margin: "auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Add tasks here</h2>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a task"
          style={{ flex: 1, padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
        />
        <button
          onClick={handleAddTask}
          style={{
            padding: "8px 12px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Add
        </button>
      </div>

      {/* Filter Buttons */}
      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <button
          onClick={() => setFilter("all")}
          style={{
            padding: "6px 10px",
            backgroundColor: filter === "all" ? "#2196F3" : "#e0e0e0",
            color: filter === "all" ? "white" : "#333",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          All
        </button>
        <button
          onClick={() => setFilter("active")}
          style={{
            padding: "6px 10px",
            backgroundColor: filter === "active" ? "#2196F3" : "#e0e0e0",
            color: filter === "active" ? "white" : "#333",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Active
        </button>
        <button
          onClick={() => setFilter("completed")}
          style={{
            padding: "6px 10px",
            backgroundColor: filter === "completed" ? "#2196F3" : "#e0e0e0",
            color: filter === "completed" ? "white" : "#333",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Completed
        </button>
        <button
          onClick={handleClearCompleted}
          style={{
            padding: "6px 10px",
            backgroundColor: "#f44336",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginLeft: "auto",
          }}
        >
          Clear Completed
        </button>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {filteredTasks.map((t, index) => (
          <li
            key={index}
            style={{
              marginBottom: "10px",
              backgroundColor: "#f9f9f9",
              padding: "10px",
              borderRadius: "4px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span
              onClick={() => handleToggleComplete(index)}
              style={{
                textDecoration: t.completed ? "line-through" : "none",
                color: t.completed ? "#999" : "#333",
                cursor: "pointer",
                flex: 1,
              }}
            >
              {t.text}
            </span>
            <button
              onClick={() => handleToggleComplete(index)}
              style={{
                marginLeft: "10px",
                padding: "4px 8px",
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#45a049")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#4CAF50")}
            >
              {t.completed ? "Undo" : "Complete"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
