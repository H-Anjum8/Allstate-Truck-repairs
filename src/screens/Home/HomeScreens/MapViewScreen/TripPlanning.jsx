import { useNavigation } from '@react-navigation/native';
import React, { useMemo, useRef, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import { WebView } from 'react-native-webview';

/**
 * 🔑 Replace with your TomTom API key
 */
const API_KEY = '0GiMexe38wEi9Zune3D2tLLfE9QAavfM';

export default function TripPlanning() {
  const navigation = useNavigation();
  const webRef = useRef(null);
  const [start, setStart] = useState('Toronto, Ontario');
  const [destination, setDestination] = useState('Winnipeg, Manitoba');
  const [activeTab, setActiveTab] = useState(0); // 0 -> Route A, 1 -> Route B
  const [routeSummaries, setRouteSummaries] = useState([]);

  const onMessage = e => {
    try {
      const msg = JSON.parse(e.nativeEvent.data);
      if (msg.type === 'ROUTE_SUMMARIES') {
        setRouteSummaries(msg.payload || []);
      }
      if (msg.type === 'ERROR') {
        console.warn('WebView Error:', msg.payload);
      }
    } catch (err) {
      // ignore
    }
  };

  const computeRoute = () => {
    const payload = {
      type: 'SET_ROUTE',
      payload: { start, destination, stops: [] },
    };
    webRef.current?.postMessage(JSON.stringify(payload));
  };

  const selectRoute = idx => {
    setActiveTab(idx);
    webRef.current?.postMessage(
      JSON.stringify({ type: 'SELECT_ROUTE', payload: { index: idx } }),
    );
  };

  const leafletHTML = useMemo(() => getLeafletHTML(API_KEY), []);

  const activeSummary = routeSummaries[activeTab];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Trip Planning</Text>
      </View>

      {/* Search Inputs */}
      <View style={styles.inputCard}>
        <TextInput
          style={styles.input}
          placeholder="Start Location"
          value={start}
          onChangeText={setStart}
          placeholderTextColor="#9aa0a6"
        />
        <TextInput
          style={[styles.input, { marginTop: 8 }]}
          placeholder="Destination Location"
          value={destination}
          onChangeText={setDestination}
          placeholderTextColor="#9aa0a6"
        />
        <TouchableOpacity
          style={styles.addStopBtn}
          onPress={() => navigation.navigate('addStops_screen')}
        >
          <Text style={styles.addStopText}>Add Stops</Text>
        </TouchableOpacity>
      </View>

      {/* Map (Leaflet in WebView) */}
      <View style={styles.mapWrap}>
        <WebView
          ref={webRef}
          originWhitelist={['*']}
          source={{ html: leafletHTML }}
          onMessage={onMessage}
          allowFileAccess
          allowUniversalAccessFromFileURLs
          javaScriptEnabled
          domStorageEnabled
        />
      </View>

      {/* Route Tabs */}
      <View style={styles.tabsWrap}>
        <TouchableOpacity
          onPress={() => selectRoute(0)}
          style={[styles.tabBtn, activeTab === 0 && styles.tabBtnActive]}
        >
          <Text
            style={[styles.tabText, activeTab === 0 && styles.tabTextActive]}
          >
            Route A
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => selectRoute(1)}
          style={[styles.tabBtn, activeTab === 1 && styles.tabBtnActive]}
        >
          <Text
            style={[styles.tabText, activeTab === 1 && styles.tabTextActive]}
          >
            Route B
          </Text>
        </TouchableOpacity>
      </View>

      {/* Route Info Card */}
      <ScrollView
        style={styles.infoCard}
        contentContainerStyle={{ paddingBottom: 8 }}
      >
        {activeSummary ? (
          <>
            <InfoRow
              label="Distance"
              value={`${km(activeSummary.lengthInMeters)} km | ${miles(
                activeSummary.lengthInMeters,
              )} miles`}
            />
            <InfoRow
              label="Estimated Time"
              value={`${hours(activeSummary.travelTimeInSeconds)} hrs`}
            />
            <InfoRow label="Fuel Required" value="77–120 liters" />
            <InfoRow label="Fuel Cost" value="$100 – $150 CAD" />
            <InfoRow label="High Toll Zones" value="—" />
            <InfoRow label="Low Toll Zones" value="—" />
            <InfoRow label="Toll Fees Total" value="$120 – $150 CAD" />
            <InfoRow
              label="Route Type"
              value={
                activeSummary.routeType ||
                'Highway 401 + Trans-Canada Hwy (ON-17)'
              }
            />
            <InfoRow label="Stops (Weigh / Rest)" value="4" />
          </>
        ) : (
          <Text style={styles.noData}>No route yet</Text>
        )}
      </ScrollView>

      {/* Bottom CTA */}
      <TouchableOpacity style={styles.cta} onPress={computeRoute}>
        <Text style={styles.ctaText}>Start & Navigate</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const InfoRow = ({ label, value }) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

// ===== Helpers =====
const km = m => (m / 1000).toFixed(1);
const miles = m => (m / 1609.344).toFixed(1);
const hours = s => (s / 3600).toFixed(1);

// ===== Embedded Leaflet HTML (TomTom tiles + Routing + Garages) =====
function getLeafletHTML(API_KEY) {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <style>
        html, body, #map { height: 100%; margin: 0; padding: 0; }
        // .leaflet-container { background: #0f1115; }
        .garage-popup {
          font-size: 14px;
          font-weight: 600;
          color: #1f2937;
          padding: 4px 6px;
        }
          .garage-label {
  background: #ffffff;
  color: #111827;
  font-size: 13px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 2px rgba(0,0,0,0.15);
}
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
      <script>
        const API_KEY = ${JSON.stringify(API_KEY)};
        const RN_BRIDGE = window.ReactNativeWebView;

        const map = L.map('map', { zoomControl: false }).setView([43.6532, -79.3832], 6);
      
       L.tileLayer('https://{s}.api.tomtom.com/map/1/tile/basic/night/{z}/{x}/{y}.png?key=' + API_KEY, {
  subdomains: 'abcd',
  maxZoom: 19,
  attribution: '© TomTom | © OpenStreetMap contributors'
}).addTo(map);


        
        
        let startMarker, endMarker, routeLine;
        let garageMarkers = [];

        async function geocode(q){
          const url = 'https://api.tomtom.com/search/2/search/' + encodeURIComponent(q) + '.json?key=' + API_KEY + '&limit=1';
          const res = await fetch(url);
          const json = await res.json();
          if(json.results && json.results.length){
            const p = json.results[0].position;
            return [p.lat, p.lon];
          }
          throw new Error('Geocode failed: '+q);
        }

        async function fetchRoute(fromLatLng, toLatLng){
          const loc = fromLatLng.join(',') + ':' + toLatLng.join(',');
          const url = 'https://api.tomtom.com/routing/1/calculateRoute/' + loc + '/json?key=' + API_KEY + '&traffic=true';
          const res = await fetch(url);
          if(!res.ok){ throw new Error('Routing failed'); }
          return res.json();
        }

        function pointsToLatLngs(points){
          return points.map(p => [p.latitude, p.longitude]);
        }

        // 🔹 Fetch garages along the route polyline using TomTom POI Search API
        async function fetchGarages(routeCoords){
          const mid = routeCoords[Math.floor(routeCoords.length/2)];
          const url = 'https://api.tomtom.com/search/2/poiSearch/garage.json?key=' + API_KEY +
                      '&lat=' + mid[0] + '&lon=' + mid[1] + '&radius=50000&limit=10';
          const res = await fetch(url);
          if(!res.ok) return [];
          const data = await res.json();
          return (data.results || []).map(r => ({
            name: r.poi?.name || "Garage",
            position: [r.position.lat, r.position.lon]
          }));
        }

        function clearGarages(){
          garageMarkers.forEach(m => map.removeLayer(m));
          garageMarkers = [];
        }

       function showGarages(garages){
  clearGarages();
  garages.forEach(g => {
    const marker = L.circleMarker(g.position, {
      radius: 10,
      fillColor: "#ffffff",  // white fill
      color: "#ef4444",      // red border
      weight: 3,
      opacity: 1,
      fillOpacity: 1
    }).addTo(map);

    // show garage name only when clicked
    marker.bindPopup("<b>🔧 " + g.name + "</b>");

    garageMarkers.push(marker);
  });
}

        async function handleSetRoute({start, destination}){
          try{
            if(routeLine) map.removeLayer(routeLine);
            if(startMarker) map.removeLayer(startMarker);
            if(endMarker) map.removeLayer(endMarker);
            clearGarages();

            const from = await geocode(start);
            const to = await geocode(destination);

            startMarker = L.marker(from).addTo(map).bindPopup('Start');
            endMarker = L.marker(to).addTo(map).bindPopup('Destination');

            const data = await fetchRoute(from, to);
            const route = data.routes[0]; 
            const coords = pointsToLatLngs(route.legs[0].points);

            routeLine = L.polyline(coords, { color: '#ff3b30', weight: 6 }).addTo(map);
            map.fitBounds(routeLine.getBounds().pad(0.2));

            // 🔹 Fetch & Show Garages
            const garages = await fetchGarages(coords);
            showGarages(garages);

            RN_BRIDGE.postMessage(JSON.stringify({ 
              type: 'ROUTE_SUMMARIES', 
              payload: [{
                lengthInMeters: route.summary.lengthInMeters,
                travelTimeInSeconds: route.summary.travelTimeInSeconds
              }] 
            }));
          }catch(err){
            RN_BRIDGE.postMessage(JSON.stringify({ type: 'ERROR', payload: String(err) }));
          }
        }

        document.addEventListener('message', (ev) => {
          try{ const msg = JSON.parse(ev.data); if(msg.type === 'SET_ROUTE') handleSetRoute(msg.payload); } catch(e){}
        });

        map.whenReady(() => {
          handleSetRoute({
            start: 'Toronto, Ontario',
            destination: 'Winnipeg, Manitoba'
          });
        });
      </script>
    </body>
  </html>`;
}

// ===== Styles =====
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '' },
  header: {
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 16 : 0,
    paddingBottom: 12,
    backgroundColor: '#1b1f26',
  },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: '700' },

  inputCard: {
    backgroundColor: '#202530',
    marginHorizontal: 12,
    marginTop: 12,
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#2c3340',
  },
  input: {
    backgroundColor: '#12151b',
    color: '#fff',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#2a303b',
  },
  addStopBtn: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#ff3b30',
    borderRadius: 10,
    marginTop: 10,
  },
  addStopText: { color: '#fff', fontWeight: '700' },

  mapWrap: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 0,
    overflow: 'hidden',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },

  tabsWrap: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 12,
    marginTop: -28,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#eaecee',
  },
  tabBtnActive: { backgroundColor: '#ffffff' },
  tabText: { color: '#6b7280', fontWeight: '700' },
  tabTextActive: { color: '#ff3b30' },

  infoCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 12,
    paddingHorizontal: 14,
    paddingTop: 10,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    maxHeight: 260,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomColor: '#eef1f4',
    borderBottomWidth: 1,
  },
  infoLabel: { color: '#6b7280', fontWeight: '600' },
  infoValue: { color: '#1f2937', fontWeight: '700' },
  noData: { textAlign: 'center', paddingVertical: 20, color: '#6b7280' },

  cta: {
    backgroundColor: '#ff3b30',
    margin: 12,
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 12,
  },
  ctaText: { color: '#fff', fontSize: 16, fontWeight: '800' },
});
