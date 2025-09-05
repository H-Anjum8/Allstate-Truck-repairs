import React, { useState, forwardRef } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BASE_COLORS, { getColorWithOpacity } from '../../utils/colors';
import { isIOS } from '../../utils/helpers';
import { TextStyles } from '../../theme/fonts';

const CustomInput = forwardRef(
  (
    {
      // Field configuration
      label,
      placeholder = '',
      value,
      onChangeText,
      onBlur,
      onFocus,

      // Validation & error handling
      error,
      required = false,

      // Field type & behavior
      secureTextEntry = false,
      keyboardType = 'default',
      autoCapitalize = 'none',
      editable = true,
      multiline = false,
      numberOfLines = 1,
      maxLength,

      // Visual customization
      prefixIcon,
      suffixIcon,
      showPasswordToggle = false,
      style,
      inputStyle,
      labelStyle,
      containerStyle,

      // Extra features
      showCharCount = false,
      autoFocus = false,

      // Additional props
      ...props
    },
    ref,
  ) => {
    // State
    const [isFocused, setIsFocused] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(
      !secureTextEntry,
    );

    // Animation for focus effect
    const [focusAnim] = useState(new Animated.Value(0));

    // Handle focus animation
    const handleFocus = () => {
      setIsFocused(true);
      Animated.timing(focusAnim, {
        toValue: 1,
        duration: 200,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }).start();

      if (onFocus) onFocus();
    };

    // Handle blur animation
    const handleBlur = () => {
      setIsFocused(false);
      Animated.timing(focusAnim, {
        toValue: 0,
        duration: 200,
        easing: Easing.in(Easing.ease),
        useNativeDriver: false,
      }).start();

      if (onBlur) onBlur();
    };

    // Toggle password visibility
    const togglePasswordVisibility = () => {
      setIsPasswordVisible(!isPasswordVisible);
    };

    // Interpolate animation values
    const borderColorAnim = focusAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [
        error ? BASE_COLORS.STATUS.ERROR : BASE_COLORS.BORDER_COLOR,
        error ? BASE_COLORS.STATUS.ERROR : BASE_COLORS.BORDER_COLOR,
      ],
    });

    // Determine if the input has any content
    const hasContent = value !== undefined && value !== '';

    // Check if there is an error to display
    const showError = error;

    // Determine the icon color based on state
    const getIconColor = () => {
      if (error) return BASE_COLORS.STATUS.ERROR;
      return BASE_COLORS.PRIMARY;
    };

    // Get character count text
    const getCharCountText = () => {
      if (!maxLength || !showCharCount) return null;
      return `${value?.length || 0}/${maxLength}`;
    };

    return (
      <View style={[styles.container, containerStyle]}>
        {/* Label */}
        {label && (
          <Text
            style={[
              styles.label,
              error && styles.errorLabel,
              isFocused && styles.focusedLabel,
              hasContent && styles.activeLabel,
              labelStyle,
            ]}
          >
            {label}
            {required && <Text style={styles.requiredStar}>*</Text>}
          </Text>
        )}

        {/* Input container */}
        <Animated.View
          style={[
            styles.inputContainer,
            {
              borderColor: borderColorAnim,
              backgroundColor: editable
                ? getColorWithOpacity(BASE_COLORS.WHITE, 0.05)
                : 'rgba(255, 255, 255, 0.05)',
              opacity: editable ? 1 : 0.6,
            },
            isFocused && styles.focusedContainer,
            error && styles.errorContainer,
            multiline && styles.multilineContainer,
            style,
          ]}
        >
          {/* Prefix icon */}
          {prefixIcon && <View style={styles.prefixIcon}>{prefixIcon}</View>}

          {/* Input field */}
          <TextInput
            ref={ref}
            style={[
              styles.input,
              prefixIcon && styles.inputWithPrefix,
              (suffixIcon || showPasswordToggle) && styles.inputWithSuffix,
              multiline && styles.multilineInput,
              inputStyle,
            ]}
            placeholder={placeholder}
            placeholderTextColor={BASE_COLORS.GRAY}
            value={value}
            onChangeText={onChangeText}
            onFocus={handleFocus}
            onBlur={handleBlur}
            secureTextEntry={secureTextEntry && !isPasswordVisible}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
            editable={editable}
            multiline={multiline}
            numberOfLines={numberOfLines}
            maxLength={maxLength}
            autoFocus={autoFocus}
            {...props}
          />

          {/* Password toggle button */}
          {showPasswordToggle && (
            <TouchableOpacity
              style={styles.suffixIcon}
              onPress={togglePasswordVisibility}
              activeOpacity={0.7}
            >
              <MaterialCommunityIcons
                name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
                size={23}
                color={getIconColor()}
              />
            </TouchableOpacity>
          )}

          {/* Custom suffix icon */}
          {suffixIcon && !showPasswordToggle && (
            <View style={styles.suffixIcon}>{suffixIcon}</View>
          )}
        </Animated.View>

        {/* Error message or character count */}
        <View style={styles.bottomRow}>
          {showError && <Text style={styles.errorText}>{error}</Text>}

          {showCharCount && (
            <Text
              style={[styles.charCount, showError && styles.charCountWithError]}
            >
              {getCharCountText()}
            </Text>
          )}
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    // marginBottom: 16,
    width: '100%',
  },
  label: {
    ...TextStyles.body,
    fontWeight:"500",
    marginBottom: 6,
  },
  requiredStar: {
    color: BASE_COLORS.STATUS.ERROR,
    marginLeft: 2,
  },
  // focusedLabel: {
  //   color: BASE_COLORS.WHITE,
  // },
  // activeLabel: {
  //   color: BASE_COLORS.WHITE,
  // },
  // errorLabel: {
  //   color: BASE_COLORS.STATUS.ERROR,
  // },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    // backgroundColor: getColorWithOpacity(BASE_COLORS.WHITE, 0.05),
    borderColor: BASE_COLORS.BORDER_COLOR,
    height: 50,
    paddingHorizontal: 15,
  },
  focusedContainer: {
    borderColor: BASE_COLORS.PRIMARY,
    borderWidth: 1.3,
  },
  errorContainer: {
    borderColor: BASE_COLORS.STATUS.ERROR,
    borderWidth: 1.3,
  },
  multilineContainer: {
    minHeight: 100,
    paddingVertical: 12,
  },
  input: {
    flex: 1,
    ...TextStyles.body,
    lineHeight: 18,
    padding: 0,
    fontWeight:"400",
    paddingVertical: isIOS ? 10 : 0,
  },
  inputWithPrefix: {
    paddingLeft: 8,
  },
  inputWithSuffix: {
    paddingRight: 8,
  },
  multilineInput: {
    textAlignVertical: 'top',
    height: 85, // To allow multiline
  },
  prefixIcon: {
    marginRight: 8,
  },
  suffixIcon: {
    marginLeft: 8,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  errorText: {
    ...TextStyles.caption,
    color: BASE_COLORS.STATUS.ERROR,
    flex: 1,
  },
  charCount: {
    ...TextStyles.caption,
    color: BASE_COLORS.TEXT_GRAY,
    textAlign: 'right',
  },
  charCountWithError: {
    marginLeft: 8,
  },
  disabledContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    opacity: 0.6,
  },
});

export default CustomInput;
