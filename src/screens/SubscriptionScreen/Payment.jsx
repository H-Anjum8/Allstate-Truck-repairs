import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  ScrollView,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { verticalScale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import CustomHeader from '../../components/CustomHeader/CustomHeader';
import CustomButton from '../../components/common/CustomButton';
import BASE_COLORS from '../../utils/colors';
import { getValidationSchema } from '../../utils/validationSchema';
import { FONTS, TextStyles } from '../../theme/fonts';
import AppWrapper from '../../components/AuthWrapper/AppWrapper';
import { isIOS } from '../../utils/helpers';
import CustomInput from '../../components/common/CustomInput';

const { height, width } = Dimensions.get('window');

const PaymentScreen = () => {
  const navigation = useNavigation();
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

  // Handle
  const handlePay = values => {
    console.log('Form Values:', values);

    navigation.navigate('subcription_done');
  };

  const initialValues = {
    cardHolderName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
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
            <Text style={styles.title}>Secure Your Subscription</Text>
            <Text style={styles.description}>
              Unlock exclusive tools and features that help you manage repairs
              and your fleet effortlessly.
            </Text>
          </View>

          <Formik
            initialValues={initialValues}
            validationSchema={getValidationSchema('payment')}
            onSubmit={handlePay}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              values,
              errors,
              touched,
            }) => {
              return (
                <View style={{ gap: 20 }}>
                  <CustomInput
                    label="Card Holder Name"
                    placeholder="Name"
                    prefixIcon={
                      <Ionicons
                        name="person-outline"
                        size={24}
                        color={BASE_COLORS.GRAY}
                      />
                    }
                    onChangeText={handleChange('cardHolderName')}
                    value={values.cardHolderName}
                    error={touched.cardHolderName && errors.cardHolderName}
                  />

                  <CustomInput
                    label="Card Number"
                    placeholder="Card Number"
                    prefixIcon={
                      <Ionicons
                        name="card-outline"
                        size={24}
                        color={BASE_COLORS.GRAY}
                      />
                    }
                    keyboardType="number-pad"
                    onChangeText={handleChange('cardNumber')}
                    value={values.cardNumber}
                    error={touched.cardNumber && errors.cardNumber}
                  />
                  <View>
                    {/* Expiry and CVV */}
                    <View style={styles.row}>
                      <View style={styles.halfColumn}>
                        <CustomInput
                          label="Expiry Date"
                          placeholder="MM/YY"
                          prefixIcon={
                            <Ionicons
                              name="calendar-outline"
                              size={24}
                              color={BASE_COLORS.GRAY}
                            />
                          }
                          onChangeText={handleChange('expiryDate')}
                          value={values.expiryDate}
                          error={touched.expiryDate && errors.expiryDate}
                        />
                      </View>

                      <View style={styles.halfColumn}>
                        <CustomInput
                          label={'CVV'}
                          placeholder="CVV"
                          prefixIcon={
                            <Ionicons
                              name="lock-closed-outline"
                              size={24}
                              color={BASE_COLORS.GRAY}
                            />
                          }
                          keyboardType="number-pad"
                          onChangeText={handleChange('cvv')}
                          value={values.cvv}
                          error={touched.cvv && errors.cvv}
                        />
                      </View>
                    </View>
                    {/* Secure Message */}
                    <View style={styles.secureRow}>
                      <Ionicons
                        name="lock-closed"
                        size={16}
                        color={BASE_COLORS.TEXT_RED}
                        style={styles.lockIcon}
                      />
                      <Text style={styles.secureText}>
                        {'  '}Your payment is encrypted and secure.
                      </Text>
                    </View>
                  </View>
                  {/* Date Picker */}
                  {/* {showDatePicker && (
                  <DateTimePicker
                    mode="date"
                    value={new Date()}
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    minimumDate={new Date()}
                    onChange={(event, selectedDate) => {
                      setShowDatePicker(false);
                      if (selectedDate) {
                        const formatted = `${
                          selectedDate.getMonth() + 1
                        }/${selectedDate.getFullYear()}`;
                        setFieldValue('expiryDate', formatted);
                      }
                    }}
                  />
                )} */}

                  <CustomButton
                    label="Pay & Activate Account"
                    onPress={handleSubmit}
                    style={{ marginTop: height * 0.1 }}
                  />
                </View>
              );
            }}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </AppWrapper>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  title: {
    ...TextStyles.heading1,
    fontWeight: '500',
    color: BASE_COLORS.PRIMARY,
    textAlign: 'center',
  },
  description: {
    ...TextStyles.bodySmall,
    fontWeight: '400',
    color: BASE_COLORS.DARK_GRAY,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  halfColumn: {
    flex: 1,
  },
  secureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(6),
    marginBottom: 70,
  },
  secureText: {
    fontSize: 12,
    fontFamily: FONTS.REGULAR,
    color: BASE_COLORS.TEXT_LIGHT,
  },
  lockIcon: {
    marginTop: 1,
  },
});
