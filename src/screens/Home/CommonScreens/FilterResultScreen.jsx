import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { featured } from '../../../utils/staticData';
import BASE_COLORS from '../../../utils/colors';
import { FONTS } from '../../../theme/fonts';
import FilterGarageCard from '../../../components/DashboardComponents/FilterGarageCard';
import FilterScreenHeader from '../../../components/DashboardComponents/FilterScreenHeader';

const filterTags = [
  'Oil Change',
  'Battery Jumpstart',
  'Tire Replacement',
  'Smog Check',
  'Brake Inspection',
];

export default function FilterResultScreen() {
  const [selectedFilters, setSelectedFilters] = useState(filterTags);

  const handleRemoveFilter = filter => {
    setSelectedFilters(prev => prev.filter(f => f !== filter));
  };

  return (
    <SafeAreaView style={styles.container}>
      <FilterScreenHeader />
      {/* Result Count */}
      <Text style={styles.resultsText}>{featured.length} Results</Text> */}
      {/* Selected Filter Tags */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterRow}
      >
        {selectedFilters.map((filter, index) => (
          <View key={index} style={styles.selectedChip}>
            <Text style={styles.chipText}>{filter}</Text>
            <TouchableOpacity onPress={() => handleRemoveFilter(filter)}>
              <Ionicons
                name="close"
                size={14}
                color={BASE_COLORS.PRIMARY}
                style={{ marginLeft: 4 }}
              />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      {/* Garage List */}
      <FlatList
        data={featured}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.cardList}
        renderItem={({ item }) => (
          <View style={styles.cardWrapper}>
            <FilterGarageCard {...item} />
          </View>
        )}
        showsVerticalScrollIndicator={false}
        numColumns={2}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BASE_COLORS.WHITE,
    // marginBottomBottom: 200,
  },
  resultsText: {
    fontSize: 14,
    fontFamily: FONTS.BOLD,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 2,
    color: BASE_COLORS.BLACK,
  },
  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingBottom: 18,
    paddingTop: 10,
    gap: 1,
  },

  selectedChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BASE_COLORS.GRAYIESH,
    paddingHorizontal: 8,
    height: 30,
    borderRadius: 20,
    borderColor: BASE_COLORS.BORDER_COLOR,
    borderWidth: 1,
    marginRight: 8,
  },
  chipText: {
    fontSize: 10,
    color: BASE_COLORS.PRIMARY,
    fontFamily: FONTS.MEDIUM,
  },
  cardList: {
    paddingBottom: 3,
    // paddingHorizontal: 6,
  },
  cardWrapper: {
    width: '50%',
    padding: 6,
  },
});
