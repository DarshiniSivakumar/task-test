import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchTasksRequest,
  addTaskRequest,
  toggleCompleteRequest,
  deleteTaskRequest,
} from "./redux/tasks/taskSlice";

function App() {
  const [input, setInput] = useState("");
  const { tasks, loading, error } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasksRequest());
  }, [dispatch]);

  const handleAdd = () => {
    if (input.trim() !== "") {
      dispatch(addTaskRequest(input));
      setInput("");
    }
  };

  const handleToggle = (task) => {
    dispatch(toggleCompleteRequest({ id: task.id, completed: !task.completed }));
  };

  const handleDelete = (task) => {
    dispatch(deleteTaskRequest(task.id));
  };

  return (
    <div style={{ maxWidth: 500, margin: "50px auto", fontFamily: "Arial" }}>
      <h2 style={{ textAlign: "center" }}>Tasks</h2>

      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter task"
          style={{ flex: 1, padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
        />
        <button
          onClick={handleAdd}
          style={{ padding: "8px 12px", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: 4 }}
        >
          Add Task
        </button>
      </div>

      {loading && <p>Loading tasks...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {tasks.map((t) => (
          <li
            key={t.id}
            style={{
              marginBottom: 10,
              padding: 10,
              backgroundColor: "#f9f9f9",
              borderRadius: 4,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span
              onClick={() => handleToggle(t)}
              style={{ textDecoration: t.completed ? "line-through" : "none", cursor: "pointer", flex: 1 }}
            >
              {t.text}
            </span>
            <button
              onClick={() => handleDelete(t)}
              style={{ marginLeft: 10, padding: "4px 8px", backgroundColor: "#f44336", color: "white", border: "none", borderRadius: 4, cursor: "pointer" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
