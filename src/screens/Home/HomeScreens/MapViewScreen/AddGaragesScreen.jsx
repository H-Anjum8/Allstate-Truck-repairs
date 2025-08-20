import React, { useEffect, useState, useRef } from 'react';
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
import { useNavigation } from '@react-navigation/native';
import { ICONS, IMAGES } from '../../../../utils/appAssets';
import BASE_COLORS from '../../../../utils/colors';

const API_KEY = '0GiMexe38wEi9Zune3D2tLLfE9QAavfM';
const { height } = Dimensions.get('window');

export default function AddGaragesScreen() {
  const [garages, setGarages] = useState([]);
  const webViewRef = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    fetchGarages();
  }, []);

  const fetchGarages = async () => {
    try {
      const res = await fetch(
        `https://api.tomtom.com/search/2/poiSearch/garage.json?lat=37.6879&lon=-122.4702&radius=5000&limit=10&key=${API_KEY}`,
      );
      const data = await res.json();
      const garagesList = data.results.map(g => ({
        id: g.id,
        name: g.poi.name,
        lat: g.position.lat,
        lon: g.position.lon,
        distance: g.dist ? `${Math.round(g.dist)}m` : 'N/A',
        timing: 'Open 9:00 AM - Close 9:00 PM',
      }));
      setGarages(garagesList);
    } catch (err) {
      console.log('Error fetching garages:', err);
    }
  };

  const handleCardPress = garage => {
    // Highlight marker on map
    const jsCode = `
      garages.forEach(g => {
        if(g.id === "${garage.id}") {
          g.marker.setIcon(L.icon({iconUrl: 'https://maps.gstatic.com/mapfiles/ms2/micons/blue.png', iconSize: [30, 30]}));
          g.marker.openPopup();
        } else {
          g.marker.setIcon(L.icon({iconUrl: 'https://maps.gstatic.com/mapfiles/ms2/micons/red.png', iconSize: [25, 25]}));
        }
      });
      true;
    `;
    webViewRef.current.injectJavaScript(jsCode);
  };

  const handleAddStop = garage => {
    // Navigate to another screen and pass garage location
    navigation.navigate('trip_planning', {
      garageName: garage.name,
      latitude: garage.lat,
      longitude: garage.lon,
    });
  };

  const leafletHTML = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
        <style>
          #map { height: 100%; width: 100%; margin:0; padding:0;}
          html, body {height:100%; margin:0; padding:0;}
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script>
          var garages = ${JSON.stringify(
            garages.map(g => ({ ...g, marker: null })),
          )};
          var map = L.map('map').setView([37.6879, -122.4702], 14);

          L.tileLayer('https://api.tomtom.com/map/1/tile/basic/night/{z}/{x}/{y}.png?key=${API_KEY}', {
            attribution: '© TomTom'
          }).addTo(map);

          garages.forEach(function(g) {
            g.marker = L.marker([g.lat, g.lon], {
              icon: L.icon({iconUrl: 'https://maps.gstatic.com/mapfiles/ms2/micons/red.png', iconSize: [25, 25]})
            }).addTo(map)
            .bindPopup(g.name);
          });
        </script>
      </body>
    </html>
  `;

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        ref={webViewRef}
        originWhitelist={['*']}
        source={{ html: leafletHTML }}
        style={styles.map}
      />

      <View style={styles.listContainer}>
        <FlatList
          data={garages}
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
                    <Text style={styles.rating}>⭐ 4.0 • {item.distance}</Text>
                  </View>
                </View>
                <Text style={styles.timing}>{item.timing}</Text>
              </View>

              <TouchableOpacity
                style={styles.addBtn}
                onPress={() => handleAddStop(item)}
              >
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
    height: height * 0.5,
    backgroundColor: BASE_COLORS.WHITE,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 18,
  },
  garageCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 4,
    borderBottomColor: BASE_COLORS.LIGHT_GRAY,
  },
  garageCardRow: { flexDirection: 'row', width: 200 },
  CardRow: { flexDirection: 'column' },
  garageName: { fontWeight: 'bold', fontSize: 11, color: BASE_COLORS.GRAY },
  rating: { color: BASE_COLORS.GRAY, fontSize: 10 },
  timing: { color: BASE_COLORS.GRAY, fontSize: 10 },
  addBtn: { padding: 8, justifyContent: 'center', alignItems: 'center' },
  image: { width: 20, height: 20 },
  garage_image: { width: 40, height: 40 },
});
