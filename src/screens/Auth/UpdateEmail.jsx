import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import Ionicons from 'react-native-vector-icons/Ionicons';

import AuthWrapper from '../../components/AuthWrapper';
import CustomHeader from '../../components/CustomHeaders';
import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';

import { loginSuccess } from '../../store/slices/authSlice';
import { getValidationSchema } from '../../utils/validationSchema';
import BASE_COLORS from '../../utils/colors';

const UpdateEmail = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const role = useSelector(state => state.auth.role);

  const handleLogin = values => {
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
          description="It seems like you didn’t receive the email. Please enter a new email address, and we’ll send the verification code again."
          username="Update Your Email "
          usernameTextStyle={{ fontSize: 22, marginTop: -4 }}
          descriptionTextStyle={{
            textAlign: 'left',
            fontSize: 10,
            paddingHorizontal: 2,
            marginBottom: 25,
          }}
          showWelcomeText={false}
          showDescription={true}
          showUsername={true}
        />

        <Formik
          initialValues={{ email: '' }}
          validationSchema={getValidationSchema('login')}
          onSubmit={handleLogin}
        >
          {({ handleChange, handleSubmit, values, errors, touched }) => (
            <>
              <View
                style={{
                  height: 254,
                  justifyContent: 'space-between',
                }}
              >
                <CustomTextInput
                  placeholder="Enter your email"
                  iconName="mail-outline"
                  iconColor={BASE_COLORS.TEXT_RED}
                  value={values.email}
                  onChangeText={handleChange('email')}
                />
                {touched.email && errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}

                <CustomButton
                  label="Submit"
                  onPress={handleSubmit}
                  style={{ marginHorizontal: 3 }}
                />
              </View>
            </>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </AuthWrapper>
  );
};

export default UpdateEmail;

const styles = StyleSheet.create({
  errorText: {
    color: BASE_COLORS.TEXT_RED,
    fontSize: 12,
    marginBottom: 12,
    marginTop: -4,
  },
  button: {
    marginHorizontal: 3,
    marginBottom: 6,
    marginVertical: 223,
  },
});
