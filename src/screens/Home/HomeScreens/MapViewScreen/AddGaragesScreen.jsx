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
import { useSelector } from 'react-redux';

const API_KEY = 'mmOuOHPaeu4UIxzUcftugBPAPBkzYVE5';
const { height } = Dimensions.get('window');

export default function AddGaragesScreen() {
  const [garages, setGarages] = useState([]);
  const webViewRef = useRef(null);
  const navigation = useNavigation();
  const { start, destination, origin } = useSelector(state => state.location);
  const [startCoords, setStartCoords] = useState(null);
  const [destCoords, setDestCoords] = useState(null);

  useEffect(() => {
    if (start && destination) fetchData();
  }, [start, destination]);

  const fetchData = async () => {
    try {
      const geoRes = await fetch(
        `https://api.tomtom.com/search/2/geocode/${encodeURIComponent(
          start,
        )}.json?key=${API_KEY}&limit=1`,
      );
      const geoData = await geoRes.json();
      const startLat = geoData.results[0].position.lat;
      const startLon = geoData.results[0].position.lon;
      setStartCoords([startLat, startLon]);

      const destRes = await fetch(
        `https://api.tomtom.com/search/2/geocode/${encodeURIComponent(
          destination,
        )}.json?key=${API_KEY}&limit=1`,
      );
      const destData = await destRes.json();
      const destLat = destData.results[0].position.lat;
      const destLon = destData.results[0].position.lon;
      setDestCoords([destLat, destLon]);

      const res = await fetch(
        `https://api.tomtom.com/search/2/poiSearch/garage.json?lat=${startLat}&lon=${startLon}&radius=5000&limit=10&key=${API_KEY}`,
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

  const handleAddStop = garage => {
    const params = {
      garageLat: garage.lat,
      garageLon: garage.lon,
      garageName: garage.name,
      startLoc: start,
      destLoc: destination,
    };

    if (origin === 'fleet_trip_planning') {
      navigation.navigate('fleet_trip_planning', params);
    } else {
      navigation.navigate('trip_planning', params);
    }
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
        const API_KEY = "${API_KEY}";
        const garages = ${JSON.stringify(garages)};

        const map = L.map('map').setView([43.6532, -79.3832], 6);

        L.tileLayer('https://api.tomtom.com/map/1/tile/basic/night/{z}/{x}/{y}.png?key=' + API_KEY, {
          attribution: '© TomTom'
        }).addTo(map);

        const garageIcon = L.icon({iconUrl: 'https://maps.gstatic.com/mapfiles/ms2/micons/blue.png', iconSize: [30,30]});

        garages.forEach(g => {
          L.marker([g.lat, g.lon], {icon: garageIcon})
           .addTo(map)
           .bindPopup(g.name);
        });

        // Fit map to all garage markers
        if(garages.length > 0){
          const group = new L.featureGroup(garages.map(g => L.marker([g.lat, g.lon])));
          map.fitBounds(group.getBounds().pad(0.2));
        }
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
  container: { flex: 1, backgroundColor: BASE_COLORS.WHITE },
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
