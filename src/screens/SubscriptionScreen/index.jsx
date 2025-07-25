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
import { FONTS } from '../../theme/fonts';
import { allBenefits, plans } from '../../utils/staticData';

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
        showWelcomeText={false}
        showDescription={true}
        showUsername={true}
        contentContainerStyle={{ alignItems: 'center' }}
        usernameTextStyle={{
          textAlign: 'center',
          alignSelf: 'flex-center',
          fontSize: 22,
          marginTop: -35,
        }}
        descriptionTextStyle={{
          textAlign: 'center',
          height: 30,
          paddingHorizontal: '50',
          color: BASE_COLORS.GRAY,
          marginBottom: 30,
          fontSize: 11,
        }}
      />
      <View>
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
                    <View
                      style={[
                        styles.iconWrapper,
                        isSelected
                          ? styles.selectedIconBackground
                          : styles.unselectedIconBackground,
                      ]}
                    >
                      <Ionicons
                        name={isSelected ? 'checkmark-circle' : 'ellipse'}
                        size={20}
                        color={
                          isSelected
                            ? BASE_COLORS.SECONDARY
                            : BASE_COLORS.LIGHT_RED
                        }
                      />
                    </View>
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
      </View>

      <View style={styles.benefitsSection}>
        {allBenefits.map((feature, index) => (
          <View key={index} style={styles.benefitRow}>
            <Ionicons
              name="checkmark-sharp"
              size={17}
              color={BASE_COLORS.SECONDARY}
            />
            <Text style={styles.benefitText}>{feature}</Text>
          </View>
        ))}
      </View>

      <CustomButton
        label="Continue To Payment"
        onPress={() => navigation.navigate('payment')}
        style={{ marginHorizontal: 3, marginTop: 10, height: 53 }}
        textStyle={{ fontSize: 12 }}
      />
    </AuthWrapper>
  );
};

export default SubscriptionScreen;

const styles = StyleSheet.create({
  planBox: {
    borderWidth: 1,
    borderColor: BASE_COLORS.LIGHT_RED,
    borderRadius: 20,
    padding: 10,
    marginBottom: 7,
    backfaceVisibility: BASE_COLORS.GRAYIESH,
    // alignItems: 'center',
  },
  planBoxSelected: {
    borderColor: BASE_COLORS.TEXT_RED,
    backgroundColor: BASE_COLORS.LIGHT_RED,
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
    fontFamily: FONTS.REGULAR,
    marginLeft: 8,
    color: BASE_COLORS.TEXT_DARK,
  },
  planRight: {
    alignItems: 'flex-end',
  },
  planPrice: {
    fontSize: 14,
    color: BASE_COLORS.PRIMARY,
  },
  planDiscount: {
    fontSize: 9,
    fontFamily: FONTS.REGULAR,
    color: BASE_COLORS.TEXT_RED,
  },
  planDescriptionBelow: {
    fontSize: 10,
    fontFamily: FONTS.REGULAR,
    color: BASE_COLORS.TEXT_RED,
    marginTop: -15,
    textAlign: 'right',
  },
  benefitsSection: {
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
    fontFamily: FONTS.REGULAR,
    color: BASE_COLORS.TEXT_SECONDARY,
  },
  buttonStyle: {
    backgroundColor: BASE_COLORS.SECONDARY,
    marginTop: 10,
  },
});
