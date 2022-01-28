import { AnimatedClock, AnimatedNode, block, call, clockRunning, cond, Easing, set, startClock, stopClock, timing, Value } from "react-native-reanimated";

export const runTiming = (
  clock: AnimatedClock,
  value: AnimatedNode,
  dest: typeof AnimatedNode,
  onFinish?: () => void,
  config = {
    duration: 100,
    toValue: new Value(0),
    easing: Easing.inOut(Easing.ease),
  },
) => {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0),
  };
  return block([
    cond(
      clockRunning(clock),
      [
        // if the clock is already running we update the toValue, in case a new dest has been passed in
        set(config.toValue, dest),
      ],
      [
        // if the clock isn't running we reset all the animation params and start the clock
        set(state.finished, 0),
        set(state.time, 0),
        set(state.position, value),
        set(state.frameTime, 0),
        set(config.toValue, dest),
        startClock(clock),
      ],
    ),
    // we run the step here that is going to update position
    timing(clock, state, config),
    // if the animation is over we stop the clock
    cond(
      state.finished,
      block([
        stopClock(clock),
        call([state.finished], ([finished]) => {
          if (finished) {
            onFinish?.();
            set(state.finished, 0);
          }
        }),
      ]),
    ),
    // we made the block return the updated position
    state.position,
  ]);
};
