import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useMemo, useRef, useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  Platform,
  ActivityIndicator,
  Image,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { useDispatch } from 'react-redux';
import { setLocations } from '../../../../store/slices/locationSlice';
import BASE_COLORS from '../../../../utils/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ICONS } from '../../../../utils/appAssets';
const API_KEY = 'mmOuOHPaeu4UIxzUcftugBPAPBkzYVE5';

export default function TripPlanning() {
  const navigation = useNavigation();
  const route = useRoute();
  const webRef = useRef(null);
  const dispatch = useDispatch();

  const { garageLat, garageLon, garageName, startLoc, destLoc } =
    route.params || {};
  const [start, setStart] = useState(startLoc || 'Toronto, Ontario');
  const [destination, setDestination] = useState(
    destLoc || 'Winnipeg, Manitoba',
  );

  const [activeTab, setActiveTab] = useState(garageLat && garageLon ? 1 : 0);
  const [routeSummaries, setRouteSummaries] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleAddGarage = () => {
    navigation.navigate('addStops_screen', {
      startLocation: start,
      destinationLocation: destination,
    });
  };

  const onMessage = e => {
    try {
      const msg = JSON.parse(e.nativeEvent.data);
      if (msg.type === 'ROUTE_SUMMARIES') {
        setRouteSummaries(msg.payload || []);

        // ✅ stop loader only (do not navigate here)
        setLoading(false);
      }
    } catch (err) {}
  };

  const computeRoute = () => {
    const payload = {
      type: 'SET_ROUTE',
      payload: {
        start,
        destination,
        stops: garageLat && garageLon ? [[garageLat, garageLon]] : [],
      },
    };
    setLoading(true);
    webRef.current?.postMessage(JSON.stringify(payload));
  };

  // ✅ New function: navigate when user clicks button
  const handleStartNavigation = () => {
    navigation.navigate('navigate_screen', {
      start,
      destination,
      garageLat,
      garageLon,
      garageName,
      selectedTab: activeTab,
    });
  };

  const activeSummary = routeSummaries[activeTab];
  const selectRoute = index => {
    setActiveTab(index);
    webRef.current?.postMessage(
      JSON.stringify({ type: 'SELECT_ROUTE', payload: { index } }),
    );
  };
  useEffect(() => {
    dispatch(setLocations({ start, destination }));
    computeRoute();
  }, [start, destination, garageLat, garageLon]);

  useEffect(() => {
    if (garageLat && garageLon) {
      setActiveTab(1);
      webRef.current?.postMessage(
        JSON.stringify({ type: 'SELECT_ROUTE', payload: { index: 1 } }),
      );
    } else {
      setActiveTab(0);
      webRef.current?.postMessage(
        JSON.stringify({ type: 'SELECT_ROUTE', payload: { index: 0 } }),
      );
    }
  }, [garageLat, garageLon]);

  const leafletHTML = useMemo(
    () =>
      getLeafletHTML(
        API_KEY,
        garageLat,
        garageLon,
        garageName,
        start,
        destination,
        activeTab,
      ),
    [garageLat, garageLon, garageName, start, destination, activeTab],
  );

  return (
    <SafeAreaView style={styles.container}>
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
        {/* HEADER  */}
        <View style={styles.header}>
          <Ionicons
            name="chevron-back"
            size={28}
            color={BASE_COLORS.WHITE}
            style={styles.iconButton}
          />
          <Text style={styles.headerTitle}>Trip Planning</Text>
        </View>
        {/* iNPUT  */}
        <View style={styles.inputCard}>
          {/* Start Location */}
          <View style={styles.row}>
            <View style={styles.iconColumn}>
              <View style={styles.startCircle} />
              <View style={styles.dashedLine} />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Start Location"
              value={start}
              onChangeText={setStart}
              placeholderTextColor="#9aa0a6"
            />
          </View>

          {/* Garage Stop (if exists) */}
          {garageLat && garageLon ? (
            <View style={styles.row}>
              <View style={styles.iconColumn}>
                <View style={styles.midCircle} />
                <View style={styles.dashedLine} />
              </View>
              <TextInput
                style={[styles.input, { marginTop: 8 }]}
                placeholder="Stop (Garage)"
                value={garageName || `${garageLat}, ${garageLon}`}
                editable={false}
                placeholderTextColor="#9aa0a6"
              />
            </View>
          ) : null}

          {/* Destination Location */}
          <View style={styles.row}>
            <View style={styles.iconColumn}>
              <Image
                source={ICONS.LOCATIONiCON}
                style={{ width: 17, height: 20 }}
              />
            </View>
            <TextInput
              style={[styles.input1, { marginTop: 8 }]}
              placeholder="Destination Location"
              value={destination}
              onChangeText={setDestination}
              placeholderTextColor="#9aa0a6"
            />
          </View>
        </View>
      </View>
      {!route.params && (
        <TouchableOpacity style={styles.addStopBtn} onPress={handleAddGarage}>
          <Text style={styles.addStopText}>Add Stops</Text>
        </TouchableOpacity>
      )}
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

            {/* ✅ Extra fields */}
            <InfoRow
              label="High Toll Zones"
              value={`${activeSummary?.tollSummary?.highwayTolls || 0} zones`}
            />
            <InfoRow
              label="Low Toll Zones"
              value={`${activeSummary?.tollSummary?.localTolls || 0} zones`}
            />
            <InfoRow
              label="Toll Fees Total"
              value={`$${activeSummary?.tollSummary?.totalFee || 0} CAD`}
            />
            <InfoRow
              label="Route Type"
              value={activeSummary?.routeType || 'Highway / Trans-Canada Hwy'}
            />
            <InfoRow
              label="Stops (Weigh / Rest)"
              value={`${activeSummary?.stops || 0}`}
            />
          </>
        ) : (
          <Text style={styles.noData}>No route yet</Text>
        )}
      </ScrollView>

      <TouchableOpacity
        style={[styles.cta, loading && { opacity: 0.7 }]}
        onPress={handleStartNavigation}
        disabled={loading || !routeSummaries.length} // disable until route is ready
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.ctaText}>Start & Navigate</Text>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// Helper components & functions
const InfoRow = ({ label, value }) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

const km = m => (m / 1000).toFixed(1);
const miles = m => (m / 1609.344).toFixed(1);
const hours = s => (s / 3600).toFixed(1);

// Leaflet HTML generator
function getLeafletHTML(
  API_KEY,
  garageLat,
  garageLon,
  garageName,
  start,
  destination,
  initialTab = 0,
) {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <style>html, body, #map { height: 100%; margin: 0; padding: 0; }</style>
    </head>
    <body>
      <div id="map"></div>
      <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
      <script>
      const map = L.map('map', { zoomControl: false }).setView([43.6532, -79.3832], 6);

        L.tileLayer('https://{s}.api.tomtom.com/map/1/tile/basic/night/{z}/{x}/{y}.png?key=${API_KEY}', {
          subdomains: 'abcd', maxZoom: 19, attribution: '© TomTom | © OpenStreetMap contributors'
        }).addTo(map);

        let startMarker, endMarker, routeLineA, routeLineB, stopMarkers = [];
        let selectedRouteIndex = ${garageLat && garageLon ? 1 : 0};

        async function geocode(q){
          const res = await fetch('https://api.tomtom.com/search/2/search/' + encodeURIComponent(q) + '.json?key=${API_KEY}&limit=1');
          const data = await res.json();
          return [data.results[0].position.lat, data.results[0].position.lon];
        }

        async function fetchRoute(fromLatLng, toLatLng, stops){
          let loc = fromLatLng.join(',');
          if(stops && stops.length){
            loc += ':' + stops.map(s => s.join(',')).join(':');
          }
          loc += ':' + toLatLng.join(',');
          const res = await fetch('https://api.tomtom.com/routing/1/calculateRoute/' + loc + '/json?key=${API_KEY}&traffic=true');
          const data = await res.json();
          return data;
        }

        function pointsToLatLngs(points){
          return points.map(p => [p.latitude, p.longitude]);
        }
        function routeToCoords(route){
          let coords = [];
          (route.legs || []).forEach(l => { coords = coords.concat(pointsToLatLngs(l.points || [])); });
          return coords;
        }

        function clearMap(){
          if(routeLineA){ try { map.removeLayer(routeLineA); } catch(e){} }
          if(routeLineB){ try { map.removeLayer(routeLineB); } catch(e){} }
          if(startMarker){ try { map.removeLayer(startMarker); } catch(e){} }
          if(endMarker){ try { map.removeLayer(endMarker); } catch(e){} }
          stopMarkers.forEach(m => { try { map.removeLayer(m); } catch(e){} });
          stopMarkers = [];
          routeLineA = null;
          routeLineB = null;
        }

        function showRoute(idx){
          selectedRouteIndex = idx;
          if(idx === 0){
            if(routeLineB){ try { map.removeLayer(routeLineB); } catch(e){} }
            if(routeLineA){ routeLineA.addTo(map); map.fitBounds(routeLineA.getBounds().pad(0.2)); }
          } else {
            if(routeLineA){ try { map.removeLayer(routeLineA); } catch(e){} }
            if(routeLineB){ routeLineB.addTo(map); map.fitBounds(routeLineB.getBounds().pad(0.2)); }
          }
        }

        async function handleSetRoute({start, destination, stops}){
          clearMap();

          const from = await geocode(start);
          const to = await geocode(destination);

          startMarker = L.marker(from).addTo(map).bindPopup('Start');
          endMarker = L.marker(to).addTo(map).bindPopup('Destination');

          if(stops && stops.length){
            stops.forEach(s => {
              const m = L.marker(s)
                .bindPopup('Selected Garage: ${garageName || ''}')
                .setIcon(L.icon({iconUrl: 'https://maps.gstatic.com/mapfiles/ms2/micons/blue.png', iconSize: [30,30]}));
              m.addTo(map);
              stopMarkers.push(m);
            });
          }

          const dataA = await fetchRoute(from, to, []);
          const routeA = (dataA.routes || [])[0];
          if(routeA){
            const coordsA = routeToCoords(routeA);
            routeLineA = L.polyline(coordsA, { color: '#ff3b30', weight: 6 });
          }

          let routeB;
          if(stops && stops.length){
            const dataB = await fetchRoute(from, to, stops || []);
            routeB = (dataB.routes || [])[0];
            if(routeB){
              const coordsB = routeToCoords(routeB);
              routeLineB = L.polyline(coordsB, { color: '#ff3b30', weight: 6 });
            }
          }

          const summaries = [];
          if(routeA){
           summaries.push({
  lengthInMeters: routeA.summary.lengthInMeters,
  travelTimeInSeconds: routeA.summary.travelTimeInSeconds,
  tollSummary: routeA.summary.tollSummary || {},
  routeType: routeA.sections?.[0]?.travelMode || 'Highway',
  stops: (routeA.legs || []).length - 1
});
          }
          if(routeB){
            summaries.push({ lengthInMeters: routeB.summary.lengthInMeters, travelTimeInSeconds: routeB.summary.travelTimeInSeconds });
          }
          window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'ROUTE_SUMMARIES', payload: summaries }));

          showRoute(selectedRouteIndex);
        }

        document.addEventListener('message', (ev) => {
          try{
            const msg = JSON.parse(ev.data);
            if(msg.type === 'SET_ROUTE') handleSetRoute(msg.payload);
            if(msg.type === 'SELECT_ROUTE') showRoute(msg.payload.index);
          } catch(e){}
        });

        map.whenReady(() => {
          handleSetRoute({
            start: '${start}',
            destination: '${destination}',
            stops: ${
              garageLat && garageLon ? `[[${garageLat}, ${garageLon}]]` : '[]'
            }
          });
          showRoute(${garageLat && garageLon ? 1 : 0});
        });
      </script>
    </body>
  </html>
  `;
}

// ===== Styles =====
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent' },
  header: {
    position: 'absolute',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 16 : 0,
    paddingBottom: 12,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  headerTitle: {
    color: BASE_COLORS.WHITE,
    fontSize: 20,
    fontWeight: '700',
    marginLeft: 60,
  },
  inputCard: {
    position: 'absolute',
    width: '90%',
    marginHorizontal: 12,
    top: 55,
    borderRadius: 14,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#2c3340',
    backgroundColor: BASE_COLORS.WHITE,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconColumn: {
    width: 24,
    alignItems: 'center',
  },
  startCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#00008B',
    backgroundColor: BASE_COLORS.PRIMARY,
    marginTop: 8,
  },
  midCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: BASE_COLORS.PRIMARY,
    backgroundColor: BASE_COLORS.WHITE,
    marginBottom: 2,
  },
  endPin: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: 'red',

    marginTop: 8,
  },
  dashedLine: {
    flex: 1,
    height: 30,
    borderLeftWidth: 2,
    borderColor: '#00008B',
    borderStyle: 'dashed',
    marginTop: 4,
  },
  input: {
    flex: 1,
    backgroundColor: BASE_COLORS.WHITE,
    color: BASE_COLORS.BLACK,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomColor: BASE_COLORS.GRAY,
    borderBottomWidth: 1,
  },
  input1: {
    flex: 1,
    backgroundColor: BASE_COLORS.WHITE,
    color: BASE_COLORS.BLACK,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },

  addStopBtn: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: BASE_COLORS.PRIMARY,
    borderRadius: 10,
    top: 320,
    left: 20,
    position: 'absolute',
  },
  addStopText: { color: '#fff', fontWeight: '700' },
  mapWrap: {
    flex: 1,

    marginHorizontal: 0,
    overflow: 'hidden',
    position: 'relative',
  },
  tab_container: {
    backgroundColor: 'red',
  },
  tabsWrap: {
    flexDirection: 'row',
    backgroundColor: BASE_COLORS.WHITE,
    marginTop: -28,
    overflow: 'hidden',
    borderBottomColor: BASE_COLORS.GRAY,

    borderBottomWidth: 1,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    border: 2,
    borderColor: 'red',
  },
  // tabBtnActive: { backgroundColor: BASE_COLORS.PRIMARY },
  tabText: { color: BASE_COLORS.GRAY, fontWeight: '700' },
  tabTextActive: { color: '#ff3b30' },
  infoCard: {
    backgroundColor: BASE_COLORS.WHITE,
    marginHorizontal: 12,
    paddingHorizontal: 14,
    marginTop: 6,
    paddingVertical: 10,
    elevation: 1,
    borderRadius: 16,
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
  iconButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: BASE_COLORS.WHITE,
  },
});
