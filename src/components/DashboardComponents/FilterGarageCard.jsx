import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import BASE_COLORS from '../../utils/colors';
import { FONTS } from '../../theme/fonts';
import { ICONS } from '../../utils/appAssets';
import CustomButton from '../CustomButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
const FilterGarageCard = ({
  name,
  rating,
  address,
  garage_logo,
  authentic_icon,
  location,
  label,
  textstyle,
  locationStyle,
  type,
  iconStyle,
}) => {
  const handleBtn = values => {
    if (type === 'verify') {
      navigation.navigate('service_selection');
    } else {
      navigation.navigate('fleet_services_selection');
    }
  };

  const navigation = useNavigation();
  return (
    <View style={[styles.card, textstyle]}>
      <View style={styles.cardHeader}>
        <View style={styles.cardcontent}>
          <Image
            source={garage_logo}
            style={styles.logoImage}
            resizeMode="contain"
          />
          <Text style={styles.name}>{name}</Text>

          <Image
            source={authentic_icon}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.rating}>⭐ {rating}</Text>
      </View>

      <Text style={styles.address}>{address}</Text>
      <View style={styles.locationContent}>
        <Image
          source={ICONS.LOCATION_COLOURED}
          style={[styles.locationImage, iconStyle]}
          resizeMode="contain"
        />
        <Text style={[styles.location, locationStyle]}>{location}</Text>
      </View>
      <CustomButton
        label={label}
        onPress={handleBtn}
        icon={<Ionicons name="arrow-forward" size={10} color="white" />}
        iconPosition="right"
        iconGap={30}
        style={{
          backgroundColor: BASE_COLORS.PRIMARY,
          width: '100%',
          marginHorizontal: 0,
          height: 30,
          marginBottom: 0,
        }}
        textStyle={{ fontSize: 8 }}
      />
    </View>
  );
};

export default FilterGarageCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: BASE_COLORS.WHITE,
    paddingHorizontal: 8,
    paddingVertical: 15,
    borderRadius: 12,
    borderColor: BASE_COLORS.BORDER_COLOR,
    // marginHorizontal: 2,
    // marginBottom: 8,
    width: 170,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardcontent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  locationContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 4,
  },
  image: {
    height: 10,
    width: 10,
  },
  logoImage: {
    height: 20,
    width: 20,
  },
  locationImage: {
    height: 16,
    width: 16,
  },
  name: {
    fontWeight: '500',
    fontFamily: FONTS.MEDIUM,
    fontSize: 10,
  },
  rating: {
    color: BASE_COLORS.GREEN,
    fontSize: 8,
  },
  address: {
    color: BASE_COLORS.DARK_GRAY,
    fontSize: 7,
    marginVertical: 8,
    fontFamily: FONTS.REGULAR,
  },
  location: {
    color: BASE_COLORS.DARK_GRAY,
    fontSize: 8,
    fontFamily: FONTS.REGULAR,
  },
  button: {
    backgroundColor: '#001f7f',
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
  },
});
