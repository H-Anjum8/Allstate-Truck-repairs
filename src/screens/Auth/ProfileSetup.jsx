import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard, // ✅ Added
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import { Formik } from 'formik';
import { Dropdown } from 'react-native-element-dropdown';
import CustomHeader from '../../components/CustomHeader/CustomHeader';
import CustomButton from '../../components/CustomButton';
import BASE_COLORS, { getColorWithOpacity } from '../../utils/colors';
import { IMAGES } from '../../utils/appAssets';
import { getValidationSchema } from '../../utils/validationSchema';
import { locations, VEHICLE_TYPES } from '../../utils/staticData';
import AppWrapper from '../../components/AuthWrapper/AppWrapper';
import { isIOS } from '../../utils/helpers';
import { TextStyles } from '../../theme/fonts';
import CustomInput from '../../components/common/CustomInput';

const ProfileSetup = () => {
  const navigation = useNavigation();
  const [imageUri, setImageUri] = useState(null);
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

  const handleSubmit = values => {
    console.log('Form Submitted', values);
    navigation.navigate('upload_profile_image');
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
            <Text style={styles.title}>Profile Setup</Text>
          </View>
          <View style={styles.profileImageContainer}>
            <Image
              source={imageUri ? { uri: imageUri } : IMAGES.PROFILE}
              style={styles.profileImage}
            />
            <TouchableOpacity style={styles.editIcon} onPress={pickImage}>
              <AntDesign name="edit" size={20} color={BASE_COLORS.SECONDARY} />
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
            onSubmit={handleSubmit}
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
              <View style={{ gap: 20 }}>
                <CustomInput
                  placeholder="Your Full Name"
                  prefixIcon={
                    <Ionicons
                      name="person-outline"
                      size={24}
                      color={BASE_COLORS.GRAY}
                    />
                  }
                  value={values.fullName}
                  onChangeText={handleChange('fullName')}
                  error={touched.fullName && errors.fullName}
                />
                <CustomInput
                  placeholder="Enter Your Email"
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

                <CustomInput
                  placeholder="Enter Your Phone"
                  prefixIcon={
                    <Ionicons
                      name="call-outline"
                      size={24}
                      color={BASE_COLORS.GRAY}
                    />
                  }
                  value={values.phone}
                  onChangeText={handleChange('phone')}
                  error={touched.phone && errors.phone}
                />

                <View style={[styles.dropdownWrapper, { zIndex: 100 }]}>
                  <Dropdown
                    style={styles.dropdown}
                    data={VEHICLE_TYPES}
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

                <CustomInput
                  placeholder="Vehicle License Plate"
                  prefixIcon={
                    <Ionicons
                      name="clipboard-outline"
                      size={24}
                      color={BASE_COLORS.GRAY}
                    />
                  }
                  value={values.licensePlate}
                  onChangeText={handleChange('licensePlate')}
                  error={touched.licensePlate && errors.licensePlate}
                />

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
              </View>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </AppWrapper>
  );
};

export default ProfileSetup;

const styles = StyleSheet.create({
  title: {
    ...TextStyles.heading1,
    fontWeight: '500',
    color: BASE_COLORS.PRIMARY,
    textAlign: 'center',
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 28,
    marginTop: 20,
    position: 'relative',
    height: 100,
    width: 100,
    alignSelf: 'center',
  },
  profileImage: {
    width: 96,
    height: 96,
    borderRadius: 20,
  },
  editIcon: {
    position: 'absolute',
    right: -10,
    top: -10,
    backgroundColor: BASE_COLORS.WHITE,
    borderRadius: 50,
    padding: 7,
    borderWidth: 1,
    borderColor: getColorWithOpacity(BASE_COLORS.SECONDARY, 0.5),
  },
  dropdownWrapper: {
    marginHorizontal: 2,
    marginTop: 2,
    marginBottom: 8,
  },
  dropdown: {
    height: 50,
    borderColor: BASE_COLORS.BORDER_COLOR,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    zIndex: 1000, // ✅ Helps on Android
  },
  errorText: {
    color: BASE_COLORS.STATUS.ERROR,
    fontSize: 12,
    marginLeft: 4,
    marginBottom: 2,
  },
  icon: {
    marginRight: 10,
  },
});
