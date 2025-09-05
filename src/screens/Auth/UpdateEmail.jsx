import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Dimensions,
  ScrollView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomHeader from '../../components/CustomHeader/CustomHeader';
import CustomButton from '../../components/CustomButton';
import { getValidationSchema } from '../../utils/validationSchema';
import BASE_COLORS from '../../utils/colors';
import AppWrapper from '../../components/AuthWrapper/AppWrapper';
import { isIOS } from '../../utils/helpers';
import CustomInput from '../../components/common/CustomInput';
import { TextStyles } from '../../theme/fonts';

const { height, width } = Dimensions.get('window');

const UpdateEmail = () => {
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

  const handleSubmit = values => {
    navigation.goBack();
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
            <Text style={styles.title}>Update Your Email </Text>
            <Text style={styles.description}>
              It seems like you didn’t receive the email. Please enter a new
              email address, and we’ll send the verification code again.
            </Text>
          </View>

          <Formik
            initialValues={{ email: '' }}
            validationSchema={getValidationSchema('update_email')}
            onSubmit={handleSubmit}
          >
            {({ handleChange, handleSubmit, values, errors, touched }) => (
              <View
                style={{
                  justifyContent: 'space-between',
                  gap: height * 0.2,
                }}
              >
                <CustomInput
                  placeholder="Enter your email"
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

                <CustomButton label="Submit" onPress={handleSubmit} />
              </View>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </AppWrapper>
  );
};

export default UpdateEmail;

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
