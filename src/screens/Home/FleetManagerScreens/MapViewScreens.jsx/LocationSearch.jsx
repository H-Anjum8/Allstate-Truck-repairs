import React, { useState } from 'react';
import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BASE_COLORS from '../../../../utils/colors';
import Feather from 'react-native-vector-icons/Feather';
import { FONTS } from '../../../../theme/fonts';

const API_KEY = 'mmOuOHPaeu4UIxzUcftugBPAPBkzYVE5';

export default function LocationSearch({ navigation, route }) {
  const { type } = route.params; // "start" or "dest"
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const fetchLocations = async q => {
    setQuery(q);
    if (!q) {
      setResults([]);
      return;
    }
    try {
      const res = await fetch(
        `https://api.tomtom.com/search/2/search/${encodeURIComponent(
          q,
        )}.json?key=${API_KEY}&limit=5`,
      );
      const data = await res.json();
      setResults(data.results || []);
    } catch (err) {
      console.log('Search error:', err);
    }
  };

  const handleSelect = item => {
    // Directly navigate when user taps on search result
    navigation.navigate('fleet_trip_planning', {
      selectedType: type,
      selectedPlace: item.address.freeformAddress,
      currentStart: route.params?.currentStart,
      currentDest: route.params?.currentDest,
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: BASE_COLORS.WHITE }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={BASE_COLORS.BLACK} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select Location</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Search Input */}
      <View style={styles.searchWrapper}>
        <Ionicons
          name="search"
          size={18}
          color={BASE_COLORS.GRAY}
          style={{ marginLeft: 6 }}
        />
        <TextInput
          style={styles.input}
          placeholder="Search for Location"
          value={query}
          onChangeText={fetchLocations}
          placeholderTextColor={BASE_COLORS.GRAY}
        />
        {query.length > 0 && (
          <TouchableOpacity
            onPress={() => {
              setQuery('');
              setResults([]);
            }}
          >
            <Ionicons
              name="close-circle"
              size={20}
              color={BASE_COLORS.GRAY}
              style={{ marginRight: 6 }}
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Results List */}
      <FlatList
        data={results}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No Location Found</Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => handleSelect(item)}
          >
            {/* Location + icon */}
            <View style={styles.itemContent}>
              <Ionicons
                name="location-sharp"
                size={20}
                color={BASE_COLORS.BLACK}
                style={styles.icon_bg}
              />
              <Text style={styles.text} numberOfLines={2} ellipsizeMode="tail">
                {item.address.freeformAddress}
              </Text>
            </View>

            {/* Always visible arrow */}
            <Feather
              name="arrow-up-left"
              size={24}
              color={BASE_COLORS.LIGHT_GRAY}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: BASE_COLORS.LIGHT_GRAY,
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: BASE_COLORS.BLACK,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: BASE_COLORS.LIGHT_GRAY,
    borderRadius: 10,
    paddingHorizontal: 4,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 8,
    color: '#000',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: BASE_COLORS.LIGHT_GRAY,
    marginHorizontal: 8,
    paddingHorizontal: 8,
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1, // ensures text shrinks before arrow disappears
    marginRight: 10,
  },
  text: {
    marginLeft: 8,
    color: BASE_COLORS.BLACK,
    fontFamily: FONTS.MEDIUM,
    flexShrink: 1, // prevents pushing arrow away
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  emptyText: {
    color: BASE_COLORS.GRAY,
    fontSize: 14,
  },
  icon_bg: {
    borderRadius: 50,
    backgroundColor: BASE_COLORS.GRAYIESH,
    padding: 4,
  },
});
