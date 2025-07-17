/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StyleSheet, Text, View } from 'react-native';
import { FONTS } from './src/theme/fonts';

function App() {
  return (
    <View style={styles.container}>
      <Text style={{ fontFamily: FONTS.BOLD }}>wellcome</Text>
      {/* <Text>WELLCOME</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
