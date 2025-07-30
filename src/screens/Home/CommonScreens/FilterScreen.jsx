import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
} from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { moderateScale } from 'react-native-size-matters';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BASE_COLORS from '../../../utils/colors';
import { useNavigation } from '@react-navigation/native';
import { FONTS } from '../../../theme/fonts';
import CustomButton from '../../../components/CustomButton';

const serviceTypes = [
  'Oil Change',
  'Brake Pad Replacement',
  'Battery Jumpstart',
  'Suspension Check',
  'Tire Replacement',
];

const FilterScreen = () => {
  const navigation = useNavigation();
  const [selectedServices, setSelectedServices] = useState([]);
  const [distance, setDistance] = useState(5);
  const [rating, setRating] = useState(4);
  const [showDiscounts, setShowDiscounts] = useState(true);
  const [range, setRange] = useState([5, 20]);

  const handleApplyFilter = () => {
    console.log({ selectedServices, range, rating, showDiscounts });
    navigation.navigate('filter_result');
  };

  const toggleService = service => {
    if (selectedServices.includes(service)) {
      setSelectedServices(prev => prev.filter(s => s !== service));
    } else {
      setSelectedServices(prev => [...prev, service]);
    }
  };

  const resetFilters = () => {
    setSelectedServices([]);
    setRange([5, 20]);
    setRating(4);
    setShowDiscounts(true);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={18} color={BASE_COLORS.BLACK} />
        </TouchableOpacity>
        <Text style={styles.title}>Filter</Text>
        <TouchableOpacity onPress={resetFilters}>
          <Text style={styles.reset}>Reset</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.card1}>
        <Text style={styles.sectionTitle}>Select Service Type</Text>
        <View style={styles.card}>
          <ScrollView
            style={{ maxHeight: 150 }} // adjust height as needed
            persistentScrollbar={true}
            showsVerticalScrollIndicator={true}
          >
            {serviceTypes.map(item => (
              <TouchableOpacity
                key={item}
                style={styles.radioContainer}
                onPress={() => toggleService(item)}
              >
                <View
                  style={[
                    styles.outerCircle,
                    selectedServices.includes(item) &&
                      styles.selectedOuterCircle,
                  ]}
                >
                  {selectedServices.includes(item) && (
                    <View style={styles.innerCircle} />
                  )}
                </View>
                <Text style={styles.radioLabel}>{item}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>

      <View style={styles.card1}>
        <Text style={styles.sectionTitle}>Distance (Radius from You)</Text>
        <View style={styles.sliderconatiner}>
          <MultiSlider
            values={range}
            min={0}
            max={50}
            step={1}
            onValuesChange={setRange}
            sliderLength={280}
            selectedStyle={{ backgroundColor: BASE_COLORS.PRIMARY }}
            unselectedStyle={{ backgroundColor: BASE_COLORS.BORDER_COLOR }}
            markerStyle={styles.marker}
            pressedMarkerStyle={styles.pressedMarker}
            containerStyle={styles.sliderContainer}
            trackStyle={styles.track}
            customLabel={() => null}
          />
          <View style={styles.labelRow}>
            <Text style={styles.labelText}>{range[0]}km</Text>
            <Text style={styles.labelText}>{range[1]}km</Text>
          </View>
        </View>
      </View>
      <View style={styles.card1}>
        <Text style={styles.sectionTitle}>Minimum Rating</Text>
        <View style={styles.ratingconatiner}>
          <View style={styles.starRow}>
            {[1, 2, 3, 4, 5].map(i => (
              <TouchableOpacity key={i} onPress={() => setRating(i)}>
                <FontAwesome
                  name={i <= rating ? 'star' : 'star-o'}
                  size={30}
                  color="#FFA500"
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      <View style={styles.card1}>
        <Text style={styles.sectionTitle}>Promotion</Text>
        <View style={styles.promotionconatiner}>
          <View style={styles.switchRow}>
            <Text>Only Show Discounts</Text>
            <Switch
              value={showDiscounts}
              onValueChange={value => setShowDiscounts(value)}
              thumbColor={showDiscounts ? '#fff' : '#f4f3f4'}
              trackColor={{
                false: BASE_COLORS.GRAY,
                true: BASE_COLORS.PRIMARY,
              }}
            />
          </View>
        </View>
      </View>
      <CustomButton
        label="Apply Filter"
        onPress={handleApplyFilter}
        style={{ marginHorizontal: 3, marginTop: 20, height: 56 }}
        textStyle={{ fontSize: 12 }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 6,
    padding: 16,
    marginTop: 16,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 18,
    fontFamily: FONTS.MEDIUM,
  },
  backButton: {
    padding: 4,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: BASE_COLORS.BLACK,
  },
  reset: {
    fontSize: 12,
    color: BASE_COLORS.BLACK,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 13,
    marginTop: 8,
    fontFamily: FONTS.BOLD,
    marginBottom: 6,
  },
  card: {
    backgroundColor: BASE_COLORS.TABLE_BACKGROUND,
    borderTopWidth: 1,
    borderColor: BASE_COLORS.BORDER_COLOR,
    borderRadius: 10,
    paddingTop: 16,
    marginVertical: 2,
  },
  sliderconatiner: {
    backgroundColor: BASE_COLORS.TABLE_BACKGROUND,
    borderTopWidth: 1,
    borderColor: BASE_COLORS.BORDER_COLOR,
    borderRadius: 10,
    paddingTop: 6,
    marginVertical: 2,

    paddingBottom: 8,
  },
  card1: {
    backgroundColor: BASE_COLORS.TABLE_BACKGROUND,
    borderWidth: 1,
    borderColor: BASE_COLORS.BORDER_COLOR,
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  outerCircle: {
    height: 14,
    width: 14,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: BASE_COLORS.GRAY,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  selectedOuterCircle: {
    borderColor: BASE_COLORS.BLACK,
  },
  innerCircle: {
    height: 8,
    width: 8,
    borderRadius: 5,
    backgroundColor: BASE_COLORS.BLACK,
  },
  radioLabel: {
    fontSize: 10,
  },
  distanceValue: {
    alignSelf: 'flex-end',
    marginBottom: 8,
    color: BASE_COLORS.BLACK,
  },
  ratingconatiner: {
    backgroundColor: BASE_COLORS.TABLE_BACKGROUND,
    borderTopWidth: 1,
    borderColor: BASE_COLORS.BORDER_COLOR,
    borderRadius: 10,
    paddingTop: 20,
    paddingBottom: 6,
    marginVertical: 2,
  },
  promotionconatiner: {
    backgroundColor: BASE_COLORS.TABLE_BACKGROUND,
    borderTopWidth: 1,
    borderColor: BASE_COLORS.BORDER_COLOR,
    borderRadius: 10,
    paddingTop: 20,
    paddingBottom: 6,
    marginVertical: 2,
  },
  starRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  applyButton: {
    backgroundColor: 'red',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  applyText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  sliderContainer: {
    height: 35,
    marginBottom: 4,
  },
  track: {
    borderRadius: 2,
  },
  marker: {
    height: 12,
    width: 12,
    borderRadius: 8,
    backgroundColor: BASE_COLORS.PRIMARY,
    borderWidth: 2,
    borderColor: BASE_COLORS.PRIMARY,
  },
  pressedMarker: {
    height: 2,
    width: 20,
    borderRadius: 10,
    backgroundColor: BASE_COLORS.PRIMARY,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    paddingHorizontal: 8,
    marginTop: -12,
  },
  labelText: {
    fontFamily: FONTS.MEDIUM,
    fontSize: moderateScale(10),
    color: BASE_COLORS.BLACK,
  },
});

export default FilterScreen;
