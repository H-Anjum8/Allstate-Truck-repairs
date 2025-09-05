import React, { useState, useRef, useEffect, memo } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Keyboard,
  Pressable,
} from 'react-native';
import BASE_COLORS from '../../utils/colors';
import { FONTS } from '../../theme/fonts';

const CustomOTPInput = ({
  length = 4,
  onOTPComplete,
  onChangeOTP,
  defaultValue = '',
  error = '',
  autoFocus = true,
  secureTextEntry = false,
  containerStyle,
  inputContainerStyle,
  inputStyle,
  errorTextStyle,
  label,
  required = false,
}) => {
  const [otp, setOtp] = useState(Array(length).fill(''));
  const [focusedIndex, setFocusedIndex] = useState(null);
  const inputRefs = useRef([]);

  // Debug log to check what error value is being passed
  // Prefill default value
  useEffect(() => {
    if (defaultValue && defaultValue.length === length) {
      const otpArray = defaultValue.split('');
      setOtp(otpArray);
    }
  }, [defaultValue, length]);

  // Auto-focus first input on mount if autoFocus is true
  useEffect(() => {
    if (autoFocus && inputRefs.current[0]) {
      setTimeout(() => {
        inputRefs.current[0].focus();
      }, 100);
    }
  }, [autoFocus]);

  const handleChange = (value, index) => {
    if (value.length > 1) {
      // Handle pasting multiple digits
      const otpArray = value.split('').slice(0, length);
      const newOtp = [...otp];

      // Fill in as many inputs as we can
      for (let i = 0; i < Math.min(otpArray.length, length - index); i++) {
        newOtp[index + i] = otpArray[i];
      }

      setOtp(newOtp);

      // Focus next empty input or the last one
      const nextEmptyIndex = newOtp.findIndex(digit => digit === '');
      if (nextEmptyIndex !== -1 && nextEmptyIndex < length) {
        inputRefs.current[nextEmptyIndex].focus();
      } else {
        inputRefs.current[length - 1].focus();
        Keyboard.dismiss();
      }

      // Notify about changes
      onChangeOTP?.(newOtp.join(''));

      // Check if completed
      if (newOtp.every(digit => digit !== '')) {
        onOTPComplete?.(newOtp.join(''));
      }

      return;
    }

    // Normal single digit input
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Sync with parent component
    onChangeOTP?.(newOtp.join(''));

    // Auto-focus next box
    if (value !== '' && index < length - 1) {
      inputRefs.current[index + 1].focus();
    } else if (index === length - 1 && value !== '') {
      Keyboard.dismiss();
    }

    // Call onComplete when all digits are filled
    if (newOtp.every(digit => digit !== '')) {
      onOTPComplete?.(newOtp.join(''));
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && otp[index] === '') {
      // Move to previous input when backspace is pressed on empty input
      if (index > 0) {
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);

        onChangeOTP?.(newOtp.join(''));
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleInputFocus = index => {
    setFocusedIndex(index);
  };

  const handleInputBlur = () => {
    setFocusedIndex(null);
  };

  const focusInput = index => {
    if (inputRefs.current[index]) {
      inputRefs.current[index].focus();
    }
  };

  // Get styles without the animation state that was removing the error styling
  const getInputBoxStyle = index => {
    const styles = [stylesObj.otpBox, inputContainerStyle];

    // Only apply error styling if error exists and is a non-empty string
    if (error && typeof error === 'string' && error.length > 0) {
      styles.push(stylesObj.errorBox);
    }

    if (focusedIndex === index) {
      styles.push(stylesObj.focusedBox);
    }

    if (otp[index]) {
      styles.push(stylesObj.filledBox);
    }

    return styles;
  };

  return (
    <View style={[stylesObj.mainContainer, containerStyle]}>
      {/* Label */}
      {label && (
        <Text style={[stylesObj.label, error && stylesObj.errorLabel]}>
          {label}
          {required && <Text style={stylesObj.requiredStar}>*</Text>}
        </Text>
      )}

      <Pressable
        style={stylesObj.container}
        onPress={() => {
          // Find the first empty cell or focus the last one
          const emptyIndex = otp.findIndex(digit => digit === '');
          focusInput(emptyIndex !== -1 ? emptyIndex : length - 1);
        }}
      >
        {otp.map((digit, index) => (
          <View key={index} style={getInputBoxStyle(index)}>
            <TextInput
              ref={ref => (inputRefs.current[index] = ref)}
              style={[stylesObj.otpText, inputStyle]}
              value={digit}
              keyboardType="number-pad"
              maxLength={secureTextEntry ? 1 : length} // Allow pasting if not secure
              onChangeText={value => handleChange(value, index)}
              onKeyPress={e => handleKeyPress(e, index)}
              secureTextEntry={secureTextEntry}
              textAlign="center"
              onFocus={() => handleInputFocus(index)}
              onBlur={handleInputBlur}
              selectionColor={BASE_COLORS.WHITE}
              placeholderTextColor={BASE_COLORS.GRAY}
            />
          </View>
        ))}
      </Pressable>

      {/* Error Message - only show if error is a non-empty string */}
      {error && typeof error === 'string' && error.length > 0 ? (
        <Text style={[stylesObj.errorText, errorTextStyle]}>{error}</Text>
      ) : null}
    </View>
  );
};

// Renamed from 'styles' to 'stylesObj' to avoid conflicts
const stylesObj = StyleSheet.create({
  mainContainer: {
    width: '100%',
  },
  label: {
    fontSize: 24,
    color: BASE_COLORS.BLACK,
    marginBottom: 8,
  },
  requiredStar: {
    color: BASE_COLORS.STATUS.ERROR,
    marginLeft: 2,
  },
  errorLabel: {
    color: BASE_COLORS.STATUS.ERROR,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginVertical: 8,
  },
  otpBox: {
    flex: 1,
    height: 50,
    margin: 6,
    borderRadius: 10,
    borderWidth: 1, // Increased border width for better visibility
    borderColor: BASE_COLORS.BORDER_COLOR, // Transparent by default
    // backgroundColor: getColorWithOpacity(BASE_COLORS.white, 0.05),
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  focusedBox: {
    borderColor: BASE_COLORS.SECONDARY,
    backgroundColor: BASE_COLORS.SECONDARY,
    borderWidth: 1.3, // Increased border width for better visibility
  },
  filledBox: {
    backgroundColor: BASE_COLORS.SECONDARY,
    borderColor: BASE_COLORS.SECONDARY,
    borderWidth: 1.3, // Increased border width for better visibility
  },
  errorBox: {
    borderColor: BASE_COLORS.STATUS.ERROR,
    borderWidth: 2, // Make the error border even more visible
  },
  otpText: {
    width: '100%',
    height: '100%',
    color: BASE_COLORS.WHITE,
    textAlign: 'center',
    fontSize: 24,
  },
  errorText: {
    color: BASE_COLORS.STATUS.ERROR,
    marginTop: 4,
    textAlign: 'center',
    fontSize: 12,
    fontFamily: FONTS.REGULAR,
  },
});

export default memo(CustomOTPInput);
