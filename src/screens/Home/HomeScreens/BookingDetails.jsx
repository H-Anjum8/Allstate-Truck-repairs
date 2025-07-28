import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import BookingServiceList from '../../../components/DashboardComponents/BookingServiceList';
import DatePickerInput from '../../../components/CommonComponents/DatePickerInput';
import ServiceUnavailableModal from '../../../components/modalComponents/ServiceUnavailableModal';
import AuthWrapper from '../../../components/AuthWrapper';
import CustomHeader from '../../../components/CustomHeaders';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BASE_COLORS from '../../../utils/colors';
import { useNavigation } from '@react-navigation/native';
import { FONTS } from '../../../theme/fonts';
import CustomButton from '../../../components/CustomButton';

const garageservices = [
  { id: 1, name: 'Tire Replacement & Rotation', price: 99 },
  { id: 2, name: 'Oil Change', price: 69 },
  { id: 3, name: 'Suspension Check', price: 120 },
];

const slotData = {
  '2025-07-10': [],
  '2025-07-11': {
    1: ['10:00 AM - 12:30 PM', '01:00 PM - 02:30 PM'],
    2: ['03:00 PM - 03:30 PM', '04:00 PM - 04:30 PM'],
    3: ['05:00 PM - 06:30 PM', '07:00 PM - 08:30 PM'],
  },
};

export default function BookingDetails() {
  const Navigation = useNavigation();
  const [notes, setNotes] = useState('');
  const [date, setDate] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  const [showUnavailableModal, setShowUnavailableModal] = useState(false);
  const [selectedSlots, setSelectedSlots] = useState({});

  const formatDateKey = dateObj => {
    return dateObj.toISOString().split('T')[0];
  };

  const handleDateChange = (event, selectedDate) => {
    setShowPicker(Platform.OS === 'ios');

    if (event?.type === 'dismissed') return;

    if (selectedDate) {
      const formatted = formatDateKey(selectedDate);
      const slotsForDate = slotData[formatted];

      if (!slotsForDate || Object.keys(slotsForDate).length === 0) {
        setShowUnavailableModal(true);
        setDate(null);
        setSelectedSlots({});
      } else {
        setDate(selectedDate);

        // ✅ Auto-select first slot per service
        const defaultSelected = {};
        garageservices.forEach(service => {
          const availableSlots = slotsForDate[service.id];
          if (availableSlots && availableSlots.length > 0) {
            defaultSelected[service.id] = availableSlots[0];
          }
        });

        setSelectedSlots(defaultSelected);
      }
    }
  };

  const handleSlotSelect = (serviceId, slot) => {
    setSelectedSlots(prev => ({
      ...prev,
      [serviceId]: slot,
    }));
  };

  const renderSlots = () => {
    if (!date) return null;

    const formattedDate = formatDateKey(date);
    const slots = slotData[formattedDate];

    return (
      <View style={{ marginTop: 16 }}>
        <Text style={styles.sectionTitle}>Available Services Time Slots</Text>
        {garageservices.map(service => (
          <View key={service.id} style={{ marginBottom: 10 }}>
            <Text style={styles.serviceTitle}>
              {garageservices.indexOf(service) + 1}. {service.name}
            </Text>

            <View style={styles.slotRow}>
              {(slots[service.id] || []).map((slot, index) => {
                const isSelected = selectedSlots[service.id] === slot;
                return (
                  <>
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.radioButtonContainer,
                        isSelected && styles.radioButtonSelected,
                      ]}
                      onPress={() => handleSlotSelect(service.id, slot)}
                    >
                      <View
                        style={[
                          styles.radioCircle,
                          isSelected && styles.checkedCircle,
                        ]}
                      />
                      <Text style={styles.slotLabel}>{slot}</Text>
                    </TouchableOpacity>
                  </>
                );
              })}
            </View>
          </View>
        ))}
        <View style={{ marginVertical: 20 }}>
          <Text style={styles.notesLabel}>
            Additional Notes{' '}
            <Text style={{ color: BASE_COLORS.GRAY }}>(Optional)</Text>
          </Text>
          <View style={styles.notesContainer}>
            <TextInput
              style={styles.notesInput}
              multiline
              placeholder="Add additional notes to mechanic"
              placeholderTextColor={BASE_COLORS.GRAY}
              value={notes}
              onChangeText={setNotes}
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <AuthWrapper>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <CustomHeader
          leftIcon={<Ionicons name="chevron-back" size={24} color="black" />}
          onLeftPress={() => Navigation.goBack()}
          description="Choose a time and provide details to complete your multi-service booking."
          username="Confirm Booking Details"
          usernameTextStyle={{
            fontSize: 20,
            color: BASE_COLORS.BLACK,
            marginTop: 16,
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

        <Text style={styles.text}>Select Appointment Date</Text>
        <DatePickerInput date={date} onPress={() => setShowPicker(true)} />
        {showPicker && (
          <DateTimePicker
            value={date || new Date()}
            mode="date"
            display="calendar"
            onChange={handleDateChange}
            // themeVariant="light" // or "dark"
            // accentColor="yellow" // works on Android 12+
          />
        )}

        {renderSlots()}
      </ScrollView>

      <CustomButton
        label="Continue"
        onPress={() => {
          Navigation.navigate('confirm_booking', {
            garageservices,
            selectedSlots,
            notes,
            date,
          });
        }}
        style={{ marginHorizontal: -4, height: 56 }}
        textStyle={{ fontSize: 12 }}
      />

      <ServiceUnavailableModal
        visible={showUnavailableModal}
        onClose={() => setShowUnavailableModal(false)}
      />
    </AuthWrapper>
  );
}

const styles = StyleSheet.create({
  text: {
    marginTop: 18,
    fontFamily: FONTS.REGULAR,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: BASE_COLORS.BLACK,
    marginBottom: 10,
  },
  serviceTitle: {
    fontSize: 11,
    fontWeight: '500',
    marginBottom: 6,
    color: BASE_COLORS.TEXT_TERNARY,
  },
  slotRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: BASE_COLORS.LIGHT_GRAY,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 10,
    margin: 2,
    backgroundColor: BASE_COLORS.WHITE,
  },
  radioButtonSelected: {
    borderColor: BASE_COLORS.LIGHT_GRAY,
    backgroundColor: BASE_COLORS.LIGHT_BLUE,
  },
  radioCircle: {
    height: 10,
    width: 10,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: BASE_COLORS.BLACK,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  checkedCircle: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: BASE_COLORS.BLACK,
  },
  slotLabel: {
    fontSize: 11,
    color: BASE_COLORS.BLACK,
  },
  notesLabel: {
    fontSize: 13,
    fontWeight: 'bold',
    color: BASE_COLORS.BLACK,
    marginBottom: 10,
  },
  notesContainer: {
    backgroundColor: BASE_COLORS.WHITE,
    borderColor: BASE_COLORS.LIGHT_GRAY,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    height: 100,
  },
  notesInput: {
    fontSize: 12,
    color: BASE_COLORS.BLACK,
    textAlignVertical: 'top',
    height: '100%',
  },
});
