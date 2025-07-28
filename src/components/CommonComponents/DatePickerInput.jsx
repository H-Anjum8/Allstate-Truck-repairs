// components/DatePickerInput.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function DatePickerInput({ date, onPress }) {
  return (
    <TouchableOpacity style={styles.datePicker} onPress={onPress}>
      <Text style={{ color: date ? 'black' : '#aaa' }}>
        {date ? date.toDateString() : 'Select your date'}
      </Text>
      <Ionicons name="calendar-outline" size={20} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  datePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    padding: 14,
    marginTop: 6,
  },
});
