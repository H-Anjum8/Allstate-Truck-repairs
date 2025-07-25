import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import CustomButton from '../../components/CustomButton';
import { ICONS } from '../../utils/appAssets';
import BASE_COLORS from '../../utils/colors';
import { FONTS } from '../../theme/fonts';

const SignupDone = () => {
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
      <Text style={styles.heading}>Congratulations</Text>

      {/* Subtext */}
      <Text style={styles.subText}>
        Your account is ready to use. You will be redirected {'\n'} to the Home
        Page in a few seconds.
      </Text>

      {/* Continue button */}
      <CustomButton
        label="Continue"
        onPress={() => navigation.navigate('subscription')}
        style={{ marginHorizontal: 3, marginTop: 30, height: 54 }}
        textStyle={{ fontSize: 12 }}
      />
    </View>
  );
};

export default SignupDone;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BASE_COLORS.WHITE,
    marginTop: 70,
    padding: 22,
    alignItems: 'center',
    // marginBottom: 82,
    justifyContent: 'center',
  },
  checkImage: {
    width: moderateScale(120),
    height: moderateScale(110),
    marginBottom: verticalScale(12),
    marginTop: 60,
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
