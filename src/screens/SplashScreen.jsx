import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  View,
} from 'react-native';
import React from 'react';
import { IMAGES } from '../utils/appAssets';
import BASE_COLORS from '../utils/colors';
import AppWrapper from '../components/AuthWrapper/AppWrapper';

const { width, height } = Dimensions.get('window');

const SplashScreen = () => {
  return (
    <AppWrapper safeArea={false}>
      <View
        style={{
          flex: 1,
          backgroundColor: BASE_COLORS.PRIMARY,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Image
          source={IMAGES.LOGO}
          style={styles.background}
          resizeMode="contain"
        />
      </View>
    </AppWrapper>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: width * 0.8,
    height: 74,
    backgroundColor: BASE_COLORS.PRIMARY,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
