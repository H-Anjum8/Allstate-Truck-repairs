import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ScrollView,
  ImageBackground,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { IMAGES } from '../../../../utils/appAssets';
import BASE_COLORS from '../../../../utils/colors';
import { useNavigation } from '@react-navigation/native';
const { width } = Dimensions.get('window');
const VehicalDetails = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <ImageBackground
          source={IMAGES.HEADER_BG}
          style={styles.bg_container}
          resizeMode="cover"
          imageStyle={styles.bgImage}
        >
          <View style={styles.header_container}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons
                name="chevron-back"
                size={18}
                color={BASE_COLORS.WHITE}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.headerTitle}>Freightliner TX-9821</Text>
        </ImageBackground>
        {/* Header */}

        {/* Vehicle Info Card */}
        <View style={styles.card}>
          <View style={styles.row}>
            <View style={styles.infoBox}>
              <Text style={styles.label}>License Plate</Text>
              <Text style={styles.value}>ABC-1234</Text>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.label}>Status</Text>
              <Text style={[styles.value, { color: 'green' }]}>● Active</Text>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.label}>Year</Text>
              <Text style={styles.value}>2020</Text>
            </View>
          </View>
        </View>

        {/* Driver Info */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Assigned Driver</Text>
          <View style={styles.driverRow}>
            <Image source={IMAGES.USER1} style={styles.avatar} />
            <View style={{ flex: 1 }}>
              <Text style={styles.driverName}>George Franklin</Text>
              <View style={{ flexDirection: 'row', gap: 10 }}>
                <View style={{ flexDirection: 'row' }}>
                  <Ionicons
                    name="call-outline"
                    size={14}
                    color={BASE_COLORS.SECONDARY}
                  />
                  <Text style={styles.driverContact}>+1 234 567 890</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Ionicons
                    name="mail-outline"
                    size={14}
                    color={BASE_COLORS.SECONDARY}
                  />
                  <Text style={styles.driverContact}>George@gmail.com</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Service History */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Service History</Text>

          <View style={styles.serviceRow}>
            <View>
              <Text style={styles.serviceTitle}>Brake Inspection</Text>
              <Text style={styles.serviceSub}>Midtown Truck Garage</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.servicePrice}>$230</Text>
              <Text style={styles.serviceDate}>June 19, 2025</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.serviceRow}>
            <View>
              <Text style={styles.serviceTitle}>Inspection Report</Text>
              <Text style={styles.serviceSub}>Midtown Truck Garage</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.servicePrice}>$230</Text>
              <Text style={styles.serviceDate}>June 18, 2025</Text>
            </View>
          </View>
        </View>

        {/* Buttons */}
        <View style={styles.btnRow}>
          <TouchableOpacity
            style={styles.deleteBtn}
            onPress={() => navigation.navigate('/')}
          >
            <Ionicons
              name="trash-outline"
              size={18}
              color={BASE_COLORS.SECONDARY}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.editBtn}
            onPress={() => navigation.navigate('edit_vehicle')}
          >
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default VehicalDetails;

const styles = StyleSheet.create({
  bg_container: {
    width,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    overflow: 'hidden',
  },
  bgImage: {
    width: '100%',
    height: '100%',
  },
  header_container: {
    flexDirection: 'row',
    paddingVertical: 20,
    marginLeft: 20,
  },
  backButton: {
    padding: 4,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: BASE_COLORS.WHITE,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  headerTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    alignSelf: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginTop: 15,
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoBox: {
    flex: 1,
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    color: '#777',
  },
  value: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 5,
  },
  cardTitle: {
    fontSize: 14,

    marginBottom: 10,
    color: BASE_COLORS.GRAY,
  },
  driverRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 28,
    marginRight: 15,
  },
  driverName: {
    fontSize: 14,
    fontWeight: '600',
  },
  driverContact: {
    fontSize: 10,
    color: '#777',
  },
  serviceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  serviceTitle: {
    fontSize: 13,
    fontWeight: '500',
  },
  serviceSub: {
    fontSize: 12,
    color: '#777',
  },
  servicePrice: {
    fontSize: 14,
    fontWeight: '600',
  },
  serviceDate: {
    fontSize: 12,
    color: '#777',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 10,
  },
  btnRow: {
    flexDirection: 'row',
    marginHorizontal: 15,
    marginTop: 50,
    justifyContent: 'space-between',
  },
  deleteBtn: {
    backgroundColor: BASE_COLORS.RED_BG,
    padding: 15,
    borderRadius: 12,
    width: 60,
    alignItems: 'center',
  },
  editBtn: {
    backgroundColor: '#E53935',
    padding: 15,
    borderRadius: 12,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  editText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
