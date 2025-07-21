import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import { getValidationSchema } from '../../utils/validationSchema';
import BASE_COLORS from '../../utils/colors';
import COLORS from '../../utils/colors'; // make sure COLORS is exported too
import AuthWrapper from '../../components/AuthWrapper';
import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';

const Login = () => {
  const navigation = useNavigation();

  return (
    <AuthWrapper
      navigation={navigation}
      title="Welcome Back !"
      description="Log in to connect with trusted mechanics and get your truck back on the road—fast and hassle-free."
      showUsername={true}
      showDescription={true}
      showWelcomeText={false}
    >
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={getValidationSchema('login')}
        onSubmit={values => {
          console.log('Logging in with:', values);
          navigation.navigate('dashboard');
        }}
      >
        {({ handleChange, handleSubmit, values, errors, touched }) => (
          <>
            <CustomTextInput
              placeholder="Phone Number or Email"
              iconName="mail-outline"
              value={values.email}
              onChangeText={handleChange('email')}
            />
            {touched.email && errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}

            <CustomTextInput
              placeholder="Enter Your Password"
              iconName="lock-closed-outline"
              secure
              value={values.password}
              onChangeText={handleChange('password')}
            />
            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            <TouchableOpacity style={styles.forgotButton}>
              <Text
                style={styles.forgotText}
                onPress={() => navigation.navigate('forgot_password')}
              >
                Forgot Password?
              </Text>
            </TouchableOpacity>

            <CustomButton
              label="Login"
              onPress={handleSubmit}
              style={styles.button}
            />
          </>
        )}
      </Formik>

      <View style={styles.signupContainer}>
        <Text style={styles.footerText}>Don’t have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('signup')}>
          <Text style={styles.signupText}> Sign Up</Text>
        </TouchableOpacity>
      </View>
    </AuthWrapper>
  );
};

export default Login;

const styles = StyleSheet.create({
  errorText: {
    color: COLORS.TEXT_RED,
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
    marginBottom: 12,
    marginTop: -4,
  },
  forgotButton: {
    alignSelf: 'flex-end',
    marginBottom: 25,
  },
  forgotText: {
    fontSize: 12,
    color: BASE_COLORS.TEXT_RED,
  },
  button: {
    marginTop: 20,
  },
  footerText: {
    textAlign: 'center',
    fontSize: 13,
    fontFamily: 'Poppins_400Regular',
    color: COLORS.TEXT_TERNARY,
  },
  signupText: {
    color: BASE_COLORS.TEXT_RED,
    fontFamily: 'Poppins_600SemiBold',
  },
  signupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
});
