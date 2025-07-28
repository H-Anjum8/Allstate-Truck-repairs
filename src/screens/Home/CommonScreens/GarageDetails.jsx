import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import GarageHeader from '../../../components/DashboardComponents/GarageHeader';
import AuthWrapper from '../../../components/AuthWrapper';
import { FONTS } from '../../../theme/fonts';
import BASE_COLORS from '../../../utils/colors';
import ServiceCard from '../../../components/DashboardComponents/ServiceCard';
import LocationCard from '../../../components/LocationCard';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomRating from '../../../components/CustomRating/CustomRating';
import CustomButton from '../../../components/CustomButton';
import { reviews, services } from '../../../utils/staticData';
import { useNavigation } from '@react-navigation/native';

const GarageDetails = () => {
  const Navigation = useNavigation();
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
        <View style={styles.container1}>
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
        {/* Rating  */}
        <View>
          <Text style={styles.sectionTitle}>Rating & Reviews</Text>
          <View style={styles.ratingRow}>
            <Text style={styles.ratingValue}>4.9</Text>
            {[...Array(5)].map((_, i) => (
              <Ionicons
                key={i}
                name={i < 4 ? 'star' : 'star-outline'}
                size={16}
                color="#FFA500"
              />
            ))}
          </View>

          {reviews.map((item, index) => (
            <CustomRating key={index} {...item} />
          ))}
          <CustomButton
            label="Book Now"
            onPress={() => Navigation.navigate('service_selection')}
            style={{ marginHorizontal: 3, marginTop: 14, height: 56 }}
            textStyle={{ fontSize: 12 }}
          />
        </View>
      </AuthWrapper>
    </SafeAreaView>
  );
};

export default GarageDetails;

const styles = StyleSheet.create({
  container: { marginTop: 18 },

  container1: { marginTop: 10 },
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
  containerr: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 13,
    marginBottom: 6,
    marginTop: 16,
    fontWeight: 'bold',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  ratingValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
    marginRight: 6,
  },
  bookButton: {
    marginTop: 16,
    backgroundColor: BASE_COLORS.SECONDARY,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  bookButtonText: {
    color: BASE_COLORS.WHITE,
    fontSize: 16,
    fontWeight: '600',
  },
});
