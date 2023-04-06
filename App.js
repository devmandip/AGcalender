import React, {useEffect} from 'react';
import AppNavigation from './src/navigation/AppNavigation';
import {Provider} from 'react-redux';
import {store, persistor} from './src/redux/Store';
import {PersistGate} from 'redux-persist/integration/react';

const App = () => {
  useEffect(() => {
    // LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
    // LogBox.ignoreAllLogs();
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppNavigation />
      </PersistGate>
    </Provider>
  );
};
export default App;
