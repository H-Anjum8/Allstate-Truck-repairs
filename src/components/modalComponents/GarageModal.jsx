import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  SafeAreaView,
} from 'react-native';
import BASE_COLORS from '../../utils/colors';
import { FONTS } from '../../theme/fonts';
import ServiceCard from '../DashboardComponents/ServiceCard';
import { reviews, services } from '../../utils/staticData';
import CustomRating from '../CustomRating/CustomRating';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from '../CustomButton';
import { ICONS, IMAGES } from '../../utils/appAssets';
import { useNavigation } from '@react-navigation/native';
const GarageModal = ({
  visible,
  onClose,
  title,
  children,
  buttonLabel,
  onButtonPress,
}) => {
  const navigation = useNavigation();
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
            {/* Header */}
            <View style={styles.modalHeader}>
              <SafeAreaView style={styles.safeArea}>
                <View style={styles.verifiedContainer}>
                  <Image source={IMAGES.GARAGE_LOGO} style={styles.logo} />
                  <Text style={styles.name}>{title}</Text>
                  <Image source={ICONS.VERIFY} style={styles.verify_logo} />
                </View>
                <View style={styles.container}>
                  {/* Rating + Reviews + Time */}
                  <View style={styles.row}>
                    <Text style={styles.rating}>4.9</Text>
                    <Ionicons
                      name="star"
                      size={14}
                      color="#FFD700"
                      style={{ marginLeft: 4 }}
                    />
                    <Text style={styles.reviews}>(3,199)</Text>
                    <Ionicons
                      name="car-outline"
                      size={16}
                      color={BASE_COLORS.BLACK}
                      style={{ marginLeft: 8 }}
                    />
                    <Text style={styles.time}>4 mins</Text>
                  </View>
                  <Text style={{ color: BASE_COLORS.GRAY, fontWeight: '600' }}>
                    Garage
                  </Text>
                  {/* Status */}
                  <Text style={styles.status}>
                    <Text style={{ color: 'red', fontWeight: '600' }}>
                      Closed
                    </Text>
                    <Text> . Opens 3pm</Text>
                  </Text>

                  {/* Action Buttons */}
                  <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.button}>
                      <Image
                        source={ICONS.DIRECTION}
                        style={styles.verify_logo}
                      />
                      <Text style={styles.buttonText}>Direction</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button}>
                      <Image source={ICONS.START} style={styles.verify_logo} />
                      <Text style={styles.buttonText}>Start</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </SafeAreaView>

              <TouchableOpacity onPress={onClose}>
                <Text style={styles.closeBtn}>X</Text>
              </TouchableOpacity>
            </View>

            {/* Custom Content */}
            {/* garage description  */}
            <View style={styles.container}>
              <Text style={styles.heading}>Description</Text>
              <Text style={styles.text}>
                Doug's Roadside Garage offers fast, reliable, and certified
                roadside repair services for commercial trucks and trailers.
              </Text>
            </View>
            {/* Services  */}
            <View style={styles.container1}>
              <Text style={styles.heading}>Services</Text>
              <View style={styles.grid}>
                {services.map((s, i) => (
                  <ServiceCard
                    key={i}
                    title={s.title}
                    time={s.time}
                    price={s.price}
                    originalPrice={s.originalPrice}
                    discounted={s.discounted}
                  />
                ))}
              </View>
            </View>
            {/* Rating  */}
            <View>
              <Text style={styles.sectionTitle}>Rating & Reviews</Text>
              <View style={styles.ratingRow}>
                <Text style={styles.ratingValue}>4.9</Text>
                {[...Array(5)].map((_, i) => (
                  <Ionicons
                    key={i}
                    name={i < 4 ? 'star' : 'star-outline'}
                    size={16}
                    color="#FFA500"
                  />
                ))}
              </View>

              {reviews.map((item, index) => (
                <CustomRating key={index} {...item} />
              ))}
              <CustomButton
                label="Book Now"
                onPress={() => navigation.navigate('service_selection')}
                style={{ marginHorizontal: 3, marginTop: 14, height: 56 }}
                textStyle={{ fontSize: 12 }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
};

export default GarageModal;

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
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  closeBtn: {
    fontSize: 16,
    color: 'red',
  },
  content: {
    marginVertical: 12,
  },
  bookBtn: {
    backgroundColor: 'blue',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  bookBtnText: {
    color: 'white',
    fontWeight: 'bold',
  },
  container: { marginTop: 18 },

  container1: { marginTop: 10 },
  heading: {
    fontWeight: 'bold',
    fontSize: 14,
    fontFamily: FONTS.BOLD,
  },
  text: { fontSize: 10.5, marginTop: 4, color: BASE_COLORS.TEXT_TERNARY },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
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
});
