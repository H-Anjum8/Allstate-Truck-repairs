import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TextStyles, FONTS } from '../../theme/fonts';
import { BASE_COLORS } from '../../utils/colors';

const CustomHomeHeader = ({
  // Text props
  welcomeText = 'Welcome',
  username = 'Dana Somerville',
  description = null, // New description prop
  showWelcomeText = true,
  showUsername = true,
  showDescription = true, // New prop to control description visibility

  // Custom render props
  renderCustomWelcome = null,
  renderCustomUsername = null,
  renderCustomDescription = null, // New custom render prop for description

  // Notification props
  onNotificationPress,
  hasNewNotifications = false,
  notificationIconName = 'notifications',
  notificationIconSize = 24,
  notificationIconColor = BASE_COLORS.WHITE,
  showNotificationIcon = true,

  // Style props
  containerStyle = {},
  contentContainerStyle = {},
  textContainerStyle = {},
  welcomeTextStyle = {},
  usernameTextStyle = {},
  descriptionTextStyle = {}, // New style prop for description
  notificationButtonStyle = {},
  notificationBadgeStyle = {},

  // StatusBar props
  statusBarColor = '#1E2133',
  statusBarStyle = 'light-content',
  statusBarTranslucent = false,
  showStatusBar = true,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {showStatusBar && (
        <StatusBar
          backgroundColor={statusBarColor}
          barStyle={statusBarStyle}
          translucent={statusBarTranslucent}
        />
      )}

      <View style={[styles.contentContainer, contentContainerStyle]}>
        <View style={[styles.textContainer, textContainerStyle]}>
          {/* Welcome text - render custom, default, or nothing */}
          {renderCustomWelcome
            ? renderCustomWelcome()
            : showWelcomeText && (
                <Text style={[styles.welcomeText, welcomeTextStyle]}>
                  {welcomeText}
                </Text>
              )}

          {/* Username text - render custom, default, or nothing */}
          {renderCustomUsername
            ? renderCustomUsername()
            : showUsername && (
                <Text style={[styles.usernameText, usernameTextStyle]}>
                  {username}
                </Text>
              )}

          {/* Description text - render custom, default, or nothing */}
          {renderCustomDescription
            ? renderCustomDescription()
            : showDescription &&
              description && (
                <Text style={[styles.descriptionText, descriptionTextStyle]}>
                  {description}
                </Text>
              )}
        </View>

        {showNotificationIcon && (
          <TouchableOpacity
            style={[styles.notificationButton, notificationButtonStyle]}
            onPress={onNotificationPress}
            activeOpacity={0.7}
          >
            <Ionicons
              name={notificationIconName}
              size={notificationIconSize}
              color={notificationIconColor}
            />

            {hasNewNotifications && (
              <View
                style={[styles.notificationBadge, notificationBadgeStyle]}
              />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: BASE_COLORS.TRANSPARENT,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 15,
  },
  textContainer: {
    flex: 1,
    gap: 2,
  },
  welcomeText: {
    ...TextStyles.body,
    color: BASE_COLORS.WHITE,
    fontFamily: FONTS.MEDIUM,
    fontSize: 20,
  },
  usernameText: {
    ...TextStyles.heading2,
    color: BASE_COLORS.PRIMARY,
    fontFamily: FONTS.BOLD,
    fontSize: 27,
  },
  descriptionText: {
    ...TextStyles.bodySmall,
    color: BASE_COLORS.SECONDARY,
    fontFamily: FONTS.REGULAR,
    marginTop: 2,
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  notificationBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: BASE_COLORS.SECONDARY,
  },
});

export default CustomHomeHeader;
