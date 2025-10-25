import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchTasksRequest: (state) => { state.loading = true; },
    fetchTasksSuccess: (state, action) => { state.loading = false; state.tasks = action.payload; },
    fetchTasksFailure: (state, action) => { state.loading = false; state.error = action.payload; },
    addTaskRequest: (state, action) => {},
    addTaskSuccess: (state, action) => { state.tasks.push(action.payload); },
    addTaskFailure: (state, action) => { state.error = action.payload; },
  },
});

export const {
  fetchTasksRequest,
  fetchTasksSuccess,
  fetchTasksFailure,
  addTaskRequest,
  addTaskSuccess,
  addTaskFailure,
} = taskSlice.actions;

export default taskSlice.reducer;
