import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import BASE_COLORS from '../../utils/colors';
import { FONTS } from '../../theme/fonts';
import { ICONS } from '../../utils/appAssets';
import CustomButton from '../CustomButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
const ServiceCard = ({
  name,
  rating,
  address,
  garage_logo,
  authentic_icon,
  location,
}) => {
  return (
    <View style={styles.card}>
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
          style={styles.locationImage}
          resizeMode="contain"
        />
        <Text style={styles.location}>{location}</Text>
      </View>
      <CustomButton
        label="View Services"
        icon={<Ionicons name="arrow-forward" size={20} color="white" />}
        iconPosition="right"
        iconGap={30}
        style={{
          backgroundColor: BASE_COLORS.PRIMARY,
          width: '100%',
          marginHorizontal: 0,
          height: 50,
          marginBottom: 0,
        }}
        textStyle={{ fontSize: 12 }}
      />
    </View>
  );
};

export default ServiceCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: BASE_COLORS.WHITE,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    borderColor: BASE_COLORS.BORDER_COLOR,
    marginRight: 12,
    marginBottom: 10,
    width: 220,
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
    marginBottom: 14,
    gap: 4,
  },
  image: {
    height: 15,
    width: 15,
  },
  logoImage: {
    height: 30,
    width: 30,
  },
  locationImage: {
    height: 23,
    width: 23,
  },
  name: {
    fontWeight: 500,
    fontFamily: FONTS.MEDIUM,
    fontSize: 12,
  },
  rating: {
    color: BASE_COLORS.GREEN,
    fontSize: 8,
  },
  address: {
    color: BASE_COLORS.DARK_GRAY,
    fontSize: 10,
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
