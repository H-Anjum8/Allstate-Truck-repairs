import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import ServiceListSection from '../../../../components/DashboardComponents/ServiceListSection';
import { categories, featured } from '../../../../utils/staticData';
import { ScrollView } from 'react-native';
import PopularCategoryCard from '../../../../components/DashboardComponents/PopularCategoryCard';
import BASE_COLORS from '../../../../utils/colors';
import { FONTS } from '../../../../theme/fonts';
import CopilotModal from '../../../../components/modalComponents/CopilotModal';
import { ICONS } from '../../../../utils/appAssets';
import { useNavigation } from '@react-navigation/native';

const HomeView = () => {
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <ScrollView>
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
        {/* Emergency button */}
        <TouchableOpacity
          style={styles.emergencyBtn}
          onPress={() => navigation.navigate('emergency_services')}
        >
          <Image
            source={ICONS.EMERGENCY_ICON}
            style={{ width: 30, height: 30 }}
          />
        </TouchableOpacity>

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
        </View>
        <CopilotModal
          visible={visible}
          onClose={() => setVisible(false)}
          message="Open Doug's garage Screen..."
        />
      </ScrollView>
    </View>
  );
};

export default HomeView;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
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
  emergencyBtn: {
    position: 'absolute',
    backgroundColor: BASE_COLORS.SECONDARY,
    right: 12,
    bottom: 220,
    padding: 12,
    borderRadius: 8,

    alignItems: 'center',
    justifyContent: 'center',
  },

  mainaiBtn: {
    position: 'absolute',
    right: 10,
    bottom: 160,
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
});
