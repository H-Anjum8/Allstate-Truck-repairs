// src/components/common/AnimatedButton.js

import React, { useEffect } from 'react';
import { Text, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import { useButtonAnimation } from '../../utils/animations';
import BASE_COLORS from '../../utils/colors';
import { TextStyles } from '../../theme/fonts';

const LoadingDot = ({ delay = 0 }) => {
  // Create a shared value for the dot's vertical position
  const translateY = useSharedValue(0);

  // Set up the animation when the component mounts
  useEffect(() => {
    // Create a looping animation sequence with a delay based on the dot's position
    translateY.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          // Move up
          withTiming(-10, {
            duration: 300,
            easing: Easing.bezier(0.34, 1.56, 0.64, 1),
          }),
          // Move down
          withTiming(0, {
            duration: 300,
            easing: Easing.bezier(0.34, 1.56, 0.64, 1),
          }),
        ),
        -1, // Infinite repetitions
        false, // Don't reverse the animation
      ),
    );
  }, [translateY, delay]);

  // Create the animated style for the dot
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  return <Animated.View style={[styles.loadingDot, animatedStyle]} />;
};

const CustomButton = ({
  label,
  onPress,
  style,
  textStyle,
  disabled = false,
  loading = false,
  icon,
  leftIconStyle,
  iconPosition = 'left',
  size = 'medium',
  variant = 'filled',
  fullWidth = false,
  shadow = false,
  cornerRadius = 10,
  borderColor, // ✅ New prop added
  gradiantColors,
  ...props
}) => {
  // Use the extracted animation hooks
  const {
    handlePressIn,
    handlePressOut,
    updateDisabledState,
    animatedContainerStyle,
    animatedShadowStyle,
  } = useButtonAnimation(disabled);

  // Determine size styles
  const getSize = () => {
    switch (size) {
      case 'small':
        return { paddingVertical: 8, paddingHorizontal: 16, minWidth: 80 };
      case 'large':
        return { paddingVertical: 16, paddingHorizontal: 24, minWidth: 140 };
      case 'medium':
      default:
        return { paddingVertical: 12, paddingHorizontal: 20, minWidth: 120 };
    }
  };

  // Button color based on variant
  const getButtonStyle = () => {
    switch (variant) {
      case 'outlined':
        return {
          backgroundColor: BASE_COLORS.TRANSPARENT,
          borderWidth: 1,
          borderColor: borderColor || BASE_COLORS.PRIMARY, // Use prop or default
        };
      case 'text':
        return {
          backgroundColor: BASE_COLORS.TRANSPARENT,
          borderWidth: 0,
        };
      case 'filled':
      default:
        return {
          backgroundColor: BASE_COLORS.SECONDARY,
          // borderBottomWidth: 1,
          // borderColor: borderColor || getColorWithOpacity(BASE_COLORS.WHITE, 0.5), // Use prop or default
          ...styles.shadow,
        };
    }
  };

  // Text color based on variant
  const getTextColor = () => {
    switch (variant) {
      case 'outlined':
        return BASE_COLORS.PRIMARY;
      case 'text':
        return BASE_COLORS.PRIMARY;
      case 'filled':
        return BASE_COLORS.WHITE;
      default:
        return BASE_COLORS.WHITE;
    }
  };

  const handlePress = () => {
    if (!disabled && !loading && onPress) {
      // Add slight delay to allow animation to complete
      setTimeout(() => {
        onPress();
      }, 50);
    }
  };

  // Update animations when disabled state changes
  useEffect(() => {
    updateDisabledState(disabled);
  }, [disabled, updateDisabledState]);

  // Get the dot color based on variant
  const getDotColor = () => {
    if (variant === 'filled') {
      return BASE_COLORS.WHITE;
    }
    return BASE_COLORS.PRIMARY;
  };


  return (
    <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
      disabled={disabled || loading}
    >
      <Animated.View
        style={[
          styles.container,
          fullWidth && styles.fullWidth,
          getSize(),
          getButtonStyle(),
          shadow && styles.shadow,
          shadow && animatedShadowStyle,
          { borderRadius: cornerRadius },
          animatedContainerStyle,
          style,
        ]}
        {...props}
      >
        {loading ? (
          <View style={styles.loadingContainer}>
            <LoadingDot delay={0} style={{ backgroundColor: getDotColor() }} />
            <LoadingDot
              delay={100}
              style={{ backgroundColor: getDotColor() }}
            />
            <LoadingDot
              delay={200}
              style={{ backgroundColor: getDotColor() }}
            />
          </View>
        ) : (
          <>
            {icon && iconPosition === 'left' && (
              <View style={[styles.iconLeft, leftIconStyle]}>{icon}</View>
            )}
            {label && (
              <Text
                style={[
                  styles.label,
                  TextStyles.button,
                  { color: getTextColor() },
                  textStyle,
                ]}
              >
                {label}
              </Text>
            )}
            {icon && iconPosition === 'right' && (
              <View style={styles.iconRight}>{icon}</View>
            )}
          </>
        )}
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 52,
  },
  shadow: {
    shadowColor: BASE_COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  gradiant_style: {
    // height: '100%',
    // width: '100%',
    // overflow: 'hidden',
  },
  fullWidth: {
    alignSelf: 'stretch',
  },
  label: {
    textAlign: 'center',
    fontWeight:"500"
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 24,
    paddingHorizontal: 12,
  },
  loadingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: BASE_COLORS.WHITE,
    marginHorizontal: 4,
  },
});

export default CustomButton;
