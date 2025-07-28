import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import AuthWrapper from '../../../components/AuthWrapper';
import CustomHeader from '../../../components/CustomHeaders';
import { FONTS } from '../../../theme/fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BASE_COLORS from '../../../utils/colors';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../../../components/CustomButton';
const RequestBooking = () => {
  const Navigation = useNavigation();
  return (
    <AuthWrapper>
      <CustomHeader
        leftIcon={<Ionicons name="chevron-back" size={24} color="black" />}
        onLeftPress={() => Navigation.goBack()}
        description="A small reservation fee is required to send your booking request. You will only be charged if the provider accepts your request. Once accepted, if you cancel the booking later, the reservation fee will not be refunded."
        username="Pay to Request Booking"
        usernameTextStyle={{
          fontSize: 20,
          color: BASE_COLORS.BLACK,
          marginTop: 16,
        }}
        descriptionTextStyle={{
          fontSize: 11,
          marginTop: 6,
          color: BASE_COLORS.BLACK,
        }}
        showWelcomeText={false}
        showDescription={true}
        showUsername={true}
      />
      <View style={styles.maincontainer}>
        <View style={styles.container}>
          <Text style={styles.price}>25$ reservation</Text>
        </View>
        <CustomButton
          label="Continue to Booking"
          onPress={() => Navigation.navigate('payment_method')}
          style={{ marginHorizontal: -4, height: 56 }}
          textStyle={{ fontSize: 12 }}
        />
      </View>
    </AuthWrapper>
  );
};

export default RequestBooking;

const styles = StyleSheet.create({
  text: {
    marginTop: 18,
    fontFamily: FONTS.REGULAR,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  price: {
    fontSize: 12,
    fontFamily: FONTS.REGULAR,
  },
  container: {
    borderColor: BASE_COLORS.BORDER_COLOR,
    padding: 16,
    borderRadius: 10,
    marginTop: 8,
    backgroundColor: BASE_COLORS.TABLE_BACKGROUND,
  },
  maincontainer: {
    height: '518',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});
