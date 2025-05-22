import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { ThemeProvider, useTheme } from './src/context/ThemeContext'; // ajuste o path conforme necessário
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store'

function App(): React.JSX.Element {
  return (

    <Provider store={store}>
      <PersistGate
        loading={null} persistor={persistor}>
        <ThemeProvider>
          <AppNavigator />
        </ThemeProvider>
      </PersistGate>
    </Provider>

  );
}

export default App;
