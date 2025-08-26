import React, { useMemo, useRef, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { useRoute, useNavigation } from '@react-navigation/native';
import BASE_COLORS from '../../../../utils/colors';

const API_KEY = 'mmOuOHPaeu4UIxzUcftugBPAPBkzYVE5';

export default function NavigateScreen() {
  const webRef = useRef(null);
  const route = useRoute();
  const navigation = useNavigation();

  const { start, destination, garageLat, garageLon, garageName, selectedTab } =
    route.params || {};

  // memoized html
  const leafletHTML = useMemo(
    () =>
      getLeafletHTML(
        API_KEY,
        start,
        destination,
        garageLat,
        garageLon,
        garageName,
        selectedTab,
      ),
    [start, destination, garageLat, garageLon, garageName, selectedTab],
  );

  useEffect(() => {
    // ✅ Always include a garage stop: if garageLat/Lon missing, fallback to a default
    const stop =
      garageLat && garageLon ? [garageLat, garageLon] : [49.8951, -97.1384]; // Winnipeg fallback

    webRef.current?.postMessage(
      JSON.stringify({
        type: 'SET_ROUTE',
        payload: {
          start,
          destination,
          stops: [stop], // always send one stop
        },
      }),
    );
  }, [start, destination, garageLat, garageLon]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Map */}
      <WebView
        ref={webRef}
        originWhitelist={['*']}
        source={{ html: leafletHTML }}
        allowFileAccess
        allowUniversalAccessFromFileURLs
        javaScriptEnabled
        domStorageEnabled
        style={StyleSheet.absoluteFill}
      />

      {/* Top Direction Card */}
      <View style={styles.topCard}>
        <Text style={styles.directionArrow}>⬆</Text>
        <View>
          <Text style={styles.directionText}>{destination || 'Manitoba'}</Text>
          <Text style={styles.subDirectionText}>
            {garageName ? `${garageName}` : 'Winnipeg, Manitoba'}
          </Text>
        </View>
      </View>

      {/* Bottom Info Card */}
      <View style={styles.bottomCard}>
        <View>
          <Text style={styles.timeText}>21-24 hrs</Text>
          <Text style={styles.distanceText}>1,243 miles</Text>
        </View>
        <TouchableOpacity
          style={styles.exitBtn}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.exitText}>Exit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// leaflet map html (same as before)
function getLeafletHTML(
  API_KEY,
  start,
  destination,
  garageLat,
  garageLon,
  garageName,
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
          const map = L.map('map').setView([43.65, -79.38], 6);
          L.tileLayer('https://{s}.api.tomtom.com/map/1/tile/basic/night/{z}/{x}/{y}.png?key=${API_KEY}', {
            subdomains: 'abcd', maxZoom: 19, attribution: '© TomTom | © OSM'
          }).addTo(map);

          let startMarker, endMarker, stopMarkers=[], routeLine;

          async function geocode(q){
            const res = await fetch('https://api.tomtom.com/search/2/search/' + encodeURIComponent(q) + '.json?key=${API_KEY}&limit=1');
            const data = await res.json();
            if(data.results && data.results.length){
              return [data.results[0].position.lat, data.results[0].position.lon];
            }
            return null;
          }

          async function fetchRoute(fromLatLng, toLatLng, stops){
            let loc = fromLatLng.join(',');
            if(stops && stops.length){
              loc += ':' + stops.map(s => s.join(',')).join(':');
            }
            loc += ':' + toLatLng.join(',');
            const res = await fetch('https://api.tomtom.com/routing/1/calculateRoute/' + loc + '/json?key=${API_KEY}&traffic=true');
            const data = await res.json();
            return (data.routes || [])[0];
          }

          function routeToCoords(route){
            let coords=[];
            (route.legs||[]).forEach(l => coords = coords.concat(l.points.map(p => [p.latitude,p.longitude])));
            return coords;
          }

        async function handleSetRoute({start, destination, stops}) {
  try {
    let from = Array.isArray(start) ? start : await geocode(start);
    let to = Array.isArray(destination) ? destination : await geocode(destination);

    if(!from || !to) {
      console.warn("Could not resolve start or destination");
      return;
    }

    // ✅ Always include a fallback stop if none given
    if (!stops || !stops.length) {
      stops = [[49.8951, -97.1384]]; // Winnipeg fallback
    }

    // Clear old layers
    if (startMarker) map.removeLayer(startMarker);
    if (endMarker) map.removeLayer(endMarker);
    stopMarkers.forEach(m => map.removeLayer(m));
    stopMarkers = [];
    if (routeLine) map.removeLayer(routeLine);

    // Start marker (Green)
    startMarker = L.marker(from, {
      icon: L.icon({
        iconUrl: 'https://maps.gstatic.com/mapfiles/ms2/micons/green-dot.png',
        iconSize: [32, 32]
      })
    }).addTo(map).bindPopup('Start');

    // Destination marker (Red)
    endMarker = L.marker(to, {
      icon: L.icon({
        iconUrl: 'https://maps.gstatic.com/mapfiles/ms2/micons/red-dot.png',
        iconSize: [32, 32]
      })
    }).addTo(map).bindPopup('Destination');

    // Garage marker (Blue)
    stops.forEach(s => {
      const m = L.marker(s, {
        icon: L.icon({
          iconUrl: 'https://maps.gstatic.com/mapfiles/ms2/micons/blue-dot.png',
          iconSize: [32, 32]
        })
      }).addTo(map).bindPopup('Garage: ${garageName || 'Default Garage'}');
      stopMarkers.push(m);
    });

    // Draw route
    const route = await fetchRoute(from, to, stops);
    if (route) {
      const coords = routeToCoords(route);
      routeLine = L.polyline(coords, { color: '#ff3b30', weight: 7 }).addTo(map);
      map.fitBounds(routeLine.getBounds().pad(0.2));
    }
  } catch (err) {
    console.error("Route drawing error:", err);
  }
}


          document.addEventListener('message', (ev)=>{
            try{
              const msg = JSON.parse(ev.data);
              if(msg.type==='SET_ROUTE') handleSetRoute(msg.payload);
            }catch(e){}
          });
        </script>
      </body>
    </html>
  `;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  topCard: {
    position: 'absolute',
    top: 40,
    left: 20,
    right: 20,
    backgroundColor: BASE_COLORS.PRIMARY,
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  directionArrow: { fontSize: 24, color: BASE_COLORS.WHITE, marginRight: 10 },
  directionText: { color: BASE_COLORS.WHITE, fontSize: 18, fontWeight: 'bold' },
  subDirectionText: { color: BASE_COLORS.GRAYIESH, fontSize: 14 },
  bottomCard: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: BASE_COLORS.PRIMARY,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeText: { fontSize: 16, color: BASE_COLORS.WHITE, fontWeight: '600' },
  distanceText: { fontSize: 14, color: BASE_COLORS.GRAYIESH },
  exitBtn: {
    backgroundColor: BASE_COLORS.WHITE,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  exitText: { color: BASE_COLORS.SECONDARY, fontSize: 16, fontWeight: '600' },
});
