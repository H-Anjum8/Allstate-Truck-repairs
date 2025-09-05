import { Alert, Platform } from 'react-native';
import axios from 'axios';
import Geolocation from '@react-native-community/geolocation';
import {
  check,
  request,
  PERMISSIONS,
  RESULTS,
  openSettings,
} from 'react-native-permissions';


const MAP_API_KEY = 'AIzaSyCWfAJCqrYzUudnGQYWNrDhGnDSqYVzHXg';

export const isIOS = Platform.OS === 'ios';

/**
 * Uploads image or video to server and returns its URL.
 * @param {object} file - Media object with uri, fileName, type
 * @param {function} setLoading - Optional loading setter
 * @returns {Promise<string>}
 */
export const imageUploader = async (file, setLoading = () => {}) => {
  try {
    console.log('Received Media File:', file);
    setLoading(true);

    if (!file || !file.uri) throw new Error('No file selected for upload.');

    const isVideo = file?.type?.includes('video');
    const fileType = isVideo ? 'video/mp4' : 'image/jpeg';
    const fileName =
      file.fileName || `media_${Date.now()}.${isVideo ? 'mp4' : 'jpg'}`;

    const cleanUri =
      isIOS && file.uri.startsWith('file://') ? file.uri : file.uri;

    const formData = new FormData();
    formData.append('file', {
      uri: cleanUri,
      name: fileName,
      type: fileType,
    });

    const response = await axios.post(`${'BASEURL'}public/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('??????????????????', response);

    const mediaUrl = response?.data?.url;
    if (!mediaUrl) throw new Error('Upload failed: No URL returned');
    return mediaUrl;
  } catch (error) {
    console.error('Upload error:', error.message);
    console.error('Upload errorrrrrrr:', error);
    throw error;
  } finally {
    setLoading(false);
  }
};



// 1️⃣ Full Map of Permissions
export const PERMISSION_TYPES = {
  camera: Platform.select({
    ios: PERMISSIONS.IOS.CAMERA,
    android: PERMISSIONS.ANDROID.CAMERA,
  }),
  photoLibrary: Platform.select({
    ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
    android: PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
  }),
  photoLibraryAddOnly: Platform.select({
    ios: PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY,
    android: PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
  }),
  readMediaVideo: Platform.select({
    ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
    android: PERMISSIONS.ANDROID.READ_MEDIA_VIDEO,
  }),
  locationWhenInUse: Platform.select({
    ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
    android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  }),
  locationAlways: Platform.select({
    ios: PERMISSIONS.IOS.LOCATION_ALWAYS,
    android: PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION,
  }),
  locationCoarse: Platform.select({
    ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
    android: PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
  }),
  readExternalStorage: Platform.select({
    ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
    android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
  }),
  writeExternalStorage: Platform.select({
    ios: PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY,
    android: PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
  }),
  notifications: Platform.select({
    ios: PERMISSIONS.IOS.NOTIFICATIONS,
    android: PERMISSIONS.ANDROID.POST_NOTIFICATIONS,
  }),
  microphone: Platform.select({
    ios: PERMISSIONS.IOS.MICROPHONE,
    android: PERMISSIONS.ANDROID.RECORD_AUDIO,
  }),
  contacts: Platform.select({
    ios: PERMISSIONS.IOS.CONTACTS,
    android: PERMISSIONS.ANDROID.READ_CONTACTS,
  }),
  calendar: Platform.select({
    ios: PERMISSIONS.IOS.CALENDARS,
    android: PERMISSIONS.ANDROID.READ_CALENDAR,
  }),
  bluetooth: Platform.select({
    ios: PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL,
    android: PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
  }),
  bluetoothScan: Platform.select({
    ios: PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL,
    android: PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
  }),
};

// 2️⃣ Display Friendly Name for Alert Dialogs
const getPermissionName = type => {
  const names = {
    camera: 'Camera',
    photoLibrary: 'Photo Library',
    photoLibraryAddOnly: 'Photo Library (Add Only)',
    readMediaVideo: 'Video Access',
    locationWhenInUse: 'Location (When in Use)',
    locationAlways: 'Location (Always)',
    locationCoarse: 'Location (Coarse)',
    notifications: 'Notifications',
    readExternalStorage: 'Read Storage',
    writeExternalStorage: 'Write Storage',
    microphone: 'Microphone',
    contacts: 'Contacts',
    calendar: 'Calendar',
    bluetooth: 'Bluetooth',
    bluetoothScan: 'Bluetooth Scan',
  };
  return names[type] || 'This feature';
};

// 3️⃣ Unified Permission Status Handler
export const handlePermissionStatus = (
  status,
  permissionType,
  retryFunction = () => {},
) => {
  const permissionName = getPermissionName(permissionType);

  switch (status) {
    case RESULTS.UNAVAILABLE:
      Alert.alert(`${permissionName} not available on this device.`);
      break;

    case RESULTS.DENIED:
      Alert.alert(
        'Permission Required',
        `${permissionName} access is required. Would you like to allow it?`,
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Allow', onPress: retryFunction },
        ],
      );
      break;

    case RESULTS.BLOCKED:
      Alert.alert(
        'Permission Blocked',
        `${permissionName} access is blocked. Please enable it in Settings.`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Open Settings',
            onPress: () =>
              openSettings().catch(() => console.warn('Cannot open settings')),
          },
        ],
      );
      break;

    case RESULTS.GRANTED:
    case RESULTS.LIMITED:
      // Proceed silently
      break;

    default:
      console.warn('Unknown permission status:', status);
  }
};

// 4️⃣ One-liner Combined Checker & Requester
export const checkAndRequestPermission = async (
  permissionKey,
  onGranted = () => {},
) => {
  const permission = PERMISSION_TYPES[permissionKey];
  if (!permission) {
    console.warn(`❌ Undefined permission for key: "${permissionKey}"`);
    return false;
  }

  const status = await check(permission);
  console.log('checkAndRequestPermission', permissionKey, status);

  if (status === RESULTS.GRANTED || status === RESULTS.LIMITED) {
    onGranted?.();
    return true;
  }

  if (status === RESULTS.DENIED) {
    const newStatus = await request(permission);
    if (newStatus === RESULTS.GRANTED || newStatus === RESULTS.LIMITED) {
      onGranted?.();
      return true;
    } else {
      handlePermissionStatus(newStatus, permissionKey);
      return false;
    }
  }

  // If BLOCKED or UNAVAILABLE
  handlePermissionStatus(status, permissionKey);
  return false;
};

// 5️⃣ Export Needed Constants
export { RESULTS, PERMISSIONS };

/**
 * Get current location after requesting location permission.
 * Uses `locationWhenInUse` from unified permissions helper.
 *
 * @returns {Promise<{
 *   latitude: number,
 *   longitude: number,
 *   accuracy?: number,
 *   altitude?: number | null,
 *   heading?: number | null,
 *   speed?: number | null,
 *   timestamp: number
 * } | null>}
 */
export const getCurrentLocation = async () => {
  try {
    const granted = await checkAndRequestPermission('locationWhenInUse');

    if (!granted) return null;

    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        position => {
          const { coords, timestamp } = position;
          resolve({
            latitude: coords.latitude,
            longitude: coords.longitude,
            accuracy: coords.accuracy,
            altitude: coords.altitude,
            heading: coords.heading,
            speed: coords.speed,
            timestamp,
          });
        },
        error => {
          console.error('📍 Location Error:', error.message);
          reject(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
        },
      );
    });
  } catch (err) {
    console.error('📍 Failed to get location:', err.message);
    return null;
  }
};

// METHOD 1: Google Maps API (Most Accurate)

export const getAddressFromCoordinates = async (latitude, longitude) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${MAP_API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === 'OK' && data.results.length > 0) {
      const result = data.results[0];
      const components = result.address_components;

      // Clean the formatted address
      const cleanFormattedAddress = address => {
        return address.replace(/^[0-9A-Z]{4}\+[0-9A-Z]{2,3},?\s*/, '').trim();
      };

      return {
        fullAddress: result.formatted_address,
        cleanAddress: cleanFormattedAddress(result.formatted_address), // Extra clean version
        originalAddress: result.formatted_address, // Original for reference
        street:
          components.find(c => c.types.includes('route'))?.long_name || '',
        city:
          components.find(c => c.types.includes('locality'))?.long_name ||
          components.find(c => c.types.includes('administrative_area_level_2'))
            ?.long_name ||
          '',
        state:
          components.find(c => c.types.includes('administrative_area_level_1'))
            ?.long_name || '',
        country:
          components.find(c => c.types.includes('country'))?.long_name || '',
        postalCode:
          components.find(c => c.types.includes('postal_code'))?.long_name ||
          '',
        placeId: result.place_id,
        types: result.types,
      };
    } else {
      throw new Error(`Geocoding failed: ${data.status}`);
    }
  } catch (error) {
    console.error('Google geocoding error:', error);
    throw error;
  }
};

// Calculate distance between two points
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of Earth in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};
