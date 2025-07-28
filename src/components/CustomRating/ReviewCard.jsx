import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { IMAGES } from '../../utils/appAssets';

const ReviewCard = ({ name, date, review, rating, avatar }) => {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Image source={avatar || IMAGES.BRAKE} style={styles.avatar} />
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.date}>{date}</Text>
        </View>
      </View>
      <Text style={styles.reviewText}>{review}</Text>
      <View style={styles.starsRow}>
        {[...Array(5)].map((_, i) => (
          <Ionicons
            key={i}
            name={i < rating ? 'star' : 'star-outline'}
            size={16}
            color="#FFA500"
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
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
    backgroundColor: '#ccc',
  },
  name: {
    fontWeight: '600',
    fontSize: 14,
    color: '#222',
  },
  date: {
    fontSize: 12,
    color: '#777',
  },
  reviewText: {
    fontSize: 13,
    color: '#333',
    marginVertical: 6,
  },
  starsRow: {
    flexDirection: 'row',
  },
});

export default ReviewCard;
