import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import { FONTS } from '../../theme/fonts';
import BASE_COLORS from '../../utils/colors';
import DashboardHeader from '../../components/DashboardComponents/DashboardHeader';
import HomeView from './HomeScreens/HomeView';
import MapViewScreen from './HomeScreens/MapViewScreen';

const Home = () => {
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
        {selectedTab === 'map' ? <MapViewScreen /> : <HomeView />}

        {/* Emergency Button */}
        {/* <TouchableOpacity style={styles.emergencyBtn}>
          <Ionicons name="alert-circle" size={32} color="#fff" />
        </TouchableOpacity> */}

        {/* Copilot Icon */}
        {/* <TouchableOpacity style={styles.copilotBtn}>
          <Image
            source={require('../../assets/copilot.png')}
            style={{ width: 40, height: 40 }}
          />
        </TouchableOpacity> */}
      </View>
    </ScrollView>
  );
};

export default Home;

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
