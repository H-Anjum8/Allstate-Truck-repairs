import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AuthWrapper from '../../components/AuthWrapper';
import BASE_COLORS from '../../utils/colors';
import { IMAGES } from '../../utils/appAssets';
import { useNavigation } from '@react-navigation/native';

// --- Reviews Data ---
const reviews = [
  {
    id: 1,
    name: 'Mike J.',
    date: '8 July 2025',
    comment:
      'Stuck on I-55 with a flat tire. Doug’s team reached me in under 30 minutes! Super professional and had me rolling fast. 10/10 service.',
    rating: 5,
    image: IMAGES.USER1,
  },
  {
    id: 2,
    name: 'Carlos M.',
    date: '9 July 2025',
    comment:
      'Booked an oil change + safety check before a long haul. Service was smooth, just wish they had a shaded rest spot while I waited.',
    rating: 4,
    image: IMAGES.USER2,
  },
  {
    id: 3,
    name: 'Ravi D.',
    date: '9 July 2025',
    comment:
      'The mechanic not only fixed the issue but also showed me how to avoid it in future. Real pros, not just parts changers!',
    rating: 5,
    image: IMAGES.USER3,
  },
];

const FuelCardComponent = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const navigation = useNavigation();

  const renderStars = count => {
    return (
      <View style={{ flexDirection: 'row', marginLeft: 5 }}>
        {[...Array(5)].map((_, index) => (
          <Ionicons
            key={index}
            name={index < count ? 'star' : 'star-outline'}
            size={16}
            color={BASE_COLORS.YELLOW}
          />
        ))}
      </View>
    );
  };

  return (
    <View>
      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Overview' && styles.activeTab]}
          onPress={() => setActiveTab('Overview')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'Overview' && styles.activeTabText,
            ]}
          >
            Overview
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'Reviews' && styles.activeTab]}
          onPress={() => setActiveTab('Reviews')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'Reviews' && styles.activeTabText,
            ]}
          >
            Reviews
          </Text>
        </TouchableOpacity>
      </View>

      {/* Tab Content */}
      <ScrollView style={styles.content}>
        {activeTab === 'Overview' ? (
          <>
            <Text style={styles.infoText}>
              <Text style={styles.label}>Address: </Text>
              141-N, 1st Street, Main Highway
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.label}>Hours: </Text>
              <Text style={{ color: BASE_COLORS.GREEN }}>Open 24 hours</Text>
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.label}>Offering: </Text>
              Truck Wash, Diesel Fuel, Patrol, Fuel
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.label}>Phone: </Text>
              <Text style={{ color: BASE_COLORS.PRIMARY }}>+123456789</Text>
            </Text>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Popular Times */}
            <Text style={styles.sectionTitle}>Popular Times</Text>

            {/* Weekdays Row */}
            <View style={styles.weekRow}>
              {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map(day => (
                <Text key={day} style={styles.weekDay}>
                  {day}
                </Text>
              ))}
            </View>

            {/* Bar Chart (Fake Data) */}
            <View style={styles.barContainer}>
              {[6, 7, 9, 10, 12, 8, 11].map((val, idx) => (
                <View key={idx} style={styles.barWrapper}>
                  <View
                    style={[
                      styles.bar,
                      {
                        height: verticalScale(val * 5),
                        backgroundColor:
                          idx === 4
                            ? BASE_COLORS.DANGER
                            : BASE_COLORS.LIGHT_GRAY,
                      },
                    ]}
                  />
                  <Text style={styles.timeLabel}>{idx * 3}p</Text>
                </View>
              ))}
            </View>
            <Text style={styles.busyText}>10 pm usually a little busy</Text>
          </>
        ) : (
          <>
            {/* Rating Summary */}
            <View style={styles.ratingContainer}>
              <Text style={styles.heading}>Rating & Reviews</Text>
            </View>
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingNumber}>4.9</Text>
              {renderStars(5)}
            </View>

            {/* Review List */}
            {reviews.map(review => (
              <View key={review.id} style={styles.reviewCard}>
                <Image source={review.image} style={styles.avatar} />
                <View style={styles.reviewContent}>
                  <View style={styles.reviewHeader}>
                    <Text style={styles.name}>{review.name}</Text>
                    {renderStars(review.rating)}
                  </View>
                  <Text style={styles.date}>{review.date}</Text>
                  <Text style={styles.comment}>{review.comment}</Text>
                </View>
              </View>
            ))}
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default FuelCardComponent;

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: BASE_COLORS.BORDER_COLOR,
  },
  tab: {
    flex: 1,
    paddingVertical: verticalScale(12),
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: BASE_COLORS.SECONDARY,
  },
  tabText: {
    fontSize: moderateScale(14),
    color: BASE_COLORS.GRAY,
  },
  activeTabText: {
    color: BASE_COLORS.PRIMARY,
    fontWeight: '600',
  },
  content: {
    padding: moderateScale(6),
  },
  infoText: {
    fontSize: moderateScale(13),
    color: BASE_COLORS.BLACK,
    marginBottom: verticalScale(6),
  },
  label: {
    fontWeight: '600',
    color: BASE_COLORS.DARK_GRAY,
  },
  divider: {
    height: 1,
    backgroundColor: BASE_COLORS.LIGHT_GRAY,
    marginVertical: verticalScale(12),
  },
  sectionTitle: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    marginBottom: verticalScale(8),
    color: BASE_COLORS.BLACK,
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(8),
  },
  weekDay: {
    fontSize: moderateScale(12),
    color: BASE_COLORS.GRAY,
    flex: 1,
    textAlign: 'center',
  },
  barContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: verticalScale(120),
    marginVertical: verticalScale(10),
  },
  barWrapper: {
    alignItems: 'center',
    flex: 1,
  },
  bar: {
    width: moderateScale(12),
    borderRadius: 6,
  },
  timeLabel: {
    marginTop: 4,
    fontSize: moderateScale(10),
    color: BASE_COLORS.GRAY,
  },
  busyText: {
    fontSize: moderateScale(11),
    color: BASE_COLORS.GRAY,
    textAlign: 'center',
    marginTop: verticalScale(5),
  },

  // Reviews styles
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    color: BASE_COLORS.DARK_GRAY,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  ratingNumber: {
    fontSize: 22,
    fontWeight: 'bold',
    color: BASE_COLORS.SECONDARY,
  },
  reviewCard: {
    flexDirection: 'row',
    marginBottom: 15,
    backgroundColor: BASE_COLORS.WHITE,
    borderRadius: 10,
    padding: 6,
    elevation: 2,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 22,
    marginRight: 10,
  },
  reviewContent: {
    flex: 1,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontWeight: '600',
    fontSize: 14,
    color: BASE_COLORS.DARK_GRAY,
  },
  date: {
    fontSize: 12,
    color: BASE_COLORS.TEXT_INPUT_FIELD,
    marginBottom: 3,
  },
  comment: {
    fontSize: 12,
    color: BASE_COLORS.DARK_GRAY,
  },
});
