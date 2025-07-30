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
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { FONTS } from '../../theme/fonts';
import BASE_COLORS from '../../utils/colors';
import { useNavigation } from '@react-navigation/native';

const FilterScreenHeader = () => {
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
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons
                name="chevron-back"
                size={18}
                color={BASE_COLORS.WHITE}
              />
            </TouchableOpacity>
          </View>
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
              size={16}
              color={BASE_COLORS.WHITE}
              style={{ transform: [{ rotate: '90deg' }] }}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default FilterScreenHeader;

const styles = StyleSheet.create({
  safeArea: {
    // borderBottomLeftRadius: 10,
    // borderBottomRightRadius: 10,
    overflow: 'hidden',
  },
  backgroundImage: {
    paddingHorizontal: 16,
    paddingTop: 30,
    paddingBottom: 26,
  },
  imageStyle: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: -1,
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
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 12,
  },
  searchRow: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
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
  backButton: {
    padding: 4,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: BASE_COLORS.WHITE,
  },
});
