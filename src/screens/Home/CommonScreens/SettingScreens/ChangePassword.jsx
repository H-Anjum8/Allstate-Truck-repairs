import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Formik } from 'formik';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import AuthWrapper from '../../../../components/AuthWrapper';
import CustomHeader from '../../../../components/CustomHeaders';
import CustomTextInput from '../../../../components/CustomTextInput';
import CustomButton from '../../../../components/CustomButton';
import BASE_COLORS from '../../../../utils/colors';
import { FONTS } from '../../../../theme/fonts';
import { getValidationSchema } from '../../../../utils/validationSchema';

const ChangePassword = () => {
  const navigation = useNavigation();

  return (
    <AuthWrapper>
      <CustomHeader
        leftIcon={
          <Ionicons name="chevron-back" size={24} color={BASE_COLORS.BLACK} />
        }
        onLeftPress={() => navigation.goBack()}
        username=""
        showUsername={false}
        showWelcomeText={false}
        usernameTextStyle={{
          marginTop: verticalScale(28),
          marginBottom: verticalScale(28),
        }}
        contentContainerStyle={{ alignItems: 'center' }}
      />

      <ScrollView
        contentContainerStyle={styles.formContainer}
        showsVerticalScrollIndicator={false}
      >
        <Formik
          initialValues={{
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
          }}
          validationSchema={getValidationSchema('change_password')}
          onSubmit={values => {
            console.log('Submitted:', values);
            navigation.navigate('Avatar');
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
              <Text style={styles.label}>Current Password</Text>
              <CustomTextInput
                placeholder="Enter Current Password"
                iconName="lock-closed-outline"
                secure
                value={values.currentPassword}
                onChangeText={handleChange('currentPassword')}
              />
              {errors.currentPassword && touched.currentPassword && (
                <Text style={styles.errorText}>{errors.currentPassword}</Text>
              )}

              <Text style={styles.label}>New Password</Text>
              <CustomTextInput
                placeholder="Enter New Password"
                iconName="lock-closed-outline"
                secure
                value={values.newPassword}
                onChangeText={handleChange('newPassword')}
              />
              {errors.newPassword && touched.newPassword && (
                <Text style={styles.errorText}>{errors.newPassword}</Text>
              )}

              <Text style={styles.label}>Confirm Password</Text>
              <CustomTextInput
                placeholder="Confirm New Password"
                iconName="lock-closed-outline"
                secure
                value={values.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
              />
              {errors.confirmPassword && touched.confirmPassword && (
                <Text style={styles.errorText}>{errors.confirmPassword}</Text>
              )}

              <CustomButton
                label="Save Changes"
                onPress={handleSubmit}
                style={{ marginHorizontal: 3, marginTop: 16, height: 53 }}
                textStyle={{ fontSize: 12 }}
              />
            </>
          )}
        </Formik>
      </ScrollView>
    </AuthWrapper>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  formContainer: {
    marginTop: verticalScale(40),
  },
  label: {
    fontSize: moderateScale(13),
    color: BASE_COLORS.BLACK,
    fontFamily: FONTS.MEDIUM,
    marginBottom: verticalScale(5),
    marginTop: verticalScale(6),
  },
  errorText: {
    fontSize: moderateScale(11),
    color: BASE_COLORS.TEXT_RED,
    marginTop: verticalScale(-2),
    marginBottom: verticalScale(5),
    fontFamily: FONTS.REGULAR,
  },
});
