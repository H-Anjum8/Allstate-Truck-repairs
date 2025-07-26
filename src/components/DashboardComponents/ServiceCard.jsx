import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BASE_COLORS from '../../utils/colors';

export default function ServiceCard({ title, time, price }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.time}>{time}</Text>
      <Text style={styles.includes}>Include Labor, Tools etc</Text>
      <Text style={styles.price}>${price}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: BASE_COLORS.WHITE,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginHorizontal: -2,
    borderRadius: 10,
    marginBottom: 12,
    width: '50%',
    elevation: 4,
  },
  title: { fontWeight: 'bold', fontSize: 12 },
  time: { fontSize: 8, color: BASE_COLORS.TEXT_LIGHTGRAY },
  includes: {
    fontSize: 10,
    color: BASE_COLORS.TEXT_TERNARY,
    marginVertical: 2,
  },
  price: {
    fontSize: 14,
    color: BASE_COLORS.TEXT_RED,
    fontWeight: 'bold',
    marginTop: 6,
  },
});
