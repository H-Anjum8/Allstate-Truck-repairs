import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import CustomButton from '../../../../components/CustomButton';
import { ICONS } from '../../../../utils/appAssets';
import BASE_COLORS from '../../../../utils/colors';
import { FONTS } from '../../../../theme/fonts';

const InviteSent = () => {
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
      <Text style={styles.heading}>Invite Sent!</Text>

      {/* Subtext */}
      <Text style={styles.subText}>
        {' '}
        Your invite has been sent successfully!
      </Text>

      {/* Continue button */}
      <CustomButton
        label="Back to Settings"
        onPress={() => navigation.navigate('setting')}
        style={{
          marginHorizontal: 1,
          marginBottom: 150,
          height: 54,
        }}
        textStyle={{ fontSize: 12 }}
      />
    </View>
  );
};

export default InviteSent;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BASE_COLORS.WHITE,
    marginTop: 10,
    padding: 22,
    alignItems: 'center',
    // marginBottom: 82,
    justifyContent: 'flex-end',
  },
  checkImage: {
    width: moderateScale(80),
    height: moderateScale(90),
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
    marginBottom: verticalScale(100),
    paddingHorizontal: moderateScale(10),
  },
});
