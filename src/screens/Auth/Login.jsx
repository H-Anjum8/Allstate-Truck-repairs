import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  ScrollView,
} from 'react-native';
import { Formik } from 'formik';
import { getValidationSchema } from '../../utils/validationSchema';
import BASE_COLORS from '../../utils/colors';
import CustomButton from '../../components/common/CustomButton';
import CustomInput from '../../components/common/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
// import { loginSuccess } from '../../store/slices/authSlice';
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FONTS, TextStyles } from '../../theme/fonts';
import AppWrapper from '../../components/AuthWrapper/AppWrapper';
import { isIOS } from '../../utils/helpers';
import CustomHeader from '../../components/CustomHeader/CustomHeader';

const Login = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { params } = useRoute();
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  // const {login_status, user_data} = useSelector(state => state.auth);
  // const loading = login_status === ASYNC_STATUS.LOADING;

  const { role } = params || {};

  console.log('Selected Role:', params);

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

  // Handle login
  const handleLogin = values => {
    console.log('Form Values:', values);
    // const loginObj = {
    //   email: values.email,
    //   password: values.password,
    // };
    // dispatch(loginAsync(loginObj));
    navigation.navigate('dashboard');
  };

  // useEffect(() => {
  //   if (login_status === ASYNC_STATUS.SUCCEEDED) {
  //     navigation.navigate('BottomTabs');
  //     dispatch(setLoginStatus());
  //   }
  // }, [login_status]);

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
            <Text style={styles.title}>Welcome Back !</Text>
            <Text style={styles.description}>
              Log in to connect with trusted mechanics and get your truck back
              on the road—fast and hassle-free.
            </Text>
          </View>

          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={getValidationSchema('login')}
            onSubmit={handleLogin}
          >
            {({ handleChange, handleSubmit, values, errors, touched }) => (
              <View style={{ gap: 20 }}>
                <CustomInput
                  placeholder="Phone Number or Email"
                  prefixIcon={
                    <Ionicons
                      name="mail-outline"
                      size={24}
                      color={BASE_COLORS.GRAY}
                    />
                  }
                  value={values.email}
                  onChangeText={handleChange('email')}
                  error={touched.email && errors.email}
                />
                <View>
                  <CustomInput
                    placeholder="Enter Your Password"
                    iconName="lock-closed-outline"
                    prefixIcon={
                      <Ionicons
                        name="lock-closed-outline"
                        size={24}
                        color={BASE_COLORS.GRAY}
                      />
                    }
                    secure
                    value={values.password}
                    onChangeText={handleChange('password')}
                    error={touched.password && errors.password}
                  />

                  <CustomButton
                    onPress={() => navigation.navigate('forgot_password')}
                    variant="text"
                    label={'Forgot Password?'}
                    style={{
                      alignSelf: 'flex-end',
                      paddingVertical: 0,
                      paddingHorizontal: 0,
                      margin: 0,
                      minWidth: 'auto',
                      // backgroundColor: 'red',
                      height: 'auto',
                    }}
                    textStyle={{
                      alignSelf: 'flex-end',
                      padding: 0,
                      margin: 0,
                      color: BASE_COLORS.SECONDARY,
                      fontWeight: '500',
                    }}
                  />
                </View>

                <CustomButton
                  label="Login"
                  onPress={handleSubmit}
                  style={{
                    marginBottom: 6,
                    marginTop: 47,
                  }}
                />
              </View>
            )}
          </Formik>

          <View style={styles.signupContainer}>
            <Text style={styles.footerText}>Don’t have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('signup')}>
              <Text style={styles.signupText}> Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </AppWrapper>
  );
};

export default Login;

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

  footerText: {
    ...TextStyles.bodySmall,
    fontWeight: '500',
    textAlign: 'center',
    color: BASE_COLORS.TEXT_TERNARY,
  },
  signupText: {
    ...TextStyles.bodySmall,
    color: BASE_COLORS.SECONDARY,
    fontWeight: '500',
  },
  signupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
