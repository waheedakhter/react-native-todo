import * as R from "ramda";
import { ImmutableObject } from "seamless-immutable";
import { Todos } from "../../Types/ToDo";

/**
 * Helper function to shows to network error response
 *
 * @param Response object
 * @return Undefined if the response is empty or null
 */

export const isResponseOk = R.allPass([R.propEq("ok", true), R.complement(R.hasPath(["data", "error"])), R.complement(R.hasPath(["data", "errorMessage"]))]);

export const getTodosList = (todos: ImmutableObject<Todos>) => {
  let todosList = [];
  if (todos) {
    Object.keys(todos).map((key: string) => {
      todosList.push(todos[key]);
    });
  }

  return todosList;
};
