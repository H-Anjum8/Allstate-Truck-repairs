import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { moderateScale } from 'react-native-size-matters';
import BASE_COLORS from '../../../utils/colors';
import { IMAGES } from '../../../utils/appAssets';
import AuthWrapper from '../../../components/AuthWrapper';

const NotificationsScreen = () => {
  const navigation = useNavigation();

  // 🔹 Dummy Data
  const notifications = [
    {
      id: 1,
      avatar: IMAGES.USER2,
      title: 'George Franklin',
      message: 'has submitted service completion details for Truck TX-9821.',
      subText: 'Tap to review',
      time: '5 mins ago',
      isCurrent: true,
    },
    {
      id: 2,
      avatar: IMAGES.GARAGE,
      title: "Dougy's Garage",
      message: 'added ‘Suspension Alignment’ ($45) to your service.',
      subText: 'Accept or decline now.',
      time: '5 mins ago',
      isCurrent: false,
    },
    {
      id: 3,
      avatar: IMAGES.USER3,
      title: "Dougy's Garage",
      message: 'added ‘Brake Pad Replacement’ ($80) to your service.',
      subText: 'Accept or decline now.',
      time: '4 mins ago',
      isCurrent: false,
    },
  ];

  return (
    <AuthWrapper>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={22} color={BASE_COLORS.BLACK} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Notifications</Text>

        <TouchableOpacity>
          <Text style={styles.markRead}>Mark all as read</Text>
        </TouchableOpacity>
      </View>

      {/* Notifications List */}
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {notifications.map(item => (
          <View
            key={item.id}
            style={
              item.isCurrent
                ? styles.notificationCurrentCard
                : styles.notificationCard
            }
          >
            <Image source={item.avatar} style={styles.avatar} />
            <View style={{ flex: 1 }}>
              <Text style={styles.notificationText}>
                <Text style={styles.boldText}>{item.title}</Text> {item.message}
              </Text>
              <Text style={styles.subText}>{item.subText}</Text>
              <Text style={styles.timeText}>{item.time}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </AuthWrapper>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: moderateScale(15),
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 25,
  },

  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: BASE_COLORS.BLACK,
  },
  markRead: {
    fontSize: 13,
    color: BASE_COLORS.BLUE,
  },
  notificationCard: {
    flexDirection: 'row',
    backgroundColor: BASE_COLORS.WHITE,
    marginHorizontal: -4,
    marginTop: 1,
    borderRadius: 12,
    borderColor: BASE_COLORS.BORDER_COLOR,
    padding: 12,
    alignItems: 'center',
  },
  notificationCurrentCard: {
    flexDirection: 'row',
    backgroundColor: BASE_COLORS.BLUE_BG,
    borderColor: BASE_COLORS.SECONDARY,
    marginTop: 1,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  avatar: {
    width: 36,
    height: 36,
    marginRight: 10,
    borderRadius: 12,
  },
  notificationText: {
    fontSize: 13,
    color: BASE_COLORS.BLACK,
  },
  boldText: {
    fontWeight: '600',
  },
  subText: {
    fontSize: 12,
    color: BASE_COLORS.GRAY,
    marginTop: 2,
  },
  timeText: {
    fontSize: 11,
    color: BASE_COLORS.GRAY,
    marginTop: 4,
  },
});
