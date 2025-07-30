import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { moderateScale, verticalScale } from 'react-native-size-matters';

import AuthWrapper from '../../../../components/AuthWrapper';
import CustomHeader from '../../../../components/CustomHeaders';
import CustomTextInput from '../../../../components/CustomTextInput';
import CustomButton from '../../../../components/CustomButton';
import BASE_COLORS from '../../../../utils/colors';
import { FONTS } from '../../../../theme/fonts';
import { getValidationSchema } from '../../../../utils/validationSchema';

const ContactSupportScreen = () => {
  const navigation = useNavigation();

  return (
    <AuthWrapper>
      <CustomHeader
        leftIcon={
          <Ionicons name="chevron-back" size={24} color={BASE_COLORS.BLACK} />
        }
        onLeftPress={() => navigation.goBack()}
        username="Contact Support"
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
          initialValues={{ subject: '', message: '' }}
          validationSchema={getValidationSchema('contact_support')}
          onSubmit={values => {
            console.log('Support Message:', values);
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
              <Text style={styles.label}>Subject</Text>
              <CustomTextInput
                placeholder="Subject"
                value={values.subject}
                onChangeText={handleChange('subject')}
                onBlur={handleBlur('subject')}
                textInputStyle={styles.inputText}
              />
              {touched.subject && errors.subject && (
                <Text style={styles.errorText}>{errors.subject}</Text>
              )}

              <Text style={styles.label}>Message</Text>
              <CustomTextInput
                placeholder="Type here....."
                value={values.message}
                onChangeText={handleChange('message')}
                onBlur={handleBlur('message')}
                multiline
                numberOfLines={6}
                inputContainerStyle={[styles.messageInput]}
                textInputStyle={[
                  styles.inputText,
                  { height: verticalScale(120), textAlignVertical: 'top' },
                ]}
              />
              {touched.message && errors.message && (
                <Text style={styles.errorText}>{errors.message}</Text>
              )}

              <CustomButton
                label="Submit"
                onPress={handleSubmit}
                style={{ marginHorizontal: 3, marginTop: 40, height: 53 }}
                textStyle={{ fontSize: 12 }}
              />
            </>
          )}
        </Formik>
      </ScrollView>
    </AuthWrapper>
  );
};

export default ContactSupportScreen;

const styles = StyleSheet.create({
  /*  container: {
    paddingHorizontal: moderateScale(20),
    paddingBottom: verticalScale(30),
  }, */
  label: {
    fontSize: moderateScale(14),
    fontFamily: FONTS.REGULAR,
    color: BASE_COLORS.BLACK,
    marginBottom: verticalScale(8),
  },
  inputText: {
    color: BASE_COLORS.BLACK,
    fontFamily: FONTS.REGULAR,
    fontSize: moderateScale(13),
  },
  messageInput: {
    minHeight: verticalScale(180),
    alignItems: 'flex-start',
  },
  errorText: {
    fontSize: moderateScale(11),
    color: BASE_COLORS.TEXT_RED,
    marginTop: verticalScale(4),
    marginBottom: verticalScale(10),
  },
});
