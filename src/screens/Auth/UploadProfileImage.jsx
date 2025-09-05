import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  ScrollView,
  Dimensions,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomHeader from '../../components/CustomHeader/CustomHeader';
import BASE_COLORS from '../../utils/colors';
import { IMAGES } from '../../utils/appAssets';
import { FONTS, TextStyles } from '../../theme/fonts';
import AppWrapper from '../../components/AuthWrapper/AppWrapper';
import { isIOS } from '../../utils/helpers';
import CustomButton from '../../components/common/CustomButton';

const { height, width } = Dimensions.get('window');

const UploadProfileImage = () => {
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

  const renderImageContent = () => {
    if (imageUri) {
      // Show uploaded image
      return (
        <Image
          source={{ uri: imageUri }}
          style={styles.image}
          resizeMode="cover"
        />
      );
    }

    // Show default upload placeholder
    return (
      <View style={styles.placeholderContainer}>
        <View style={styles.iconContainer}>
          <Ionicons
            name="camera-outline"
            size={40}
            color={BASE_COLORS.PRIMARY}
          />
        </View>
        <Text style={styles.placeholderText}>Tap to upload photo</Text>
        <Text style={styles.placeholderSubText}>Choose from gallery</Text>
      </View>
    );
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
              paddingBottom: isKeyboardVisible ? keyboardHeight - 200 : 100,
              flexGrow: 1,
              gap: 20,
            },
          ]}
          keyboardShouldPersistTaps="handled"
        >
          <View style={{ gap: 10, marginTop: 20 }}>
            <Text style={styles.title}>Upload Profile Photo</Text>
            <Text style={styles.description}>Choose from your gallery</Text>
          </View>

          {/* Image Upload Area */}
          <TouchableOpacity
            onPress={pickImage}
            style={[
              styles.imageWrapper,
              !imageUri && styles.imageWrapperEmpty, // Add dashed border when empty
            ]}
            activeOpacity={0.8}
          >
            {renderImageContent()}

            {/* Edit icon overlay when image is uploaded */}
            {imageUri && (
              <View style={styles.editIconContainer}>
                <Ionicons name="camera" size={20} color={BASE_COLORS.WHITE} />
              </View>
            )}
          </TouchableOpacity>

          {/* Change Picture Text */}
          {imageUri && (
            <TouchableOpacity onPress={pickImage}>
              <Text style={styles.changeText}>
                Change <Text style={styles.bold}>Picture</Text>
              </Text>
            </TouchableOpacity>
          )}

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <CustomButton
              label={imageUri ? 'Upload' : 'Choose Photo'}
              onPress={
                imageUri ? () => navigation.navigate('signup_done') : pickImage
              }
              style={{ marginTop: 20 }}
            />

            <CustomButton
              label="Skip For Now"
              onPress={() => navigation.navigate('profile_setup')}
              textStyle={{ color: BASE_COLORS.PRIMARY }}
              variant="text"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </AppWrapper>
  );
};

export default UploadProfileImage;

const styles = StyleSheet.create({
  title: {
    ...TextStyles.heading1,
    fontWeight: '500',
    color: BASE_COLORS.PRIMARY,
  },
  description: {
    ...TextStyles.bodySmall,
    fontWeight: '400',
    color: BASE_COLORS.DARK_GRAY,
  },
  imageWrapper: {
    alignSelf: 'center',
    width: '100%',
    height: height * 0.35,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: BASE_COLORS.LIGHT_GRAY,
    marginTop: 0,
    overflow: 'hidden',
    position: 'relative',
  },
  imageWrapperEmpty: {
    borderStyle: 'dashed',
    borderColor: BASE_COLORS.PRIMARY,
    borderWidth: 2,
    backgroundColor: BASE_COLORS.LIGHT_GRAY + '20', // Light background
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: BASE_COLORS.PRIMARY + '15',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 16,
    fontFamily: FONTS.MEDIUM,
    color: BASE_COLORS.PRIMARY,
    fontWeight: '500',
  },
  placeholderSubText: {
    fontSize: 12,
    fontFamily: FONTS.REGULAR,
    color: BASE_COLORS.DARK_GRAY,
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: BASE_COLORS.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
  buttonContainer: {
    marginTop: 10,
  },
});
