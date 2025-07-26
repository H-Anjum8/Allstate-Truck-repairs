import React from 'react';
import {
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AuthWrapper from '../../../components/AuthWrapper';
import CustomHeader from '../../../components/CustomHeaders';
import CustomTextInput from '../../../components/CustomTextInput';
import CustomButton from '../../../components/CustomButton';
import BASE_COLORS from '../../../utils/colors';
import { getValidationSchema } from '../../../utils/validationSchema';
import { FONTS } from '../../../theme/fonts';

const ResetPassword = () => {
  const navigation = useNavigation();
  const role = useSelector(state => state.auth.role);

  const handlePasswordUpdate = values => {
    navigation.navigate('login_screen');
  };

  return (
    <AuthWrapper>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <CustomHeader
          leftIcon={<Ionicons name="chevron-back" size={24} color="black" />}
          onLeftPress={() => navigation.goBack()}
          description="Your new password will be different from the existing & previous ones."
          username="New Password"
          usernameTextStyle={{
            marginTop: -4,
            fontSize: 24,
          }}
          descriptionTextStyle={{
            textAlign: 'left',
            marginTop: 6,
            fontSize: 11,
            color: BASE_COLORS.BLACK,
          }}
          showWelcomeText={false}
          showDescription
          showUsername
        />

        <Formik
          initialValues={{ password: '', confirmPassword: '' }}
          validationSchema={getValidationSchema('newpassword')}
          onSubmit={handlePasswordUpdate}
          validateOnMount
          validateOnBlur
          validateOnChange
        >
          {({ handleChange, handleSubmit, values, errors, touched }) => (
            <>
              {/* Password Label + Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Password</Text>
                <CustomTextInput
                  placeholder="Enter your password"
                  iconName="lock-closed"
                  iconColor={BASE_COLORS.TEXT_RED}
                  value={values.password}
                  onChangeText={handleChange('password')}
                  secureTextEntry
                />
                {touched.password && errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}

                {/* Confirm Password Label + Input */}

                <Text style={styles.inputLabel}>Confirm Password</Text>
                <CustomTextInput
                  placeholder="Confirm your password"
                  iconName="lock-closed"
                  iconColor={BASE_COLORS.TEXT_RED}
                  value={values.confirmPassword}
                  onChangeText={handleChange('confirmPassword')}
                  secureTextEntry
                />
                {touched.confirmPassword && errors.confirmPassword && (
                  <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                )}
              </View>
              <CustomButton
                label="Confirm"
                onPress={handleSubmit}
                style={{
                  marginHorizontal: 3,
                  marginTop: 4,
                  height: 54,
                  marginBottom: 0,
                }}
              />
            </>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </AuthWrapper>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  inputGroup: {
    marginTop: 30,
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: FONTS.MEDIUM,
    color: '#000',
    marginTop: 4,
    marginBottom: 6,
    marginLeft: 4,
  },
  errorText: {
    color: BASE_COLORS.TEXT_RED,
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  button: {
    marginHorizontal: 3,
    marginTop: 24,
  },
});
