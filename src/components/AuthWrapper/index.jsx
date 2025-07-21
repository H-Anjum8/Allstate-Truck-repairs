import React from 'react';
import {
  View,
  StyleSheet,
  Platform,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import BASE_COLORS from '../../utils/colors';

const AuthWrapper = ({ children }) => {
  return (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AuthWrapper;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: BASE_COLORS.WHITE,
    // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: moderateScale(14),
    paddingTop: moderateScale(8),
    paddingBottom: moderateScale(20),
  },
});
