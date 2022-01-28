import { combineEpics } from "redux-observable";
import { epicCreateTodoItem, epicDeleteTodoItem, epicTodosList, epicUpdateTodoItem } from "./TodosEpic";

export default combineEpics(epicCreateTodoItem, epicTodosList, epicUpdateTodoItem, epicDeleteTodoItem);
