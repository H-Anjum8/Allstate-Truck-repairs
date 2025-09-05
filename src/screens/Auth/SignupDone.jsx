import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ICONS } from '../../utils/appAssets';
import BASE_COLORS from '../../utils/colors';
import { TextStyles } from '../../theme/fonts';
import AppWrapper from '../../components/AuthWrapper/AppWrapper';
import CustomButton from '../../components/common/CustomButton';

const { width, height } = Dimensions.get('window');

const SignupDone = () => {
  const navigation = useNavigation();

  return (
    <AppWrapper style={{ paddingHorizontal: 16 }}>
      <View style={styles.container}>
        {/* Center Icon */}
        <View style={{ gap: 20 }}>
          <Image
            source={ICONS.TICK}
            style={styles.checkImage}
            resizeMode="contain"
          />

          {/* Heading */}
          <Text style={styles.heading}>Congratulations</Text>

          {/* Subtext */}
          <Text style={styles.subText}>
            Your account is ready to use. You will be redirected to the Home
            Page in a few seconds.
          </Text>
        </View>
        {/* Continue button */}
      </View>
      <CustomButton
        label="Continue"
        onPress={() => navigation.navigate('subscription')}
        style={{ width: '100%', marginBottom: 30 }}
      />
    </AppWrapper>
  );
};

export default SignupDone;

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
    ...TextStyles.bodySmall,
    textAlign: 'center',
    color: BASE_COLORS.GRAY,
    width: '90%',
    alignSelf:"center"
  },
});
