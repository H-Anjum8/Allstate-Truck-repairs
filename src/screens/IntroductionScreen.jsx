import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import BASE_COLORS from '../utils/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import CustomButton from '../components/CustomButton';
import { FONTS } from '../theme/fonts';
import { splashData } from '../utils/staticData';

const IntroductionScreen = ({ navigation }) => {
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    if (index < splashData.length - 1) {
      setIndex(prev => prev + 1);
    } else {
      console.log('Get Started Clicked');
      navigation.navigate('role_selection');
    }
  };

  const handleSkip = () => {
    setIndex(splashData.length - 1);
  };

  const { title, description, button, image } = splashData[index];

  return (
    <View style={styles.container}>
      {index > 0 && (
        <TouchableOpacity
          style={styles.icon}
          onPress={() => setIndex(prev => prev - 1)}
        >
          <Ionicons name="chevron-back" size={20} color="black" />
        </TouchableOpacity>
      )}

      <Image source={image} style={styles.image} resizeMode="contain" />

      {/* Flexible content area */}
      <View style={styles.contentWrapper}>
        <View style={styles.pagination}>
          {splashData.map((_, i) => (
            <View
              key={i}
              style={i === index ? styles.activeDot : styles.inactiveDot}
            />
          ))}
        </View>

        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>

      {/* Fixed position button */}
      <CustomButton
        label={button}
        onPress={handleNext}
        style={{
          backgroundColor: BASE_COLORS.SECONDARY,
          marginHorizontal: -2,
          height: 57,
          marginBottom: 74,
        }}
      />

      {index < splashData.length - 1 && (
        <TouchableOpacity onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default IntroductionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: moderateScale(20),
    backgroundColor: BASE_COLORS.WHITE,
    position: 'relative',
    alignItems: 'center',
  },
  image: {
    height: 340,
    width: 352,
    marginBottom: verticalScale(8),
    marginTop: 20,
  },
  icon: {
    position: 'absolute',
    top: 18,
    left: 20,
    borderRadius: 50,
    borderWidth: 1.5,
    padding: 2,
    zIndex: 1,
  },

  contentWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
    width: '100%',
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: verticalScale(12),
    gap: moderateScale(4),
  },
  activeDot: {
    width: moderateScale(36),
    height: moderateScale(6),
    borderRadius: moderateScale(20),
    backgroundColor: BASE_COLORS.SECONDARY,
  },
  inactiveDot: {
    width: moderateScale(11),
    height: moderateScale(6),
    borderRadius: moderateScale(20),
    backgroundColor: BASE_COLORS.SECONDARY,
    opacity: 0.1,
  },
  title: {
    fontFamily: FONTS.MEDIUM,
    fontSize: 22,
    fontWeight: '500',
    color: BASE_COLORS.TEXT_PRIMARY,
    textAlign: 'center',
    marginBottom: verticalScale(6),
    width: 305,
  },
  description: {
    fontFamily: FONTS.REGULAR,
    textAlign: 'center',
    fontSize: 11,
    fontWeight: '400',
    color: BASE_COLORS.TEXT_SECONDARY,
    marginBottom: verticalScale(26),
    // lineHeight: moderateScale(16),
    paddingHorizontal: moderateScale(10),
    marginHorizontal: moderateScale(16),
  },
  skipText: {
    fontSize: 12,
    fontWeight: '400',
    color: BASE_COLORS.TEXT_PRIMARY,
    marginTop: verticalScale(-60),
  },
});
