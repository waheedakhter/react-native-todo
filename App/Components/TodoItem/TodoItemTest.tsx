import * as React from "react";
import { Provider } from "react-redux";
import * as renderer from "react-test-renderer";
import configureMockStore from "redux-mock-store";
import TodoItem from "./TodoItem";

const mockStore = configureMockStore();
const store = mockStore({
  deliveries: {
    deliveries: [],
    activeDelivery: undefined,
    finishedDeliveries: {},
    fetching: false,
  },
});

describe("TodoItem UI Testing", () => {
  const component = renderer
    .create(
      <Provider store={store}>
        <TodoItem item={{ id: 1643380751002, description: "Item", dateTime: "Fri Jan 28 2022 18:35:08" }} />
      </Provider>,
    )
    .toJSON();
  it("renders snapshot as expected", () => {
    expect(component).toMatchSnapshot();
  });

  it("renders without crashing", () => {
    expect(component).toBeTruthy();
  });
});
