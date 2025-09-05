import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
  KeyboardAvoidingView,
  Keyboard,
  ScrollView,
} from 'react-native';
import { Formik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import BASE_COLORS from '../../utils/colors';
import CustomHeader from '../../components/CustomHeader/CustomHeader';
import { getValidationSchema } from '../../utils/validationSchema';
import { FONTS, TextStyles } from '../../theme/fonts';
import { useDispatch } from 'react-redux';
import { isIOS } from '../../utils/helpers';
import CustomInput from '../../components/common/CustomInput';
import AppWrapper from '../../components/AuthWrapper/AppWrapper';
import CustomButton from '../../components/common/CustomButton';

const Signup = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
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

  const openTerms = () => {
    Linking.openURL('https://yourapp.com/terms');
  };

  const openPrivacy = () => {
    Linking.openURL('https://yourapp.com/privacy');
  };

  // Handle login
  const handleSignup = values => {
    console.log('Form Values:', values);
    // const signupObj = {
    //   email: values.email,
    //   password: values.password,
    // };
    // dispatch(loginAsync(signupObj));

    if (!values.term_conditions) return;
    console.log('Signing up with:', values);
    navigation.navigate('signup_otp_verify');
  };

  const initialValues = {
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    term_conditions: false,
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
            <Text style={styles.title}>Create Your Account</Text>
            <Text style={styles.description}>
              Start your journey towards fast & hassle free Truck Repairs.
            </Text>
          </View>

          <Formik
            initialValues={initialValues}
            validationSchema={getValidationSchema('signup')}
            onSubmit={handleSignup}
          >
            {({
              handleChange,
              handleSubmit,
              values,
              errors,
              touched,
              setFieldValue,
            }) => (
              <View style={{ gap: 20 }}>
                <CustomInput
                  placeholder="Your Full Name"
                  prefixIcon={
                    <Ionicons
                      name="person-outline"
                      size={24}
                      color={BASE_COLORS.GRAY}
                    />
                  }
                  value={values.fullName}
                  onChangeText={handleChange('fullName')}
                  error={touched.fullName && errors.fullName}
                />

                <CustomInput
                  placeholder="info@gmail.com"
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

                <CustomInput
                  placeholder="Enter your phone number"
                  prefixIcon={
                    <Ionicons
                      name="call-outline"
                      size={24}
                      color={BASE_COLORS.GRAY}
                    />
                  }
                  value={values.phone}
                  onChangeText={handleChange('phone')}
                  keyboardType="phone-pad"
                  error={touched.phone && errors.phone}
                />

                <CustomInput
                  placeholder="Create Password"
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

                <CustomInput
                  placeholder="Confirm Password"
                  prefixIcon={
                    <Ionicons
                      name="lock-closed-outline"
                      size={24}
                      color={BASE_COLORS.GRAY}
                    />
                  }
                  secure
                  value={values.confirmPassword}
                  onChangeText={handleChange('confirmPassword')}
                  error={touched.confirmPassword && errors.confirmPassword}
                />

                {/* Checkbox Row */}
                <View style={styles.checkboxRow}>
                  <TouchableOpacity
                    style={[
                      styles.checkbox,
                      {
                        backgroundColor: values.term_conditions
                          ? BASE_COLORS.SECONDARY
                          : BASE_COLORS.WHITE,
                      },
                    ]}
                    onPress={() =>
                      setFieldValue('term_conditions', !values.term_conditions)
                    }
                  >
                    {values.term_conditions && (
                      <Ionicons
                        name="checkmark"
                        size={moderateScale(10)}
                        color={BASE_COLORS.WHITE}
                      />
                    )}
                  </TouchableOpacity>
                  <Text style={styles.termsText}>
                    By signing up, you agree to the{' '}
                    <Text style={styles.linkText} onPress={openTerms}>
                      Terms of Service
                    </Text>{' '}
                    and{' '}
                    <Text style={styles.linkText} onPress={openPrivacy}>
                      Privacy Policy
                    </Text>
                  </Text>
                </View>

                <CustomButton
                  label="Sign Up"
                  // disabled={!values.term_conditions}
                  onPress={handleSubmit}
                />
              </View>
            )}
          </Formik>

          <Text style={styles.footerText}>
            Already have an account?
            <Text
              style={styles.signupText}
              onPress={() => navigation.navigate('login_screen')}
            >
              {' '}
              Log In
            </Text>
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </AppWrapper>
  );
};

const styles = StyleSheet.create({
  footerText: {
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 15,
    fontFamily: FONTS.REGULAR,
    color: BASE_COLORS.TEXT_TERNARY,
    marginTop: 6,
  },
  signupText: {
    color: BASE_COLORS.TEXT_RED,
    fontWeight: '500',
  },
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
  checkboxRow: {
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'center',
    marginVertical: verticalScale(16),
  },
  checkbox: {
    width: moderateScale(14),
    height: moderateScale(14),
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: BASE_COLORS.SECONDARY,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginBottom: 15,
    marginTop: 3,
  },
  termsText: {
    ...TextStyles.bodySmall,
    flex: 1,
    color: BASE_COLORS.TEXT_GRAY,
    marginBottom: 16,
    fontWeight: '500',
  },
  linkText: {
    color: BASE_COLORS.TEXT_RED,
    fontWeight: '500',
  },
});

export default Signup;
