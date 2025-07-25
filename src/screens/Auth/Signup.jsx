import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
  KeyboardAvoidingView,
} from 'react-native';
import { Formik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import BASE_COLORS from '../../utils/colors';
import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';
import AuthWrapper from '../../components/AuthWrapper';
import CustomHeader from '../../components/CustomHeaders';
import { getValidationSchema } from '../../utils/validationSchema';
import { FONTS } from '../../theme/fonts';

const Signup = () => {
  const navigation = useNavigation();
  const [agreeTerms, setAgreeTerms] = useState(false);

  const openTerms = () => {
    Linking.openURL('https://yourapp.com/terms');
  };

  const openPrivacy = () => {
    Linking.openURL('https://yourapp.com/privacy');
  };

  return (
    <AuthWrapper>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <CustomHeader
          leftIcon={<Ionicons name="chevron-back" size={24} color="black" />}
          onLeftPress={() => navigation.goBack()}
          showWelcomeText={false}
          showDescription={true}
          showUsername={true}
          username="Create Your Account"
          description="Start your journey towards fast & hassle free Truck Repairs. "
          usernameTextStyle={{ fontSize: 24 }}
          descriptionTextStyle={{
            textAlign: 'left',
            fontSize: 11,
            marginBottom: 30,
          }}
          onNotificationPress={() =>
            navigation.navigate('all_notifications_screen')
          }
          contentContainerStyle={{ alignItems: 'flex-start' }}
        />

        <Formik
          initialValues={{
            fullName: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={getValidationSchema('signup')}
          onSubmit={values => {
            if (!agreeTerms) return;
            console.log('Signing up with:', values);
            navigation.navigate('signup_otp_verify');
          }}
        >
          {({ handleChange, handleSubmit, values, errors, touched }) => (
            <>
              <CustomTextInput
                placeholder="Enter Your Full Name"
                iconName="person-outline"
                value={values.fullName}
                onChangeText={handleChange('fullName')}
              />
              {touched.fullName && errors.fullName && (
                <Text style={styles.errorText}>{errors.fullName}</Text>
              )}

              <CustomTextInput
                placeholder="Enter Your Email Address"
                iconName="mail-outline"
                value={values.email}
                onChangeText={handleChange('email')}
              />
              {touched.email && errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}

              <CustomTextInput
                placeholder="Phone Number"
                iconName="call-outline"
                value={values.phone}
                onChangeText={handleChange('phone')}
                keyboardType="phone-pad"
              />
              {touched.phone && errors.phone && (
                <Text style={styles.errorText}>{errors.phone}</Text>
              )}

              <CustomTextInput
                placeholder="Create Password"
                iconName="lock-closed-outline"
                secure
                value={values.password}
                onChangeText={handleChange('password')}
              />
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}

              <CustomTextInput
                placeholder="Confirm Password"
                iconName="lock-closed-outline"
                secure
                value={values.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <Text style={styles.errorText}>{errors.confirmPassword}</Text>
              )}

              {/* Checkbox Row */}
              <View style={styles.checkboxRow}>
                <TouchableOpacity
                  style={[
                    styles.checkbox,
                    {
                      backgroundColor: agreeTerms
                        ? BASE_COLORS.SECONDARY
                        : '#fff',
                    },
                  ]}
                  onPress={() => setAgreeTerms(!agreeTerms)}
                >
                  {agreeTerms && (
                    <Ionicons
                      name="checkmark"
                      size={moderateScale(10)}
                      color="#fff"
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
                disabled={!agreeTerms}
                onPress={handleSubmit}
                style={{
                  marginHorizontal: 3,
                  marginTop: 14,
                  marginBottom: 6,
                  height: 55,
                }}
              />
            </>
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
      </KeyboardAvoidingView>
    </AuthWrapper>
  );
};

const styles = StyleSheet.create({
  footerText: {
    textAlign: 'center',
    fontWeight: '400',
    fontSize: 15,
    fontFamily: FONTS.REGULAR,
    color: BASE_COLORS.TEXT_TERNARY,
  },
  signupText: {
    color: BASE_COLORS.TEXT_RED,
    fontFamily: 'Poppins_600SemiBold',
  },
  errorText: {
    color: BASE_COLORS.TEXT_RED,
    fontSize: 12,
    fontFamily: FONTS.REGULAR,
    marginBottom: 5,
    marginTop: -4,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
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
  },
  termsText: {
    flex: 1,
    fontSize: moderateScale(10),
    fontFamily: FONTS.MEDIUM,
    color: BASE_COLORS.TEXT_GRAY,
    marginBottom: 16,
  },
  linkText: {
    color: BASE_COLORS.TEXT_RED,
    fontFamily: 'Poppins_600SemiBold',
  },
});

export default Signup;
