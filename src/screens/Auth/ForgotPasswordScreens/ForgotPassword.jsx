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
import AuthWrapper from '../../../components/AuthWrapper';
import CustomHeader from '../../../components/CustomHeaders';
import CustomButton from '../../../components/CustomButton';
import CustomTextInput from '../../../components/CustomTextInput';
import BASE_COLORS from '../../../utils/colors';
import { getValidationSchema } from '../../../utils/validationSchema';

const ForgotPassword = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const role = useSelector(state => state.auth.role);

  const handleLogin = values => {
    navigation.navigate('verify_otp');
  };

  return (
    <AuthWrapper>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <CustomHeader
          leftIcon={<Ionicons name="chevron-back" size={24} color="black" />}
          onLeftPress={() => navigation.goBack()}
          description="Kindly provide the registered email to change the passcode."
          username="Enter Your Email"
          showWelcomeText={false}
          usernameTextStyle={{ fontSize: 20, marginTop: 10 }}
          descriptionTextStyle={{
            textAlign: 'left',
            fontSize: 11,
            marginTop: 4,
            marginBottom: 30,
          }}
          showDescription
          showUsername
        />

        <Formik
          initialValues={{ email: '' }}
          validationSchema={getValidationSchema('add_email')}
          onSubmit={handleLogin}
        >
          {({ handleChange, handleSubmit, values, errors, touched }) => (
            <>
              <View
                style={{
                  height: 252,
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
                  style={{ marginHorizontal: 3, height: 56 }}
                />
              </View>
            </>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </AuthWrapper>
  );
};

export default ForgotPassword;

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
