import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AuthWrapper from '../../../../components/AuthWrapper';
import CustomHeader from '../../../../components/CustomHeaders';
import CustomButton from '../../../../components/CustomButton';
import BASE_COLORS from '../../../../utils/colors';
import FONTS from '../../../../theme/fonts';
import CustomTextInput from '../../../../components/CustomTextInput';

const FleetDashboard = () => {
  const [activeTab, setActiveTab] = useState('Vehicles');
  const [vehicleCount, setVehicleCount] = useState(0);
  const [driverCount, setDriverCount] = useState(0);
  const [bookingCount, setBookingCount] = useState(0);
  const [search, setSearch] = useState('');

  const stats = [
    {
      id: '1',
      icon: 'bus-outline',
      label: 'Total Vehicles',
      value: vehicleCount,
    },
    {
      id: '2',
      icon: 'person-outline',
      label: 'Total Drivers',
      value: driverCount,
    },
    {
      id: '3',
      icon: 'calendar-outline',
      label: 'Upcoming Bookings',
      value: bookingCount,
    },
  ];

  return (
    <AuthWrapper>
      <CustomHeader
        onLeftPress={() => navigation.goBack()}
        username="Fleet Dashboard"
        showUsername
        showWelcomeText={false}
        contentContainerStyle={{ alignItems: 'flex-start' }} // left align
        usernameTextStyle={{
          textAlign: 'left',
          alignSelf: 'flex-start',
          fontSize: 22,
          marginTop: -10,
        }}
      />

      {/* ✅ Stats Row */}
      <View style={styles.statsRow}>
        {stats.map(item => (
          <View key={item.id} style={styles.statCard}>
            <View style={styles.rowAlign}>
              <View style={styles.iconCircle}>
                <Ionicons
                  name={item.icon}
                  size={22}
                  color={BASE_COLORS.PRIMARY}
                />
              </View>
              <Text style={styles.statValue}>{item.value}</Text>
            </View>
            <Text style={styles.statLabel}>{item.label}</Text>
          </View>
        ))}
      </View>

      {/* Tabs */}
      <View style={styles.tabsRow}>
        <TouchableOpacity onPress={() => setActiveTab('Vehicles')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'Vehicles' && styles.activeTab,
            ]}
          >
            Vehicles
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('Drivers')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'Drivers' && styles.activeTab,
            ]}
          >
            Drivers
          </Text>
        </TouchableOpacity>
      </View>

      {/* ✅ Search + Add Button Row */}
      <View style={styles.searchRow}>
        <View style={styles.halfInputWrapper}>
          <CustomTextInput
            style={styles.input}
            placeholder={`Search ${activeTab}...`}
            placeholderTextColor={BASE_COLORS.GRAY}
            value={search}
            onChangeText={setSearch}
            leftIcon={
              <Ionicons
                name="search"
                size={18}
                color={BASE_COLORS.SECONDARY}
                style={{ marginRight: 6 }}
              />
            }
            containerStyle={styles.inputContainer}
            textInputStyle={styles.inputText}
          />
        </View>

        {activeTab === 'Vehicles' && (
          <CustomButton
            label="+ Add Vehicle"
            onPress={() => setVehicleCount(vehicleCount + 1)}
            style={styles.buttonStyle}
            textStyle={styles.buttonTextStyle}
          />
        )}

        {activeTab === 'Drivers' && (
          <CustomButton
            label="+ Add Driver"
            onPress={() => setDriverCount(driverCount + 1)}
            style={styles.buttonStyle}
            textStyle={styles.buttonTextStyle}
          />
        )}
      </View>

      {/* Empty State */}
      <View style={styles.emptyWrapper}>
        <Text style={styles.emptyText}>
          {activeTab === 'Vehicles' ? 'No vehicle added' : 'No driver added'}
        </Text>
      </View>
    </AuthWrapper>
  );
};

export default FleetDashboard;

const styles = StyleSheet.create({
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: verticalScale(8),
  },
  statCard: {
    flex: 1,
    backgroundColor: BASE_COLORS.TABLE_BACKGROUND,
    padding: moderateScale(4),
    marginBottom: moderateScale(20),
    alignItems: 'center',
    marginHorizontal: moderateScale(4),
    shadowColor: BASE_COLORS.BLACK,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 2,
  },
  rowAlign: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateScale(2),
  },
  iconCircle: {
    backgroundColor: BASE_COLORS.WHITE,
    borderRadius: 25,
    padding: moderateScale(8),
    marginRight: moderateScale(8),
    marginBottom: verticalScale(6),
    shadowColor: BASE_COLORS.BLACK,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 2,
  },
  statValue: {
    ...FONTS.h3,
    color: BASE_COLORS.SECONDARY,
    padding: moderateScale(16),
  },
  statLabel: {
    ...FONTS.body4,
    color: BASE_COLORS.BLACK,
    textAlign: 'center',
    fontSize: moderateScale(10),
    fontFamily: FONTS.BOLD,
  },
  tabsRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: BASE_COLORS.BORDER_COLOR,
    marginBottom: verticalScale(10),
    justifyContent: 'center',
    columnGap: moderateScale(25),
  },
  tabText: {
    marginRight: moderateScale(20),
    ...FONTS.body3,
    color: BASE_COLORS.TEXT_GREY,
    paddingBottom: moderateScale(6),
  },
  activeTab: {
    color: BASE_COLORS.BLACK,
    borderBottomWidth: 2,
    fontFamily: FONTS.BOLD,
    borderBottomColor: BASE_COLORS.SECONDARY,
  },

  // ✅ Search Row styles
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(20),
    paddingHorizontal: moderateScale(10),
  },
  halfInputWrapper: {
    flex: 1,
    maxWidth: '85%',
    marginRight: moderateScale(4),
    height: moderateScale(45),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BASE_COLORS.BORDER_COLOR,
    borderRadius: moderateScale(6),
    paddingHorizontal: moderateScale(8),
    height: moderateScale(40),
  },
  input: {
    flex: 1,
    marginLeft: moderateScale(2),
    color: BASE_COLORS.BLACK,
  },

  // ✅ Shared Button Styles
  buttonStyle: {
    marginHorizontal: 3,
    marginTop: 10,
    height: 40,
    width: 110,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  buttonTextStyle: {
    fontSize: 14,
    fontWeight: '600',
    color: BASE_COLORS.WHITE,
  },

  emptyWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(40),
  },
  emptyText: {
    ...FONTS.body3,
    color: BASE_COLORS.TEXT_GREY,
  },
});
