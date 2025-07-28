import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import CustomHeader from '../../../components/CustomHeaders';
import CustomButton from '../../../components/CustomButton';
import BASE_COLORS from '../../../utils/colors';
import AuthWrapper from '../../../components/AuthWrapper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BookingServiceList from '../../../components/DashboardComponents/BookingServiceList';
import { FONTS } from '../../../theme/fonts';
export default function ConfirmBooking() {
  const route = useRoute();
  const navigation = useNavigation();
  const { garageservices, selectedSlots, notes, date } = route.params;

  const calculateTotal = () => {
    return garageservices.reduce((acc, item) => acc + item.price, 0);
  };

  return (
    <AuthWrapper>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <CustomHeader
          leftIcon={<Ionicons name="chevron-back" size={24} color="black" />}
          onLeftPress={() => navigation.goBack()}
          description="Choose a time and provide details to complete your multi-service booking."
          username="Confirm Booking Details"
          usernameTextStyle={{
            fontSize: 20,
            color: BASE_COLORS.BLACK,
            marginTop: 6,
          }}
          descriptionTextStyle={{
            fontSize: 11,
            marginBottom: 10,
            color: BASE_COLORS.BLACK,
          }}
          showWelcomeText={false}
          showDescription={true}
          showUsername={true}
        />

        <BookingServiceList services={garageservices} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Appointment Date & Time</Text>
          <View style={styles.dateBox}>
            <Text style={styles.dateText}>
              {date ? new Date(date).toDateString() : 'No date selected'}
            </Text>
          </View>

          {garageservices.map(service => (
            <View key={service.id} style={{ marginVertical: 8 }}>
              <Text style={styles.serviceTitle}>
                {garageservices.indexOf(service) + 1}. {service.name}
              </Text>
              <View style={styles.slotBox}>
                <Text style={styles.slotText}>
                  {selectedSlots[service.id] || 'No slot selected'}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Additional Notes</Text>
          <View style={styles.notesBox}>
            <Text style={styles.slotText}>
              {notes || 'No additional notes'}
            </Text>
          </View>
        </View>

        <CustomButton
          label="Confirm"
          onPress={() => {
            navigation.navigate('request_booking');
          }}
          style={{
            marginTop: '10',
            marginHorizontal: -3,
            height: 54,
            borderRadius: 10,
          }}
          textStyle={{ fontSize: 12 }}
        />
      </ScrollView>
    </AuthWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 2,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 13,
    fontFamily: FONTS.BOLD,
    color: BASE_COLORS.BLACK,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  leftText: {
    fontSize: 13,
    color: BASE_COLORS.BLACK,
  },
  rightText: {
    fontSize: 13,
    color: BASE_COLORS.BLACK,
  },
  dateBox: {
    backgroundColor: BASE_COLORS.TABLE_BACKGROUND,
    borderColor: BASE_COLORS.BORDER_COLOR,
    borderWidth: 1,
    padding: 14,
    borderRadius: 8,
    marginBottom: 8,
  },
  dateText: {
    fontSize: 13,
    color: BASE_COLORS.BLACK,
  },
  serviceTitle: {
    fontSize: 11,
    fontWeight: '500',
    marginBottom: 6,
    color: BASE_COLORS.TEXT_TERNARY,
  },
  slotBox: {
    backgroundColor: BASE_COLORS.LIGHT_BLUE,
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,

    width: '50%',
  },
  notesBox: {
    backgroundColor: BASE_COLORS.TABLE_BACKGROUND,
    borderColor: BASE_COLORS.BORDER_COLOR,
    borderWidth: 1,
    borderRadius: 6,
    padding: 16,
    marginTop: 4,
  },
  slotText: {
    fontSize: 12,
    color: BASE_COLORS.BLACK,
  },
  button: {
    margin: 16,
    height: 56,
    backgroundColor: BASE_COLORS.RED,
  },
});
