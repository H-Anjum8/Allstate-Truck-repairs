import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Platform,
  Image,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { ICONS } from '../../../../utils/appAssets';
import BASE_COLORS from '../../../../utils/colors';
import { useNavigation } from '@react-navigation/native';
import WeatherModal from '../../../../components/modalComponents/WeatherModal';

const { height } = Dimensions.get('window');

// Your TomTom Key
const TOMTOM_API_KEY = '';

export default function MapScreen() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const services = [
    { name: 'Repair', icon: ICONS.REPAIR },
    { name: 'Parking', icon: ICONS.PARKING },
    { name: 'Truck Stops', icon: ICONS.TRUCK },
    { name: 'More', icon: ICONS.MORE },
  ];
  const dummyWeather = {
    current: { temp: 29, icon: 'sunny' },
    hourly: [
      { id: '1', time: 'Now', temp: 29, icon: 'sunny' },
      { id: '2', time: '1 PM', temp: 29, icon: 'sunny' },
      { id: '3', time: '2 PM', temp: 29, icon: 'sunny' },
      { id: '4', time: '3 PM', temp: 29, icon: 'sunny' },
      { id: '5', time: '4 PM', temp: 29, icon: 'sunny' },
    ],
  };
  const handlePress = (item, index) => {
    setSelected(index);

    if (item.name === 'More') {
      navigation.navigate('categories_screen');
    }
  };
  const mapHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Leaflet TomTom Map</title>
        <!-- Load from local assets -->
        <link rel="stylesheet" href="leaflet.css"/>
        <script src="leaflet.js"></script>
        <style>
          html, body, #map { margin:0; padding:0; width:100%; height:100%; }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script>
  // Init map without default zoom control
  const map = L.map('map', { zoomControl: false }).setView([43.6532, -79.3832], 6);

  // Add TomTom tiles
  L.tileLayer('https://api.tomtom.com/map/1/tile/basic/main/{z}/{x}/{y}.png?key=${TOMTOM_API_KEY}', {
    attribution: '© TomTom',
    maxZoom: 22
  }).addTo(map);

  // Add markers
  const places = [
     { coords: [43.6532, -79.3832], label: "Toronto" },
  { coords: [45.4215, -75.6972], label: "Ottawa" },
  { coords: [44.2312, -76.4860], label: "Kingston" },
  { coords: [46.8139, -71.2080], label: "Quebec City" },
  { coords: [49.2827, -123.1207], label: "Vancouver" },
  { coords: [51.0447, -114.0719], label: "Calgary" },
     
  ];
  places.forEach(p => L.marker(p.coords).addTo(map).bindPopup(p.label));
document.getElementById('map').style.backgroundColor = '#a0c4ff';
  // Add zoom control to right side
  L.control.zoom({ position: 'topright' }).addTo(map);
 
</script>

      </body>
    </html>
  `;

  return (
    <SafeAreaView style={styles.container}>
      {/* Service Filters */}

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.servicesRow}
      >
        {services.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.serviceBtn,
              selected === index && { backgroundColor: 'red' }, // highlight selected
            ]}
            onPress={() => handlePress(item, index)}
          >
            <Image source={item.icon} style={{ width: 14, height: 14 }} />
            <Text style={{ color: selected === index ? '#fff' : '#000' }}>
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {/* Map */}
      <View style={styles.mapContainer}>
        <WebView
          originWhitelist={['*']}
          source={{
            html: mapHtml,
            baseUrl:
              Platform.OS === 'android'
                ? 'file:///android_asset/' // Android local path
                : './assets/leaflet/', // iOS local path
          }}
          javaScriptEnabled
          domStorageEnabled
          style={styles.map}
        />

        <WeatherModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          weatherData={dummyWeather}
        />
        {/* weather button */}
        <TouchableOpacity
          style={styles.weatherBtn}
          onPress={() => setModalVisible(true)}
        >
          <Image source={ICONS.WEATHER} style={{ width: 20, height: 20 }} />
          <Text style={{ color: BASE_COLORS.BLACK, fontWeight: 'bold' }}>
            31
          </Text>
        </TouchableOpacity>
        {/* Emergency button */}
        <TouchableOpacity style={styles.emergencyBtn}>
          <Image source={ICONS.EMERGENCY} style={{ width: 50, height: 50 }} />
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Emergency</Text>
        </TouchableOpacity>

        {/* AI Copilot */}
        <View style={styles.mainaiBtn}>
          <TouchableOpacity style={styles.aiBtn}>
            <Image
              source={ICONS.COPILOT}
              style={{ width: '100%', height: 40, resizeMode: 'contain' }}
            />
          </TouchableOpacity>
          <Text style={{ color: BASE_COLORS.WHITE, fontWeight: 'bold' }}>
            AI Copilot
          </Text>
        </View>
      </View>

      {/* Start Trip Button */}
      <TouchableOpacity
        style={styles.tripBtn}
        onPress={() => navigation.navigate('addGarages_screen')}
      >
        <Text style={styles.tripBtnText}>Start Trip Planning</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  servicesRow: { marginVertical: 10, paddingHorizontal: 10 },
  serviceBtn: {
    flexDirection: 'row',
    gap: 4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: BASE_COLORS.GRAYIESH,
    marginRight: 10,
    borderRadius: 12,
  },
  mapContainer: {
    flex: 1,
    margin: 10,
    height: 420,
    backgroundColor: BASE_COLORS.BLACK,
    borderRadius: 12,
    overflow: 'hidden',
  },
  map: { flex: 1, backgroundColor: 'yellow' },
  weatherBtn: {
    flexDirection: 'row',
    position: 'absolute',
    gap: 6,
    left: 20,
    top: 10,
    padding: 5,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BASE_COLORS.WHITE,
  },
  emergencyBtn: {
    position: 'absolute',
    right: 8,
    top: 170,
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  mainaiBtn: {
    position: 'absolute',
    right: 20,
    bottom: 50,
  },
  aiBtn: {
    backgroundColor: BASE_COLORS.WHITE,
    borderColor: BASE_COLORS.SECONDARY,
    borderWidth: 3,
    padding: 10,
    width: 80,
    borderRadius: 8,
  },

  tripBtn: {
    position: 'absolute',
    left: 10,
    bottom: 20,
    backgroundColor: '#0a1b5b',
    padding: 15,
    margin: 10,
    borderRadius: 8,
  },
  tripBtnText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },

  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  navItem: { alignItems: 'center' },
  navText: { fontSize: 12, marginTop: 2 },
});
