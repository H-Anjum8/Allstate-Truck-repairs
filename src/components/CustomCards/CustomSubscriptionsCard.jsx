import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BASE_COLORS, { getColorWithOpacity } from '../../utils/colors';
import { FONTS, TextStyles } from '../../theme/fonts';

const CustomSubscriptionsCard = ({ item, isSelected, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.planBox, isSelected && styles.planBoxSelected]}
      onPress={() => onPress(item.id)}
    >
      <View style={styles.planHeader}>
        <View style={styles.planLeft}>
          <View
            style={[
              styles.radioButton,
              isSelected && styles.radioButtonSelected,
            ]}
          >
            {isSelected && (
              <Ionicons name="checkmark" size={16} color={BASE_COLORS.WHITE} />
            )}
          </View>
          <Text style={styles.planTitle}>{item.title}</Text>
        </View>

        <View style={styles.planRight}>
          {item.price && <Text style={styles.planPrice}>{item.price}</Text>}
          {item.discount && (
            <Text style={styles.planDiscount}>{item.discount}</Text>
          )}
          {item.description && (
            <Text style={styles.planDescription}>{item.description}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  planBox: {
    borderWidth: 1,
    borderColor: BASE_COLORS.SECONDARY_LIGHT,
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: getColorWithOpacity(BASE_COLORS.SECONDARY, 0.02),
  },
  planBoxSelected: {
    borderColor: BASE_COLORS.SECONDARY,
    backgroundColor: BASE_COLORS.SECONDARY_LIGHT,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  planLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: BASE_COLORS.SECONDARY_LIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    backgroundColor: BASE_COLORS.SECONDARY,
  },
  planTitle: {
    ...TextStyles.heading2,
    color: BASE_COLORS.BLACK,
    fontWeight: '500',
  },
  planRight: {
    alignItems: 'flex-end',
  },
  planPrice: {
    fontSize: 18,
    fontFamily: FONTS.BOLD || FONTS.REGULAR,
    color: BASE_COLORS.BLACK,
    fontWeight: 'bold',
  },
  planDiscount: {
    fontSize: 12,
    fontFamily: FONTS.REGULAR,
    color: BASE_COLORS.SECONDARY,
    marginTop: 2,
  },
  planDescription: {
    fontSize: 12,
    fontFamily: FONTS.REGULAR,
    color: BASE_COLORS.SECONDARY,
    marginTop: 8,
    textAlign: 'right',
  },
});

export default CustomSubscriptionsCard;
