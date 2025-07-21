import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { TextStyles } from '../../theme/fonts';
import BASE_COLORS from '../../utils/colors';

const CustomButton = ({
  label,
  onPress,
  style,
  textStyle,
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = true,
  cornerRadius = 12,
  ...props
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        {
          backgroundColor: BASE_COLORS.SECONDARY,
          borderRadius: cornerRadius,
        },
        fullWidth && styles.fullWidth,
        style,
      ]}
      {...props}
    >
      {icon && iconPosition === 'left' && (
        <View style={styles.iconLeft}>{icon}</View>
      )}

      <Text
        style={[
          styles.label,
          TextStyles.button,
          { color: BASE_COLORS.WHITE },
          textStyle,
        ]}
      >
        {loading ? 'Loading...' : label}
      </Text>

      {icon && iconPosition === 'right' && (
        <View style={styles.iconRight}>{icon}</View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    marginBottom: 20,
    marginHorizontal: 10,
  },
  fullWidth: {
    alignSelf: 'stretch',
  },
  label: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
});

export default CustomButton;
