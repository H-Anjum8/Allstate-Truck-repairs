import React, { useEffect, useState } from 'react';
import {
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  View,
  Keyboard,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Formik } from 'formik';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getValidationSchema } from '../../../utils/validationSchema';
import BASE_COLORS from '../../../utils/colors';
import { TextStyles } from '../../../theme/fonts';
import AppWrapper from '../../../components/AuthWrapper/AppWrapper';
import CustomHeader from '../../../components/CustomHeader/CustomHeader';
import { isIOS } from '../../../utils/helpers';
import CustomButton from '../../../components/common/CustomButton';
import CustomInput from '../../../components/common/CustomInput';

const { height, width } = Dimensions.get('window');

const ResetPassword = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { params } = useRoute();
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  // Keyboard listeners
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      e => {
        setKeyboardHeight(e.endCoordinates.height);
        setIsKeyboardVisible(true);
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardHeight(0);
        setIsKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidShowListener?.remove();
      keyboardDidHideListener?.remove();
    };
  }, []);

  const handlePasswordUpdate = values => {
    navigation.navigate('login_screen');
  };

  return (
    <AppWrapper style={{ paddingHorizontal: 16 }}>
      <CustomHeader
        leftIcon={
          <Ionicons name="chevron-back" size={24} color={BASE_COLORS.BLACK} />
        }
        onLeftPress={() => navigation.goBack()}
      />
      <KeyboardAvoidingView
        behavior={isIOS ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={isIOS ? 0 : 20}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            {
              paddingBottom: isKeyboardVisible ? keyboardHeight - 200 : 100, // Extra padding when keyboard is visible
              flexGrow: 1,
            },
          ]}
          keyboardShouldPersistTaps="handled"
        >
          <View style={{ gap: 10, marginVertical: 20 }}>
            <Text style={styles.title}>New Password</Text>
            <Text style={styles.description}>
              Your new password will be different from the existing & previous
              ones.
            </Text>
          </View>

          <Formik
            initialValues={{ password: '', confirmPassword: '' }}
            validationSchema={getValidationSchema('newpassword')}
            onSubmit={handlePasswordUpdate}
          >
            {({ handleChange, handleSubmit, values, errors, touched }) => (
              <View style={{ gap: 20 }}>
                <CustomInput
                  label="Password"
                  placeholder="Enter your password"
                  prefixIcon={
                    <Ionicons
                      name="lock-closed-outline"
                      size={24}
                      color={BASE_COLORS.GRAY}
                    />
                  }
                  value={values.password}
                  onChangeText={handleChange('password')}
                  secure
                  error={touched.password && errors.password}
                />
                <CustomInput
                  label="Confirm Password"
                  placeholder="Confirm your password"
                  prefixIcon={
                    <Ionicons
                      name="lock-closed-outline"
                      size={24}
                      color={BASE_COLORS.GRAY}
                    />
                  }
                  value={values.confirmPassword}
                  onChangeText={handleChange('confirmPassword')}
                  secure
                  error={touched.confirmPassword && errors.confirmPassword}
                />

                <CustomButton
                  label="Confirm"
                  onPress={handleSubmit}
                  style={{ marginVertical: height * 0.1 }}
                />
              </View>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </AppWrapper>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  title: {
    ...TextStyles.heading1,
    fontWeight: '500',
    color: BASE_COLORS.PRIMARY,
  },
  description: {
    ...TextStyles.bodySmall,
    fontWeight: '400',
    color: BASE_COLORS.DARK_GRAY,
  },
});
