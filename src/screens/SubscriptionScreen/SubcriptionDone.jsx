import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import CustomButton from '../../components/common/CustomButton';
import { ICONS } from '../../utils/appAssets';
import BASE_COLORS from '../../utils/colors';
import { FONTS, TextStyles } from '../../theme/fonts';
import AppWrapper from '../../components/AuthWrapper/AppWrapper';

const { width, height } = Dimensions.get('window');

const SubcriptionDone = () => {
  const navigation = useNavigation();
  return (
    <AppWrapper style={{ paddingHorizontal: 16 }}>
      <View style={styles.container}>
        <View style={{ gap: 20 }}>
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
        </View>
      </View>
      {/* Continue button */}
      <CustomButton
        label="Go to Home"
        onPress={() => navigation.navigate('subscription')}
        style={{ width: '100%', marginBottom: 30 }}
      />
    </AppWrapper>
  );
};

export default SubcriptionDone;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'space-around',
  },
  checkImage: {
    width: width * 0.3,
    height: height * 0.16,
    alignSelf: 'center',
  },
  heading: {
    ...TextStyles.heading1,
    fontWeight: '600',
    color: BASE_COLORS.PRIMARY,
    textAlign: 'center',
  },
  subText: {
    ...TextStyles.body,
    textAlign: 'center',
    color: BASE_COLORS.GRAY,
    width: '90%',
    alignSelf: 'center',
  },
});
