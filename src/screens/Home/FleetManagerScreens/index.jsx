import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import DashboardHeader from '../../../components/DashboardComponents/DashboardHeader';
import MapView from './MapViewScreens.jsx';
import ServicesView from './ServicesViewScreens/index.jsx';
import BASE_COLORS from '../../../utils/colors.jsx';

const FleetManagerHome = () => {
  const [selectedTab, setSelectedTab] = useState('map');
  return (
    <ScrollView style={styles.container}>
      {/* dashboard Header  */}
      <DashboardHeader />
      <View style={{ flex: 1 }}>
        {/* Custom Tabs */}
        <View style={styles.tabWrapper}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              selectedTab === 'map' && styles.activeTab,
            ]}
            onPress={() => setSelectedTab('map')}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === 'map' && styles.activeText,
              ]}
            >
              Map View
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabButton,
              selectedTab === 'services' && styles.activeTab,
            ]}
            onPress={() => setSelectedTab('services')}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === 'services' && styles.activeText,
              ]}
            >
              Services
            </Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        {selectedTab === 'map' ? <MapView /> : <ServicesView />}
      </View>
    </ScrollView>
  );
};

export default FleetManagerHome;

const styles = StyleSheet.create({
  tabWrapper: {
    flexDirection: 'row',

    borderRadius: 50,
    paddingTop: 4,
    marginHorizontal: 10,
    justifyContent: 'center',
  },
  tabButton: {
    paddingVertical: 4,
    paddingHorizontal: 48,
    borderBottomColor: BASE_COLORS.GRAYIESH,
    borderBottomWidth: 3,
  },
  activeTab: {
    color: BASE_COLORS.SECONDARY,
    borderBottomColor: BASE_COLORS.SECONDARY,
    borderBottomWidth: 3,
  },
  tabText: {
    color: BASE_COLORS.BLACK,
    fontWeight: 'bold',
  },
  activeText: {
    color: BASE_COLORS.SECONDARY,
  },
  emergencyBtn: {
    position: 'absolute',
    bottom: 90,
    right: 20,
    backgroundColor: 'red',
    borderRadius: 30,
    padding: 12,
    elevation: 5,
  },
  copilotBtn: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: BASE_COLORS.WHITE,
    borderRadius: 30,
    padding: 5,
    elevation: 5,
  },
});
