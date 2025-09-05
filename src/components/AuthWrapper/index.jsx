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
import { isIOS } from '../../utils/helpers';
import AppWrapper from './AppWrapper';

const AuthWrapper = ({ children }) => {
  return (
    <AppWrapper>
      <KeyboardAvoidingView
        style={styles.wrapper}
        behavior={isIOS ? 'padding' : undefined}
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </AppWrapper>
  );
};

export default AuthWrapper;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: BASE_COLORS.WHITE,
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: moderateScale(14),

    // paddingTop: moderateScale(8),
    // paddingBottom: moderateScale(20),
  },
});
