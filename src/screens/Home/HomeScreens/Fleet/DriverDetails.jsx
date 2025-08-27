import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Dimensions,
  ImageBackground,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { IMAGES } from '../../../../utils/appAssets';
import { useNavigation } from '@react-navigation/native';
import BASE_COLORS from '../../../../utils/colors';
import CustomButton from '../../../../components/CustomButton';
import CustomHeader from '../../../../components/CustomHeaders';
const { width } = Dimensions.get('window');
export default function DriverDetails() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={IMAGES.HEADER_BG}
        style={styles.bg_container}
        resizeMode="cover"
        imageStyle={styles.bgImage}
      >
        <View style={styles.header_container}>
          <CustomHeader
            leftIcon={
              <Ionicons
                name="chevron-back"
                size={24}
                color={BASE_COLORS.WHITE}
              />
            }
            onLeftPress={() => navigation.goBack()}
            showWelcomeText={false}
          />
        </View>
      </ImageBackground>
      <Image source={IMAGES.USER1} style={styles.profileImage} />

      {/* Name & Role */}
      <View style={styles.nameSection}>
        <Text style={styles.name}>George Franklin</Text>
        <View style={styles.roleTag}>
          <Text style={styles.roleText}>Driver</Text>
        </View>
      </View>

      {/* Details Card */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Details</Text>
        <View style={styles.row}>
          <MaterialIcons name="phone" size={18} color={BASE_COLORS.SECONDARY} />
          <Text style={styles.infoText}>+1 234 567 890</Text>
        </View>
        <View style={styles.row}>
          <MaterialIcons name="email" size={18} color={BASE_COLORS.SECONDARY} />
          <Text style={styles.infoText}>George@gmail.com</Text>
        </View>
      </View>

      {/* License Card */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>License & Identity</Text>
        <Text style={styles.infoText}>License Number CDL-4567-890</Text>
        <Text style={styles.subText}>License Expiry: Dec 20, 2025</Text>
      </View>

      {/* Assigned Vehicle Card */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Assigned Vehicle</Text>
        <View style={styles.rowBetween}>
          <Text style={styles.infoText}>Freightliner TX-9821</Text>
          <View style={styles.tag}>
            <Text style={styles.tagText}>TX-9821</Text>
          </View>
        </View>
      </View>

      {/* Bottom Buttons */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.deleteBtn}>
          <Ionicons
            name="trash-outline"
            size={22}
            color={BASE_COLORS.SECONDARY}
          />
        </TouchableOpacity>
        <CustomButton
          label="Edit"
          style={styles.editBtn}
          onPress={() => navigation.navigate('edit_driver')}
        >
          <Text style={styles.editText}>Edit</Text>
        </CustomButton>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BASE_COLORS.WHITE },
  bg_container: {
    width,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    overflow: 'hidden',
    height: 150,
  },
  header: {
    height: 160,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 15,
  },
  header_container: {
    flexDirection: 'row',
    paddingVertical: 20,
    marginLeft: 20,
  },
  profileImage: {
    width: 90,
    height: 90,
    alignSelf: 'center',
    marginTop: -50,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: BASE_COLORS.WHITE,
  },

  nameSection: { alignItems: 'center', marginTop: 10 },
  name: { fontSize: 20, fontWeight: 'bold', color: '#000' },
  roleTag: {
    marginTop: 5,
    backgroundColor: BASE_COLORS.CHAT,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 15,
  },
  roleText: { fontSize: 12, color: BASE_COLORS.BLACK },

  card: {
    backgroundColor: BASE_COLORS.WHITE,
    borderRadius: 12,
    padding: 15,
    marginHorizontal: 15,
    marginTop: 12,
    elevation: 2,
    shadowColor: BASE_COLORS.BLACK,
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  sectionTitle: { fontSize: 14, fontWeight: '600', marginBottom: 5 },
  row: { flexDirection: 'row', alignItems: 'center', marginVertical: 3 },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoText: { marginLeft: 0, fontSize: 14, color: BASE_COLORS.BLACK },
  subText: { fontSize: 12, color: 'gray', marginTop: 4 },

  tag: {
    backgroundColor: BASE_COLORS.CHAT,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 15,
  },
  tagText: { fontSize: 12, color: BASE_COLORS.BLACK },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    marginTop: 70,
  },
  btnRow: {
    flexDirection: 'row',
    marginHorizontal: 22,
    marginTop: 50,
    justifyContent: 'space-between',
  },
  deleteBtn: {
    backgroundColor: BASE_COLORS.RED_BG,
    padding: 15,
    borderRadius: 12,
    width: 60,
    height: 55,
    alignItems: 'center',
  },
  editBtn: {
    backgroundColor: BASE_COLORS.SECONDARY,
    padding: 15,
    borderRadius: 12,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
    marginHorizontal: 3,
    height: 54,
  },
  editText: {
    color: BASE_COLORS.WHITE,
    fontSize: 14,
    fontWeight: '600',
  },
});
