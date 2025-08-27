import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from '../CustomButton';
import BASE_COLORS from '../../utils/colors';
import { FONTS } from '../../theme/fonts';

const CancelConfirmationModal = ({ visible, onClose, onConfirm }) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalBox}>
          {/* Close Button */}
          <TouchableOpacity style={{ alignSelf: 'flex-end' }} onPress={onClose}>
            <Ionicons
              name="close-circle"
              size={24}
              color={BASE_COLORS.PRIMARY_LIGHT}
            />
          </TouchableOpacity>

          {/* Title */}
          <Text style={styles.modalTitle}>
            Are You Sure You Want to {'\n'}Cancel?
          </Text>
          <Text style={styles.modalSubtitle}>
            Your reservation fee will not be refunded if you cancel this
            booking.
          </Text>

          {/* Buttons */}
          <CustomButton
            label="No, Keep Booking"
            onPress={onClose}
            style={styles.noButton}
            textStyle={styles.noButtonText}
          />

          <CustomButton
            label="Yes, Cancel Booking"
            onPress={onConfirm}
            style={styles.yesButton}
            textStyle={styles.yesButtonText}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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

export default CancelConfirmationModal;
