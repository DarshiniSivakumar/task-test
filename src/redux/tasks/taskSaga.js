import { call, put, takeLatest } from "redux-saga/effects";
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

function* fetchTasks() {
  try {
    const response = yield call(axios.get, API_URL);
    yield put(fetchTasksSuccess(response.data));
  } catch (error) {
    yield put(fetchTasksFailure(error.message));
  }
}

function* addTask(action) {
  try {
    const response = yield call(axios.post, API_URL, action.payload);
    yield put(addTaskSuccess(response.data));
  } catch (error) {
    yield put(addTaskFailure(error.message));
  }
}

export default function* rootSaga() {
  yield takeLatest(fetchTasksRequest.type, fetchTasks);
  yield takeLatest(addTaskRequest.type, addTask);
}
