import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addTaskRequest } from "../redux/tasks/taskSlice";

const TaskForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(addTaskRequest({ title: data.title })); 
    reset(); 
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ marginBottom: "20px" }}>
      <input
        {...register("title", { required: true })}
        placeholder="Enter task"
        style={{ padding: "8px", width: "250px", marginRight: "10px" }}
      />
      <button type="submit" style={{ padding: "8px 12px" }}>Add Task</button>
    </form>
  );
};

export default TaskForm;
