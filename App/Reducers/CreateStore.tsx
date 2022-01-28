import {applyMiddleware, compose, createStore, Reducer} from 'redux';
import {createEpicMiddleware, Epic} from 'redux-observable';
import {Api} from '../Services/Api';
import Config from '../Config/DebugConfig';
import ScreenTracking from './ScreenTrackingMiddleware';

export interface IDependencies {
  api: Api;
  store: () => any;
}

// creates the store
export default (
  rootReducer: Reducer<any>,
  rootEpics: Epic,
  dependencies: IDependencies,
) => {
  /* ------------- Redux Configuration ------------- */
  const middleware = [];
  const enhancers = [];

  /* ------------- Analytics Middleware ------------- */
  if (Config.useReactotron) {
    middleware.push(ScreenTracking);
  }
  /* ------------- Epic Middleware ------------- */

  const epicMiddleWare = createEpicMiddleware({dependencies});
  middleware.push(epicMiddleWare);

  /* ------------- Assemble Middleware ------------- */

  enhancers.push(applyMiddleware(...middleware));

  const store = createStore(rootReducer, compose(...enhancers));

  // kick off root epics
  epicMiddleWare.run(rootEpics);

  return {
    store,
  };
};
