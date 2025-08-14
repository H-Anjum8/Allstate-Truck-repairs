// components/DashboardComponents/BookingDetailCard.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { IMAGES } from '../../utils/appAssets';
import BASE_COLORS from '../../utils/colors';
import { FONTS } from '../../theme/fonts';

const BookingDetailCard = ({
  status = 'Confirmed',
  services = [],
  address = '456 Repair Lane, Springfield, IL',
  overview = {},
  onDirectionPress,
}) => {
  return (
    <>
      {/* 🚗 Garage Header */}
      <View style={styles.garageHeader}>
        <Image
          source={IMAGES.GARAGE_LOGO}
          resizeMode="contain"
          style={styles.logo}
        />
        <View style={styles.nameStatusRow}>
          <Text style={styles.garageName}>Doug’s Roadside Garage</Text>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>{status}</Text>
          </View>
        </View>
      </View>

      {/* 🔧 Services List */}
      {services.map((item, index) => (
        <View style={styles.serviceCard} key={index}>
          <View style={styles.serviceHeaderRow}>
            <Text style={styles.serviceTitle}>{item.title}</Text>
            <Text style={styles.servicePrice}>{item.price}</Text>
          </View>
          <View style={styles.serviceRow}>
            <Text style={styles.serviceTime}>{item.time}</Text>
          </View>
        </View>
      ))}

      {/* 📍 Location */}
      <TouchableOpacity style={styles.locationCard} onPress={onDirectionPress}>
        <Ionicons name="location-outline" size={18} color="#fff" />
        <Text style={styles.locationText}>{address}</Text>
        <TouchableOpacity style={styles.directionBtn}>
          <Text style={styles.directionText}>Get Direction</Text>
        </TouchableOpacity>
      </TouchableOpacity>

      {/* 📋 Booking Overview */}
      <View style={styles.overviewCard}>
        <Text style={styles.sectionTitle}>Booking Overview</Text>
        <View style={styles.row}>
          <Text>Total Services</Text>
          <Text>{overview.totalServices}</Text>
        </View>
        <View style={styles.row}>
          <Text>Reservation Fee</Text>
          <Text>{overview.reservationFee}</Text>
        </View>
        <View style={styles.row}>
          <Text>Remaining Due</Text>
          <Text>{overview.remainingDue}</Text>
        </View>
        <View style={styles.rows}>
          <Text>Tax(8%)</Text>
          <Text>{overview.tax}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.subtotalLabel}>Subtotal</Text>
          <Text style={styles.subtotal}>{overview.subtotal}</Text>
        </View>
        <View style={styles.rows}>
          <Text>Reservation Paid</Text>
          <Text>{overview.paid}</Text>
        </View>
        <View style={styles.rows}>
          <Text>Remaining Due (Upon Completion)</Text>
          <Text>{overview.remainingFinal}</Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  // SAME styles as both your components — copy-pasted
  garageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 5,
  },
  nameStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    marginLeft: 10,
  },
  garageName: {
    fontSize: 12,
    fontFamily: FONTS.BOLD,
    color: BASE_COLORS.BLACK,
    flexShrink: 1,
  },
  statusBadge: {
    backgroundColor: BASE_COLORS.LIGHT_GREEN,
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 12,
    marginLeft: 10,
  },
  statusText: {
    color: BASE_COLORS.GREEN,
    fontSize: 12,
    fontFamily: FONTS.MEDIUM,
  },
  serviceCard: {
    backgroundColor: BASE_COLORS.PRIMARY_SEMI,
    padding: 8,
    borderRadius: 8,
    marginBottom: 6,
  },
  serviceHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  serviceTitle: {
    fontSize: 12,
    fontFamily: FONTS.MEDIUM,
    color: BASE_COLORS.BLACK,
    flex: 1,
    marginRight: 10,
  },
  serviceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  serviceTime: {
    fontSize: 12,
    color: BASE_COLORS.PRIMARY,
    backgroundColor: BASE_COLORS.PRIMARY_SEMI,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  servicePrice: {
    fontSize: 14,
    fontFamily: FONTS.MEDIUM,
    color: BASE_COLORS.BLACK,
  },
  locationCard: {
    backgroundColor: BASE_COLORS.PRIMARY,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
  locationText: {
    color: BASE_COLORS.WHITE,
    flex: 1,
    marginHorizontal: 10,
    fontSize: 13,
  },
  directionBtn: {
    backgroundColor: BASE_COLORS.PRIMARY,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: BASE_COLORS.WHITE,
  },
  directionText: {
    color: BASE_COLORS.WHITE,
    fontSize: 12,
    fontFamily: FONTS.MEDIUM,
  },
  overviewCard: {
    backgroundColor: BASE_COLORS.WHITE,
    padding: 8,
    borderRadius: 10,
    elevation: 1,
  },
  sectionTitle: {
    fontFamily: FONTS.BOLD,
    fontSize: 14,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  rows: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
    marginBottom: 13,
  },
  subtotalLabel: {
    fontFamily: FONTS.BOLD,
  },
  subtotal: {
    fontFamily: FONTS.BOLD,
    color: BASE_COLORS.BLACK,
  },
});

export default BookingDetailCard;
