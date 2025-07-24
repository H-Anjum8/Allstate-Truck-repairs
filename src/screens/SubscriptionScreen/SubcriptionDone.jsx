import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import CustomButton from '../../components/CustomButton';
import { ICONS } from '../../utils/appAssets';
import BASE_COLORS from '../../utils/colors';
import { FONTS } from '../../theme/fonts';

const SubcriptionDone = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {/* Center Icon */}
      <Image
        source={ICONS.TICK}
        style={styles.checkImage}
        resizeMode="contain"
      />

      {/* Heading */}
      <Text style={styles.heading}>You’re All Set!</Text>

      {/* Subtext */}
      <Text style={styles.subText}>
        {' '}
        Welcome to AllState Truck {'\n'} Repairs. Your account is now {'\n'}{' '}
        active.
      </Text>

      {/* Continue button */}
      <CustomButton
        label="Continue"
        onPress={() => navigation.navigate('subscription')}
        style={{
          marginHorizontal: -4,
          marginBottom: 50,
          height: 54,
        }}
        textStyle={{ fontSize: 12 }}
      />
    </View>
  );
};

export default SubcriptionDone;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BASE_COLORS.WHITE,
    marginTop: 70,
    padding: 22,
    alignItems: 'center',
    // marginBottom: 82,
    justifyContent: 'flex-end',
  },
  checkImage: {
    width: moderateScale(120),
    height: moderateScale(110),
    marginBottom: verticalScale(12),
    marginTop: 75,
  },
  heading: {
    fontSize: 22,
    fontWeight: 600,
    fontFamily: FONTS.MEDIUM,
    color: BASE_COLORS.PRIMARY,
    marginBottom: verticalScale(2),
  },
  subText: {
    fontSize: 12,
    textAlign: 'center',
    fontFamily: FONTS.REGULAR,
    color: BASE_COLORS.TEXT_INPUT_FIELD,
    marginBottom: verticalScale(180),
    paddingHorizontal: moderateScale(10),
  },
});
