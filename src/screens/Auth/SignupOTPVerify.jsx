import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Text,
  Keyboard,
} from 'react-native';
import CustomOTPInput from '../../components/common/CustomOTPInput';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import { FONTS, TextStyles } from '../../theme/fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';

// import { ASYNC_STATUS } from '../../utils/constants';
// import {
//   resendSignupOTPAsync,
//   verifySignupOTPAsync,
// } from '../../store/services/authService';
// import {
//   setResendSignupOtpStatus,
//   setVerifySignupOtpStatus,
// } from '../../store/slices/authSlice';
import CustomHeader from '../../components/CustomHeader/CustomHeader';
import BASE_COLORS from '../../utils/colors';
import CustomButton from '../../components/common/CustomButton';
import { isIOS } from '../../utils/helpers';
import { getValidationSchema } from '../../utils/validationSchema';
import AppWrapper from '../../components/AuthWrapper/AppWrapper';

const { height, width } = Dimensions.get('window');

const SignupOTPVerify = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [countdown, setCountdown] = useState(60); // 60 seconds countdown
  const [canResend, setCanResend] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  const timerRef = useRef(null);

  // const { verify_signup_otp_status, resend_signup_otp_status, user_data } =
  //   useSelector(state => state.auth);

  // const loading =
  //   verify_signup_otp_status === ASYNC_STATUS.LOADING ||
  //   resend_signup_otp_status === ASYNC_STATUS.LOADING;

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

  // Setup countdown timer
  useEffect(() => {
    startCountdownTimer();

    // Clear timer on component unmount
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const startCountdownTimer = useCallback(() => {
    setCanResend(false);
    setCountdown(60);

    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  // Format time to display as 00:59, 00:58, etc.
  const formatTime = useCallback(seconds => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  }, []);

  // Handle OTP verification
  const handleVerifyOTP = useCallback(values => {
    const dataObj = {
      // email: user_data?.email || '',
      code: values.otp || '',
    };
    console.log('OTP Values:', dataObj);
    // navigation.navigate('upload_profile_picture');
    // dispatch(verifySignupOTPAsync(dataObj));
    navigation.navigate('profile_setup');
  }, []);

  // Handle resend OTP
  const handleResendCode = useCallback(() => {
    // if (!canResend) return;
    const dataObj = {
      email: 'user_data?.email' || '',
    };
    // dispatch(resendSignupOTPAsync(dataObj));

    // Add your resend OTP API call here
  }, [
    canResend,
    // user_data,
    startCountdownTimer,
  ]);

  // Handle trying another email
  const handleTryAnotherEmail = useCallback(() => {
    navigation.navigate('update_email');
  }, [navigation]);

  // useEffect(() => {
  //   if (verify_signup_otp_status === ASYNC_STATUS.SUCCEEDED) {
  //     navigation.navigate('upload_profile_picture');
  //     dispatch(setVerifySignupOtpStatus());
  //   }
  // }, [verify_signup_otp_status]);

  // useEffect(() => {
  //   if (resend_signup_otp_status === ASYNC_STATUS.SUCCEEDED) {
  //     startCountdownTimer();
  //     dispatch(setResendSignupOtpStatus());
  //   }
  // }, [resend_signup_otp_status]);

  // Create memoized form render function to prevent unnecessary re-renders
  const renderForm = useCallback(
    ({
      handleSubmit,
      values,
      errors,
      touched,
      setFieldValue,
      setFieldTouched,
    }) => {
      // Only pass error to OTP input if the field is touched AND has an error
      const otpError = touched.otp && errors.otp;

      return (
        <View style={styles.formSection}>
          <View style={{ width: '100%', marginBottom: height * 0.05 }}>
            {/* OTP Input - Using existing component */}
            <CustomOTPInput
              length={4}
              onOTPComplete={otp => {
                setFieldValue('otp', otp);
              }}
              onChangeOTP={otp => {
                setFieldValue('otp', otp);
              }}
              error={otpError}
              autoFocus={true}
              containerStyle={styles.otpContainer}
            />

            {/* Resend OTP with Timer */}
            <View style={styles.resendContainer}>
              {canResend ? (
                <TouchableOpacity onPress={handleResendCode}>
                  <Text style={styles.resendActiveText}>Re-send code</Text>
                </TouchableOpacity>
              ) : (
                <View style={styles.timerContainer}>
                  <Text style={styles.resendText}>Re-send code in </Text>
                  <Text style={styles.timerText}>{formatTime(countdown)}</Text>
                </View>
              )}
            </View>

            <CustomButton
              label="Verify"
              onPress={handleSubmit}
              style={{ marginTop: 20 }}
            />
          </View>

          {/* Additional Help */}
          <View style={styles.helpContainer}>
            <Text style={styles.helpText}>
              Didn't receive the email? Check your spam filter or try{' '}
              <Text onPress={handleTryAnotherEmail} style={styles.linkText}>
                another email address
              </Text>
            </Text>
          </View>
        </View>
      );
    },
    [
      canResend,
      countdown,
      formatTime,
      handleResendCode,
      handleTryAnotherEmail,
      height,
    ],
  );

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
            },
          ]}
          keyboardShouldPersistTaps="handled"
        >
          <View style={{ gap: 10, marginVertical: 20 }}>
            <Text style={styles.title}>Verify OTP</Text>
            <Text style={styles.description}>
              Enter the 4-digit code sent to info@gmail.com
              {/* {user_data?.email} */}
            </Text>
          </View>
          {/* Form Section */}
          <Formik
            initialValues={{ otp: '' }}
            validationSchema={getValidationSchema('signup_verify_otp')}
            onSubmit={handleVerifyOTP}
          >
            {renderForm}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
      {/* <CustomLoader visible={loading} /> */}
    </AppWrapper>
  );
};

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
  otpContainer: {
    marginBottom: height * 0.03,
    width: '80%',
    alignItems: 'center',
    alignSelf: 'center',
  },
  resendContainer: {
    alignItems: 'center',
    marginBottom: height * 0.04,
  },
  resendText: {
    fontSize: 14,
    fontFamily: FONTS.REGULAR,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerText: {
    fontSize: 14,
    fontFamily: FONTS.MEDIUM,
    color: BASE_COLORS.PRIMARY,
  },
  resendActiveText: {
    fontSize: 14,
    fontFamily: FONTS.REGULAR,
  },
  submitButton: {
    marginBottom: height * 0,
  },
  helpContainer: {
    marginTop: height * 0.01,
  },
  helpText: {
    ...TextStyles.bodySmall,
    fontFamily: FONTS.REGULAR,
  },
  linkText: {
    ...TextStyles.bodySmall,
    fontWeight: '500',
    color: BASE_COLORS.SECONDARY,
    textDecorationLine: 'underline',
  },
});

export default memo(SignupOTPVerify);
