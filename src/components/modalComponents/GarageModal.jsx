import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const GarageModal = ({
  visible,
  onClose,
  title,
  children,
  buttonLabel,
  onButtonPress,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.bottomSheet}>
          {/* Header */}
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{title}</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeBtn}>X</Text>
            </TouchableOpacity>
          </View>

          {/* Custom Content */}
          <View style={styles.content}>{children}</View>

          {/* Optional Button */}
          {buttonLabel && (
            <TouchableOpacity style={styles.bookBtn} onPress={onButtonPress}>
              <Text style={styles.bookBtnText}>{buttonLabel}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default GarageModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  closeBtn: {
    fontSize: 16,
    color: 'red',
  },
  content: {
    marginVertical: 12,
  },
  bookBtn: {
    backgroundColor: 'blue',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  bookBtnText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
