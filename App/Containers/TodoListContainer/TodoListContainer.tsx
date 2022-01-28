import * as React from "react";
import { FlatList, Text, View, ViewProps } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

import Button from "../../Components/Button/Button";
import TodoItem from "../../Components/TodoItem/TodoItem";
import Header from "../../Components/Header/Header";
import LoadingView from "../../Components/LoadingView";
import { RootState } from "../../Reducers";

import style from "./TodoListContainerStyle";
import BottomView from "../../Components/BottomView/BottomView";
import { TodosActions } from "../../Reducers/TodoReducer";
import { getTodosList } from "../../Lib/DataHelper";

interface Props extends ViewProps {}

const TodoListContainer: React.FunctionComponent<Props> = ({}: Props) => {
  const { todosList, isLoading } = useSelector((state: RootState) => ({
    todosList: getTodosList(state.todos.todos),
    isLoading: state.todos.fetching,
  }));
  const dispatch = useDispatch();
  const navigation = useNavigation();
  React.useEffect(() => {
    dispatch(
      TodosActions.requestTodosList({
        onSuccess: () => {},
        onFailure: () => {},
      }),
    );
  }, []);
  return (
    <LoadingView isLoading={isLoading}>
      <Header title="Todos" />
      <View style={style.contentContainer}>
        <FlatList
          keyExtractor={({ id }) => id.toString()}
          data={todosList || []}
          renderItem={({ item, index }) => {
            return <TodoItem item={item} />;
          }}
          ListEmptyComponent={
            <View style={style.emptyListComponent}>{!isLoading && <Text style={style.emptyListComponentText}>You don't have any task to do.</Text>}</View>
          }
        />
        <BottomView>
          <Button text={"Add todo"} onPress={() => navigation.navigate("TodoDetails")} />
        </BottomView>
      </View>
    </LoadingView>
  );
};

export default TodoListContainer;
