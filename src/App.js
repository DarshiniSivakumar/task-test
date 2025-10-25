import React from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Tasks</h2>
      <TaskForm />
      <TaskList />
    </div>
  );
}

export default App;
