/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StyleSheet, Text, View } from 'react-native';
import SplashScreen from './src/screens/SplashScreen';
import Login from './src/screens/Auth/Login';

function App() {
  return (
    <View style={styles.container}>
      {/* <Text style={{ fontFamily: FONTS.BOLD }}>wellcome</Text> */}
      {/* <Text>WELLCOME</Text> */}
      <Login />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
