import React, { useEffect, useState } from 'react';
import AppNavigator from './src/navigation/AppNavigator'; // update path as needed
import store from './src/store';
import { Provider } from 'react-redux';
import SplashScreen from './src/screens/SplashScreen';
import { StyleSheet } from 'react-native';

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <Provider store={store}>
      {showSplash ? <SplashScreen /> : <AppNavigator />}
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
