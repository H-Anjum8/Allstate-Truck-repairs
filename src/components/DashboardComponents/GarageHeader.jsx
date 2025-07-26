import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ICONS, IMAGES } from '../../utils/appAssets';
import BASE_COLORS from '../../utils/colors';

const { width } = Dimensions.get('window');

export default function GarageHeader({ onBackPress }) {
  return (
    <ImageBackground
      source={IMAGES.HEADER_BG}
      style={styles.container}
      resizeMode="cover"
      imageStyle={styles.bgImage}
    >
      <SafeAreaView style={styles.safeArea}>
        <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
          <Ionicons name="chevron-back" size={18} color={BASE_COLORS.WHITE} />
        </TouchableOpacity>

        <Image source={IMAGES.GARAGE_LOGO} style={styles.logo} />
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.name}>Doug’s Garage</Text>

          <View style={styles.ratingRow}>
            <Ionicons name="star" size={12} color="#FFD700" />
            <Text style={styles.rating}>(4.9)</Text>
          </View>
        </View>

        <View style={styles.verifiedContainer}>
          <Image source={ICONS.VERIFY} style={styles.verify_logo} />
          <Text style={styles.verifiedText}>Verified</Text>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    width,
    backgroundColor: BASE_COLORS.PRIMARY,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    overflow: 'hidden',
  },
  bgImage: {
    width: '100%',
    height: '100%',
  },
  safeArea: {
    alignItems: 'center',
    paddingBottom: 16,
    backgroundColor: '',
  },
  backButton: {
    position: 'absolute',
    top: 38, // now inside SafeArea
    left: 16,
    padding: 4,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: BASE_COLORS.WHITE,
  },
  logo: {
    width: 82,
    height: 85,
    marginTop: 24,
    marginBottom: 0,
  },
  name: {
    fontSize: 12,
    fontWeight: '600',
    color: BASE_COLORS.WHITE,
    marginRight: 10,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 0,
  },
  rating: {
    color: BASE_COLORS.WHITE,
    marginLeft: 4,
    fontSize: 11,
  },
  verifiedContainer: {
    marginTop: 8,
    backgroundColor: BASE_COLORS.WHITE,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  verify_logo: {
    width: 14,
    height: 14,
  },
  verifiedText: {
    marginLeft: 5,
    color: BASE_COLORS.TEXT_GREEN,
    fontWeight: '600',
    fontSize: 10,
  },
});
