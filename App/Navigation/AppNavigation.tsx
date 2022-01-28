import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import TodoDetailContainer from "../Containers/TodoDetailContainer/TodoDetailContainer";
import TodoListContainer from "../Containers/TodoListContainer/TodoListContainer";

const PrimaryStack = createStackNavigator();

function PrimaryNav() {
  return (
    <PrimaryStack.Navigator initialRouteName="TodoList" headerMode={"none"}>
      <PrimaryStack.Screen name="TodoList" component={TodoListContainer} />
      <PrimaryStack.Screen name="TodoDetails" component={TodoDetailContainer} />
    </PrimaryStack.Navigator>
  );
}

export default PrimaryNav;
