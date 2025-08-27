import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BASE_COLORS from '../../utils/colors';

export default function LocationCard({ cardstyle }) {
  return (
    <View style={[styles.container, cardstyle]}>
      <Ionicons name="location-outline" size={20} color="#fff" />
      <Text style={styles.text}>456 Repair Lane, Springfield, IL</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Get Direction</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BASE_COLORS.PRIMARY,
    padding: 13,
    borderRadius: 10,
    marginTop: -6,
  },
  text: { flex: 1, color: BASE_COLORS.WHITE, marginLeft: 8, fontSize: 10 },
  button: {
    paddingHorizontal: 4,
    paddingVertical: 7,
    borderRadius: 5,
    borderWidth: 0.4,
    borderColor: BASE_COLORS.WHITE,
  },
  buttonText: { color: BASE_COLORS.WHITE, fontSize: 10 },
});
