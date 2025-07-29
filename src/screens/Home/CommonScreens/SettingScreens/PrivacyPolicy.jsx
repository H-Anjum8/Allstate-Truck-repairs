import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

import AuthWrapper from '../../../../components/AuthWrapper';
import CustomHeader from '../../../../components/CustomHeaders';
import BASE_COLORS from '../../../../utils/colors';
import { FONTS } from '../../../../theme/fonts';

const PrivacyPolicy = () => {
  const navigation = useNavigation();

  return (
    <AuthWrapper>
      <CustomHeader
        leftIcon={
          <Ionicons name="chevron-back" size={24} color={BASE_COLORS.BLACK} />
        }
        onLeftPress={() => navigation.goBack()}
        username="Privacy & Policy"
        showUsername
        showWelcomeText={false}
        usernameTextStyle={{
          marginBottom: verticalScale(20),
          color: BASE_COLORS.BLACK,
        }}
        contentContainerStyle={{ alignItems: 'center' }}
      />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
        <Text style={styles.sectionText}>
          Loremipsum dolor sit amet consectetur. Egestas dignissim nulla
          pellentesque sit nibh. Veneratis nunc etiam libero ultricies accumsan
          sed lectus. At tortor accumsan at commodo non.
        </Text>

        <Text style={styles.sectionTitle}>2. Use of the Service</Text>
        <Text style={styles.sectionText}>
          Loremipsum dolor sit amet consectetur. Egestas dignissim nulla
          pellentesque sit nibh. Veneratis nunc etiam libero ultricies accumsan
          sed lectus. At tortor accumsan at commodo non.
        </Text>

        <Text style={styles.sectionTitle}>3. Privacy Policy</Text>
        <Text style={styles.sectionText}>
          Loremipsum dolor sit amet consectetur. Egestas dignissim nulla
          pellentesque sit nibh. Veneratis nunc etiam libero ultricies accumsan
          sed lectus. At tortor accumsan at commodo non.
        </Text>

        <Text style={styles.sectionTitle}>4. Termination</Text>
        <Text style={styles.sectionText}>
          Loremipsum dolor sit amet consectetur. Egestas dignissim nulla
          pellentesque sit nibh. Veneratis nunc etiam libero ultricies accumsan
          sed lectus. At tortor accumsan at commodo non.
        </Text>
      </ScrollView>
    </AuthWrapper>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: moderateScale(16),
    paddingBottom: verticalScale(40),
  },
  sectionTitle: {
    fontSize: moderateScale(16),
    fontFamily: FONTS.BOLD,
    color: BASE_COLORS.DARK_GRAY,
    marginBottom: verticalScale(10),
    marginTop: verticalScale(15),
  },
  sectionText: {
    fontSize: moderateScale(12),
    fontFamily: FONTS.REGULAR,
    color: BASE_COLORS.DARK_GRAY,
    lineHeight: verticalScale(14),
    textAlign: 'justify',
  },
});

export default PrivacyPolicy;
