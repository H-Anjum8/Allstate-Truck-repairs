import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BASE_COLORS from '../../utils/colors';
import { FONTS, TextStyles } from '../../theme/fonts';

const MyBookingHeader = ({ title = 'Header', onBackPress }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
        <Ionicons name="chevron-back" size={24} color={BASE_COLORS.BLACK} />
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>

      {/* Placeholder for alignment */}
      <View style={{ width: 24 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 23,
    justifyContent: 'space-between',
  },
  backButton: {
    minWidth: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 1,
  },
  title: {
    color: BASE_COLORS.BLACK,
    fontFamily: FONTS.MEDIUM,
    fontSize: 24,

    fontWeight: 500,
    marginLeft: 0,
    marginRight: 0,
    alignSelf: 'flex-start',
    fontFamily: FONTS.BOLD,
  },
});

export default MyBookingHeader;
