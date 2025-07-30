import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { IMAGES } from '../../../../utils/appAssets';
import CustomButton from '../../../../components/CustomButton';
import BASE_COLORS from '../../../../utils/colors';
import { FONTS } from '../../../../theme/fonts';
import AuthWrapper from '../../../../components/AuthWrapper';
import MyBookingHeader from '../../../../components/DashboardComponents/MyBookingHeader';

const MyBookingDetails = () => {
  const navigation = useNavigation();
  const [cancelModalVisible, setCancelModalVisible] = useState(false);

  const handleCancel = () => {
    console.log('Cancel action');
    // Add cancel logic here
  };

  const handleComplete = () => {
    navigation.navigate('my_booking_completed', { bookingId: '12345' });
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
            source={IMAGES.GARAGE_LOGO}
            resizeMode="contain"
            style={styles.logo}
          />
          <View style={styles.nameStatusRow}>
            <Text style={styles.garageName}>Doug’s Roadside Garage</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>Confirmed</Text>
            </View>
          </View>
        </View>

        {[
          {
            title: 'Tire Replacement & Rotation',
            time: '10:00 AM - 12:30 PM',
            price: '$99',
          },
          { title: 'Oil Change', time: '03:00 AM - 03:30 PM', price: '$69' },
          {
            title: 'Suspension Check',
            time: '05:00 AM - 06:30 PM',
            price: '$120',
          },
        ].map((item, index) => (
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

        <TouchableOpacity style={styles.locationCard}>
          <Ionicons name="location-outline" size={18} color="#fff" />
          <Text style={styles.locationText}>
            456 Repair Lane, Springfield, IL
          </Text>
          <TouchableOpacity style={styles.directionBtn}>
            <Text style={styles.directionText}>Get Direction</Text>
          </TouchableOpacity>
        </TouchableOpacity>

        <View style={styles.overviewCard}>
          <Text style={styles.sectionTitle}>Booking Overview</Text>
          <View style={styles.row}>
            <Text>Total Services</Text>
            <Text>3</Text>
          </View>
          <View style={styles.row}>
            <Text>Reservation Fee</Text>
            <Text>$35</Text>
          </View>
          <View style={styles.row}>
            <Text>Remaining Due</Text>
            <Text>$253</Text>
          </View>
          <View style={styles.rows}>
            <Text>Tax(8%)</Text>
            <Text>$16</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.subtotalLabel}>Subtotal</Text>
            <Text style={styles.subtotal}>$304</Text>
          </View>
          <View style={styles.rows}>
            <Text>Reservation Paid</Text>
            <Text>$35</Text>
          </View>
          <View style={styles.rows}>
            <Text>Remaining Due (Upon Completion)</Text>
            <Text>$259</Text>
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
      </ScrollView>

      {/* ✅ Cancel Confirmation Modal */}
      <Modal
        transparent={true}
        visible={cancelModalVisible}
        animationType="fade"
        onRequestClose={() => setCancelModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <TouchableOpacity
              style={{ alignSelf: 'flex-end' }}
              onPress={() => setCancelModalVisible(false)}
            >
              <Ionicons
                name="close-circle"
                size={24}
                color={BASE_COLORS.PRIMARY_LIGHT}
              />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>
              Are You Sure You Want to {'\n'}Cancel?
            </Text>
            <Text style={styles.modalSubtitle}>
              Your reservation fee will not be refunded if you cancel this
              booking.
            </Text>

            <CustomButton
              label="No, Keep Booking"
              onPress={() => setCancelModalVisible(false)}
              style={styles.noButton}
              textStyle={styles.noButtonText}
            />

            <CustomButton
              label="Yes, Cancel Booking"
              onPress={() => {
                setCancelModalVisible(false);
                handleCancel();
              }}
              style={styles.yesButton}
              textStyle={styles.yesButtonText}
            />
          </View>
        </View>
      </Modal>
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
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BASE_COLORS.BLACKISH,
  },
  modalBox: {
    width: '90%',
    backgroundColor: BASE_COLORS.WHITE,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: FONTS.BOLD,
    textAlign: 'center',
    marginTop: 10,
    color: BASE_COLORS.DARK_GRAY,
  },
  modalSubtitle: {
    textAlign: 'center',
    fontSize: 12,
    color: BASE_COLORS.GREY,
    marginTop: 8,
  },
  noButton: {
    backgroundColor: BASE_COLORS.SECONDARY,
    marginTop: 20,
    height: 50,
    width: '95%',
    borderRadius: 8,
  },
  noButtonText: {
    color: BASE_COLORS.WHITE,
    fontSize: 14,
    fontFamily: FONTS.MEDIUM,
  },
  yesButton: {
    backgroundColor: BASE_COLORS.WHITE,
    borderWidth: 1,
    borderColor: BASE_COLORS.SECONDARY,
    height: 50,
    width: '95%',
    borderRadius: 8,
    marginTop: -10,
  },
  yesButtonText: {
    color: BASE_COLORS.SECONDARY,
    fontSize: 14,
    fontFamily: FONTS.MEDIUM,
  },
});

export default MyBookingDetails;
