import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Image,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { ICONS, IMAGES } from '../../../../utils/appAssets';
import BASE_COLORS from '../../../../utils/colors';

const API_KEY = '0GiMexe38wEi9Zune3D2tLLfE9QAavfM';
const { height } = Dimensions.get('window');

export default function AddGaragesScreen() {
  const [garages, setGarages] = useState([]);
  const dummyGarages = [
    {
      id: '1',
      name: 'AutoFix Garage',
      rating: 4.0,
      distance: '50m',
      timing: 'Open 9:00 AM - Close 11:00 PM',
    },
    {
      id: '2',
      name: 'Speedy Repairs',
      rating: 4.5,
      distance: '120m',
      timing: 'Open 8:00 AM - Close 10:00 PM',
    },
    {
      id: '3',
      name: 'Quick Auto Service',
      rating: 5.0,
      distance: '200m',
      timing: 'Open 10:00 AM - Close 8:00 PM',
    },
    {
      id: '4',
      name: 'Elite Motors',
      rating: 3.9,
      distance: '300m',
      timing: 'Open 24 Hours',
    },
  ];

  useEffect(() => {
    fetchGarages();
  }, []);

  const fetchGarages = async () => {
    try {
      const res = await fetch(
        `https://api.tomtom.com/search/2/poiSearch/garage.json?lat=37.6879&lon=-122.4702&radius=5000&limit=10&key=${API_KEY}`,
      );
      const data = await res.json();
      setGarages(data.results || []);
    } catch (err) {
      console.log('Error fetching garages:', err);
    }
  };

  const leafletHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <link rel="stylesheet" href="leaflet.css"/>
        <script src="leaflet.js"></script>
      <style>
        #map { height: 100%; width: 100%; }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
      <script>
        var map = L.map('map').setView([37.6879, -122.4702], 12);
        L.tileLayer('https://api.tomtom.com/map/1/tile/basic/main/{z}/{x}/{y}.png?key=${API_KEY}', {
          attribution: '© TomTom'
        }).addTo(map);
      </script>
    </body>
    </html>
  `;

  return (
    <SafeAreaView style={styles.container}>
      {/* Leaflet Map */}
      <WebView
        originWhitelist={['*']}
        source={{ html: leafletHTML }}
        style={styles.map}
      />
      <Text>WELLCOME</Text>
      {/* Garage List */}
      <View style={styles.listContainer}>
        <FlatList
          data={dummyGarages}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.garageCard}>
              <View style={styles.CardRow}>
                <View style={styles.garageCardRow}>
                  <Image
                    source={IMAGES.GARAGE_LOGO}
                    style={styles.garage_image}
                    resizeMode="contain"
                  />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.garageName}>{item.name}</Text>
                    <Text style={styles.rating}>
                      ⭐{' '}
                      {item.rating
                        ? item.rating.toFixed(1)
                        : (Math.random() * (5 - 3) + 3).toFixed(1)}{' '}
                      • 50m
                    </Text>
                  </View>
                </View>
                <Text style={styles.timing}>{item.timing}</Text>
              </View>

              <TouchableOpacity style={styles.addBtn}>
                <Image
                  source={ICONS.ADD_LOCATION}
                  style={styles.image}
                  resizeMode="contain"
                />
                <Text style={{ color: 'red' }}>Add Stop</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'yellow', height: 500 },
  map: { flex: 1, height: 500 },
  listContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: height * 0.45,
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 10,
  },
  garageCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  garageCardRow: {
    flexDirection: 'row',
    width: 200,
  },
  CardRow: {
    flexDirection: 'column',
  },
  garageName: {
    fontWeight: 'bold',
    fontSize: 12,
    color: BASE_COLORS.DARK_GRAY,
  },
  rating: { color: '#444', marginTop: 2 },
  timing: { color: '#666', fontSize: 12 },
  addBtn: { padding: 8, justifyContent: 'center', alignItems: 'center' },
  image: {
    width: 30,
    height: 30,
  },
  garage_image: {
    width: 50,
    height: 50,
  },
});
