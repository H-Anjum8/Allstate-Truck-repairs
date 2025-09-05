import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { isIOS } from '../../utils/helpers';
import { TextStyles } from '../../theme/fonts';
import BASE_COLORS from '../../utils/colors';

/**
 * Flexible Header Component
 *
 * @param {string} title - Title text to display in the header
 * @param {string} titleAlignment - Alignment of the title: 'left', 'center', or 'right'
 * @param {node} leftIcon - Component to render on the left side
 * @param {node} rightIcon - Component to render on the right side
 * @param {function} onLeftPress - Function to call when left icon is pressed
 * @param {function} onRightPress - Function to call when right icon is pressed
 * @param {object} containerStyle - Additional styles for the header container
 * @param {object} titleStyle - Additional styles for the title text
 * @param {boolean} showStatusBar - Whether to show the status bar space
 * @param {string} backgroundColor - Background color of the header
 * @param {boolean} showShadow - Whether to show a shadow under the header
 * @param {number} height - Custom height for the header
 * @param {node} centerComponent - Custom component to render in the center (e.g., search field)
 * @return {JSX.Element} The customizable header component
 */
const CustomHeader = ({
  title,
  titleAlignment = 'center', // 'left', 'center', 'right'
  leftIcon,
  rightIcon,
  onLeftPress,
  onRightPress,
  containerStyle,
  titleStyle,
  showStatusBar = true,
  backgroundColor = BASE_COLORS.TRANSPARENT,
  showShadow = false,
  height = 50,
  centerComponent = null, // New prop for custom center component like search field
  rightIconStyle,
  leftIconStyle,
  numberOfLines,
  titleProps = {},
}) => {
  // Function to determine text alignment style
  const getTitleAlignmentStyle = () => {
    switch (titleAlignment) {
      case 'left':
        return { textAlign: 'left', marginLeft: leftIcon ? 10 : 0 };
      case 'right':
        return { textAlign: 'right', marginRight: rightIcon ? 10 : 0 };
      case 'center':
      default:
        return { textAlign: 'center' };
    }
  };

  // Function to determine title container flex style
  const getTitleContainerStyle = () => {
    if (titleAlignment === 'left') {
      return { flex: 1, alignItems: 'flex-start' };
    }
    if (titleAlignment === 'right') {
      return { flex: 1, alignItems: 'flex-end' };
    }
    return { flex: 1, alignItems: 'center' };
  };

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        { backgroundColor: backgroundColor },
        showStatusBar ? null : { paddingTop: 0 },
      ]}
    >
      <View
        style={[
          styles.container,
          showShadow && styles.shadowEffect,
          { backgroundColor: backgroundColor, height: height },
          containerStyle,
        ]}
      >
        {/* Left Side */}
        <View style={styles.sideContainer}>
          {leftIcon && (
            <TouchableOpacity
              style={[styles.iconButton, leftIconStyle]}
              onPress={onLeftPress}
              activeOpacity={0.7}
              disabled={!onLeftPress}
            >
              {leftIcon}
            </TouchableOpacity>
          )}
        </View>

        {/* Center Section - Title or Custom Component */}
        <View style={[styles.titleContainer, getTitleContainerStyle()]}>
          {centerComponent
            ? // Render custom center component (e.g., search field) if provided
              centerComponent
            : // Otherwise render the title
              title && (
                <Text
                  style={[styles.title, getTitleAlignmentStyle(), titleStyle]}
                  // numberOfLines={1}
                  numberOfLines={numberOfLines || 1}
                  {...titleProps}
                >
                  {title}
                </Text>
              )}
        </View>

        {/* Right Side */}
        <View style={[styles.sideContainer, styles.rightSideContainer]}>
          {rightIcon && (
            <TouchableOpacity
              style={[styles.iconButton, rightIconStyle]}
              onPress={onRightPress}
              activeOpacity={0.7}
              disabled={!onRightPress}
            >
              {rightIcon}
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    // backgroundColor: '#151B28',
    paddingTop: isIOS ? 0 : StatusBar.currentHeight,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // paddingHorizontal: 16,
    // height: 56,
  },
  shadowEffect: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  sideContainer: {
    // width: 40,
    // height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  rightSideContainer: {
    alignItems: 'flex-end',
  },
  iconButton: {
    // minWidth: 40,
    // height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: BASE_COLORS.BLACK,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    ...TextStyles.heading2,
    lineHeight: 24,
  },
});

export default CustomHeader;
