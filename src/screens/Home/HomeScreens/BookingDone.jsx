import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { ICONS } from '../../../utils/appAssets';
import CustomButton from '../../../components/CustomButton';
import BASE_COLORS from '../../../utils/colors';
import { FONTS } from '../../../theme/fonts';

const BookingDone = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {/* Center Icon */}
      <Image
        source={ICONS.GREEN_TICK}
        style={styles.checkImage}
        resizeMode="contain"
      />
      {/* Heading */}
      <Text style={styles.heading}>Booking Request Sent</Text>
      {/* Subtext */}
      <Text style={styles.subText}>
        {' '}
        Your booking request has been sent to Doug’s Roadside Garage. We’ll
        notify you once it’s accepted.
      </Text>
      {/* Continue button */}
      <CustomButton
        label="Continue"
        onPress={() => navigation.navigate('dashboard')}
        style={{
          marginHorizontal: -4,
          marginTop: 60,
          height: 54,
        }}
        textStyle={{ fontSize: 12 }}
      />
    </View>
  );
};

export default BookingDone;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
    // justifyContent: 'flex-end',
  },
  checkImage: {
    width: moderateScale(62),
    height: moderateScale(62),
    marginBottom: verticalScale(12),
  },
  heading: {
    fontSize: 22,
    fontWeight: 600,
    fontFamily: FONTS.MEDIUM,
    color: BASE_COLORS.BLACK,
    marginBottom: verticalScale(2),
  },
  subText: {
    fontSize: 11,
    textAlign: 'center',
    fontFamily: FONTS.REGULAR,
    color: BASE_COLORS.TEXT_TERNARY,
    marginBottom: verticalScale(-30),
    paddingHorizontal: moderateScale(6),
  },
});
