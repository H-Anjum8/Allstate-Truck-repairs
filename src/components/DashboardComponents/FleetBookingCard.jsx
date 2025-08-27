import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BASE_COLORS from '../../utils/colors';
import { FONTS } from '../../theme/fonts';

const FleetBookingCard = ({
  garageLogo,
  garageName,
  status,
  vehicle,
  licensePlate,
  vehicleStatus,
  year,
  driverImage,
  driverName,
  driverPhone,
  driverEmail,
}) => {
  return (
    <View style={styles.container}>
      {/* Garage Header */}
      <View style={styles.garageHeader}>
        <Image source={garageLogo} resizeMode="contain" style={styles.logo} />
        <View style={styles.nameStatusRow}>
          <Text style={styles.garageName}>{garageName}</Text>
          <View style={[styles.statusBadge, getStatusStyle(status)]}>
            <Text style={styles.statusText}>{status}</Text>
          </View>
        </View>
      </View>

      {/* Vehicle Header */}
      <View style={styles.vehicleHeader}>
        <Text style={styles.vehicleText}>{vehicle}</Text>
      </View>

      {/* Vehicle Info */}
      <View style={styles.infoRow}>
        <View style={styles.infoBox}>
          <Text style={styles.label}>License Plate</Text>
          <Text style={styles.value}>{licensePlate}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.label}>Status</Text>
          <View style={styles.statusRow}>
            <Ionicons
              name="ellipse"
              size={10}
              color={
                vehicleStatus === 'Active' ? BASE_COLORS.GREEN : BASE_COLORS.RED
              }
            />
            <Text style={styles.value}> {vehicleStatus}</Text>
          </View>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.label}>Year</Text>
          <Text style={styles.value}>{year}</Text>
        </View>
      </View>

      {/* Driver Card */}
      <View style={styles.driverCard}>
        <Text style={styles.label}>Assigned Driver</Text>
        <View style={styles.driverRow}>
          <Image source={driverImage} style={styles.driverImage} />
          <View style={{ flex: 1 }}>
            <Text style={styles.driverName}>{driverName}</Text>

            <View style={styles.contactRow}>
              {/* Phone */}
              <View style={styles.iconRow}>
                <Ionicons
                  name="call-outline"
                  size={16}
                  color={BASE_COLORS.SECONDARY}
                />
                <Text style={styles.driverInfo}>{driverPhone}</Text>
              </View>

              {/* Email */}
              <View style={[styles.iconRow, { marginLeft: 12 }]}>
                <Ionicons
                  name="mail-outline"
                  size={16}
                  color={BASE_COLORS.SECONDARY}
                />
                <Text style={styles.driverInfo}>{driverEmail}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const getStatusStyle = status => {
  switch (status?.toLowerCase()) {
    case 'confirmed':
      return { backgroundColor: '#E0F7E9' };
    case 'cancelled':
      return { backgroundColor: '#FDE8E8' };
    case 'completed':
      return { backgroundColor: '#E6F4FF' };
    default:
      return { backgroundColor: '#F0F0F0' };
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: BASE_COLORS.WHITE,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    elevation: 2,
  },
  garageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 12,
  },
  nameStatusRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  garageName: {
    fontSize: 16,
    fontFamily: FONTS.MEDIUM,
    color: BASE_COLORS.BLACK,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 12,
    fontFamily: FONTS.MEDIUM,
    color: BASE_COLORS.BLACK,
  },
  vehicleHeader: {
    marginTop: 10,
  },
  vehicleText: {
    fontSize: 15,
    fontFamily: FONTS.SEMIBOLD,
    color: BASE_COLORS.BLACK,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  infoBox: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    color: BASE_COLORS.GREY,
    fontFamily: FONTS.REGULAR,
  },
  value: {
    fontSize: 14,
    color: BASE_COLORS.BLACK,
    fontFamily: FONTS.MEDIUM,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  driverCard: {
    marginTop: 14,
  },
  driverRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  driverImage: {
    width: 45,
    height: 45,
    borderRadius: 22,
    marginRight: 10,
  },
  driverName: {
    fontSize: 14,
    fontFamily: FONTS.MEDIUM,
    color: BASE_COLORS.BLACK,
  },
  contactRow: {
    flexDirection: 'row',
    marginTop: 4,
    alignItems: 'center',
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  driverInfo: {
    fontSize: 13,
    marginLeft: 4,
    color: BASE_COLORS.BLACK,
    fontFamily: FONTS.REGULAR,
  },
});

export default FleetBookingCard;
