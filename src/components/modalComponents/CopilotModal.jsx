// CopilotModal.js
import React from 'react';
import {
  Modal,
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { ICONS } from '../../utils/appAssets';
import BASE_COLORS from '../../utils/colors';

const CopilotModal = ({ visible, message, onClose }) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            {/* prevent closing when tapping modal */}
            <View style={styles.container}>
              {/* Robot Image */}
              <Image
                source={ICONS.COPILOT} // 👈 your robot image here
                style={styles.robot}
                resizeMode="contain"
              />

              {/* Waveform animation or icon */}
              <Image
                source={ICONS.WAVEFORM} // 👈 replace with waveform gif or Lottie
                style={styles.wave}
                resizeMode="contain"
              />

              {/* Message */}
              <Text style={styles.message}>{message}</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  container: {
    backgroundColor: BASE_COLORS.WHITE,
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
    width: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    borderWidth: 1.5,
    borderColor: BASE_COLORS.SECONDARY,
  },
  robot: {
    width: 120,
    height: 120,
    position: 'absolute',
    top: -78,
  },
  wave: {
    width: 120,
    height: 60,
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 50,
  },
});

export default CopilotModal;
