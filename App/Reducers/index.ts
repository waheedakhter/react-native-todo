import { combineReducers } from "redux";
import root from "../Epics/";
import Api from "../Services/Api";
import configureStore from "./CreateStore";

import TodosReducer, { ImmutableTodosState } from "./TodoReducer";

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  todos: TodosReducer,
});

export interface RootState {
  todos: ImmutableTodosState;
}

export default async () => {
  let store;
  const api = Api.create;
  // tslint:disable-next-line:prefer-const
  const objStore = configureStore(reducers, root, {
    api,
    store: () => store,
  });
  store = objStore.store;
  return store;
};
