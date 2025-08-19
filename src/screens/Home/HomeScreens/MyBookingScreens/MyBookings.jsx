import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { moderateScale } from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AuthWrapper from '../../../../components/AuthWrapper';
import CustomHeader from '../../../../components/CustomHeaders';
import { FONTS } from '../../../../theme/fonts';
import BASE_COLORS from '../../../../utils/colors';
import CustomButton from '../../../../components/CustomButton';
import { booking } from '../../../../utils/staticData';

const MyBookings = () => {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState('upcoming');

  const renderBooking = ({ item }) => {
    const getStatusStyles = status => {
      switch (status) {
        case 'Confirmed':
          return { bg: BASE_COLORS.LIGHT_GREEN, text: BASE_COLORS.GREEN };
        case 'Pending':
          return { bg: BASE_COLORS.LIGHT_GREEN, text: BASE_COLORS.ORANGE };
        case 'Completed':
          return { bg: BASE_COLORS.LIGHT_GREEN, text: BASE_COLORS.GREEN };
        case 'Canceled':
          return { bg: BASE_COLORS.SECONDARY, text: BASE_COLORS.WHITE };
        default:
          return { bg: BASE_COLORS.LIGHT_GRAY, text: BASE_COLORS.LIGHT_BLACK };
      }
    };

    const { bg, text } = getStatusStyles(item.status);

    return (
      <View style={styles.card}>
        <View style={styles.statusRow}>
          <View
            style={{
              backgroundColor: bg,
              paddingHorizontal: 10,
              paddingVertical: 4,
              borderRadius: 12,
              alignSelf: 'flex-start',
            }}
          >
            <Text style={[styles.status, { color: text }]}>{item.status}</Text>
          </View>

          <Text style={styles.price}>{item.amount}</Text>
        </View>

        <Text style={styles.title}>{item.name}</Text>

        <View style={styles.locationRow}>
          <Ionicons
            name="location-outline"
            size={14}
            color={BASE_COLORS.SECONDARY}
            style={{ marginRight: 5 }}
          />
          <Text style={styles.address}>{item.address}</Text>
        </View>

        <CustomButton
          label="View Details"
          onPress={() => {
            if (item.type === 'past') {
              if (item.status === 'Completed') {
                navigation.navigate('past_booking_completed', {
                  booking: item,
                });
              } else if (item.status === 'Canceled') {
                navigation.navigate('past_booking_canceled', { booking: item });
              } else {
                navigation.navigate('my_booking_details', { booking: item });
              }
            } else {
              navigation.navigate('my_booking_details', { booking: item });
            }
          }}
          style={styles.detailsButton}
          textStyle={styles.detailsText}
        />
      </View>
    );
  };

  return (
    <AuthWrapper>
      <CustomHeader
        onLeftPress={() => navigation.goBack()}
        username="Bookings"
        showUsername
        showWelcomeText={false}
        contentContainerStyle={{ alignItems: 'center' }}
        usernameTextStyle={{
          textAlign: 'center',
          alignSelf: 'center',
          fontSize: 22,
          marginTop: -10,
        }}
      />

      {/* Tabs */}
      <View style={styles.tabRow}>
        <View style={styles.tabWrapper}>
          <TouchableOpacity
            style={[
              styles.tabButtonNew,
              selectedTab === 'upcoming' && styles.tabActive,
            ]}
            onPress={() => setSelectedTab('upcoming')}
          >
            <Text
              style={[
                styles.tabTextNew,
                selectedTab === 'upcoming'
                  ? styles.tabTextActive
                  : styles.tabTextInactive,
              ]}
            >
              Upcoming Bookings
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabButtonNew,
              selectedTab === 'past' && styles.tabActive,
            ]}
            onPress={() => setSelectedTab('past')}
          >
            <Text
              style={[
                styles.tabTextNew,
                selectedTab === 'past'
                  ? styles.tabTextActive
                  : styles.tabTextInactive,
              ]}
            >
              Past Bookings
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={booking.filter(item => item.type === selectedTab)}
        keyExtractor={item => item.id}
        renderItem={renderBooking}
        contentContainerStyle={{ padding: 5 }}
        showsVerticalScrollIndicator={false}
      />
    </AuthWrapper>
  );
};

const styles = StyleSheet.create({
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 8,
  },
  tabWrapper: {
    flexDirection: 'row',
    backgroundColor: '#E6E7EE',
    borderRadius: 50,
    padding: 4,
  },
  tabButtonNew: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 50,
  },
  tabActive: {
    backgroundColor: BASE_COLORS.PRIMARY,
  },
  tabTextNew: {
    fontFamily: FONTS.MEDIUM,
    fontSize: moderateScale(13),
    textAlign: 'center',
  },
  tabTextActive: {
    color: BASE_COLORS.WHITE,
  },
  tabTextInactive: {
    color: BASE_COLORS.BLACK,
  },
  card: {
    backgroundColor: BASE_COLORS.WHITE,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginTop: 4,
    marginBottom: 8,
    elevation: 1,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  status: {
    fontSize: moderateScale(12),
    fontFamily: FONTS.MEDIUM,
    marginTop: 0,
  },
  price: {
    fontSize: moderateScale(20),
    fontFamily: FONTS.BOLD,
    color: BASE_COLORS.PRIMARY,
  },
  title: {
    fontSize: moderateScale(16),
    fontFamily: FONTS.BOLD,
    marginBottom: 2,
    color: BASE_COLORS.BLACK,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  address: {
    color: BASE_COLORS.TEXT_LIGHT,
    fontFamily: FONTS.REGULAR,
    fontSize: moderateScale(12),
    flexShrink: 1,
  },
  detailsButton: {
    backgroundColor: BASE_COLORS.WHITE,
    height: 40,
    marginHorizontal: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: BASE_COLORS.PRIMARY,
    paddingVertical: 10,
    marginTop: 2,
  },
  detailsText: {
    color: BASE_COLORS.PRIMARY,
    fontFamily: FONTS.MEDIUM,
    fontSize: moderateScale(12),
  },
});

export default MyBookings;
