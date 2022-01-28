import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { Platform, Text, TouchableOpacity, View, ViewProps } from "react-native";
import SwiperComponent from "../SwiperComponent";
import { useDispatch } from "react-redux";
import colors from "../../Themes/Colors";
import style from "./TodoItemStyle";
import { TodosActions } from "../../Reducers/TodoReducer";

interface Props extends ViewProps {
  item: any;
  isActiveDelivery?: boolean;
}

const DeliveryItem: React.FunctionComponent<Props> = ({ item, isActiveDelivery }: Props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const swipe = React.useRef(null);
  const removeFunctionality = React.useCallback(() => {
    dispatch(TodosActions.deleteTodoItem(item, {}));
  }, [item]);

  return (
    <SwiperComponent
      ref={swipe}
      onFullSwipe={() => {}}
      backView={
        <TouchableOpacity onPress={removeFunctionality} style={style.btnViewStyle}>
          <View style={style.deleteView}>
            <Text style={style.textStyle}>Remove</Text>
          </View>
        </TouchableOpacity>
      }
    >
      <TouchableOpacity onPress={() => navigation.navigate("TodoDetails", { isUpdate: true, item: item })}>
        {item && (
          <View
            style={[
              style.itemContainer,
              {
                shadowColor: isActiveDelivery
                  ? colors.red
                  : Platform.select({
                      android: colors.darkGrey,
                      ios: colors.lightGrey,
                    }),
              },
            ]}
          >
            <Text style={style.description} numberOfLines={1}>
              {item.description}
            </Text>
            <Text style={style.dateStyle}>{item.dateTime}</Text>
          </View>
        )}
      </TouchableOpacity>
    </SwiperComponent>
  );
};

export default DeliveryItem;
