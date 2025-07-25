import { ImageBackground, StyleSheet, View } from 'react-native';
import React from 'react';
import { IMAGES } from '../utils/appAssets';
import BASE_COLORS from '../utils/colors';

const SplashScreen = () => {
  return (
    <ImageBackground
      source={IMAGES.SPLASH_SCREEN}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}></View>
    </ImageBackground>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: BASE_COLORS.PRIMARY,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
