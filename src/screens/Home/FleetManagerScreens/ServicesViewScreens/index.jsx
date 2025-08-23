import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { FONTS } from '../../../../theme/fonts';
import CustomTextInput from '../../../../components/CustomTextInput';
import BASE_COLORS from '../../../../utils/colors';
import CustomButton from '../../../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { ICONS } from '../../../../utils/appAssets';
import CopilotModal from '../../../../components/modalComponents/CopilotModal';

const trucksData = [
  {
    id: '1',
    plate: 'TX - 9821',
    name: 'Freightliner TX-9821',
    driver: 'George Franklin',
    status: 'Active',
  },
  {
    id: '2',
    plate: 'TX - 9822',
    name: 'Freightliner TX-9822',
    driver: 'George Franklin',
    status: 'Active',
  },
  {
    id: '3',
    plate: 'TX - 9823',
    name: 'Freightliner TX-9823',
    driver: 'George Franklin',
    status: 'Active',
  },
  {
    id: '4',
    plate: 'TX - 9824',
    name: 'Freightliner TX-9824',
    driver: 'George Franklin',
    status: 'Active',
  },
  {
    id: '5',
    plate: 'TX - 9825',
    name: 'Freightliner TX-9825',
    driver: 'George Franklin',
    status: 'Active',
  },
  {
    id: '6',
    plate: 'TX - 9825',
    name: 'Freightliner TX-9825',
    driver: 'George Franklin',
    status: 'Active',
  },
];

const TruckItem = ({ item, selectedId, onSelect }) => {
  const isSelected = selectedId === item.id;

  return (
    <TouchableOpacity
      style={styles.truckCard}
      onPress={() => onSelect(item.id)}
    >
      <View style={styles.row}>
        <Ionicons
          name={isSelected ? 'radio-button-on' : 'radio-button-off'}
          size={20}
          color={isSelected ? BASE_COLORS.PRIMARY : BASE_COLORS.PRIMARY}
        />
        <Text style={styles.plate}>{item.plate}</Text>
      </View>

      <View style={{ marginTop: 4, paddingHorizontal: 20 }}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.driverRow}>
          <Ionicons
            name="person-outline"
            size={14}
            color={BASE_COLORS.SECONDARY}
          />
          <Text style={styles.driver}>{item.driver}</Text>
        </View>
      </View>

      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>{item.status}</Text>
      </View>
    </TouchableOpacity>
  );
};

const ServicesView = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [visible, setVisible] = useState(false);
  const filteredData = trucksData.filter(truck =>
    truck.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Select Your Truck</Text>

        <CustomTextInput
          style={styles.input}
          placeholder={'Search Vehicles.. '}
          placeholderTextColor={BASE_COLORS.GRAY}
          value={search}
          onChangeText={setSearch}
          leftIcon={
            <Ionicons
              name="search"
              size={18}
              color={BASE_COLORS.GRAY}
              style={{ marginRight: 6 }}
            />
          }
          containerStyle={styles.inputContainer}
          textInputStyle={{ fontSize: 8, marginVertical: -0 }}
        />

        {/* Truck List */}
        <FlatList
          data={filteredData}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TruckItem
              item={item}
              selectedId={selectedId}
              onSelect={setSelectedId}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10 }}
        />

        {/* Bottom Buttons */}

        <CustomButton
          label="Continue to Booking"
          onPress={() => navigation.navigate('service_selection')}
          style={{ marginHorizontal: 2, height: 54 }}
          textStyle={{ fontSize: 14, color: 'white' }}
        />
      </ScrollView>
      <View style={styles.floatingLayer} pointerEvents="box-none">
        {/* Emergency button */}
        <View style={styles.mainemergencyBtn}>
          <TouchableOpacity
            style={styles.emergencyBtn}
            onPress={() => navigation.navigate('emergency_services')}
          >
            <Image
              source={ICONS.EMERGENCY_RED_ICON}
              style={{ width: 30, height: 30 }}
            />
          </TouchableOpacity>
          <Text
            style={{
              color: BASE_COLORS.BLACK,
              fontWeight: 'bold',
              fontSize: 10,
            }}
          >
            Emergency
          </Text>
        </View>
        {/* AI Copilot */}
        <View style={styles.mainaiBtn}>
          <TouchableOpacity
            style={styles.aiBtn}
            onPress={() => setVisible(true)}
          >
            <Image
              source={ICONS.COPILOT}
              style={{ width: 40, height: 40, resizeMode: 'contain' }}
            />
          </TouchableOpacity>
          <Text
            style={{
              color: BASE_COLORS.BLACK,
              fontWeight: 'bold',
              fontSize: 10,
            }}
          >
            AI Copilot
          </Text>
        </View>
        <CopilotModal
          visible={visible}
          onClose={() => setVisible(false)}
          message="Open Doug's garage Screen..."
        />
      </View>
    </SafeAreaView>
  );
};

export default ServicesView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BASE_COLORS.WHITE,
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    fontFamily: FONTS.MEDIUM,
    marginTop: 12,
    marginBottom: 4,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BASE_COLORS.WHITE,
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 6,
  },
  truckCard: {
    backgroundColor: BASE_COLORS.WHITE,
    borderWidth: 1,
    borderColor: BASE_COLORS.GRAYIESH,
    borderRadius: 8,
    paddingVertical: 7,
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  plate: {
    marginLeft: 6,
    fontSize: 7,
    color: '#111827',
    fontWeight: '500',
    backgroundColor: BASE_COLORS.BORDER_COLOR,
    borderRadius: 10,
    padding: 2,
  },
  name: {
    fontSize: 12,
    fontWeight: '600',
    color: BASE_COLORS.BLACK,
  },
  driverRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  driver: {
    marginLeft: 4,
    fontSize: 8,
    color: BASE_COLORS.GRAY,
  },
  statusContainer: {
    position: 'absolute',
    top: 10,
    right: 12,
    backgroundColor: BASE_COLORS.LIGHT_GREEN,
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 12,
  },
  statusText: {
    color: BASE_COLORS.GREEN,
    fontSize: 10,
    fontWeight: '600',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: BASE_COLORS.WHITE,
  },
  emergencyBtn: {
    backgroundColor: BASE_COLORS.WHITE,

    padding: 12,
    borderRadius: 8,

    alignItems: 'center',
    justifyContent: 'center',
  },
  mainemergencyBtn: {
    position: 'absolute',
    right: 10,
    bottom: 150,
  },
  mainaiBtn: {
    position: 'absolute',
    right: 10,
    bottom: 80,
  },
  aiBtn: {
    backgroundColor: BASE_COLORS.WHITE,
    borderColor: BASE_COLORS.SECONDARY,
    borderWidth: 3,
    paddingVertical: 2,
    paddingHorizontal: 4,
    width: 57,
    borderRadius: 8,
  },
  floatingLayer: {
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: 0,
    top: 0,
    justifyContent: 'flex-end',
  },
});
