import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { IMAGES } from '../../utils/appAssets';
import BASE_COLORS from '../../utils/colors';

const CustomRating = ({ name, date, review, rating, avatar, image }) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <View style={styles.row}>
          <Image source={avatar || image} style={styles.avatar} />
          <View>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.date}>{date}</Text>
          </View>
        </View>
        <View style={styles.starsRow}>
          {[...Array(5)].map((_, i) => (
            <Ionicons
              key={i}
              name={i < rating ? 'star' : 'star-outline'}
              size={10}
              color="#FFA500"
            />
          ))}
        </View>
      </View>
      <Text style={styles.reviewText}>{review}</Text>
    </View>
  );
};

export default CustomRating;

const styles = StyleSheet.create({
  card: {
    backgroundColor: BASE_COLORS.WHITE,
    paddingVertical: 15,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 8,
    borderColor: BASE_COLORS.BORDER_COLOR,
    borderWidth: 1,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    marginRight: 10,
  },
  name: {
    fontWeight: '600',
    fontSize: 10,
    color: BASE_COLORS.DARK_GRAY,
  },
  date: {
    fontSize: 10,
    color: BASE_COLORS.LIGHT_GRAY,
  },
  reviewText: {
    fontSize: 9,
    color: BASE_COLORS.TEXT_TERNARY,
    marginHorizontal: -4,
  },
  starsRow: {
    flexDirection: 'row',
    marginTop: -15,
  },
});
