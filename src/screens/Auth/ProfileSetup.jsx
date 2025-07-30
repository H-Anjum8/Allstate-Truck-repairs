import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView, // ✅ Added
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Dropdown } from 'react-native-element-dropdown';

import AuthWrapper from '../../components/AuthWrapper';
import CustomHeader from '../../components/CustomHeaders';
import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';
import BASE_COLORS from '../../utils/colors';
import { IMAGES } from '../../utils/appAssets';
import { getValidationSchema } from '../../utils/validationSchema';
import { vehicleTypes, locations } from '../../utils/staticData';

const ProfileSetup = () => {
  const navigation = useNavigation();
  const [imageUri, setImageUri] = useState(null);

  const pickImage = async () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 1024,
        maxHeight: 1024,
        quality: 1,
        includeBase64: false,
      },
      response => {
        if (
          !response.didCancel &&
          !response.errorCode &&
          response.assets?.length
        ) {
          setImageUri(response.assets[0].uri);
        }
      },
    );
  };

  return (
    <AuthWrapper>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={100}
        style={{ flex: 1 }} // ✅ Added
      >
        <ScrollView keyboardShouldPersistTaps="handled">
          {' '}
          {/* ✅ Added */}
          <CustomHeader
            leftIcon={
              <Ionicons
                name="chevron-back"
                size={24}
                color={BASE_COLORS.BLACK}
              />
            }
            onLeftPress={() => navigation.goBack()}
            username="Profile Setup"
            usernameTextStyle={{
              textAlign: 'center',
              marginTop: 10,
              alignSelf: 'flex-center',
              marginTop: 10,
              fontSize: 22,
            }}
            showUsername
            showDescription={false}
            showWelcomeText={false}
          />
          {/* Profile Image */}
          <View style={styles.profileImageContainer}>
            <Image
              source={imageUri ? { uri: imageUri } : IMAGES.PROFILE}
              style={styles.profileImage}
            />
            <TouchableOpacity style={styles.editIcon} onPress={pickImage}>
              <Ionicons name="pencil" size={14} color={BASE_COLORS.SECONDARY} />
            </TouchableOpacity>
          </View>
          <Formik
            initialValues={{
              fullName: '',
              email: '',
              phone: '',
              vehicleType: '',
              licensePlate: '',
              location: '',
            }}
            validationSchema={getValidationSchema('setup_profile')}
            onSubmit={values => {
              console.log('Form Submitted', values);
              navigation.navigate('signup_done');
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              setFieldValue,
            }) => (
              <>
                <CustomTextInput
                  placeholder="Your Full Name"
                  iconName="person-outline"
                  value={values.fullName}
                  onChangeText={handleChange('fullName')}
                  onBlur={handleBlur('fullName')}
                  //   error={touched.fullName && errors.fullName}
                />
                {touched.fullName && errors.fullName && (
                  <Text style={styles.errorText}>{errors.fullName}</Text>
                )}
                <CustomTextInput
                  placeholder="Enter Your Email"
                  iconName="mail-outline"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  error={touched.email && errors.email}
                />
                {touched.email && errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
                <CustomTextInput
                  placeholder="Enter Your Phone"
                  iconName="call-outline"
                  value={values.phone}
                  onChangeText={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  error={touched.phone && errors.phone}
                />
                {touched.phone && errors.phone && (
                  <Text style={styles.errorText}>{errors.phone}</Text>
                )}
                {/* Vehicle Type Dropdown */}
                <View style={[styles.dropdownWrapper, { zIndex: 100 }]}>
                  <Dropdown
                    style={styles.dropdown}
                    data={vehicleTypes}
                    labelField="label"
                    valueField="value"
                    placeholder="Vehicle Type"
                    value={values.vehicleType}
                    onChange={item => setFieldValue('vehicleType', item.value)}
                    renderLeftIcon={() => (
                      <Ionicons
                        name="car-outline"
                        size={20}
                        color={BASE_COLORS.TEXT_INPUT_FIELD}
                        style={styles.icon}
                      />
                    )}
                    placeholderStyle={{ color: BASE_COLORS.TEXT_INPUT_FIELD }}
                    iconColor={BASE_COLORS.SECONDARY}
                    selectedTextStyle={{ color: BASE_COLORS.TEXT_INPUT_FIELD }}
                  />
                  {touched.vehicleType && errors.vehicleType && (
                    <Text style={styles.errorText}>{errors.vehicleType}</Text>
                  )}
                </View>

                <CustomTextInput
                  placeholder="Vehicle License Plate"
                  iconName="clipboard-outline"
                  value={values.licensePlate}
                  onChangeText={handleChange('licensePlate')}
                  onBlur={handleBlur('licensePlate')}
                  error={touched.licensePlate && errors.licensePlate}
                />
                {touched.licensePlate && errors.licensePlate && (
                  <Text style={styles.errorText}>{errors.licensePlate}</Text>
                )}

                {/* Location Dropdown */}
                <View style={[styles.dropdownWrapper, { zIndex: 50 }]}>
                  <Dropdown
                    style={styles.dropdown}
                    data={locations}
                    labelField="label"
                    valueField="value"
                    placeholder="Location"
                    value={values.location}
                    onChange={item => setFieldValue('location', item.value)}
                    renderLeftIcon={() => (
                      <Ionicons
                        name="location-outline"
                        size={20}
                        color={BASE_COLORS.TEXT_INPUT_FIELD}
                        style={styles.icon}
                      />
                    )}
                    placeholderStyle={{ color: BASE_COLORS.TEXT_INPUT_FIELD }}
                    iconColor={BASE_COLORS.SECONDARY}
                    selectedTextStyle={{ color: BASE_COLORS.TEXT_INPUT_FIELD }}
                  />
                  {touched.location && errors.location && (
                    <Text style={styles.errorText}>{errors.location}</Text>
                  )}
                </View>

                <CustomButton
                  label="Save"
                  onPress={handleSubmit}
                  style={{ marginHorizontal: 3, marginTop: 48 }}
                />
              </>
            )}
          </Formik>
        </ScrollView>{' '}
        {/* ✅ Closed */}
      </KeyboardAvoidingView>
    </AuthWrapper>
  );
};

export default ProfileSetup;

const styles = StyleSheet.create({
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 28,
    marginTop: 20,
  },
  profileImage: {
    width: 96,
    height: 96,
    borderRadius: 20,
  },
  editIcon: {
    position: 'absolute',
    right: 106,
    bottom: 65,
    backgroundColor: BASE_COLORS.WHITE,
    borderRadius: 50,
    padding: 4,
    borderWidth: 1,
    borderColor: BASE_COLORS.SECONDARY,
  },
  dropdownWrapper: {
    marginHorizontal: 2,
    marginTop: 2,
    marginBottom: 8,
  },
  dropdown: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    zIndex: 1000, // ✅ Helps on Android
  },
  errorText: {
    color: 'red',

    fontSize: 12,
    marginLeft: 4,
    marginBottom: 2,
  },
  icon: {
    marginRight: 10,
  },
});
