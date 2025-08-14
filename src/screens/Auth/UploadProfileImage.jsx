import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { moderateScale } from 'react-native-size-matters';
import AuthWrapper from '../../components/AuthWrapper';
import CustomHeader from '../../components/CustomHeaders';
import CustomButton from '../../components/CustomButton';
import BASE_COLORS from '../../utils/colors';
import { IMAGES } from '../../utils/appAssets';
import { FONTS } from '../../theme/fonts';

const UploadProfileImage = () => {
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
      >
        <CustomHeader
          leftIcon={<Ionicons name="chevron-back" size={24} color="black" />}
          onLeftPress={() => navigation.goBack()}
          description="Choose from your gallery"
          username="Upload Profile Photo"
          usernameTextStyle={{ fontSize: 22, marginTop: 12 }}
          descriptionTextStyle={{
            textAlign: 'left',
            marginTop: 4,
            marginBottom: 12,
          }}
          showWelcomeText={false}
          showDescription={true}
          showUsername={true}
        />

        {/* Image Preview */}
        <TouchableOpacity onPress={pickImage} style={styles.imageWrapper}>
          <Image
            source={imageUri ? { uri: imageUri } : IMAGES.DEFAULT_PROFILE}
            style={styles.image}
          />
        </TouchableOpacity>

        {/* Change Picture */}
        <TouchableOpacity onPress={pickImage}>
          <Text style={styles.changeText}>
            Change <Text style={styles.bold}>Picture</Text>
          </Text>
        </TouchableOpacity>

        {/* Continue Button */}
        <CustomButton
          label="Upload"
          onPress={() => navigation.navigate('signup_done')}
          style={{ marginTop: 25, height: 54 }}
        />

        {/* Skip For Now */}
        <TouchableOpacity onPress={() => navigation.navigate('profile_setup')}>
          <Text style={styles.skipText}>Skip For Now</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </AuthWrapper>
  );
};

export default UploadProfileImage;

const styles = StyleSheet.create({
  imageWrapper: {
    alignSelf: 'center',
    width: moderateScale(310),
    height: moderateScale(300),
    borderRadius: 18,
    borderWidth: 1,
    borderColor: BASE_COLORS.LIGHT_GRAY,
    marginTop: 0,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  changeText: {
    textAlign: 'center',
    color: BASE_COLORS.TEXT_TERNARY,
    fontSize: 12,
    fontFamily: FONTS.MEDIUM,
    marginTop: 10,
  },
  bold: {
    fontFamily: FONTS.MEDIUM,
    color: BASE_COLORS.TEXT_BLACK,
    fontSize: 12,
    fontWeight: 'bold',
  },
  continueButton: {
    marginTop: 32,
    marginHorizontal: 16,
  },
  skipText: {
    textAlign: 'center',
    color: BASE_COLORS.TEXT_PRIMARY,
    fontWeight: 'semi-bold',
    fontSize: 12,
    fontFamily: FONTS.MEDIUM,
    marginTop: -12,
  },
});
