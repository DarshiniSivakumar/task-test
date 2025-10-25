import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import {
  fetchTasksRequest,
  fetchTasksSuccess,
  fetchTasksFailure,
  addTaskRequest,
  addTaskSuccess,
  addTaskFailure,
} from "./taskSlice";

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
    const response = yield call(axios.post, API_URL, { text: action.payload, completed: false });
    yield put(addTaskSuccess(response.data));
    // Optionally fetch tasks again
    yield put(fetchTasksRequest());
  } catch (error) {
    yield put(addTaskFailure(error.message));
  }
}

export default function* rootSaga() {
  yield takeEvery(fetchTasksRequest.type, fetchTasksSaga);
  yield takeEvery(addTaskRequest.type, addTaskSaga);
}
