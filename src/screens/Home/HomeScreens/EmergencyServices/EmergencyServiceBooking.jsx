import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import AuthWrapper from '../../../../components/AuthWrapper';
import CustomHeader from '../../../../components/CustomHeaders';
import BASE_COLORS from '../../../../utils/colors';
import CustomButton from '../../../../components/CustomButton';
import { getValidationSchema } from '../../../../utils/validationSchema';
export default function EmergencyServiceBooking() {
  const navigation = useNavigation();
  const handleAddPhoto = (setFieldValue, photos) => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        selectionLimit: 0, // allows multiple
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorMessage) {
          console.log('ImagePicker Error: ', response.errorMessage);
        } else {
          const selected = response.assets || [];
          setFieldValue('photos', [...photos, ...selected]);
        }
      },
    );
  };
  return (
    <AuthWrapper>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <CustomHeader
          leftIcon={<Ionicons name="chevron-back" size={24} color="black" />}
          onLeftPress={() => navigation.goBack()}
          description="Select one or more services you’d like to book from this provider."
          username="Emergency Service Booking "
          usernameTextStyle={{
            fontSize: 21,
            marginTop: -4,
            color: BASE_COLORS.BLACK,
          }}
          descriptionTextStyle={{
            textAlign: 'left',
            fontSize: 12,
            paddingHorizontal: 2,
            marginBottom: 25,
          }}
          showWelcomeText={false}
          showDescription={true}
          showUsername={true}
        />

        <Formik
          initialValues={{
            description: '',
            photos: [],
          }}
          validationSchema={getValidationSchema('BookingSchema')}
          onSubmit={values => {
            console.log('Form Submitted:', values);
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
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.maincontainer}>
                <View>
                  {/* Upload Photos */}
                  <Text style={styles.label}>Upload Photos</Text>
                  <TouchableOpacity
                    style={styles.uploadBox}
                    onPress={() => handleAddPhoto(setFieldValue, values.photos)}
                  >
                    <Text style={styles.uploadText}>Add Photos</Text>
                    <Ionicons
                      name="add"
                      size={24}
                      color={BASE_COLORS.PRIMARY}
                      style={{ marginLeft: 8 }}
                    />
                  </TouchableOpacity>
                  {errors.photos && touched.photos && (
                    <Text style={styles.errorText}>{errors.photos}</Text>
                  )}

                  {/* Selected Photos Preview */}
                  <View style={styles.photoContainer}>
                    {values.photos.map((photo, index) => (
                      <Image
                        key={index}
                        source={{ uri: photo.uri }}
                        style={styles.photo}
                      />
                    ))}
                  </View>

                  {/* Description */}
                  <Text style={styles.label}>Description</Text>
                  <TextInput
                    style={styles.textArea}
                    placeholder="Type here......"
                    placeholderTextColor={BASE_COLORS.GRAY}
                    multiline
                    value={values.description}
                    onChangeText={handleChange('description')}
                    onBlur={handleBlur('description')}
                  />
                  {errors.description && touched.description && (
                    <Text style={styles.errorText}>{errors.description}</Text>
                  )}
                </View>

                <CustomButton
                  label="Continue"
                  onPress={handleSubmit}
                  style={{
                    marginHorizontal: -4,
                    marginTop: 50,
                    height: 54,
                    borderRadius: 20,
                  }}
                  textStyle={{ fontSize: 12 }}
                />
              </View>
            </ScrollView>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </AuthWrapper>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  maincontainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '80%',
  },
  uploadBox: {
    borderWidth: 1,
    borderColor: BASE_COLORS.GRAY,
    borderStyle: 'dashed',
    backgroundColor: BASE_COLORS.GRAYIESH,
    padding: 15,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  uploadText: {
    fontSize: 14,
    color: BASE_COLORS.PRIMARY,
  },
  photoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  photo: {
    width: 80,
    height: 80,
    borderRadius: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  textArea: {
    borderWidth: 1,
    borderColor: BASE_COLORS.BORDER_COLOR,
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    minHeight: 200,
    textAlignVertical: 'top',
    marginBottom: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 8,
  },
});
