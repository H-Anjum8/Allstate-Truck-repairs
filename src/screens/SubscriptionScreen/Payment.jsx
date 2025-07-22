// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   TouchableOpacity,
//   Platform,
// } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { moderateScale, verticalScale } from 'react-native-size-matters';
// import { useNavigation } from '@react-navigation/native';
// import { Formik } from 'formik';
// import BASE_COLORS from '../../utils/colors';
// import CustomButton from '../../components/commonComponents/CustomButton';
// import BackButton from '../../components/commonComponents/BackButton';
// import { getValidationSchema } from '../../utils/validationSchema';

// const Payment = () => {
//   const navigation = useNavigation();
//   const [showDatePicker, setShowDatePicker] = useState(false);

//   const handleDateChange = (event, selectedDate, setFieldValue) => {
//     setShowDatePicker(false);
//     if (selectedDate) {
//       const day = selectedDate.getDate();
//       const month = selectedDate.getMonth() + 1;
//       const year = selectedDate.getFullYear();
//       const formattedDate = `${day < 10 ? '0' + day : day}/${
//         month < 10 ? '0' + month : month
//       }/${year}`;
//       setFieldValue('expiryDate', formattedDate);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <BackButton />

//       <Text style={styles.heading}>Secure Your Subscription</Text>
//       <Text style={styles.subheading}>
//         Unlock powerful AI tools and expert support {'\n'} with a flexible
//         subscription.
//       </Text>

//       <Formik
//         initialValues={{ name: '', cardNumber: '', cvv: '', expiryDate: '' }}
//         validationSchema={getValidationSchema('payment')}
//         onSubmit={values => {
//           navigation.navigate('subcription_done');
//         }}
//       >
//         {({
//           handleChange,
//           handleBlur,
//           handleSubmit,
//           values,
//           errors,
//           touched,
//           setFieldValue,
//         }) => (
//           <>
//             {/* Card Holder Name */}
//             <Text style={styles.label}>Card Holder Name</Text>
//             <TextInput
//               placeholder="Name"
//               placeholderTextColor={BASE_COLORS.LIGHT_GRAY}
//               style={styles.input}
//               onChangeText={handleChange('name')}
//               onBlur={handleBlur('name')}
//               value={values.name}
//             />
//             {touched.name && errors.name && (
//               <Text style={styles.errorText}>{errors.name}</Text>
//             )}

//             {/* Card Number */}
//             <Text style={styles.label}>Card Number</Text>
//             <TextInput
//               placeholder="Card Number"
//               placeholderTextColor={BASE_COLORS.LIGHT_GRAY}
//               keyboardType="number-pad"
//               style={styles.input}
//               onChangeText={handleChange('cardNumber')}
//               onBlur={handleBlur('cardNumber')}
//               value={values.cardNumber}
//             />
//             {touched.cardNumber && errors.cardNumber && (
//               <Text style={styles.errorText}>{errors.cardNumber}</Text>
//             )}

//             {/* Expiry Date & CVV */}
//             <View style={styles.row}>
//               <View style={styles.halfColumn}>
//                 <Text style={styles.label}>Expiry Date</Text>
//                 <TouchableOpacity
//                   style={styles.inputWithIcon}
//                   onPress={() => setShowDatePicker(true)}
//                 >
//                   <Text
//                     style={
//                       values.expiryDate
//                         ? styles.expiryDateText
//                         : styles.expiryPlaceholder
//                     }
//                   >
//                     {values.expiryDate || 'DD/MM/YYYY'}
//                   </Text>
//                   <Ionicons
//                     name="calendar-outline"
//                     size={18}
//                     style={styles.calendarIcon}
//                   />
//                 </TouchableOpacity>
//                 {touched.expiryDate && errors.expiryDate && (
//                   <Text style={styles.errorText}>{errors.expiryDate}</Text>
//                 )}
//               </View>

//               <View style={styles.halfColumn}>
//                 <Text style={styles.label}>CVV</Text>
//                 <TextInput
//                   placeholder="CVV"
//                   placeholderTextColor={BASE_COLORS.LIGHT_GRAY}
//                   keyboardType="number-pad"
//                   style={styles.input}
//                   onChangeText={handleChange('cvv')}
//                   onBlur={handleBlur('cvv')}
//                   value={values.cvv}
//                 />
//                 {touched.cvv && errors.cvv && (
//                   <Text style={styles.errorText}>{errors.cvv}</Text>
//                 )}
//               </View>
//             </View>

//             {/* Date Picker */}
//             {showDatePicker && (
//               <DateTimePicker
//                 mode="date"
//                 display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
//                 value={new Date()}
//                 onChange={(e, date) => handleDateChange(e, date, setFieldValue)}
//               />
//             )}

//             {/* Secure Message */}
//             <View style={styles.secureRow}>
//               <Ionicons
//                 name="lock-closed-outline"
//                 size={16}
//                 style={styles.lockIcon}
//               />
//               <Text style={styles.secureText}>
//                 {'  '}Your payment is encrypted and secure.
//               </Text>
//             </View>

//             {/* Submit Button */}
//             <CustomButton
//               title="Pay & Activate Account"
//               onPress={handleSubmit}
//               buttonStyle={{
//                 paddingHorizontal: moderateScale(80),
//                 marginTop: 100,
//               }}
//               textStyle={{ fontSize: moderateScale(12) }}
//             />
//           </>
//         )}
//       </Formik>
//     </View>
//   );
// };

// export default Payment;
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 22,
//     backgroundColor: BASE_COLORS.WHITE,
//   },
//   heading: {
//     fontSize: 23,
//     fontWeight: '600',
//     fontFamily: 'Poppins_600SemiBold',
//     marginTop: verticalScale(52),
//     marginBottom: verticalScale(10),
//     color: BASE_COLORS.TEXT_GREEN,
//   },
//   subheading: {
//     fontSize: 13,
//     fontFamily: 'Poppins_400Regular',
//     marginBottom: verticalScale(15),
//     lineHeight: 18,
//     color: BASE_COLORS.TEXT_SECONDARY,
//   },
//   label: {
//     fontSize: 13,
//     marginBottom: 8,
//     fontFamily: 'Poppins_400Regular',
//     color: BASE_COLORS.DARK_GRAY,
//     fontWeight: 500,
//   },
//   input: {
//     borderWidth: 1.5,
//     borderColor: BASE_COLORS.TEXT_INPUT_FIELD,
//     borderRadius: 10,
//     padding: 14,
//     fontSize: 14,
//     marginBottom: verticalScale(20),
//     fontFamily: 'Poppins_400Regular',
//     color: BASE_COLORS.TEXT_DARK,
//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   halfColumn: {
//     width: '48%',
//   },
//   inputWithIcon: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1.5,
//     borderColor: BASE_COLORS.LIGHT_GRAY,
//     borderRadius: 10,
//     paddingHorizontal: 14,
//     paddingVertical: 14,
//     marginBottom: verticalScale(20),
//     justifyContent: 'space-between',
//   },
//   expiryPlaceholder: {
//     fontSize: 14,
//     fontFamily: 'Poppins_400Regular',
//     color: BASE_COLORS.LIGHT_GRAY,
//   },
//   expiryDateText: {
//     fontSize: 14,
//     fontFamily: 'Poppins_400Regular',
//     color: BASE_COLORS.TEXT_DARK,
//   },
//   secureRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: verticalScale(5),
//   },
//   secureText: {
//     fontSize: 12,
//     fontFamily: 'Poppins_400Regular',
//     color: BASE_COLORS.TEXT_SECONDARY,
//   },
//   calendarIcon: {
//     color: BASE_COLORS.LIGHT_GRAY,
//   },
//   lockIcon: {
//     color: BASE_COLORS.PRIMARY,
//   },
//   payButton: {
//     marginTop: verticalScale(145),
//     paddingHorizontal: moderateScale(80),
//     backgroundColor: BASE_COLORS.PRIMARY,
//   },
//   payButtonText: {
//     fontSize: moderateScale(14),
//     color: BASE_COLORS.WHITE,
//   },
//   errorText: {
//     color: BASE_COLORS.TEXT_RED,
//     fontSize: 12,
//     fontFamily: 'Poppins_400Regular',
//     marginBottom: 5,
//     marginTop: -20,
//   },
// });
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const Payment = () => {
  return (
    <View>
      <Text>Payment</Text>
    </View>
  );
};

export default Payment;

const styles = StyleSheet.create({});
