import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
  FlatList,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MyBookingHeader from '../../../../components/DashboardComponents/MyBookingHeader';
import { useNavigation } from '@react-navigation/native';
import AuthWrapper from '../../../../components/AuthWrapper';
import { ICONS } from '../../../../utils/appAssets';
import BASE_COLORS from '../../../../utils/colors';

const AddStopsScreen = () => {
  const navigation = useNavigation();

  const categories = [
    { id: '1', title: 'Hotels', icon: ICONS.HOTLE },
    { id: '2', title: 'Fuel Stations', icon: ICONS.FUEL_STATION },
    { id: '3', title: 'Parkings', icon: ICONS.PARKING },
    { id: '4', title: 'Garages', icon: ICONS.GARAGES },
  ];
  return (
    <AuthWrapper>
      <MyBookingHeader
        title="Categories"
        onBackPress={() => navigation.goBack()}
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
          placeholderTextColor="#8e8e93"
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
            <TouchableOpacity style={styles.categoryButton}>
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 6,
    backgroundColor: BASE_COLORS.WHITE,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,

    // ✅ Android Shadow
    elevation: 5,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 50,
  },
  categoriesContainer: {
    marginHorizontal: 16,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  categoryButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    paddingVertical: 20,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  categoryText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
  },
  categoriesContainer: {},
  categoryRow: {
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  categoryButton: {
    flex: 1,
    alignItems: 'center',
    padding: 15,
    marginHorizontal: 5,
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
  },
  categoryImage: {
    width: 40,
    height: 40,
  },
  categoryText: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: '500',
  },
});

export default AddStopsScreen;
