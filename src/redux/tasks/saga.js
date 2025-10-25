import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import {
  fetchTasksRequest,
  fetchTasksSuccess,
  fetchTasksFailure,
  addTaskRequest,
  addTaskSuccess,
  addTaskFailure,
  toggleCompleteRequest,
  toggleCompleteSuccess,
  toggleCompleteFailure,
  deleteTaskRequest,
  deleteTaskSuccess,
  deleteTaskFailure,
} from "./taskSlice";

// Replace with your API endpoint
const API_URL = "https://testing-php-deployment-cyfdejgndfeeg6c5.northeurope-01.azurewebsites.net/tasks";

// Fetch tasks
function* fetchTasksSaga() {
  try {
    const response = yield call(axios.get, API_URL);
    yield put(fetchTasksSuccess(response.data));
  } catch (error) {
    yield put(fetchTasksFailure(error.message));
  }
}

// Add task
function* addTaskSaga(action) {
  try {
    const response = yield call(axios.post, API_URL, { text: action.payload });
    yield put(addTaskSuccess(response.data));
  } catch (error) {
    yield put(addTaskFailure(error.message));
  }
}

// Toggle complete
function* toggleCompleteSaga(action) {
  try {
    const { id, completed } = action.payload;
    const response = yield call(axios.put, `${API_URL}/${id}`, { completed });
    yield put(toggleCompleteSuccess(response.data));
  } catch (error) {
    yield put(toggleCompleteFailure(error.message));
  }
}

// Delete task
function* deleteTaskSaga(action) {
  try {
    const id = action.payload;
    yield call(axios.delete, `${API_URL}/${id}`);
    yield put(deleteTaskSuccess(id));
  } catch (error) {
    yield put(deleteTaskFailure(error.message));
  }
}

// Watcher saga
export default function* taskSaga() {
  yield takeEvery(fetchTasksRequest.type, fetchTasksSaga);
  yield takeEvery(addTaskRequest.type, addTaskSaga);
  yield takeEvery(toggleCompleteRequest.type, toggleCompleteSaga);
  yield takeEvery(deleteTaskRequest.type, deleteTaskSaga);
}
