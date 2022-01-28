import AsyncStorage from "@react-native-async-storage/async-storage";
import { Epic, ofType } from "redux-observable";
import { from, of } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { getType } from "typesafe-actions";
import { invokeOnPath } from "../../Lib/CommonHelper";
import { IDependencies } from "../../Reducers/CreateStore";
import { TodosActions } from "../../Reducers/TodoReducer";
import { Todos } from "../../Types/ToDo";

const TODOS_LIST = "TODOS_LIST";
export const epicTodosList: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(TodosActions.requestTodosList)),
    mergeMap(async action => {
      const todosList = await AsyncStorage.getItem(TODOS_LIST);
      invokeOnPath(["meta", "onSuccess"], action);
      return of(TodosActions.todosListSuccess(JSON.parse(todosList)));
    }),
    mergeMap(obj => from(obj)),
  );

export const epicCreateTodoItem: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(TodosActions.createTodoItem)),
    mergeMap(async action => {
      const todos: Todos = state$.value.todos.todos || {};
      const todosUpdated = { ...todos };
      todosUpdated[action.payload.id] = action.payload;
      await AsyncStorage.setItem(TODOS_LIST, JSON.stringify(todosUpdated));
      invokeOnPath(["meta", "onSuccess"], action);
      return of(TodosActions.createTodoSuccess(), TodosActions.requestTodosList({}));
    }),
    mergeMap(obj => from(obj)),
  );

export const epicUpdateTodoItem: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(TodosActions.updateTodoItem)),
    mergeMap(async action => {
      const todos: Todos = state$.value.todos.todos || {};
      const todosUpdated = { ...todos };
      todosUpdated[action.payload.id] = action.payload;
      await AsyncStorage.setItem(TODOS_LIST, JSON.stringify(todosUpdated));
      invokeOnPath(["meta", "onSuccess"], action);
      return of(TodosActions.updateTodoSuccess(), TodosActions.requestTodosList({}));
    }),
    mergeMap(obj => from(obj)),
  );

export const epicDeleteTodoItem: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(TodosActions.deleteTodoItem)),
    mergeMap(async action => {
      const todos: Todos = state$.value.todos.todos || {};
      const todosUpdated = { ...todos };
      delete todosUpdated[action.payload.id];
      await AsyncStorage.setItem(TODOS_LIST, JSON.stringify(todosUpdated));
      invokeOnPath(["meta", "onSuccess"], action);
      return of(TodosActions.deleteTodoSuccess(), TodosActions.requestTodosList({}));
    }),
    mergeMap(obj => from(obj)),
  );
