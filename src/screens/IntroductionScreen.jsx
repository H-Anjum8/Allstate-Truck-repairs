import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
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
      navigation.navigate('login_screen');
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
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
      )}
      <Image source={image} style={styles.image} resizeMode="contain" />

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

      <CustomButton
        label={button}
        onPress={handleNext}
        style={[
          styles.button,
          index === splashData.length - 1 && styles.lastButton,
        ]}
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BASE_COLORS.WHITE,
    position: 'relative',
  },
  image: {
    height: 333,
    width: 352,
    marginBottom: verticalScale(4),
    marginTop: 60,
  },
  icon: {
    justifyContent: 'left',
    alignItems: 'left',
    borderRadius: 50,
    borderWidth: 2,
    padding: 5,
    position: 'absolute',
    top: 18,
    left: 20,
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
    lineHeight: 31,
    paddingHorizontal: moderateScale(5),
  },
  description: {
    fontFamily: FONTS.REGULAR,
    textAlign: 'center',
    fontSize: 11,
    fontWeight: '400',
    color: BASE_COLORS.TEXT_SECONDARY,
    marginBottom: verticalScale(50),
    lineHeight: moderateScale(16),
    paddingHorizontal: moderateScale(10),
  },
  button: {
    marginTop: 0,
  },
  lastButton: {
    marginTop: verticalScale(20),
  },
  skipText: {
    fontSize: 14,
    fontWeight: '400',
    color: BASE_COLORS.TEXT_PRIMARY,
    marginTop: verticalScale(-12),
  },
});
