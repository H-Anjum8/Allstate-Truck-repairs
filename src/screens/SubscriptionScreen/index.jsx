import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CustomHeader from '../../components/CustomHeader/CustomHeader';
import CustomButton from '../../components/common/CustomButton';
import CustomSubscriptionsCard from '../../components/CustomCards/CustomSubscriptionsCard'; // Import the new component
import Ionicons from 'react-native-vector-icons/Ionicons';
import BASE_COLORS from '../../utils/colors';
import { FONTS, TextStyles } from '../../theme/fonts';
import {
  SUBSCRIPTION_BENEFITS,
  SUBSCRIPTION_PLANS,
} from '../../utils/staticData';
import AppWrapper from '../../components/AuthWrapper/AppWrapper';

const SubscriptionScreen = ({ navigation }) => {
  const [selectedPlanId, setSelectedPlanId] = useState('3');

  const handleSelectPlan = id => {
    setSelectedPlanId(id);
  };

  return (
    <AppWrapper style={styles.container}>
      <CustomHeader
        leftIcon={
          <Ionicons name="chevron-back" size={24} color={BASE_COLORS.BLACK} />
        }
        onLeftPress={() => navigation.goBack()}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header Section */}
        <View style={styles.headerSection}>
          <Text style={styles.title}>Choose Your Plan</Text>
          <Text style={styles.description}>
            Secure Your Subscription to Unlock Powerful Features
          </Text>
        </View>

        {/* Subscription Plans Section */}
        <View style={styles.plansSection}>
          {SUBSCRIPTION_PLANS.map(item => (
            <CustomSubscriptionsCard
              key={item.id}
              item={item}
              isSelected={item.id === selectedPlanId}
              onPress={handleSelectPlan}
            />
          ))}
        </View>

        {/* Benefits Section */}
        <View style={styles.benefitsSection}>
          {SUBSCRIPTION_BENEFITS.map((feature, index) => (
            <View key={index} style={styles.benefitRow}>
              <Ionicons
                name="checkmark-circle"
                size={24}
                color={BASE_COLORS.SUCCESS || BASE_COLORS.SECONDARY}
              />
              <Text style={styles.benefitText}>{feature}</Text>
            </View>
          ))}
        </View>

        {/* Continue Button */}
        <View style={styles.buttonContainer}>
          <CustomButton
            label="Continue To Payment"
            onPress={() => navigation.navigate('payment')}
          />
        </View>
      </ScrollView>
    </AppWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  scrollContainer: {
    paddingBottom: 100,
    flexGrow: 1,
  },
  headerSection: {
    alignItems: 'center',
    marginVertical: 24,
    gap: 8,
  },
  title: {
    ...TextStyles.heading1,
    fontWeight: '600',
    color: BASE_COLORS.PRIMARY,
    textAlign: 'center',
  },
  description: {
    ...TextStyles.bodySmall,
    fontWeight: '400',
    color: BASE_COLORS.DARK_GRAY,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  plansSection: {
    marginBottom: 20,
    gap: 10,
  },
  benefitsSection: {
    gap: 10,
    marginBottom: 32,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  benefitText: {
    ...TextStyles.bodySmall,
    color: BASE_COLORS.DARK_GRAY,
    flex: 1,
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default SubscriptionScreen;
