import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import BASE_COLORS from '../../utils/colors';

const ServiceSelectionCard = ({
  title,
  description,
  price,
  time,
  added,
  onToggle,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
          <Text style={styles.price}>${price}</Text>
        </View>

        <View style={styles.rightCol}>
          <TouchableOpacity
            style={[styles.addButton, added && styles.addedButton]}
            onPress={onToggle}
          >
            <Text
              style={[styles.addButtonText, added && styles.addedButtonText]}
            >
              {added ? 'Added' : 'Add'}
            </Text>
          </TouchableOpacity>
          <Text style={styles.time}>{time}</Text>
        </View>
      </View>
    </View>
  );
};

export default ServiceSelectionCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: BASE_COLORS.WHITE,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 13,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: BASE_COLORS.BORDER_COLOR,
  },
  topRow: {
    flexDirection: 'row',
  },
  title: {
    fontWeight: '700',
    fontSize: 10,
    marginBottom: 4,
  },
  description: {
    color: '#555',
    fontSize: 10,
    marginBottom: 6,
    color: BASE_COLORS.TEXT_TERNARY,
  },
  time: {
    fontSize: 10,
    color: BASE_COLORS.TEXT_TERNARY,
  },
  rightCol: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  price: {
    fontWeight: 'bold',
    color: '#E50000',
    fontSize: 16,
  },
  addButton: {
    marginTop: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  addButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
  },
  addedButton: {
    backgroundColor: '#1E2B77',
    borderColor: '#1E2B77',
  },
  addedButtonText: {
    color: '#fff',
  },
});
