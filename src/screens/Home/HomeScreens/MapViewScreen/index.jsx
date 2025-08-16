import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function MapViewScreen() {
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
        html, body, #map {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
        }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script>
        function initMap() {
          if (typeof L !== 'undefined') {
            var map = L.map('map').setView([31.5204, 74.3587], 12);

            L.tileLayer('https://api.tomtom.com/map/1/tile/basic/main/{z}/{x}/{y}.png?key=9gQ9FE7PO2kS2rOgv1Q7N1VrsX0Ws7EQ', {
              attribution: '© TomTom',
              maxZoom: 22
            }).addTo(map);

            L.marker([31.5204, 74.3587]).addTo(map)
              .bindPopup("Lahore Center")
              .openPopup();
          } else {
            document.body.innerHTML = "<h3 style='color:red'>Leaflet did not load!</h3>";
          }
        }
        initMap();
      </script>
    </body>
  </html>
  `;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mapContainer}>
        <WebView
          originWhitelist={['*']}
          source={{ html: mapHtml, baseUrl: 'file:///android_asset/' }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          allowFileAccess={true}
          allowUniversalAccessFromFileURLs={true}
          mixedContentMode="always"
          style={{ flex: 1 }}
          onMessage={event => {
            console.log('WebView log:', event.nativeEvent.data);
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', height: 400 },
  mapContainer: { flex: 1 },
});
