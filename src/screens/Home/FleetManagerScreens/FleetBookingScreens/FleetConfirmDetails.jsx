import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from '../../../../components/CustomButton';
import BASE_COLORS from '../../../../utils/colors';
import { FONTS } from '../../../../theme/fonts';
import AuthWrapper from '../../../../components/AuthWrapper';
import MyBookingHeader from '../../../../components/DashboardComponents/MyBookingHeader';
import LocationCard from '../../../../components/LocationCard';

import {
  additional_services,
  fleetCancelDummy,
} from '../../../../utils/staticData';
import CancelConfirmationModal from '../../../../components/modalComponents/CancelConfirmationModal';
import AdditionalServiceCard from '../../../../components/DashboardComponents/AdditionalServiceCard';

const FleetConfirmDetails = () => {
  const navigation = useNavigation();
  const [reviewModalVisible, setReviewModalVisible] = useState(false);
  const [cancelModalVisible, setCancelModalVisible] = useState(false);
  const [extraServices, setExtraServices] = useState(additional_services);
  const handleReviewSubmit = data => {
    console.log('Review Submitted:', data);
    setReviewModalVisible(false);
  };
  const handleComplete = () => {
    navigation.navigate('fleet_completed_details', { bookingId: '12345' });
  };
  const handleAccept = id => {
    setExtraServices(prev => prev.filter(service => service.id !== id));
  };

  const handleDecline = id => {
    setExtraServices(prev => prev.filter(service => service.id !== id));
  };
  return (
    <AuthWrapper>
      <MyBookingHeader
        title="Booking Detail"
        onBackPress={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.garageHeader}>
          <Image
            source={fleetCancelDummy.garage.logo}
            resizeMode="contain"
            style={styles.logo}
          />
          <View style={styles.nameStatusRow}>
            <Text style={styles.garageName}>
              {fleetCancelDummy.garage.name}
            </Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>Confirmed</Text>
            </View>
          </View>
        </View>
        {/* Vehicle Header */}
        <View style={styles.vehicleHeader}>
          <Text style={styles.vehicleText}>
            {fleetCancelDummy.vehicle.name}
          </Text>
        </View>

        {/* Vehicle Info */}
        <View style={styles.infoRow}>
          <View style={styles.infoBox}>
            <Text style={styles.label}>License Plate</Text>
            <Text style={styles.value}>
              {fleetCancelDummy.vehicle.licensePlate}
            </Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.label}>Status</Text>
            <View style={styles.statusRow}>
              <Ionicons name="ellipse" size={10} color={BASE_COLORS.GREEN} />
              <Text style={styles.value}>
                {' '}
                {fleetCancelDummy.vehicle.status}
              </Text>
            </View>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.label}>Year</Text>
            <Text style={styles.value}>{fleetCancelDummy.vehicle.year}</Text>
          </View>
        </View>

        {/* Driver Card */}
        <View style={styles.driverCard}>
          <Text style={styles.label}>Assigned Driver</Text>
          <View style={styles.driverRow}>
            <Image
              source={fleetCancelDummy.driver.image}
              style={styles.driverImage}
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.driverName}>
                {fleetCancelDummy.driver.name}
              </Text>

              {/* Phone + Email */}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 4,
                }}
              >
                <View style={styles.iconRow}>
                  <Ionicons
                    name="call-outline"
                    size={16}
                    color={BASE_COLORS.SECONDARY}
                  />
                  <Text style={styles.driverInfo}>
                    {fleetCancelDummy.driver.phone}
                  </Text>
                </View>

                <View style={[styles.iconRow, { marginLeft: 12 }]}>
                  <Ionicons
                    name="mail-outline"
                    size={16}
                    color={BASE_COLORS.SECONDARY}
                  />
                  <Text style={styles.driverInfo}>
                    {fleetCancelDummy.driver.email}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Work Status */}
        <View style={styles.workRow}>
          <Text style={styles.worklabel}>Work Status</Text>
          <View style={styles.statusRow}>
            <Ionicons name="ellipse" size={10} color={BASE_COLORS.ORANGE} />
            <Text style={styles.value}> In Progress</Text>
          </View>
        </View>

        {/* Services */}
        {fleetCancelDummy.services.map((item, index) => (
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
        {/* ✅ ADDITIONAL SERVICES  Section */}

        {extraServices.map(service => (
          <AdditionalServiceCard
            key={service.id}
            provider={service.provider}
            title={service.title}
            price={service.price}
            description={service.description}
            onAccept={() => handleAccept(service.id)}
            onDecline={() => handleDecline(service.id)}
          />
        ))}
        {/* location  */}
        <LocationCard cardstyle={{ marginTop: 6 }} />
        {/* Booking Overview */}
        <View style={styles.overviewCard}>
          <Text style={styles.sectionTitle}>Booking Overview</Text>
          <View style={styles.row}>
            <Text>Total Services</Text>
            <Text>{fleetCancelDummy.overview.totalServices}</Text>
          </View>
          <View style={styles.row}>
            <Text>Reservation Fee</Text>
            <Text>{fleetCancelDummy.overview.reservationFee}</Text>
          </View>
          <View style={styles.row}>
            <Text>Remaining Due</Text>
            <Text>{fleetCancelDummy.overview.remainingDue}</Text>
          </View>
          <View style={styles.rows}>
            <Text>Tax(8%)</Text>
            <Text>{fleetCancelDummy.overview.tax}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.subtotalLabel}>Subtotal</Text>
            <Text style={styles.subtotal}>
              {fleetCancelDummy.overview.subtotal}
            </Text>
          </View>
          <View style={styles.rows}>
            <Text>Reservation Paid</Text>
            <Text>{fleetCancelDummy.overview.reservationPaid}</Text>
          </View>
          <View style={styles.rows}>
            <Text>Remaining Due (Upon Completion)</Text>
            <Text>{fleetCancelDummy.overview.remainingDueFinal}</Text>
          </View>
        </View>

        <CustomButton
          label="Mark as Completed"
          onPress={handleComplete}
          style={{ marginHorizontal: 3, marginTop: 30, height: 53 }}
          textStyle={{ fontSize: 12 }}
        />

        <CustomButton
          label="Cancel Booking"
          onPress={() => setCancelModalVisible(true)}
          style={{
            marginHorizontal: 3,
            marginTop: -6,
            height: 53,
            backgroundColor: BASE_COLORS.WHITE,
            borderWidth: 1,
            borderColor: BASE_COLORS.PRIMARY_LIGHT,
          }}
          textStyle={{
            fontSize: 12,
            color: BASE_COLORS.PRIMARY_LIGHT,
          }}
        />
        <CancelConfirmationModal
          visible={cancelModalVisible}
          onClose={() => setCancelModalVisible(false)}
          onConfirm={() => {
            setCancelModalVisible(false);
            handleCancel(); // your existing cancel logic
          }}
        />
      </ScrollView>
    </AuthWrapper>
  );
};
const styles = StyleSheet.create({
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
    fontSize: 14,
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
  vehicleHeader: {
    backgroundColor: BASE_COLORS.PRIMARY,
    padding: 10,
    borderRadius: 6,
    margin: 10,
  },
  vehicleText: {
    color: BASE_COLORS.WHITE,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginBottom: 10,
  },
  infoBox: {
    flex: 1,
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    color: BASE_COLORS.GRAY,
  },
  worklabel: {
    fontSize: 16,
    color: BASE_COLORS.BLACK,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  driverCard: {
    backgroundColor: BASE_COLORS.WHITE,
    padding: 10,
    margin: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: BASE_COLORS.BORDER_COLOR,
  },
  driverRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  driverImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  driverName: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  driverInfo: {
    fontSize: 12,
    marginLeft: 4,
    color: BASE_COLORS.TEXT_GRAY,
  },
  workRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
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

export default FleetConfirmDetails;
