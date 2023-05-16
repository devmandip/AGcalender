import React, {useEffect} from 'react';
import AppNavigation from './src/navigation/AppNavigation';
import {Provider} from 'react-redux';
import {store, persistor} from './src/redux/Store';
import {PersistGate} from 'redux-persist/integration/react';
import {ToastProvider} from 'react-native-toast-notifications';

global.currentLocation;

global.editCropData = null;

const App = () => {
  useEffect(() => {
    // LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
    // LogBox.ignoreAllLogs();
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ToastProvider>
          <AppNavigation />
        </ToastProvider>
      </PersistGate>
    </Provider>
  );
};
export default App;
