import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MyBookingHeader from '../../../../components/DashboardComponents/MyBookingHeader';
import { useNavigation, useRoute } from '@react-navigation/native';
import AuthWrapper from '../../../../components/AuthWrapper';
import { ICONS } from '../../../../utils/appAssets';
import BASE_COLORS from '../../../../utils/colors';

const AddStopsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { start, destination } = route.params || {};

  const categories = [
    { id: '1', title: 'Hotels', icon: ICONS.HOTLE, screen: 'HotelsScreen' },
    {
      id: '2',
      title: 'Fuel Stations',
      icon: ICONS.FUEL_STATION,
      screen: 'FuelStationsScreen',
    },
    {
      id: '3',
      title: 'Parkings',
      icon: ICONS.PARKING,
      screen: 'ParkingsScreen',
    },
    {
      id: '4',
      title: 'Garages',
      icon: ICONS.GARAGES,
      screen: 'addGarages_screen',
    },
  ];

  const handleCategoryPress = screen => {
    if (screen) {
      navigation.navigate(screen);
    }
  };

  return (
    <AuthWrapper>
      <MyBookingHeader
        title="Add Stops"
        onBackPress={() => navigation.goBack()}
        style={{ marginBottom: -8 }}
      />

      {/* Search Bar */}
      <View style={styles.searchBarContainer}>
        <Ionicons
          name="search"
          size={20}
          color={BASE_COLORS.GRAY}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for places..."
          placeholderTextColor={BASE_COLORS.LIGHT_GRAY}
        />
      </View>

      {/* Category Buttons */}
      <View style={styles.categoriesContainer}>
        <FlatList
          data={categories}
          keyExtractor={item => item.id}
          numColumns={2} // ✅ grid layout (2 per row)
          columnWrapperStyle={styles.categoryRow}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.categoryButton}
              onPress={() => handleCategoryPress(item.screen)}
            >
              <Image
                source={item.icon}
                style={styles.categoryImage}
                resizeMode="contain"
              />
              <Text style={styles.categoryText}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </AuthWrapper>
  );
};

const styles = StyleSheet.create({
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BASE_COLORS.WHITE,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    elevation: 5,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 12,
  },
  categoriesContainer: {
    marginHorizontal: -10,
  },
  categoryRow: {
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  categoryButton: {
    flex: 1,
    alignItems: 'center',
    padding: 15,
    marginHorizontal: 5,
    backgroundColor: BASE_COLORS.BORDER_COLOR,
    borderRadius: 10,
  },
  categoryImage: {
    width: 22,
    height: 22,
  },
  categoryText: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: '500',
  },
});

export default AddStopsScreen;
