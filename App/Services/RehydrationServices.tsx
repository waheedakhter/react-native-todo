import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore} from 'redux-persist';
import {StartupActions} from '../Reducers/StartupReducers';
import ReduxPersist from '../Config/ReduxPersist';

const updateReducers = store => {
  const reducerVersion = ReduxPersist.reducerVersion;
  const config = ReduxPersist.storeConfig;
  const startup = () => store.dispatch(StartupActions.startup());

  // Check to ensure latest reducer version
  AsyncStorage.getItem('reducerVersion')
    .then(localVersion => {
      if (localVersion !== reducerVersion) {
        // Purge store
        persistStore(store, config, startup).purge();
        AsyncStorage.setItem('reducerVersion', reducerVersion);
      } else {
        persistStore(store, config, startup);
      }
    })
    .catch(() => {
      persistStore(store, config, startup);
      AsyncStorage.setItem('reducerVersion', reducerVersion);
    });
};

export default {updateReducers};
