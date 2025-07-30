import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BASE_COLORS from '../../utils/colors';

export default function ServiceCard({
  title,
  time,
  price,
  discounted = false,
  originalPrice,
}) {
  return (
    <View style={styles.card}>
      {discounted && (
        <View style={styles.ribbon}>
          <Text style={styles.ribbonText}>Discounted</Text>
        </View>
      )}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.time}>{time}</Text>
      <Text style={styles.includes}>Include Labor, Tools etc</Text>
      <View style={styles.priceRow}>
        <Text style={styles.price}>${price}</Text>
        {discounted && (
          <Text style={styles.originalPrice}>${originalPrice}</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: BASE_COLORS.WHITE,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginHorizontal: -4,
    borderRadius: 10,
    marginBottom: 12,
    width: '50%',
    elevation: 4,
    overflow: 'hidden',
  },
  ribbon: {
    position: 'absolute',
    top: 18,
    right: -36,
    backgroundColor: 'red',
    paddingVertical: 2,
    paddingHorizontal: 40,
    transform: [{ rotate: '45deg' }],
    zIndex: 1,
  },
  ribbonText: {
    color: 'white',
    fontSize: 7,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title: { fontWeight: 'bold', fontSize: 12 },
  time: { fontSize: 8, color: BASE_COLORS.TEXT_LIGHTGRAY },
  includes: {
    fontSize: 10,
    color: BASE_COLORS.TEXT_TERNARY,
    marginVertical: 2,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  price: {
    fontSize: 14,
    color: BASE_COLORS.TEXT_RED,
    fontWeight: 'bold',
  },
  originalPrice: {
    fontSize: 12,
    color: BASE_COLORS.TEXT_LIGHTGRAY,
    textDecorationLine: 'line-through',
    marginLeft: 6,
  },
});
