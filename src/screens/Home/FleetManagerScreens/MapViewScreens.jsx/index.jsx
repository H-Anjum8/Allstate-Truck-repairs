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
import CopilotModal from '../../../../components/modalComponents/CopilotModal';
import { dummyWeather } from '../../../../utils/staticData';

const { height } = Dimensions.get('window');

// Your TomTom Key
const TOMTOM_API_KEY = 'mmOuOHPaeu4UIxzUcftugBPAPBkzYVE5';

const MapView = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const [visible, setVisible] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null); // 👈 hold clicked marker

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
  <link rel="stylesheet" href="leaflet.css"/>       
  <script src="leaflet.js"></script>       
  <style>         
    html, body, #map { margin:0; padding:0; width:100%; height:100%; }            

    .leaflet-control-zoom {           
      margin-bottom: 84px !important;           
      margin-right: 20px;         
    }            

    /* popup/label style */         
    .marker-label {           
      background:#fff;           
      padding:2px 6px;           
      border-radius:6px;           
      font-size:12px;           
      font-weight:bold;           
      border:1px solid #333;           
      white-space:nowrap;         
    }       
  </style>     
</head>     
<body>       
  <div id="map"></div>       
  <script>         
    // Init map without default zoom control         
    const map = L.map('map', { zoomControl: false, attributionControl: false }).setView([43.6532, -79.3832], 6);            

    // Add TomTom tiles         
    L.tileLayer('https://api.tomtom.com/map/1/tile/basic/night/{z}/{x}/{y}.png?key=${TOMTOM_API_KEY}', {           
      attribution: '© TomTom',           
      maxZoom: 22         
    }).addTo(map);            

    // Add markers         
    const places = [           
      { coords: [43.6532, -79.3832], label: "Toronto Garage" },           
      { coords: [45.4215, -75.6972], label: "Ottawa Garage" },           
      { coords: [44.2312, -76.4860], label: "Kingston Garage" },           
      { coords: [46.8139, -71.2080], label: "Quebec City Garage" },           
      { coords: [49.2827, -123.1207], label: "Vancouver Garage" },           
      { coords: [51.0447, -114.0719], label: "Calgary Garage" },         
    ];            

    // 🚗 CHANGE HERE: replaced location pin with car icons
    const defaultIcon = new L.Icon({           
      iconUrl: 'https://cdn-icons-png.flaticon.com/512/744/744465.png', // car icon
      iconSize: [32, 32], // adjusted size for car
      iconAnchor: [16, 32], 
      popupAnchor: [0, -28],           
      className: "marker-car-red"         
    });            

    const selectedIcon = new L.Icon({           
      iconUrl: 'https://cdn-icons-png.flaticon.com/512/744/744465.png', // green car icon
      iconSize: [32, 32], 
      iconAnchor: [16, 32], 
      popupAnchor: [0, -28],           
      className: "marker-car-green"         
    });            
    // 🚗 END CHANGE

    let selectedMarker = null;            

    places.forEach(p => {           
      const marker = L.marker(p.coords, { icon: defaultIcon, title: p.label }).addTo(map).bindPopup(p.label);              

      marker.on('click', function() {             
        // reset old selected marker             
        if (selectedMarker) {               
          selectedMarker.setIcon(defaultIcon);             
        }                

        // set new selected             
        marker.setIcon(selectedIcon);             
        selectedMarker = marker;                

        // send name back to React Native             
        if (window.ReactNativeWebView && window.ReactNativeWebView.postMessage) {               
          window.ReactNativeWebView.postMessage(p.label);             
        } else {               
          console.log("ReactNativeWebView not ready");             
        }           
      });         
    });            

    // Add zoom control to right side         
    L.control.zoom({ position: 'bottomright' }).addTo(map);       
  </script>     
</body>   
</html>   
`;

  return (
    <SafeAreaView style={styles.container}>
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
          <Image source={ICONS.WEATHER} style={{ width: 16, height: 16 }} />
          <Text
            style={{
              color: BASE_COLORS.BLACK,
              fontWeight: 'bold',
              fontSize: 10,
            }}
          >
            31
          </Text>
        </TouchableOpacity>
        {/* Emergency button */}
        <TouchableOpacity
          style={styles.emergencyBtn}
          onPress={() => navigation.navigate('emergency_services')}
        >
          <Image source={ICONS.EMERGENCY} style={{ width: 30, height: 30 }} />
          <Text
            style={{
              color: BASE_COLORS.WHITE,
              fontWeight: 'bold',
              fontSize: 10,
            }}
          >
            Emergency
          </Text>
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
      </View>

      {/* Start Trip Button */}
      <TouchableOpacity
        style={styles.tripBtn}
        onPress={() => navigation.navigate('trip_planning')}
      >
        <Text style={styles.tripBtnText}>Start Trip Planning</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default MapView;
const styles = StyleSheet.create({
  container: { flex: 1 },

  servicesRow: {
    marginVertical: 0,
    paddingHorizontal: 10,
    position: 'absolute',
    left: 2,
    top: 16,
  },
  serviceBtn: {
    flexDirection: 'row',
    gap: 4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 5,
    backgroundColor: BASE_COLORS.GRAYIESH,
    marginRight: 6,
    borderRadius: 10,
  },
  mapContainer: {
    flex: 1,
    margin: 10,
    height: 530,
    backgroundColor: BASE_COLORS.BLACK,
    borderRadius: 12,
    overflow: 'hidden',
  },
  map: { flex: 1 },
  weatherBtn: {
    flexDirection: 'row',
    position: 'absolute',
    gap: 6,
    left: 13,
    top: 20,
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BASE_COLORS.WHITE,
  },
  emergencyBtn: {
    position: 'absolute',
    right: 0,
    bottom: 150,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  mainaiBtn: {
    position: 'absolute',
    right: 10,
    bottom: 4,
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

  tripBtn: {
    position: 'absolute',
    left: 10,
    bottom: 20,
    backgroundColor: BASE_COLORS.PRIMARY,
    paddingVertical: 15,
    paddingHorizontal: 20,
    margin: 10,
    borderRadius: 8,
  },
  tripBtnText: {
    color: BASE_COLORS.WHITE,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 11,
  },

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
  // 🔽 Modal Styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  bottomSheet: {
    height: height * 0.65,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  card: {
    backgroundColor: BASE_COLORS.WHITE,
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
  },
});
