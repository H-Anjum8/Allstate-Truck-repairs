import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Formik } from 'formik';
import * as Yup from 'yup';

import AuthWrapper from '../../../../components/AuthWrapper';
import CustomHeader from '../../../../components/CustomHeaders';
import CustomTextInput from '../../../../components/CustomTextInput';
import CustomButton from '../../../../components/CustomButton';
import BASE_COLORS from '../../../../utils/colors';
import { FONTS } from '../../../../theme/fonts';
import { getValidationSchema } from '../../../../utils/validationSchema';

const EditProfile = () => {
  const navigation = useNavigation();

  return (
    <AuthWrapper>
      <CustomHeader
        leftIcon={
          <Ionicons name="chevron-back" size={24} color={BASE_COLORS.BLACK} />
        }
        onLeftPress={() => navigation.goBack()}
        username="Edit Profile"
        showUsername
        showWelcomeText={false}
        usernameTextStyle={{
          color: BASE_COLORS.BLACK,
          marginBottom: verticalScale(22),
        }}
        contentContainerStyle={{ alignItems: 'center' }}
      />

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Formik
          initialValues={{
            name: 'Mac Collins',
            email: 'maccollins@gmail.com',
            phone: '111–111–1111',
          }}
          validationSchema={getValidationSchema('edit_profile')}
          onSubmit={values => {
            console.log('Updated Info:', values);
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <>
              <Text style={styles.label}>Name</Text>
              <CustomTextInput
                value={values.name}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                textInputStyle={{ color: BASE_COLORS.BLACK }}
                leftIcon={
                  <Ionicons
                    name="person-outline"
                    size={20}
                    color={BASE_COLORS.BLACK}
                  />
                }
              />
              {touched.name && errors.name && (
                <Text style={styles.errorText}>{errors.name}</Text>
              )}

              <Text style={styles.label}>Email Address</Text>
              <CustomTextInput
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                textInputStyle={{ color: BASE_COLORS.BLACK }}
                leftIcon={
                  <Ionicons
                    name="mail-outline"
                    size={20}
                    color={BASE_COLORS.BLACK}
                  />
                }
              />
              {touched.email && errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}

              <Text style={styles.label}>Phone No.</Text>
              <CustomTextInput
                value={values.phone}
                onChangeText={handleChange('phone')}
                onBlur={handleBlur('phone')}
                textInputStyle={{ color: BASE_COLORS.BLACK }}
                leftIcon={
                  <Ionicons
                    name="call-outline"
                    size={20}
                    color={BASE_COLORS.BLACK}
                  />
                }
              />
              {touched.phone && errors.phone && (
                <Text style={styles.errorText}>{errors.phone}</Text>
              )}

              <CustomButton
                label="Save Changes"
                onPress={handleSubmit}
                style={styles.saveButton}
                textStyle={{ fontSize: 12 }}
              />
            </>
          )}
        </Formik>
      </ScrollView>
    </AuthWrapper>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
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
  saveButton: {
    marginHorizontal: 3,
    marginTop: 30,
    height: 53,
  },
});
