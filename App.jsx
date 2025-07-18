import React from 'react';
import { Provider } from 'react-redux';
import AppNavigator from './src/navigation/AppNavigator'; // update path as needed
import store from './src/store';
import { Text } from 'react-native';

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
      {/* <Text>wellcome hi</Text> */}
    </Provider>
  );
};

export default App;
