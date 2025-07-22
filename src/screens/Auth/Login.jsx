import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import { Formik } from 'formik';
import { getValidationSchema } from '../../utils/validationSchema';
import BASE_COLORS from '../../utils/colors';
import COLORS from '../../utils/colors';
import AuthWrapper from '../../components/AuthWrapper';
import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '../../store/slices/authSlice';
import { useNavigation } from '@react-navigation/native';
import CustomHeader from '../../components/CustomHeaders';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FONTS } from '../../theme/fonts';
const Login = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // Get role from route params or fallback to 'truck_owner'
  // const role = route?.params?.role || 'truck_owner';
  const role = useSelector(state => state.auth.role);
  return (
    <AuthWrapper>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <CustomHeader
          leftIcon={<Ionicons name="chevron-back" size={24} color="black" />}
          onLeftPress={() => navigation.goBack()}
          description="Log in to connect with trusted mechanics and get your truck back on the road—fast and hassle-free."
          username="Welcome Back !"
          showWelcomeText={false}
          showDescription={true}
          showUsername={true}
        />

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={getValidationSchema('login')}
          onSubmit={values => {
            console.log('Logging in with:', values);
            console.log('Role from Redux:', role);
            // Set role + user in Redux
            dispatch(
              loginSuccess({
                role,
                user: {
                  email: values.email,
                },
              }),
            );

            // Navigate based on role
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
                style={{ marginHorizontal: 3, marginBottom: 6 }}
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
      </KeyboardAvoidingView>
    </AuthWrapper>
  );
};

export default Login;

const styles = StyleSheet.create({
  errorText: {
    color: BASE_COLORS.TEXT_RED,
    fontSize: 12,
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
    fontFamily: FONTS.MEDIUM,
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
  },
});
