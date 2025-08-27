import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import BASE_COLORS from '../../utils/colors';
import { moderateScale } from 'react-native-size-matters';
import { FONTS } from '../../theme/fonts';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const FleetCard = ({ item, type }) => {
  const navigation = useNavigation();

  const handleModify = () => {
    if (type === 'vehicle') {
      navigation.navigate('edit_vehicle', { item });
    } else {
      navigation.navigate('edit_driver', { item });
    }
  };
  const handleDetails = () => {
    if (type === 'vehicle') {
      navigation.navigate('vehical_details', { item });
    } else {
      navigation.navigate('driver_details', { item });
    }
  };

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.cardHeader}>
        {type === 'vehicle' && (
          <>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{item.plate}</Text>
            </View>

            <View style={styles.statusPill}>
              <Text style={styles.statusText}>{item.status}</Text>
            </View>
          </>
        )}
      </View>

      {/* Title */}
      <Text style={styles.cardTitle}>{item.name}</Text>

      {/* Owner/Driver */}
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <View style={styles.ownerRow}>
          <FontAwesome5 name="bus" size={15} color={BASE_COLORS.SECONDARY} />
          {/* <Ionicons
            name="directions-bus"
            size={14}
            color={BASE_COLORS.SECONDARY}
          /> */}
          <Text style={styles.ownerText}>
            {type === 'vehicle' ? item.owner : item.license}
          </Text>
        </View>

        {/* email  */}
        {type !== 'vehicle' && (
          <View style={styles.ownerRow}>
            <Ionicons
              name="mail-outline"
              size={14}
              color={BASE_COLORS.SECONDARY}
            />
            <Text style={styles.ownerText}>{item.email}</Text>
          </View>
        )}
      </View>

      {/* phone */}
      {type !== 'vehicle' && (
        <View style={styles.ownerRow}>
          <Ionicons
            name="call-outline"
            size={14}
            color={BASE_COLORS.SECONDARY}
          />
          <Text style={styles.ownerText}>{item.phone}</Text>
        </View>
      )}

      {/* Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.deleteButton}>
          <Ionicons
            name="trash-outline"
            size={18}
            color={BASE_COLORS.SECONDARY}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.modifyButton} onPress={handleModify}>
          <Text style={styles.modifyText}>Modify/Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.viewButton} onPress={handleDetails}>
          <Text style={styles.viewText}>View Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FleetCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: BASE_COLORS.WHITE,
    padding: moderateScale(12),
    marginBottom: moderateScale(10),
    borderRadius: 8,
    shadowColor: BASE_COLORS.BLACK,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  badge: {
    backgroundColor: BASE_COLORS.BADGE_BG,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  badgeText: {
    fontSize: 11,
    color: BASE_COLORS.BLACK,
    fontFamily: FONTS.BOLD,
    backgroundColor: BASE_COLORS.BORDER_COLOR,
    borderRadius: 6,
    paddingHorizontal: 6,
  },
  statusPill: {
    backgroundColor: BASE_COLORS.LIGHT_GREEN,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  statusText: {
    fontSize: 11,
    color: BASE_COLORS.GREEN,
    fontWeight: '500',
  },
  cardTitle: {
    fontSize: 14,
    fontFamily: FONTS.BOLD,
    marginVertical: 4,
  },
  ownerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  ownerText: {
    marginLeft: 4,
    fontSize: 13,
    color: BASE_COLORS.LIGHT_GRAY,
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    columnGap: 10,
  },
  deleteButton: {
    backgroundColor: BASE_COLORS.RED_BG,
    padding: 8,
    borderRadius: 6,
  },
  modifyButton: {
    backgroundColor: BASE_COLORS.PRIMARY,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  modifyText: {
    color: BASE_COLORS.WHITE,
    fontSize: 12,
    fontWeight: '500',
  },
  viewButton: {
    backgroundColor: BASE_COLORS.PRIMARY_BG,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: BASE_COLORS.PRIMARY_BG,
  },
  viewText: {
    color: BASE_COLORS.PRIMARY,
    fontSize: 12,
    fontWeight: '500',
  },
});
