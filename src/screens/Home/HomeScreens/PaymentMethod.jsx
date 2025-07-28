import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import AuthWrapper from '../../../components/AuthWrapper';
import CustomHeader from '../../../components/CustomHeaders';
import { FONTS } from '../../../theme/fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BASE_COLORS from '../../../utils/colors';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../../../components/CustomButton';
import { methods } from '../../../utils/staticData';

const PaymentMethod = () => {
  const Navigation = useNavigation();
  const [selectedMethod, setSelectedMethod] = useState('card');

  return (
    <AuthWrapper>
      <CustomHeader
        leftIcon={<Ionicons name="chevron-back" size={24} color="black" />}
        onLeftPress={() => Navigation.goBack()}
        description="Choose how you’d like to pay your reservation fee securely."
        username="Select Your Payment Method"
        usernameTextStyle={{
          fontSize: 20,
          color: BASE_COLORS.BLACK,
          marginTop: 18,
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
        <View>
          {methods.map(method => (
            <TouchableOpacity
              key={method.key}
              style={[
                styles.option,
                selectedMethod === method.key && styles.selectedOption,
              ]}
              onPress={() => setSelectedMethod(method.key)}
            >
              <View style={styles.radioCircle}>
                {selectedMethod === method.key && (
                  <View style={styles.selectedDot} />
                )}
              </View>
              <Text style={styles.optionText}>{method.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <CustomButton
          label="Continue to Booking"
          onPress={() => Navigation.navigate('card_details')}
          style={{ marginHorizontal: 3, height: 56, marginBottom: -40 }}
          textStyle={{ fontSize: 12 }}
        />
      </View>
    </AuthWrapper>
  );
};

export default PaymentMethod;

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
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 6,
    padding: 13,
    marginBottom: 8,
  },
  selectedOption: {
    backgroundColor: BASE_COLORS.LIGHT_BLUE,
    borderColor: BASE_COLORS.BORDER_COLOR,
  },
  optionText: {
    marginLeft: 12,
    fontSize: 12,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: BASE_COLORS.BLACK,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedDot: {
    height: 10,
    width: 10,
    borderRadius: 40,
    backgroundColor: BASE_COLORS.BLACK,
  },
  maincontainer: {
    height: '518',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});
