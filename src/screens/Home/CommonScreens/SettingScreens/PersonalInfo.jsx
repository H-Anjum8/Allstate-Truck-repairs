import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Formik } from 'formik';
import * as Yup from 'yup';

import CustomHeader from '../../../../components/CustomHeaders';
import CustomTextInput from '../../../../components/CustomTextInput';
import CustomButton from '../../../../components/CustomButton';

import BASE_COLORS from '../../../../utils/colors';
import { FONTS } from '../../../../theme/fonts';
import AuthWrapper from '../../../../components/AuthWrapper';
import { getValidationSchema } from '../../../../utils/validationSchema';

const PersonalInfo = () => {
  const navigation = useNavigation();

  return (
    <AuthWrapper>
      <CustomHeader
        leftIcon={
          <Ionicons name="chevron-back" size={24} color={BASE_COLORS.BLACK} />
        }
        onLeftPress={() => navigation.goBack()}
        username="Personal Information"
        showUsername
        showWelcomeText={false}
        usernameTextStyle={{
          color: BASE_COLORS.BLACK,
          marginBottom: verticalScale(22),
        }}
        contentContainerStyle={{ alignItems: 'center' }}
      />

      <Formik
        initialValues={{
          name: 'Mac Collins',
          email: 'maccollins@gmail.com',
          phone: '111–111–1111',
        }}
        validationSchema={getValidationSchema('personal_information')}
        onSubmit={values => {
          console.log('Submitted:', values);
          navigation.navigate('edit_profile'); // OR do something else
        }}
      >
        {({
          values,
          handleChange,
          handleSubmit,
          errors,
          touched,
          handleBlur,
        }) => (
          <ScrollView
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.label}>Name</Text>
            <CustomTextInput
              value={values.name}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              placeholder="Enter name"
              editable
            />
            {touched.name && errors.name && (
              <Text style={styles.errorText}>{errors.name}</Text>
            )}

            <Text style={styles.label}>Email Address</Text>
            <CustomTextInput
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              placeholder="Enter email"
              editable
            />
            {touched.email && errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}

            <Text style={styles.label}>Phone No.</Text>
            <CustomTextInput
              value={values.phone}
              onChangeText={handleChange('phone')}
              onBlur={handleBlur('phone')}
              placeholder="111–111–1111"
              editable
            />
            {touched.phone && errors.phone && (
              <Text style={styles.errorText}>{errors.phone}</Text>
            )}

            <CustomButton
              label="Edit"
              onPress={handleSubmit}
              style={{ marginHorizontal: 3, marginTop: 30, height: 53 }}
              textStyle={{ fontSize: 12 }}
            />
          </ScrollView>
        )}
      </Formik>
    </AuthWrapper>
  );
};

export default PersonalInfo;

const styles = StyleSheet.create({
  /*  container: {
    padding: moderateScale(20),
    paddingBottom: verticalScale(50),
  }, */
  headerTitle: {
    fontSize: moderateScale(22),
    fontFamily: FONTS.SEMI_BOLD,
    color: BASE_COLORS.BLACK,
  },
  label: {
    fontSize: moderateScale(14),
    fontFamily: FONTS.REGULAR,
    color: BASE_COLORS.BLACK,
    marginBottom: verticalScale(7),
    marginTop: verticalScale(6),
  },
  errorText: {
    fontSize: moderateScale(11),
    color: BASE_COLORS.TEXT_RED,
    marginBottom: verticalScale(4),
    marginTop: -verticalScale(3),
  },
});
