import AsyncStorage from "@react-native-async-storage/async-storage";
import { Reducer } from "redux";
import * as SI from "seamless-immutable";
import { deprecated, PayloadAction } from "typesafe-actions";
import { IAlertCallbacks } from "../../Lib/AlertsHelper";
import { mapReducers, ReducerMap } from "../../Lib/ReduxHelpers";
import { Todos } from "../../Types/ToDo";

const { createAction, createStandardAction } = deprecated;
/* ------------- Types and Action Creators ------------- */

const actionCreators = {
  requestTodosList: createStandardAction("REQUEST_TODOS_LIST")<IAlertCallbacks>(),
  todosListSuccess: createStandardAction("REQUEST_TODOS_LIST_SUCCESS")<any>(),
  todosListFailure: createAction("REQUEST_TODOS_LIST_FAILURE"),

  updateTodoItem: createStandardAction("UPDATE_TODO_ITEM")<any, IAlertCallbacks>(),
  updateTodoSuccess: createAction("UPDATE_TODO_ITEM_SUCCESS"),
  updateTodoFailure: createAction("UPDATE_TODO_ITEM_FAILURE"),

  createTodoItem: createStandardAction("CREATE_TODO_ITEM")<any, IAlertCallbacks>(),
  createTodoSuccess: createAction("CREATE_TODO_ITEM_SUCCESS"),
  createTodoFailure: createAction("CREATE_TODO_ITEM_FAILURE"),

  deleteTodoItem: createStandardAction("DELETE_TODO_ITEM")<any, IAlertCallbacks>(),
  deleteTodoSuccess: createAction("DELETE_TODO_ITEM_SUCCESS"),
  deleteTodoFailure: createAction("DELETE_TODO_ITEM_FAILURE"),
};

export const TodosActions = actionCreators;

export interface TodosState {
  todos?: Todos;
  fetching: boolean;
}

export type TodosActions = PayloadAction<string, TodosState>;

export type ImmutableTodosState = SI.ImmutableObject<TodosState>;

/* ------------- Initial RootState ------------- */

export const INITIAL_STATE: ImmutableTodosState = SI.from({
  todos: undefined,
  fetching: false,
});

/* ------------- Reducers ------------- */
// @ts-ignore
export const requestTodosList: Reducer<ImmutableTodosState> = (state: ImmutableTodosState) => state.merge({ fetching: true });

// @ts-ignore
export const todosListSuccess: Reducer<ImmutableTodosState> = (state: ImmutableTodosState, { payload }) => state.merge({ fetching: false, todos: payload });

// @ts-ignore
export const todosListFailure: Reducer<ImmutableTodosState> = (state: ImmutableTodosState) => state.merge({ fetching: false, todos: undefined });

// @ts-ignore
export const updateTodoItem: Reducer<ImmutableTodosState> = (state: ImmutableTodosState) => state.merge({ fetching: true });

// @ts-ignore
export const updateTodoSuccess: Reducer<ImmutableTodosState> = (state: ImmutableTodosState) => state.merge({ fetching: false });

// @ts-ignore
export const updateTodoFailure: Reducer<ImmutableDeliveriesState> = (state: ImmutableTodosState) => state.merge({ fetching: false });

// @ts-ignore
export const createTodoItem: Reducer<ImmutableTodosState> = (state: ImmutableTodosState) => state.merge({ fetching: true });

// @ts-ignore
export const createTodoSuccess: Reducer<ImmutableTodosState> = (state: ImmutableTodosState) => state.merge({ fetching: false });

// @ts-ignore
export const createTodoFailure: Reducer<ImmutableDeliveriesState> = (state: ImmutableTodosState) => state.merge({ fetching: false });

// @ts-ignore
export const deleteTodoItem: Reducer<ImmutableTodosState> = (state: ImmutableTodosState) => state.merge({ fetching: true });

// @ts-ignore
export const deleteTodoSuccess: Reducer<ImmutableTodosState> = (state: ImmutableTodosState) => state.merge({ fetching: false });

// @ts-ignore
export const deleteTodoFailure: Reducer<ImmutableDeliveriesState> = (state: ImmutableTodosState) => state.merge({ fetching: false });

/* ------------- Hookup Reducers To Types ------------- */

const reducerMap: ReducerMap<typeof actionCreators, ImmutableTodosState> = {
  requestTodosList,
  todosListSuccess,
  todosListFailure,
  updateTodoItem,
  updateTodoSuccess,
  updateTodoFailure,
  createTodoItem,
  createTodoSuccess,
  createTodoFailure,
  deleteTodoItem,
  deleteTodoSuccess,
  deleteTodoFailure,
};

export const TodosReducer = mapReducers(INITIAL_STATE, reducerMap, actionCreators);

export default TodosReducer;
