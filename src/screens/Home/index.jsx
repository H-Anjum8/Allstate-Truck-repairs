import React from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput } from 'react-native';
import ServiceListSection from '../../components/DashboardComponents/ServiceListSection';
import PopularCategoryCard from '../../components/DashboardComponents/PopularCategoryCard';
import { categories } from '../../utils/staticData';
import { featured } from '../../utils/staticData';
import { FONTS } from '../../theme/fonts';
import BASE_COLORS from '../../utils/colors';
import DashboardHeader from '../../components/DashboardComponents/DashboardHeader';
const Home = () => {
  return (
    <ScrollView style={styles.container}>
      {/* dashboard Header  */}
      <DashboardHeader />

      <ServiceListSection
        title="Featured Services"
        data={featured}
        marginBottom={20}
      />

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Popular Categories</Text>
        <Text style={styles.viewAll}>View All</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginBottom: 20, paddingHorizontal: 10 }}
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
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    // paddingTop: 40,
    backgroundColor: BASE_COLORS.WHITE,
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
    marginBottom: 10,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    fontWeight: 700,
    fontFamily: FONTS.BOLD,
  },
  viewAll: {
    color: BASE_COLORS.DARK_GRAY,
  },
});
