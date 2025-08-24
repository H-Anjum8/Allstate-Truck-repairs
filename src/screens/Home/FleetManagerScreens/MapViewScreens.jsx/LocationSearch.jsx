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

const API_KEY = 'mmOuOHPaeu4UIxzUcftugBPAPBkzYVE5';

export default function LocationSearch({ navigation, route }) {
  const { type } = route.params; // "start" or "dest"
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState(null);

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
    setSelected(item.address.freeformAddress); // just mark as selected
  };

  const handleConfirm = () => {
    if (!selected) return;
    navigation.navigate('fleet_trip_planning', {
      selectedType: type,
      selectedPlace: selected,
      currentStart: route.params?.currentStart,
      currentDest: route.params?.currentDest,
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select Location</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Search Input */}
      <View style={styles.searchWrapper}>
        <Ionicons
          name="search"
          size={18}
          color="#999"
          style={{ marginLeft: 6 }}
        />
        <TextInput
          style={styles.input}
          placeholder="Search for Driver"
          value={query}
          onChangeText={fetchLocations}
          placeholderTextColor="#999"
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
              color="#999"
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
            <Text style={styles.emptyText}>No Driver Selected</Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.item,
              selected === item.address.freeformAddress && styles.itemSelected,
            ]}
            onPress={() => handleSelect(item)}
          >
            <Ionicons name="location-sharp" size={20} color="#000" />
            <Text style={styles.text}>{item.address.freeformAddress}</Text>
          </TouchableOpacity>
        )}
      />

      {selected && (
        <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirm}>
          <Text style={styles.confirmText}>Confirm Selection</Text>
        </TouchableOpacity>
      )}
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
    borderBottomColor: '#eee',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
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
    alignItems: 'center',
    paddingVertical: 12,
    marginTop: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingHorizontal: 12,
  },
  itemSelected: {
    backgroundColor: '#e6f0ff',
  },
  text: { marginLeft: 8, color: '#000' },
  confirmBtn: {
    backgroundColor: BASE_COLORS.SECONDARY,
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    margin: 16,
  },
  confirmText: {
    color: '#fff',
    fontWeight: '700',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  emptyText: {
    color: '#666',
    fontSize: 14,
  },
});
