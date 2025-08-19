import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ServiceListSection from '../../../../components/DashboardComponents/ServiceListSection';
import { categories, featured } from '../../../../utils/staticData';
import { ScrollView } from 'react-native';
import PopularCategoryCard from '../../../../components/DashboardComponents/PopularCategoryCard';
import BASE_COLORS from '../../../../utils/colors';
import { FONTS } from '../../../../theme/fonts';

const HomeView = () => {
  return (
    <View>
      <ServiceListSection
        title="Featured Services"
        data={featured}
        marginBottom={2}
      />

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Popular Categories</Text>
        <Text style={styles.viewAll}>View All</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginBottom: 1, paddingHorizontal: 10 }}
      >
        {categories.map((cat, index) => (
          <PopularCategoryCard key={index} {...cat} />
        ))}
      </ScrollView>

      <ServiceListSection
        title="Nearby Services"
        data={featured}
        marginBottom={30}
      />
    </View>
  );
};

export default HomeView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: BASE_COLORS.BORDER_COLOR,
  },
  location: {
    fontSize: 14,
    color: 'gray',
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  search: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginHorizontal: 12,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    marginBottom: 6,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 13,

    fontFamily: FONTS.BOLD,
  },
  viewAll: { color: BASE_COLORS.DARK_GRAY, fontSize: 11 },
});
