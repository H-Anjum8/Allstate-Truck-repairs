// components/UnavailableModal.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BASE_COLORS from '../../utils/colors';
import CustomButton from '../CustomButton';

export default function ServiceUnavailableModal({ visible, onClose }) {
  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    { id: 1, label: 'Find Another Date' },
    { id: 2, label: 'Book Other 2 Services' },
    { id: 3, label: 'Remove Oil Change' },
  ];

  const handleSelect = id => {
    setSelectedOption(id);
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* Close Icon */}
          <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
            <Ionicons name="close" size={20} color={BASE_COLORS.BLACK} />
          </TouchableOpacity>
          <Text style={styles.modalIcon}>⚠️</Text>
          <Text style={styles.modalTitle}>
            One Service Unavailable on July 10
          </Text>
          <Text style={styles.modalMessage}>
            The service "Oil Change" is not available on this date.
          </Text>
          <Text style={styles.heading}>Please choose an option:</Text>

          {options.map(opt => {
            const isSelected = selectedOption === opt.id;
            return (
              <TouchableOpacity
                key={opt.id}
                style={[
                  styles.modalOption,
                  isSelected && styles.selectedOption, // Apply background on selection
                ]}
                onPress={() => handleSelect(opt.id)}
              >
                <View style={styles.radioContainer}>
                  <Ionicons
                    name={isSelected ? 'radio-button-on' : 'radio-button-off'}
                    size={14}
                    color={BASE_COLORS.BLACK}
                    style={{ marginRight: 10 }}
                  />
                  <Text
                    style={[
                      styles.optionText,
                      isSelected && styles.selectedText,
                    ]}
                  >
                    {opt.label}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
          <CustomButton
            label="Continue to Booking"
            onPress={onClose}
            style={{ marginHorizontal: -4, marginTop: 20, height: 56 }}
            textStyle={{ fontSize: 12 }}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: '#00000099',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
  },
  modalIcon: {
    fontSize: 25,
    textAlign: 'center',
  },
  modalTitle: {
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
  heading: {
    fontWeight: '700',
    fontSize: 11,
    textAlign: 'left',
    marginTop: 6,
  },
  modalMessage: {
    color: '#555',
    fontSize: 10.5,
    textAlign: 'center',
    marginVertical: 8,
  },
  modalOption: {
    padding: 10,
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    marginTop: 8,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 10,
    marginTop: 25,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  selectedOption: {
    backgroundColor: BASE_COLORS.LIGHT_BLUE,
    borderColor: BASE_COLORS.BORDER_COLOR,
  },

  selectedText: {
    color: BASE_COLORS.PRIMARY,
    fontWeight: '600',
  },

  optionText: {
    color: BASE_COLORS.BLACK,
    fontSize: 11,
  },
  closeIcon: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 1,
  },
});
