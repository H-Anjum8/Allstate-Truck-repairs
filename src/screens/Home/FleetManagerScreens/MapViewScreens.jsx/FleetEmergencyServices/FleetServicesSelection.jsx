import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ServiceSelectionCard from '../../../../../components/DashboardComponents/ServiceSelectionCard';
import AuthWrapper from '../../../../../components/AuthWrapper';
import CustomHeader from '../../../../../components/CustomHeaders';
import BASE_COLORS from '../../../../../utils/colors';
import CustomButton from '../../../../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { initialServices } from '../../../../../utils/staticData';

export default function FleetServicesSelection() {
  const [services, setServices] = useState(initialServices);

  const toggleService = id => {
    setServices(prev =>
      prev.map(s => (s.id === id ? { ...s, added: !s.added } : s)),
    );
  };
  const Navigation = useNavigation();
  const selectedServices = services.filter(s => s.added);
  const total = selectedServices.reduce((sum, s) => sum + s.price, 0);

  return (
    <AuthWrapper>
      <CustomHeader
        leftIcon={<Ionicons name="chevron-back" size={24} color="black" />}
        onLeftPress={() => Navigation.goBack()}
        description="Select one or more services you’d like to book from this provider."
        username="Choose Services to Book"
        usernameTextStyle={{
          fontSize: 20,
          color: BASE_COLORS.BLACK,
          fontWeight: 600,
        }}
        descriptionTextStyle={{
          fontSize: 11,
          marginBottom: 10,
          color: BASE_COLORS.BLACK,
        }}
        showWelcomeText={false}
        showDescription={true}
        showUsername={true}
      />
      <FlatList
        data={services}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <ServiceSelectionCard
            {...item}
            onToggle={() => toggleService(item.id)}
          />
        )}
        contentContainerStyle={{ paddingVertical: 16 }}
      />
      <View style={styles.contentContainer}>
        <View style={styles.bottomBar}>
          <Text style={styles.serviceCount}>
            {selectedServices.length} Service Selected
          </Text>
          <Text style={styles.total}>
            Total <Text style={styles.price}>${total}</Text>
          </Text>
        </View>
      </View>
      <CustomButton
        label="Continue to Booking"
        onPress={() => Navigation.navigate('fleet_confirm_booking')}
        style={{ marginHorizontal: 3, marginTop: 14, height: 56 }}
        textStyle={{ fontSize: 12 }}
      />
    </AuthWrapper>
  );
}

const styles = StyleSheet.create({
  contentContainer: {},
  bottomBar: {
    marginTop: -40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  serviceCount: {
    fontSize: 11,
    color: BASE_COLORS.TEXT_TERNARY,
  },
  total: {
    fontSize: 12,
    marginVertical: 4,
  },
  price: {
    color: BASE_COLORS.SECONDARY,
  },
  bookButton: {
    marginTop: 8,
    backgroundColor: BASE_COLORS.SECONDARY,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  bookButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
