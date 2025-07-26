import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import GarageHeader from '../../../components/DashboardComponents/GarageHeader';
import AuthWrapper from '../../../components/AuthWrapper';
import { FONTS } from '../../../theme/fonts';
import BASE_COLORS from '../../../utils/colors';
import ServiceCard from '../../../components/DashboardComponents/ServiceCard';
import LocationCard from '../../../components/LocationCard';

const GarageDetails = () => {
  const services = [
    { title: 'Brake Service', time: '1 hr. Estimated Time', price: 89 },
    { title: 'Tire Replacement', time: '1 hr. Estimated Time', price: 99 },
    { title: 'Oil Change', time: '30 min. Estimated Time', price: 69 },
    { title: 'Suspension Check', time: '90 min. Estimated Time', price: 120 },
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <GarageHeader />
      <AuthWrapper>
        {/* garage description  */}
        <View style={styles.container}>
          <Text style={styles.heading}>Description</Text>
          <Text style={styles.text}>
            Doug's Roadside Garage offers fast, reliable, and certified roadside
            repair services for commercial trucks and trailers.
          </Text>
        </View>
        {/* Services  */}
        <View style={styles.container}>
          <Text style={styles.heading}>Services</Text>
          <View style={styles.grid}>
            {services.map((s, i) => (
              <ServiceCard
                key={i}
                title={s.title}
                time={s.time}
                price={s.price}
              />
            ))}
          </View>
        </View>
        {/* Location Card */}
        <LocationCard />
      </AuthWrapper>
    </SafeAreaView>
  );
};

export default GarageDetails;

const styles = StyleSheet.create({
  container: { marginTop: 18 },
  heading: {
    fontWeight: 'bold',
    fontSize: 14,
    fontFamily: FONTS.BOLD,
  },
  text: { fontSize: 10.5, marginTop: 4, color: BASE_COLORS.TEXT_TERNARY },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
});
