// components/WeatherModal.js
import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BASE_COLORS from '../../utils/colors';

const WeatherModal = ({ visible, onClose, weatherData }) => {
  if (!weatherData) return null; // safety

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalBox}>
          <Text style={styles.title}>Weather in the area</Text>

          {/* Current Weather */}
          <View style={styles.currentWeather}>
            <Text style={styles.temp}>{weatherData.current.temp}°</Text>
            <Ionicons
              name={weatherData.current.icon}
              size={30}
              color="#f9c74f"
            />
          </View>

          {/* Hourly Forecast */}
          <FlatList
            style={{
              backgroundColor: BASE_COLORS.PINK,
              borderRadius: 10,
              padding: 10,
            }}
            horizontal
            data={weatherData.hourly}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View style={styles.hourItem}>
                <Text style={styles.hourTemp}>{item.temp}</Text>
                <Ionicons name={item.icon} size={22} color="#f9c74f" />
                <Text style={styles.hourTime}>{item.time}</Text>
              </View>
            )}
            contentContainerStyle={{
              justifyContent: 'space-around',
              flexGrow: 1,
            }}
          />

          {/* Close Button */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalBox: {
    backgroundColor: BASE_COLORS.WHITE,
    borderRadius: 12,
    padding: 20,
    width: '85%',
    alignItems: 'center',
    elevation: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 15,
  },
  currentWeather: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  temp: {
    fontSize: 40,
    fontWeight: 'bold',
    marginRight: 8,
  },
  hourItem: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  hourTemp: {
    fontSize: 14,
    marginBottom: 4,
  },
  hourTime: {
    fontSize: 12,
    marginTop: 4,
    color: '#555',
  },
  closeButton: {
    backgroundColor: BASE_COLORS.SECONDARY,
    marginTop: 15,
    paddingVertical: 12,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  closeText: {
    color: BASE_COLORS.WHITE,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default WeatherModal;
