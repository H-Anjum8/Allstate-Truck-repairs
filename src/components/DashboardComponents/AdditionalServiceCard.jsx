// AdditionalServiceCard.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { FONTS } from '../../theme/fonts';
import BASE_COLORS from '../../utils/colors';

const AdditionalServiceCard = ({
  title,
  price,
  description,
  onAccept,
  onDecline,
}) => {
  return (
    <View style={styles.additionalCard}>
      <Text style={styles.additionalTitle}>
        Additional Service Added by Provider
      </Text>
      <Text style={styles.Title}>
        Doug’s Roadside Garage has added an extra service to your ongoing
        booking
      </Text>
      {/* Service Item */}
      <View style={styles.additionalServiceBox}>
        <View style={styles.serviceHeaderRow}>
          <Text style={styles.serviceTitle}>{title}</Text>
          <Text style={styles.servicePrice}>{price}</Text>
        </View>
        <Text style={styles.additionalTitle}>Description</Text>
        <Text style={styles.additionalDesc}>{description}</Text>
      </View>

      <Text style={styles.additionalTitle}>
        Would you like to approve this additional service?
      </Text>

      {/* Accept / Decline Buttons */}
      <View style={styles.additionalBtnRow}>
        <TouchableOpacity style={styles.rejectBtn} onPress={onAccept}>
          <Text style={styles.rejectText}>Accept Service</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.acceptBtn} onPress={onDecline}>
          <Text style={styles.acceptText}>Decline Service</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  additionalCard: {
    backgroundColor: BASE_COLORS.PINK,
    borderRadius: 10,
    padding: 12,
    marginVertical: 10,
  },
  additionalServiceBox: {
    backgroundColor: BASE_COLORS.LIGHT_RED,
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: BASE_COLORS.BORDER_COLOR,
    marginBottom: 12,
  },
  serviceHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  serviceTitle: {
    fontSize: 13,
    fontFamily: FONTS.BOLD,
    color: BASE_COLORS.BLACK,
  },
  servicePrice: {
    fontSize: 13,
    fontFamily: FONTS.BOLD,
  },
  additionalTitle: {
    fontSize: 11,
    fontFamily: FONTS.BOLD,
    color: BASE_COLORS.BLACK,
    marginBottom: 8,
  },
  additionalDesc: {
    fontSize: 12,
    color: BASE_COLORS.GRAY,
    marginTop: 6,
    lineHeight: 18,
  },
  additionalBtnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  rejectBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: BASE_COLORS.DANGER,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 6,
    alignItems: 'center',
  },
  rejectText: {
    color: BASE_COLORS.DANGER,
    fontSize: 12,
    fontFamily: FONTS.MEDIUM,
  },
  acceptBtn: {
    flex: 1,
    backgroundColor: BASE_COLORS.SECONDARY,
    paddingVertical: 8,
    borderRadius: 8,
    marginLeft: 6,
    alignItems: 'center',
  },
  acceptText: {
    color: BASE_COLORS.WHITE,
    fontSize: 12,
    fontFamily: FONTS.MEDIUM,
  },
  Title: {
    fontSize: 10,
    paddingHorizontal: 4,
    marginBottom: 4,
  },
  additionalTitle: {
    fontSize: 11,
    fontFamily: FONTS.BOLD,
    color: BASE_COLORS.BLACK,
    marginBottom: 8,
  },
});

export default AdditionalServiceCard;
