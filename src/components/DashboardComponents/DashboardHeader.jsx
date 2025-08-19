import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  StatusBar,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import BASE_COLORS from '../../utils/colors'; // adjust path
import { FONTS } from '../../theme/fonts'; // adjust path
import { useNavigation } from '@react-navigation/native';

const DashboardHeader = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* ✅ Add status bar */}
      <StatusBar
        backgroundColor={BASE_COLORS.PRIMARY}
        barStyle="light-content"
        translucent={false}
      />
      <ImageBackground
        source={require('../../../src/assets/headerBackground.png')} // 👈 Your animated or decorative background image
        resizeMode="cover"
        style={styles.backgroundImage}
        imageStyle={styles.imageStyle} // Optional: to round corners
      >
        {/* Top Row */}
        <View style={styles.topRow}>
          <View>
            <Text style={styles.locationText}>Location</Text>
            <View style={styles.locationContainer}>
              <Ionicons name="location-sharp" size={20} color="red" />
              <Text style={styles.locationAddressText}>Ontario, Canada</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications-outline" size={20} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Search Row */}
        <View style={styles.searchRow}>
          <View style={styles.searchInputContainer}>
            <Ionicons
              name="search"
              size={18}
              color={BASE_COLORS.DARK_GRAY}
              style={styles.searchIcon}
            />
            <TextInput
              placeholder="What service do you need?"
              placeholderTextColor={BASE_COLORS.DARK_GRAY}
              style={styles.searchInput}
            />
          </View>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => navigation.navigate('filter_screen')}
          >
            <MaterialIcons
              name="tune"
              size={17}
              color={BASE_COLORS.WHITE}
              style={{ transform: [{ rotate: '90deg' }] }}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    overflow: 'hidden',
  },
  backgroundImage: {
    paddingHorizontal: 16,
    paddingTop: 26,
    paddingBottom: 20,
  },
  imageStyle: {
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    marginLeft: 6,
    color: BASE_COLORS.WHITE,
    fontSize: 12,
    fontFamily: FONTS.REGULAR,
  },
  locationAddressText: {
    marginLeft: 6,
    color: BASE_COLORS.WHITE,
    fontSize: 16,
    fontFamily: FONTS.MEDIUM,
  },
  notificationButton: {
    backgroundColor: BASE_COLORS.WHITE,
    padding: 10,
    borderRadius: 12,
  },
  searchRow: {
    flexDirection: 'row',
    marginTop: 12,
    alignItems: 'center',
    marginBottom: 2,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BASE_COLORS.WHITE,
    borderRadius: 12,
    paddingHorizontal: 10,
    height: 38,
  },
  searchIcon: {
    marginRight: 6,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontFamily: FONTS.REGULAR,
    color: '#000',
  },
  filterButton: {
    marginLeft: 10,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 12,
  },
});

export default DashboardHeader;
