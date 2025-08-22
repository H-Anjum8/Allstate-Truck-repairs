import React from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView } from 'react-native';
import BASE_COLORS from '../../utils/colors';
import { FONTS } from '../../theme/fonts';

const PopularCategoryCard = ({ icon, title }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <Image source={icon} style={styles.icon} />
        </View>
        <Text style={styles.title}>{title}</Text>
      </View>
    </SafeAreaView>
  );
};

export default PopularCategoryCard;

const styles = StyleSheet.create({
  mainContainer: {
    width: 90,
    paddingHorizontal: 12,
    marginHorizontal: 4,
    padding: 8,
    justifyContent: 'center',
    textAlign: 'center',
    justifyContent: 'center',
  },
  container: {
    width: 70,
    alignItems: 'center',
    backgroundColor: BASE_COLORS.WHITE,
    paddingVertical: 8,
    borderRadius: 16,
    borderColor: BASE_COLORS.BORDER_COLOR,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  icon: {
    width: 40,
    height: 40,
    marginBottom: 6,
  },
  title: {
    fontSize: 10,
    fontFamily: FONTS.MEDIUM,
    color: BASE_COLORS.DARK_GRAY,
    fontWeight: '500',
    width: 70,
    textAlign: 'center',
    marginTop: 4,
  },
});
