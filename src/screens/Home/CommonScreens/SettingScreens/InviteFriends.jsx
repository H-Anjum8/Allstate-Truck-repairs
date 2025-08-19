import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AuthWrapper from '../../../../components/AuthWrapper';
import CustomHeader from '../../../../components/CustomHeaders';
import CustomButton from '../../../../components/CustomButton';
import BASE_COLORS from '../../../../utils/colors';
import { IMAGES } from '../../../../utils/appAssets';
import { useNavigation } from '@react-navigation/native';
import { FONTS } from '../../../../theme/fonts';

const InviteFriends = () => {
  const navigation = useNavigation();
  const [inviteCode] = useState('FRIENDS123');

  const handleCopy = () => {
    // Add Clipboard copy functionality
    console.log('Copied:', inviteCode);
  };

  return (
    <AuthWrapper>
      {/* Header */}
      <CustomHeader
        onLeftPress={() => navigation.goBack()}
        username="Invite Friends"
        showUsername
        showWelcomeText={false}
        contentContainerStyle={{ alignItems: 'center' }}
        usernameTextStyle={{
          textAlign: 'center',
          alignSelf: 'center',
          fontSize: 22,
          marginTop: -10,
          color: BASE_COLORS.BLACK, // 👈 heading color black
        }}
      />

      <View style={styles.container}>
        {/* Illustration Image */}
        <Image
          source={IMAGES.INVITEFRIENDS}
          style={styles.image}
          resizeMode="contain"
        />

        {/* Subheading */}
        <Text style={styles.subHeading}>
          Invite your friends to sign up {'\n'}and receive rewards!
        </Text>

        {/* Code Row */}
        <View style={styles.codeContainer}>
          <Text style={styles.codeText}>{inviteCode}</Text>
          <TouchableOpacity style={styles.copyButton} onPress={handleCopy}>
            <Text style={styles.copyText}>Copy</Text>
          </TouchableOpacity>
        </View>

        {/* Invite Button */}
        <CustomButton
          label="Invite Friends"
          onPress={() => navigation.navigate('invite_sent')}
          style={{
            marginHorizontal: -4,
            marginBottom: 50,
            height: 54,
          }}
          textStyle={{ fontSize: 14, fontFamily: FONTS.MEDIUM }}
        />
      </View>
    </AuthWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  image: {
    width: 280,
    height: 250,
    marginVertical: 20,
  },
  subHeading: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: FONTS.BOLD,
    color: BASE_COLORS.BLACK,
    marginBottom: 20,
  },
  codeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: BASE_COLORS.BLACK,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 10,
    height: 55,
    width: '100%',
    justifyContent: 'space-between',
  },
  codeText: {
    fontSize: 16,
    color: BASE_COLORS.BLACK,
    fontFamily: FONTS.BOLD,
    marginHorizontal: 19,
  },
  copyButton: {
    paddingLeft: 25,
    marginHorizontal: 12,
    borderLeftWidth: 1, // 👈 Border line between code & copy
    borderLeftColor: BASE_COLORS.BLACK,
  },
  copyText: {
    color: BASE_COLORS.SECONDARY,
    fontSize: 18,
    fontFamily: FONTS.BOLD,
  },
  inviteButton: {
    marginTop: 10,
    width: '100%',
  },
});

export default InviteFriends;
