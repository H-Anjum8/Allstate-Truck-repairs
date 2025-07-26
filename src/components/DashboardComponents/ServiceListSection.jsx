import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import GarageCard from './GarageCard';
import { FONTS } from '../../theme/fonts';
import BASE_COLORS from '../../utils/colors';
import { featured } from '../../utils/staticData';

const ServiceListSection = ({ title, marginBottom }) => {
  return (
    <View
      style={{
        marginBottom,
        paddingVertical: 10,
        paddingHorizontal: 14,
      }}
    >
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.viewAll}>View All</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {featured.map((service, index) => (
          <GarageCard key={index} {...service} />
        ))}
      </ScrollView>
    </View>
  );
};

export default ServiceListSection;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    marginBottom: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    fontWeight: 700,
    fontFamily: FONTS.BOLD,
  },
  viewAll: {
    color: BASE_COLORS.DARK_GRAY,
  },
});
