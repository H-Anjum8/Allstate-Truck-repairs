import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import AuthWrapper from '../../components/AuthWrapper';
import CustomHeader from '../../components/CustomHeaders';
import CustomButton from '../../components/CustomButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BASE_COLORS from '../../utils/colors';

const plans = [
  {
    id: '1',
    title: 'Free Plan',
    price: '',
    description: 'Good for individuals\nwith limited needs',
  },
  {
    id: '2',
    title: 'Pro Driver',
    price: '$24.99',
    discount: 'Save 20%',
  },
  {
    id: '3',
    title: 'Fleet Pro',
    price: '$49.99',
    discount: 'Save 15%',
  },
];

const allBenefits = [
  'View nearby mechanics',
  'Book appointments',
  'Promotions / discounts access',
  'Priority bookings',
  'Driver Management',
  'Vehicle registration',
  'Centralized fleet dashboard',
  'Customer support priority',
];

const SubscriptionScreen = ({ navigation }) => {
  const [selectedPlanId, setSelectedPlanId] = useState('3');

  const handleSelectPlan = id => {
    setSelectedPlanId(id);
  };

  return (
    <AuthWrapper>
      <CustomHeader
        username="Choose Your Plan"
        description="Secure Your Subscription to Unlock Powerful Features"
        showUsername
        showDescription
        contentContainerStyle={{ alignItems: 'center' }}
        usernameTextStyle={{
          textAlign: 'center',
          marginLeft: 30,
          marginTop: -30,
        }}
        descriptionTextStyle={{ textAlign: 'center', paddingHorizontal: '40' }}
      />

      <FlatList
        data={plans}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {
          const isSelected = item.id === selectedPlanId;
          return (
            <TouchableOpacity
              style={[styles.planBox, isSelected && styles.planBoxSelected]}
              onPress={() => handleSelectPlan(item.id)}
            >
              <View style={styles.planHeader}>
                <View style={styles.planLeft}>
                  <Ionicons
                    name={isSelected ? 'checkmark-circle' : 'ellipse-outline'}
                    size={20}
                    color={BASE_COLORS.SECONDARY}
                  />
                  <Text style={styles.planTitle}>{item.title}</Text>
                </View>
                <View style={styles.planRight}>
                  {item.price !== '' && (
                    <>
                      <Text style={styles.planPrice}>{item.price}</Text>
                      <Text style={styles.planDiscount}>{item.discount}</Text>
                    </>
                  )}
                </View>
              </View>
              {item.description && item.id === '1' && (
                <Text style={styles.planDescriptionBelow}>
                  {item.description}
                </Text>
              )}
            </TouchableOpacity>
          );
        }}
        style={{ marginBottom: 20 }}
      />

      <View style={styles.benefitsSection}>
        {allBenefits.map((feature, index) => (
          <View key={index} style={styles.benefitRow}>
            <Ionicons
              name="checkmark"
              size={16}
              color={BASE_COLORS.SECONDARY}
            />
            <Text style={styles.benefitText}>{feature}</Text>
          </View>
        ))}
      </View>

      <CustomButton
        label="Continue To Payment"
        onPress={() => navigation.navigate('payment')}
        style={{ marginHorizontal: 3, marginTop: -8 }}
      />
    </AuthWrapper>
  );
};

export default SubscriptionScreen;

const styles = StyleSheet.create({
  planBox: {
    borderWidth: 1.5,
    borderColor: '#FFF1F1',
    borderRadius: 20,
    padding: 15,
    marginBottom: 7,
  },
  planBoxSelected: {
    borderColor: BASE_COLORS.TEXT_RED,
    backgroundColor: '#FFF1F1',
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  planLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  planTitle: {
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
    marginLeft: 8,
    color: BASE_COLORS.TEXT_DARK,
  },
  planRight: {
    alignItems: 'flex-end',
  },
  planPrice: {
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
    color: BASE_COLORS.TEXT_DARK,
  },
  planDiscount: {
    fontSize: 11,
    fontFamily: 'Poppins_400Regular',
    color: BASE_COLORS.TEXT_RED,
  },
  planDescriptionBelow: {
    fontSize: 11,
    fontFamily: 'Poppins_400Regular',
    color: BASE_COLORS.TEXT_RED,
    marginTop: -15,
    textAlign: 'right',
  },
  benefitsSection: {
    marginTop: 10,
    marginBottom: 70,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  benefitText: {
    marginLeft: 8,
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
    color: BASE_COLORS.TEXT_SECONDARY,
  },
  buttonStyle: {
    backgroundColor: BASE_COLORS.SECONDARY,
    marginTop: 10,
  },
});
