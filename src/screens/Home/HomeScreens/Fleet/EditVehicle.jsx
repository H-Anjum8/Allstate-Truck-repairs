import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { moderateScale, verticalScale } from 'react-native-size-matters';

import AuthWrapper from '../../../../components/AuthWrapper';
import CustomHeader from '../../../../components/CustomHeaders';
import CustomTextInput from '../../../../components/CustomTextInput';
import CustomButton from '../../../../components/CustomButton';
import { FONTS } from '../../../../theme/fonts';
import { getValidationSchema } from '../../../../utils/validationSchema';
import BASE_COLORS from '../../../../utils/colors';

const EditVehicle = ({ navigation }) => {
  const [isActive, setIsActive] = useState(false);

  const handleSubmit = values => {
    console.log({
      ...values,
      isActive,
    });
    // 🚀 Submit API call here
  };

  return (
    <AuthWrapper>
      {/* ✅ Custom Header updated for Edit Vehicle */}
      <CustomHeader
        leftIcon={<Ionicons name="chevron-back" size={24} color="black" />}
        onLeftPress={() => navigation.goBack()}
        username="Edit Vehicle"
        color="black"
        usernameTextStyle={{ fontSize: 24, color: 'black' }}
        showWelcomeText={false}
        showUsername={true}
      />

      <Formik
        initialValues={{
          vehicleName: '',
          make: '',
          model: '',
          year: '',
          licensePlate: '',
        }}
        validationSchema={getValidationSchema('EditVehicle')}
        onSubmit={handleSubmit}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={styles.formContainer}>
            {/* Vehicle Name */}
            <Text style={styles.label}>Vehicle Name</Text>
            <CustomTextInput
              placeholder="Enter Vehicle Name"
              value={values.vehicleName}
              onChangeText={handleChange('vehicleName')}
              onBlur={handleBlur('vehicleName')}
            />
            {touched.vehicleName && errors.vehicleName && (
              <Text style={styles.error}>{errors.vehicleName}</Text>
            )}

            {/* Make & Model */}
            <View style={styles.row}>
              <View style={styles.halfInput}>
                <Text style={styles.label}>Make</Text>
                <CustomTextInput
                  placeholder="Enter Make"
                  value={values.make}
                  onChangeText={handleChange('make')}
                  onBlur={handleBlur('make')}
                />
                {touched.make && errors.make && (
                  <Text style={styles.error}>{errors.make}</Text>
                )}
              </View>
              <View style={styles.halfInput}>
                <Text style={styles.label}>Model</Text>
                <CustomTextInput
                  placeholder="Enter Model"
                  value={values.model}
                  onChangeText={handleChange('model')}
                  onBlur={handleBlur('model')}
                />
                {touched.model && errors.model && (
                  <Text style={styles.error}>{errors.model}</Text>
                )}
              </View>
            </View>

            {/* Year */}
            <Text style={styles.label}>Year of Manufacture</Text>
            <CustomTextInput
              placeholder="Enter Year"
              keyboardType="numeric"
              value={values.year}
              onChangeText={handleChange('year')}
              onBlur={handleBlur('year')}
            />
            {touched.year && errors.year && (
              <Text style={styles.error}>{errors.year}</Text>
            )}

            {/* License Plate */}
            <Text style={styles.label}>License Plate Number</Text>
            <CustomTextInput
              placeholder="Enter License Plate"
              value={values.licensePlate}
              onChangeText={handleChange('licensePlate')}
              onBlur={handleBlur('licensePlate')}
            />
            {touched.licensePlate && errors.licensePlate && (
              <Text style={styles.error}>{errors.licensePlate}</Text>
            )}

            {/* Switch */}
            <View style={styles.switchRow}>
              <Text style={styles.switchLabel}>Mark As Active</Text>
              <Switch
                value={isActive}
                onValueChange={setIsActive}
                thumbColor={BASE_COLORS.WHITE}
                trackColor={{
                  false: BASE_COLORS.grey,
                  true: BASE_COLORS.PRIMARY,
                }}
              />
            </View>

            {/* button */}
            <CustomButton
              label="Save Changes"
              onPress={() => navigation.navigate('')}
              style={{ marginHorizontal: 3, marginTop: 40, height: 54 }}
              textStyle={{ fontSize: 14, color: 'white' }}
            />
          </View>
        )}
      </Formik>
    </AuthWrapper>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    marginTop: verticalScale(10),
    paddingHorizontal: moderateScale(6),
  },
  label: {
    fontFamily: FONTS.SF_PRO_DISPLAY_MEDIUM,
    fontSize: moderateScale(13),
    color: BASE_COLORS.BLACK,
    marginBottom: verticalScale(5),
    marginTop: verticalScale(10),
  },
  error: {
    fontFamily: FONTS.SF_PRO_DISPLAY_REGULAR,
    fontSize: moderateScale(12),
    color: BASE_COLORS.red,
    marginTop: verticalScale(3),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    flex: 0.48,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: verticalScale(20),
    marginBottom: verticalScale(10),
  },
  switchLabel: {
    fontFamily: FONTS.SF_PRO_DISPLAY_REGULAR,
    fontSize: moderateScale(14),
    color: BASE_COLORS.BLACK,
  },
});

export default EditVehicle;
