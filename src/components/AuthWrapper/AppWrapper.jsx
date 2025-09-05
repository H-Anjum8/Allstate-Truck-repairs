import React from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const AppWrapper = ({
  children,
  style,
  safeArea = true,
  statusBarStyle, // Manual override agar chahiye
  ...props
}) => {
  // Device theme detect karein
  const colorScheme =  useColorScheme() === 'dark';

  const Container = safeArea ? SafeAreaView : View;

  // Auto theme detection ke liye status bar style
  const getStatusBarStyle = () => {
    // Agar manual statusBarStyle pass kiya hai, toh use karein
    if (statusBarStyle) {
      return statusBarStyle;
    }

    // Device theme ke according set karein
    return colorScheme === 'dark' ? 'light-content' : 'dark-content';
  };

  return (
    <>
      <StatusBar
        barStyle={getStatusBarStyle()}
        // backgroundColor="transparent"
        // translucent={true}
      />
      <View style={[styles.gradient, style]} {...props}>
        <Container style={styles.container}>{children}</Container>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    
  },
});

export default AppWrapper;
