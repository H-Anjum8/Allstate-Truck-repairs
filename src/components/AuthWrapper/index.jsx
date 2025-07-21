import React from 'react';
import { View, StyleSheet, Platform, StatusBar } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomHeader from '../CustomHeaders';
import { verticalScale, moderateScale } from 'react-native-size-matters';
import BASE_COLORS from '../../utils/colors';

const AuthWrapper = ({
  children,
  navigation,
  title,
  description,
  showUsername = false,
  showDescription = false,
  showWelcomeText = false,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <CustomHeader
          leftIcon={
            <Ionicons name="chevron-back" size={24} color={BASE_COLORS.BLACK} />
          }
          onLeftPress={() => navigation.goBack()}
          showWelcomeText={showWelcomeText}
          showDescription={showDescription}
          description={description}
          username={title}
          showUsername={showUsername}
          usernameTextStyle={{ textAlign: 'left' }}
          onNotificationPress={() =>
            navigation.navigate('all_notifications_screen')
          }
          contentContainerStyle={{ alignItems: 'flex-start' }}
        />
      </View>

      <View style={styles.content}>{children}</View>
    </View>
  );
};

export default AuthWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: BASE_COLORS.WHITE,
  },

  content: {
    flex: 1,
    marginTop: verticalScale(-280),
    paddingHorizontal: moderateScale(20), // optional: keep form content aligned
  },
});
