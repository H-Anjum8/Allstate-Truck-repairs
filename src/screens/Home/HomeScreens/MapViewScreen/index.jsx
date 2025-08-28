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
import GarageModal from '../../../../components/modalComponents/GarageModal';
import CopilotModal from '../../../../components/modalComponents/CopilotModal';
import { all_services, dummyWeather } from '../../../../utils/staticData';
import FuleModal from '../../../../components/modalComponents/FuleModal';

const { height } = Dimensions.get('window');

// Your TomTom Key
const TOMTOM_API_KEY = 'mmOuOHPaeu4UIxzUcftugBPAPBkzYVE5';

export default function MapScreen() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [garageModal, setGarageModal] = useState(false);
  const [fuelModal, setFuelModal] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);

  // 👇 serviceType extended
  const [serviceType, setServiceType] = useState(null); // null = show all

  const handlePress = (item, index) => {
    setSelected(index);

    if (item.name === 'More') {
      navigation.navigate('categories_screen');
    } else if (item.name === 'Fuel Station') {
      setServiceType('Fuel');
    } else if (item.name === 'Repair') {
      setServiceType('Repair');
    } else if (item.name === 'Parking') {
      setServiceType('Parking');
    } else if (item.name === 'Truck Stop') {
      setServiceType('TruckStop');
    }
  };

  // 🚗 Data Sets
  const garagePlaces = [
    { coords: [43.6532, -79.3832], label: 'Toronto Garage', type: 'Repair' },
    { coords: [45.4215, -75.6972], label: 'Ottawa Garage', type: 'Repair' },
    { coords: [44.2312, -76.486], label: 'Kingston Garage', type: 'Repair' },
  ];

  const fuelStations = [
    {
      coords: [43.7001, -79.4163],
      label: 'Toronto Fuel Station',
      type: 'Fuel',
    },
    {
      coords: [45.5017, -73.5673],
      label: 'Montreal Fuel Station',
      type: 'Fuel',
    },
  ];

  const parkingSpots = [
    {
      coords: [43.65107, -79.347015],
      label: 'Toronto Parking',
      type: 'Parking',
    },
    { coords: [45.4215, -75.6972], label: 'Ottawa Parking', type: 'Parking' },
  ];

  const truckStops = [
    { coords: [44.6488, -63.5752], label: 'Halifax Hotel', type: 'TruckStop' },
    {
      coords: [49.2827, -123.1207],
      label: 'Vancouver Hotel',
      type: 'TruckStop',
    },

    // ✅ Added more truck stop locations
    {
      coords: [43.6532, -79.3832],
      label: 'Toronto Truck Stop',
      type: 'TruckStop',
    },
    {
      coords: [45.4215, -75.6972],
      label: 'Ottawa Truck Plaza',
      type: 'TruckStop',
    },
    {
      coords: [51.0447, -114.0719],
      label: 'Calgary Roadhouse',
      type: 'TruckStop',
    },
    {
      coords: [53.5461, -113.4938],
      label: 'Edmonton Rest Stop',
      type: 'TruckStop',
    },
    {
      coords: [46.8139, -71.208],
      label: 'Quebec City Truck Inn',
      type: 'TruckStop',
    },
  ];

  // 🔀 Logic: choose dataset
  let placesToShow = [];
  if (serviceType === 'Fuel') {
    placesToShow = fuelStations;
  } else if (serviceType === 'Repair') {
    placesToShow = garagePlaces;
  } else if (serviceType === 'Parking') {
    placesToShow = parkingSpots;
  } else if (serviceType === 'TruckStop') {
    placesToShow = truckStops;
  } else {
    // default all together
    placesToShow = [
      ...fuelStations,
      ...garagePlaces,
      ...parkingSpots,
      ...truckStops,
    ];
  }

  const mapHtml = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Leaflet TomTom Map</title>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
      <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
      <style>
        html, body, #map { margin:0; padding:0; width:100%; height:100%; }
        .leaflet-control-zoom {
          margin-bottom: 84px !important;
          margin-right: 20px;
        }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script>
        const map = L.map('map', { zoomControl: false, attributionControl: false })
          .setView([43.6532, -79.3832], 5);

        L.tileLayer('https://api.tomtom.com/map/1/tile/basic/night/{z}/{x}/{y}.png?key=${TOMTOM_API_KEY}', {
          attribution: '© TomTom',
          maxZoom: 22
        }).addTo(map);

        // icons
        const icons = {
          Fuel: new L.Icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
            shadowUrl: 'https://unpkg.com/leaflet/dist/images/marker-shadow.png',
            iconSize:[25,41], iconAnchor:[12,41]
          }),
          Repair: new L.Icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
            shadowUrl: 'https://unpkg.com/leaflet/dist/images/marker-shadow.png',
            iconSize:[25,41], iconAnchor:[12,41]
          }),
          Parking: new L.Icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-yellow.png',
            shadowUrl: 'https://unpkg.com/leaflet/dist/images/marker-shadow.png',
            iconSize:[25,41], iconAnchor:[12,41]
          }),
          TruckStop: new L.Icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-violet.png',
            shadowUrl: 'https://unpkg.com/leaflet/dist/images/marker-shadow.png',
            iconSize:[25,41], iconAnchor:[12,41]
          })
        };

        const places = ${JSON.stringify(placesToShow)};

        // Render markers and send both label and type back to RN
        places.forEach(p => {
          const iconType = p.type || 'Repair';
          L.marker(p.coords, { icon: icons[iconType], title: p.label })
            .addTo(map)
            .bindPopup(p.label)
            .on('click', () => {
              if (window.ReactNativeWebView && window.ReactNativeWebView.postMessage) {
                // send JSON string with label and type
                window.ReactNativeWebView.postMessage(JSON.stringify({
                  label: p.label,
                  type: p.type || null
                }));
              }
            });
        });

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
          source={{ html: mapHtml }}
          javaScriptEnabled
          domStorageEnabled
          style={styles.map}
          onMessage={event => {
            const data = JSON.parse(event.nativeEvent.data);

            // Always store label
            setSelectedMarker(data.label);

            // Show card only for Fuel & Repair
            if (data.type === 'Repair') {
              setGarageModal(true); // open garage modal
              setFuelModal(false);
            } else if (data.type === 'Fuel') {
              setFuelModal(true); // open fuel modal
              setGarageModal(false);
            } else {
              setGarageModal(false);
              setFuelModal(false);
            }
          }}
        />

        {/* Service Filters */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.servicesRow}
        >
          {all_services.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.serviceBtn,
                selected === index && { backgroundColor: 'red' },
              ]}
              onPress={() => handlePress(item, index)}
            >
              <Image
                source={item.icon}
                style={{ width: 14, height: 14, resizeMode: 'contain' }}
              />
              <Text
                style={{
                  color:
                    selected === index ? BASE_COLORS.WHITE : BASE_COLORS.BLACK,
                  fontSize: 11,
                }}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Modals */}
        <WeatherModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          weatherData={dummyWeather}
        />
        <GarageModal
          visible={garageModal}
          onClose={() => setGarageModal(false)}
          title={selectedMarker || 'Garage'}
          buttonLabel="Book Now"
          onButtonPress={() => console.log('Booking...')}
        />

        <FuleModal
          visible={fuelModal}
          onClose={() => setFuelModal(false)}
          title={selectedMarker || 'Fuel'}
          buttonLabel="Book Now"
          onButtonPress={() => console.log('Booking...')}
        />
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

        {/* Emergency */}
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

        {/* Copilot */}
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
          <Text
            style={{
              color: BASE_COLORS.WHITE,
              fontWeight: 'bold',
              fontSize: 10,
            }}
          >
            AI Copilot
          </Text>
        </View>
        <CopilotModal
          visible={visible}
          onClose={() => setVisible(false)}
          message="Open Doug's garage Screen..."
        />
      </View>

      {/* Start Trip */}
      <TouchableOpacity
        style={styles.tripBtn}
        onPress={() => navigation.navigate('trip_planning')}
      >
        <Text style={styles.tripBtnText}>Start Trip Planning</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

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
    top: 54,
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
});
