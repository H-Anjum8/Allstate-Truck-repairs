import React, { useEffect, useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import BASE_COLORS from '../../utils/colors';
import { FONTS } from '../../theme/fonts';
import ServiceCard from '../DashboardComponents/ServiceCard';
import { reviews as staticReviews } from '../../utils/staticData';
import CustomRating from '../CustomRating/CustomRating';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from '../CustomButton';
import { ICONS, IMAGES } from '../../utils/appAssets';
import { useNavigation } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FuelCardComponent from '../DashboardComponents/FuelCardComponent';

const FuelModal = ({
  visible,
  onClose,
  title,
  children,
  buttonLabel,
  onButtonPress,
}) => {
  const navigation = useNavigation();

  // 🔹 State for API data
  const [fuelData, setFuelData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (visible) {
      fetch(
        `https://your-api.com/fuel-stations?name=${encodeURIComponent(title)}`,
      )
        .then(res => res.json())
        .then(data => {
          setFuelData(data);
        })
        .catch(err => {
          console.error('API Error:', err);
        });
    }
  }, [visible, title]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <ScrollView>
        <View style={styles.modalOverlay}>
          <View style={styles.bottomSheet}>
            {loading ? (
              <ActivityIndicator size="large" color={BASE_COLORS.PRIMARY} />
            ) : (
              <>
                {/* Header */}
                <View style={styles.modalHeader}>
                  <SafeAreaView style={styles.safeArea}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <View style={styles.verifiedContainer}>
                        <Image source={ICONS.FUEL_LOGO} style={styles.logo} />
                        <Text style={styles.name}>
                          {fuelData?.name || title}
                        </Text>
                        <Image
                          source={ICONS.VERIFY}
                          style={styles.verify_logo}
                        />
                      </View>
                      <TouchableOpacity onPress={onClose}>
                        <Text style={styles.closeBtn}>X</Text>
                      </TouchableOpacity>
                    </View>

                    {/* Rating + Distance */}
                    <View style={styles.row}>
                      <Text style={styles.rating}>
                        {fuelData?.rating || '4.9'}
                      </Text>
                      {[...Array(5)].map((_, i) => (
                        <Ionicons
                          key={i}
                          name={
                            i < Math.floor(fuelData?.rating || 4)
                              ? 'star'
                              : 'star-outline'
                          }
                          size={14}
                          color={BASE_COLORS.YELLOW}
                        />
                      ))}
                      <Text style={styles.count}>
                        ({fuelData?.reviewsCount || '3,199'})
                      </Text>

                      <Ionicons
                        name="car"
                        size={14}
                        color={BASE_COLORS.GREY}
                        style={{ marginLeft: 10 }}
                      />
                      <Text style={styles.distance}>
                        {fuelData?.distance || '4 mins'}
                      </Text>
                    </View>

                    {/* Subtitle + Status */}
                    <Text style={styles.subtitle}>
                      {fuelData?.category || 'Gas Station'}
                    </Text>
                    <Text style={styles.open}>
                      {fuelData?.isOpen ? 'Open' : 'Closed'}
                    </Text>

                    {/* Buttons */}
                    <View style={styles.btnRow}>
                      <TouchableOpacity style={styles.directionBtn}>
                        <Image
                          source={ICONS.DIRECTION}
                          style={styles.verify_logo}
                        />
                        <Text style={styles.btnText}>Direction</Text>
                      </TouchableOpacity>

                      <TouchableOpacity style={styles.startBtn}>
                        <Image
                          source={ICONS.START}
                          style={styles.verify_logo}
                        />
                        <Text style={styles.startText}>Start</Text>
                      </TouchableOpacity>
                    </View>

                    {/* Images from API or fallback */}
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      style={styles.imageRow}
                    >
                      {(
                        fuelData?.images || [
                          IMAGES.PUMP1,
                          IMAGES.PUMP2,
                          IMAGES.PUMP3,
                        ]
                      ).map((img, i) => (
                        <Image
                          key={i}
                          source={typeof img === 'string' ? { uri: img } : img}
                          style={styles.image}
                        />
                      ))}
                    </ScrollView>
                  </SafeAreaView>
                </View>

                {/* Fuel Crad  data*/}
                <FuelCardComponent />
              </>
            )}
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
};

export default FuelModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    backgroundColor: BASE_COLORS.WHITE,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    marginTop: 280,
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  closeBtn: {
    fontSize: 14,
    color: 'red',
  },
  content: {
    marginVertical: 12,
  },

  containerr: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 13,
    marginBottom: 6,
    marginTop: 16,
    fontWeight: 'bold',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  ratingValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
    marginRight: 6,
  },
  bookButton: {
    marginTop: 16,
    backgroundColor: BASE_COLORS.SECONDARY,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  bookButtonText: {
    color: BASE_COLORS.WHITE,
    fontSize: 16,
    fontWeight: '600',
  },
  safeArea: {
    alignItems: 'start',
    paddingBottom: 16,
  },

  logo: {
    width: 50,
    height: 50,

    marginBottom: 0,
  },
  name: {
    fontSize: 12,
    fontWeight: '600',
    color: BASE_COLORS.GRAY,
    marginHorizontal: 10,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 0,
  },
  // rating: {
  //   color: BASE_COLORS.GRAY,
  //   marginLeft: 4,
  //   fontSize: 11,
  // },
  verifiedContainer: {
    backgroundColor: BASE_COLORS.WHITE,
    // paddingHorizontal: 10,

    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'start',
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
  container: {
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  rating: {
    fontSize: 13,
    fontWeight: '600',
    color: BASE_COLORS.BLACK,
  },
  reviews: {
    fontSize: 12,
    color: 'gray',
    marginLeft: 2,
  },
  time: {
    fontSize: 12,
    marginLeft: 2,
    color: BASE_COLORS.BLACK,
  },
  status: {
    fontSize: 12,
    color: BASE_COLORS.BLACK,
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6E6EB',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  buttonText: {
    marginLeft: 6,
    fontSize: 13,
    fontWeight: '500',
    color: BASE_COLORS.BLACK,
  },
  card: {
    backgroundColor: BASE_COLORS.WHITE,
    borderRadius: 12,
    padding: 12,
    shadowColor: BASE_COLORS.BLACK,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 4,
    margin: 3,
    marginTop: 26,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  title: {
    fontSize: 22,
    fontFamily: FONTS.MEDIUM,
    marginLeft: 16,
    color: BASE_COLORS.BLACK,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  rating: {
    fontSize: 12,
    fontFamily: FONTS.MEDIUM,
    marginRight: 4,
    color: BASE_COLORS.TEXT_INPUT_FIELD,
  },
  count: {
    fontSize: 12,
    fontFamily: FONTS.REGULAR,
    color: BASE_COLORS.TEXT_INPUT_FIELD,
    marginLeft: 4,
  },
  distance: {
    fontSize: 12,
    fontFamily: FONTS.REGULAR,
    marginLeft: 4,
    color: BASE_COLORS.TEXT_INPUT_FIELD,
  },
  subtitle: {
    fontSize: 12,
    fontFamily: FONTS.REGULAR,
    color: BASE_COLORS.TEXT_INPUT_FIELD,
  },
  open: {
    fontSize: 12,
    fontFamily: FONTS.MEDIUM,
    color: BASE_COLORS.TEXT_INPUT_FIELD,
    marginBottom: 10,
  },
  btnRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  directionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BASE_COLORS.TEXT_GRAY,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginRight: 8,
  },
  startBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BASE_COLORS.TEXT_GRAY,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  btnText: {
    color: BASE_COLORS.BLACK,
    fontSize: 12,
    fontFamily: FONTS.MEDIUM,
    marginLeft: 4,
  },
  startText: {
    color: BASE_COLORS.BLACK,
    fontSize: 12,
    fontFamily: FONTS.MEDIUM,
    marginLeft: 4,
  },
  imageRow: {
    flexDirection: 'row',
  },
  image: {
    width: 110,
    height: 120,
    borderRadius: 8,
    marginRight: 8,
  },
});
