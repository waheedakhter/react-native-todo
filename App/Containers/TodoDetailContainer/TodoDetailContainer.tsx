import * as React from "react";
import { useRoute } from "@react-navigation/native";
import { ScrollView, Text, TextInput, View, ViewProps } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import Button from "../../Components/Button/Button";
import Header from "../../Components/Header/Header";
import style from "./TodoDetailContainerStyle";
import BottomView from "../../Components/BottomView/BottomView";
import DatePicker from "react-native-date-picker";
import { TodosActions } from "../../Reducers/TodoReducer";

interface Props extends ViewProps {}

const TodoDetailContainer: React.FunctionComponent<Props> = ({}: Props) => {
  const route = useRoute();
  let item = route.params?.item;
  let isUpdate = route.params?.isUpdate;
  const [description, setDescription] = React.useState(isUpdate ? item.description : "");
  const [date, setDate] = React.useState(isUpdate ? new Date(parseInt(item.id)) : new Date());
  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const onSaveUpdate = React.useCallback(() => {
    const todoObject = {
      id: isUpdate ? item.id : date.getTime(),
      description: description,
      dateTime: date.toLocaleString(),
      isDone: false,
    };
    const callbacks = { onSuccess: navigation.goBack };
    if (isUpdate) {
      dispatch(TodosActions.updateTodoItem(todoObject, callbacks));
    } else {
      dispatch(TodosActions.createTodoItem(todoObject, callbacks));
    }
  }, [date, description]);

  return (
    <View style={style.container}>
      <Header title="Todo Detail" />
      <ScrollView>
        <TextInput placeholder={"What needs to be done"} value={description} onChangeText={setDescription} multiline={true} style={style.inputStyle} />
        <Button text={"When is it due?"} onPress={() => setOpen(true)} />
        <Text style={style.selectedDate}>Selected Date: {date.toLocaleString()}</Text>
        <DatePicker
          modal
          open={open}
          date={date}
          onConfirm={date => {
            setOpen(false);
            setDate(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
      </ScrollView>
      <BottomView>
        <View style={style.buttonsContainer}>
          <Button text={"Back"} onPress={navigation.goBack} />
          <Button text={isUpdate ? "Update" : "Save"} onPress={onSaveUpdate} />
        </View>
      </BottomView>
    </View>
  );
};

export default TodoDetailContainer;
