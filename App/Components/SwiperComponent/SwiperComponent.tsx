import RA from "ramda-adjunct";
import * as React from "react";
import { View } from "react-native";
import { PanGestureHandler, PanGestureHandlerProperties, State } from "react-native-gesture-handler";
import Animated, { add, Clock, cond, eq, event, set, Value } from "react-native-reanimated";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { runTiming } from "../../Lib/AnimationHelper";
import { Metrics } from "../../Themes";
import styles from "./SwiperComponentStyle";
interface Props extends PanGestureHandlerProperties {
  onFullSwipe: () => void;
  backView: React.ReactElement;
  ref: any;
}

interface IState {
  width: number;
}

const WIDTH = Metrics.screenWidth;
const BUTTON_SIZE = 100;

class SwiperComponent extends React.Component<Props, IState> {
  private readonly position = new Value(0);
  private readonly lastPos = new Value(0);
  private readonly gestureX = new Value(0);
  private readonly stateG = new Value(-1);
  private readonly velocityX = new Value(0);
  private readonly clock = new Clock();
  private readonly swiped = new Value(-1);
  private readonly transX: any;
  private readonly onGestureEvent: any;
  private readonly swipeFromRef = new Value(0);
  private fullSwipeSubject = new Subject();

  constructor(props: Props) {
    super(props);
    this.state = {
      width: 0,
    };

    this.fullSwipeSubject.pipe(debounceTime(100)).subscribe(this.props.onFullSwipe || RA.noop);

    this.transX = this.interaction(this.gestureX, this.stateG, this.velocityX, this.swipeFromRef, () => {
      this.fullSwipeSubject.next("");
    });
    this.onGestureEvent = event([
      {
        nativeEvent: {
          translationX: this.gestureX,
          state: this.stateG,
          velocityX: this.velocityX,
        },
      },
    ]);
  }

  public swipe(show) {
    setTimeout(() => {
      this.swiped.setValue(show ? 1 : 2);
      this.stateG.setValue(State.END);
    }, 10);
  }

  public render() {
    const { backView, children } = this.props;
    return (
      <View>
        <PanGestureHandler {...this.props} minDeltaX={4} onGestureEvent={this.onGestureEvent} onHandlerStateChange={this.onGestureEvent}>
          <Animated.View onLayout={event1 => this.setState({ width: event1.nativeEvent.layout.width })} style={[{ transform: [{ translateX: this.transX }] }]}>
            {children}
          </Animated.View>
        </PanGestureHandler>
        <Animated.View
          style={[
            {
              width: this.state.width,
              transform: [{ translateX: add(this.transX, this.state.width) }],
            },
            styles.animatedViewStyle,
          ]}
        >
          {backView}
        </Animated.View>
        <View style={styles.swipeRightToPopOneScreenEnabler} />
      </View>
    );
  }

  private interaction = (gestureTranslation, gestureState, velocityX, swipe, onFullSwipe) => {
    const dragging = new Value(0);
    const start = new Value(0);

    return cond(Animated.lessOrEq(velocityX, 0), [
      cond(
        eq(gestureState, State.ACTIVE),
        [cond(dragging, 0, [set(dragging, 1), set(start, this.position)]), set(this.position, add(start, gestureTranslation))],
        cond(
          eq(gestureState, State.END),
          [
            set(dragging, 0),
            // Check if the item is dragged to the first position
            cond(
              Animated.or(Animated.greaterOrEq(this.position, -WIDTH / 6), Animated.eq(this.swiped, 1)),
              [
                set(this.lastPos, 0),
                set(
                  this.position,
                  runTiming(this.clock, this.position, 0, () => {
                    this.swiped.setValue(-1);
                  }),
                ),
              ],
              // if its more than the first position set accordingly
              cond(
                Animated.greaterOrEq(this.position, -WIDTH / 2.5),
                [set(this.lastPos, -BUTTON_SIZE), set(this.position, runTiming(this.clock, this.position, -BUTTON_SIZE))],
                // Last condition for full removal of view
                [set(this.lastPos, -WIDTH), set(this.position, runTiming(this.clock, this.position, -WIDTH, onFullSwipe))],
              ),
            ),
            this.position,
          ],
          [set(dragging, 0), this.lastPos],
        ),
      ),
    ]);
  };
}

export default SwiperComponent;
