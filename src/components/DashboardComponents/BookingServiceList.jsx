// components/BookingServiceList.js
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { FONTS } from '../../theme/fonts';
import BASE_COLORS from '../../utils/colors';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function BookingServiceList({ services }) {
  const total = services.reduce((sum, item) => sum + item.price, 0);

  return (
    <SafeAreaView>
      <Text style={styles.text}>Selected Services</Text>
      <View style={styles.container}>
        <FlatList
          data={services}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.serviceRow}>
              <Text style={styles.serviceName}>{item.name}</Text>
              <Text style={styles.servicePrice}>${item.price}</Text>
            </View>
          )}
        />
        <View style={styles.serviceRow1}>
          <Text style={styles.serviceName}>Total Cost</Text>
          <Text style={[styles.servicePrice, { fontWeight: 'bold' }]}>
            ${total}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: BASE_COLORS.BORDER_COLOR,
    padding: 6,
    borderRadius: 10,
    marginTop: 8,
    backgroundColor: BASE_COLORS.TABLE_BACKGROUND,
  },
  serviceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  serviceRow1: {
    borderTopColor: BASE_COLORS.BORDER_COLOR,
    borderTopWidth: 1,

    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  text: {
    fontWeight: 'bold',
  },
  serviceName: {
    fontSize: 11,
    fontFamily: FONTS.REGULAR,
  },
  servicePrice: {
    fontSize: 11,
  },
});
