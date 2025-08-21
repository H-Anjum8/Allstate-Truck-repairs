import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import COLORS, { BASE_COLORS } from '../../utils/colors';

const CustomTextInput = ({
  placeholder,
  iconName,
  secure,
  value,
  iconColor,
  onChangeText,
  multiline,
  numberOfLines,
  inputContainerStyle,
  textInputStyle,
  leftIcon,
}) => {
  const [showPassword, setShowPassword] = useState(!secure);

  return (
    <View style={styles.container}>
      {leftIcon ? (
        leftIcon
      ) : iconName ? (
        <Ionicons
          name={iconName}
          size={20}
          color={iconColor || COLORS.TEXT_INPUT_FIELD}
          style={styles.icon}
        />
      ) : null}
      <TextInput
        style={[styles.input, textInputStyle]}
        placeholder={placeholder}
        placeholderTextColor={COLORS.TEXT_INPUT_FIELD}
        secureTextEntry={!showPassword}
        value={value}
        onChangeText={onChangeText}
        color={BASE_COLORS.BLACK}
        multiline={multiline}
        numberOfLines={numberOfLines}
        textAlignVertical={multiline ? 'top' : 'center'}
      />
      {secure && (
        <TouchableOpacity onPress={() => setShowPassword(prev => !prev)}>
          <Ionicons
            name={showPassword ? 'eye-off-outline' : 'eye-outline'}
            size={20}
            color={COLORS.TEXT_INPUT_FIELD}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: COLORS.LIGHT_GRAY,
    borderRadius: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    marginBottom: 7,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: COLORS.TEXT_INPUT_FIELD,
  },
});
