import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasksRequest, addTaskRequest } from "./redux/tasks/taskSlice";

function App() {
  const [task, setTask] = useState("");
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasksRequest());
  }, [dispatch]);

  const handleAddTask = () => {
    if (task.trim()) {
      dispatch(addTaskRequest(task));
      setTask("");
    }
  };

  return (
    <div>
      <h2>Tasks</h2>
      <input value={task} onChange={(e) => setTask(e.target.value)} placeholder="Enter task" />
      <button onClick={handleAddTask}>Add Task</button>

      {loading && <p>Loading tasks...</p>}
      {error && <p style={{ color: "red" }}>Network Error: {error}</p>}

      <ul>
        {tasks.map((t) => (
          <li key={t.id}>{t.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
