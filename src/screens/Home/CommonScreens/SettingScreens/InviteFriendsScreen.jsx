import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { moderateScale, verticalScale } from 'react-native-size-matters';

import MyBookingHeader from '../../../../components/DashboardComponents/MyBookingHeader';
import BASE_COLORS from '../../../../utils/colors';
import AuthWrapper from '../../../../components/AuthWrapper';

const InviteFriendsScreen = () => {
  const navigation = useNavigation();

  const MenuItem = ({ title, onPress }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <Text style={styles.menuText}>{title}</Text>
      <Ionicons name="chevron-forward" size={20} color={BASE_COLORS.BLACK} />
    </TouchableOpacity>
  );

  return (
    <AuthWrapper>
      <MyBookingHeader
        title="Invite Friends"
        onBackPress={() => navigation.goBack()}
      />

      <View style={styles.container}>
        {/* Navigate to Invite Screen */}
        <MenuItem
          title="Invite Your Friends"
          onPress={() => navigation.navigate('Invite_friends')}
        />

        {/* Navigate to Reward History Screen */}
        <MenuItem
          title="My Reward History"
          onPress={() => navigation.navigate('my_rewards')}
        />
      </View>
    </AuthWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: moderateScale(7),
    marginTop: verticalScale(10),
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: BASE_COLORS.PRIMARY_BG,
    paddingVertical: verticalScale(14),
    paddingHorizontal: moderateScale(12),
    borderRadius: moderateScale(6),
    marginBottom: verticalScale(10),
  },
  menuText: {
    fontSize: moderateScale(14),
    color: BASE_COLORS.BLACK,
  },
});

export default InviteFriendsScreen;
