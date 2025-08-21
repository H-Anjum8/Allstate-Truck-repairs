import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { launchImageLibrary } from 'react-native-image-picker';
import { Formik } from 'formik';
import { getValidationSchema } from '../../../../utils/validationSchema';
import AuthWrapper from '../../../../components/AuthWrapper';
import CustomHeader from '../../../../components/CustomHeaders';
import CustomTextInput from '../../../../components/CustomTextInput';
import CustomButton from '../../../../components/CustomButton';
import BASE_COLORS from '../../../../utils/colors';
import FONTS from '../../../../theme/fonts';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const EditDriver = ({ navigation, route }) => {
  const [vehicle, setVehicle] = useState('Truck 1');
  const [showDropdown, setShowDropdown] = useState(false);
  const [photo, setPhoto] = useState(null);

  const vehicles = ['Truck 1', 'Truck 2', 'Truck 3'];

  // If editing existing driver (prefill values from route.params)
  const driverData = route?.params?.driver || {
    fullName: 'Mac Collins',
    phone: '1234567890',
    email: 'mac@example.com',
    licenseNumber: '2022',
    licenseExpiry: '2026-01-01',
    vehicle: 'Truck 1',
    photo: null,
  };

  // set initial values
  const initialValues = {
    fullName: driverData.fullName,
    phone: driverData.phone,
    email: driverData.email,
    licenseNumber: driverData.licenseNumber,
    licenseExpiry: driverData.licenseExpiry,
  };

  // 📌 pick image
  const handlePickPhoto = () => {
    launchImageLibrary({ mediaType: 'photo' }, response => {
      if (response?.assets && response.assets.length > 0) {
        setPhoto(response.assets[0].uri);
      }
    });
  };

  return (
    <AuthWrapper>
      <CustomHeader
        leftIcon={<Ionicons name="chevron-back" size={24} color="black" />}
        onLeftPress={() => navigation.goBack()}
        username="Edit Driver"
        color="black"
        usernameTextStyle={{ fontSize: 24 }}
        showWelcomeText={false}
        showUsername={true}
      />

      <Formik
        initialValues={initialValues}
        validationSchema={getValidationSchema('editDriver')}
        onSubmit={values => {
          console.log('Driver Updated ✅', { ...values, vehicle, photo });
          navigation.navigate('Driver Updated');
        }}
      >
        {({
          handleChange,
          handleSubmit,
          values,
          errors,
          touched,
          setFieldTouched,
        }) => (
          <View style={styles.container}>
            {/* Full Name */}
            <Text style={styles.label}>Full Name</Text>
            <CustomTextInput
              placeholder="Enter Name"
              value={values.fullName}
              onChangeText={handleChange('fullName')}
              onBlur={() => setFieldTouched('fullName')}
              containerStyle={styles.inputContainer}
              textInputStyle={styles.inputText}
            />
            {touched.fullName && errors.fullName && (
              <Text style={styles.errorText}>{errors.fullName}</Text>
            )}

            {/* Phone */}
            <Text style={styles.label}>Phone Number</Text>
            <CustomTextInput
              placeholder="1234567890"
              value={values.phone}
              onChangeText={handleChange('phone')}
              onBlur={() => setFieldTouched('phone')}
              keyboardType="phone-pad"
              containerStyle={styles.inputContainer}
              textInputStyle={styles.inputText}
            />
            {touched.phone && errors.phone && (
              <Text style={styles.errorText}>{errors.phone}</Text>
            )}

            {/* Email */}
            <Text style={styles.label}>Email Address</Text>
            <CustomTextInput
              placeholder="example@email.com"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={() => setFieldTouched('email')}
              keyboardType="email-address"
              containerStyle={styles.inputContainer}
              textInputStyle={styles.inputText}
            />
            {touched.email && errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}

            {/* License Number */}
            <Text style={styles.label}>License Number</Text>
            <CustomTextInput
              placeholder="Enter License"
              value={values.licenseNumber}
              onChangeText={handleChange('licenseNumber')}
              onBlur={() => setFieldTouched('licenseNumber')}
              containerStyle={styles.inputContainer}
              textInputStyle={styles.inputText}
            />
            {touched.licenseNumber && errors.licenseNumber && (
              <Text style={styles.errorText}>{errors.licenseNumber}</Text>
            )}

            {/* License Expiry */}
            <Text style={styles.label}>License Expiry Date</Text>
            <CustomTextInput
              placeholder="YYYY-MM-DD"
              value={values.licenseExpiry}
              onChangeText={handleChange('licenseExpiry')}
              onBlur={() => setFieldTouched('licenseExpiry')}
              containerStyle={styles.inputContainer}
              textInputStyle={styles.inputText}
            />
            {touched.licenseExpiry && errors.licenseExpiry && (
              <Text style={styles.errorText}>{errors.licenseExpiry}</Text>
            )}

            {/* Assigned Vehicle */}
            <Text style={styles.label}>Assigned Vehicle</Text>
            <TouchableOpacity
              style={[styles.inputContainer, styles.dropdown]}
              onPress={() => setShowDropdown(true)}
            >
              <Text style={styles.inputText}>{vehicle}</Text>
              <Ionicons
                name="chevron-down"
                size={18}
                color={BASE_COLORS.BLACK}
              />
            </TouchableOpacity>

            <Modal visible={showDropdown} transparent animationType="fade">
              <TouchableOpacity
                style={styles.modalOverlay}
                onPress={() => setShowDropdown(false)}
              >
                <View style={styles.modalContent}>
                  <FlatList
                    data={vehicles}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={styles.modalItem}
                        onPress={() => {
                          setVehicle(item);
                          setShowDropdown(false);
                        }}
                      >
                        <Text style={styles.modalText}>{item}</Text>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              </TouchableOpacity>
            </Modal>

            {/* Upload Photo */}
            <Text style={styles.label}>Upload Photos</Text>
            <TouchableOpacity
              style={styles.uploadBox}
              onPress={handlePickPhoto}
            >
              <Text style={styles.uploadText}>
                {photo ? 'Photo Selected' : 'Add your Photo'}
              </Text>
              <Ionicons name="add" size={22} color={BASE_COLORS.BLACK} />
            </TouchableOpacity>

            {/* Submit */}
            <CustomButton
              label="Save Changes"
              onPress={handleSubmit}
              style={{ marginHorizontal: 3, marginTop: 20, height: 54 }}
              textStyle={{ fontSize: 14 }}
            />
          </View>
        )}
      </Formik>
    </AuthWrapper>
  );
};

export default EditDriver;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: moderateScale(7),
  },
  label: {
    fontSize: 14,
    fontFamily: FONTS.MEDIUM,
    color: BASE_COLORS.BLACK,
    marginBottom: 6,
    marginTop: 10,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: BASE_COLORS.BORDER_COLOR,
    borderRadius: 8,
    backgroundColor: BASE_COLORS.WHITE,
    marginBottom: verticalScale(12),
    paddingHorizontal: 10,
    height: 45,
    justifyContent: 'center',
  },
  inputText: {
    fontSize: 14,
    color: BASE_COLORS.TEXT_INPUT_FIELD,
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: BASE_COLORS.BLACKISH,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: BASE_COLORS.WHITE,
    borderRadius: 8,
    width: '80%',
    paddingVertical: 10,
  },
  modalItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: BASE_COLORS.BORDER_COLOR,
  },
  modalText: {
    fontSize: 14,
    color: BASE_COLORS.BLACK,
  },
  uploadBox: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: BASE_COLORS.GRAY,
    borderRadius: 8,
    backgroundColor: BASE_COLORS.BLUE_BG,
    height: 55,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  uploadText: {
    fontSize: 14,
    color: BASE_COLORS.BLACK,
  },
  errorText: {
    fontSize: 12,
    color: BASE_COLORS.SECONDARY,
    marginBottom: 5,
    marginLeft: 5,
  },
});
