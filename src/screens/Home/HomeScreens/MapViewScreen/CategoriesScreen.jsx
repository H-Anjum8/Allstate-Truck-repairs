import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { ICONS } from '../../../../utils/appAssets';
import MyBookingHeader from '../../../../components/DashboardComponents/MyBookingHeader';
import { useNavigation } from '@react-navigation/native';
import AuthWrapper from '../../../../components/AuthWrapper';
import BASE_COLORS from '../../../../utils/colors';

const categories = [
  { id: '1', title: 'Fuel Stations', icon: ICONS.FUEL_STATION },
  { id: '2', title: 'Parkings', icon: ICONS.PARKING },
  { id: '3', title: 'Garages', icon: ICONS.GARAGES },
  { id: '4', title: 'Hotels', icon: ICONS.HOTLE },
];

const CategoriesScreen = () => {
  const navigation = useNavigation();
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item}>
      <Image source={item.icon} style={styles.icon} />
      <Text style={styles.text}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <AuthWrapper>
      <MyBookingHeader
        style={{ marginBottom: -12 }}
        title="Categories"
        onBackPress={() => navigation.goBack()}
      />

      {/* List */}
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </AuthWrapper>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  icon: {
    width: 22,
    height: 22,
    marginRight: 15,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 15,
    color: '#000',
  },
  separator: {
    height: 1,
    backgroundColor: BASE_COLORS.LIGHT_GRAY,
    marginLeft: 55,
  },
});

export default CategoriesScreen;
