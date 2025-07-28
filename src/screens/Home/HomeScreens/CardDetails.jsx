import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { verticalScale } from 'react-native-size-matters';
import { Formik } from 'formik';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import AuthWrapper from '../../../components/AuthWrapper';
import CustomHeader from '../../../components/CustomHeaders';
import { getValidationSchema } from '../../../utils/validationSchema';
import CustomTextInput from '../../../components/CustomTextInput';
import CustomButton from '../../../components/CustomButton';
import BASE_COLORS from '../../../utils/colors';
import { FONTS } from '../../../theme/fonts';

const CardDetails = () => {
  const navigation = useNavigation();
  const [showDatePicker, setShowDatePicker] = useState(false);

  return (
    <AuthWrapper>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <CustomHeader
          leftIcon={
            <Ionicons name="chevron-back" size={24} color={BASE_COLORS.BLACK} />
          }
          onLeftPress={() => navigation.goBack()}
          username="Card Details"
          description="Enter your card details below"
          showUsername
          showDescription
          showWelcomeText={false}
          usernameTextStyle={{
            fontSize: 20,
            color: BASE_COLORS.BLACK,
          }}
          descriptionTextStyle={{
            fontSize: 11,
            marginTop: 6,
            color: BASE_COLORS.BLACK,
          }}
          contentContainerStyle={{ alignItems: 'center' }}
        />

        <Formik
          initialValues={{
            cardHolderName: '',
            cardNumber: '',
            expiryDate: '',
            cvv: '',
          }}
          validationSchema={getValidationSchema('payment')}
          onSubmit={values => {
            console.log(values);
            navigation.navigate('booking_done');
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            values,
            errors,
            touched,
          }) => (
            <>
              {/* Card Holder Name */}
              <View style={styles.maincontainer}>
                <View style={styles.container}>
                  <Text style={styles.label}>Card Holder Name</Text>
                  <CustomTextInput
                    placeholder="Name"
                    iconName="person-outline"
                    onChangeText={handleChange('cardHolderName')}
                    onBlur={handleBlur('cardHolderName')}
                    value={values.cardHolderName}
                  />
                  {touched.cardHolderName && errors.cardHolderName && (
                    <Text style={styles.errorText}>
                      {errors.cardHolderName}
                    </Text>
                  )}

                  {/* Card Number */}
                  <Text style={styles.label}>Card Number</Text>
                  <CustomTextInput
                    placeholder="Card Number"
                    iconName="card-outline"
                    keyboardType="number-pad"
                    onChangeText={handleChange('cardNumber')}
                    onBlur={handleBlur('cardNumber')}
                    value={values.cardNumber}
                  />
                  {touched.cardNumber && errors.cardNumber && (
                    <Text style={styles.errorText}>{errors.cardNumber}</Text>
                  )}

                  {/* Expiry and CVV */}
                  <View style={styles.row}>
                    <View style={styles.halfColumn}>
                      <Text style={styles.label}>Expiry Date</Text>
                      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                        <CustomTextInput
                          placeholder="MM/YY"
                          iconName="calendar-outline"
                          editable={false}
                          value={values.expiryDate}
                        />
                      </TouchableOpacity>
                      {touched.expiryDate && errors.expiryDate && (
                        <Text style={styles.errorText}>
                          {errors.expiryDate}
                        </Text>
                      )}
                    </View>

                    <View style={styles.halfColumn}>
                      <Text style={styles.label}>CVV</Text>
                      <CustomTextInput
                        placeholder="CVV"
                        iconName="lock-closed-outline"
                        keyboardType="number-pad"
                        onChangeText={handleChange('cvv')}
                        onBlur={handleBlur('cvv')}
                        value={values.cvv}
                      />
                      {touched.cvv && errors.cvv && (
                        <Text style={styles.errorText}>{errors.cvv}</Text>
                      )}
                    </View>
                  </View>

                  {/* Date Picker */}
                  {showDatePicker && (
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
                  )}

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
                <CustomButton
                  label="Pay & Activate Account"
                  onPress={handleSubmit}
                  style={{
                    marginHorizontal: 0,
                    height: 56,
                    marginBottom: -26,
                  }}
                  textStyle={{ fontSize: 12 }}
                />
              </View>
            </>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </AuthWrapper>
  );
};

export default CardDetails;

const styles = StyleSheet.create({
  maincontainer: {
    height: '518',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  container: {
    marginTop: -8,
  },
  label: {
    fontSize: 11,
    marginBottom: 8,
    marginTop: 10,
    marginLeft: 4,
    fontFamily: FONTS.REGULAR,
    color: BASE_COLORS.TEXT_DARK,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  halfColumn: {
    width: '48%',
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
  headerTitle: {
    textAlign: 'center',
    fontSize: 24,
    marginLeft: 4,
  },
  headerDescription: {
    textAlign: 'center',
    paddingHorizontal: 4,
    marginBottom: 10,
  },
  errorText: {
    fontSize: 11,
    color: BASE_COLORS.SECONDARY,
    marginTop: -6,
    marginBottom: 6,
    marginLeft: 6,
  },
});
