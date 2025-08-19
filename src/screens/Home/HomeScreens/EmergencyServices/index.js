import {
  Platform,
  FlatList,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import BASE_COLORS from '../../../../utils/colors';
import { featured } from '../../../../utils/staticData';
import FilterGarageCard from '../../../../components/DashboardComponents/FilterGarageCard';
import AuthWrapper from '../../../../components/AuthWrapper';
import CustomHeader from '../../../../components/CustomHeaders';

const EmergencyServices = () => {
  const navigation = useNavigation();
  return (
    <AuthWrapper>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <CustomHeader
          leftIcon={<Ionicons name="chevron-back" size={24} color="black" />}
          onLeftPress={() => navigation.goBack()}
          description="Select one or more services you’d like to book from this provider."
          username="Emergency Service Booking "
          usernameTextStyle={{
            fontSize: 21,
            marginTop: -4,

            color: BASE_COLORS.BLACK,
          }}
          descriptionTextStyle={{
            textAlign: 'left',
            fontSize: 12,
            paddingHorizontal: 2,
            marginBottom: 25,
          }}
          showWelcomeText={false}
          showDescription={true}
          showUsername={true}
        />
        {/* Garage List */}
        <FlatList
          data={featured}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={styles.cardList}
          renderItem={({ item }) => (
            <View style={styles.cardWrapper}>
              <FilterGarageCard
                {...item}
                label="Book Now"
                textstyle={{ fontSize: 10 }}
                type="emergency_services"
              />
            </View>
          )}
          showsVerticalScrollIndicator={false}
          numColumns={2}
        />
      </KeyboardAvoidingView>
    </AuthWrapper>
  );
};

export default EmergencyServices;

const styles = StyleSheet.create({
  cardList: {
    backgroundColor: 'red',
    paddingBottom: 3,
    // width: '50%',

    // paddingHorizontal: 6,
  },
  cardWrapper: {
    // width: '0%',
    padding: 2,
  },
});
