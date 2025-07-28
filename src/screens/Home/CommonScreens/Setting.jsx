import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import AuthWrapper from '../../../components/AuthWrapper';
import CustomButton from '../../../components/CustomButton';
import BASE_COLORS from '../../../utils/colors';
import { FONTS } from '../../../theme/fonts';
import appAssets, { IMAGES } from '../../../utils/appAssets';
import { menuItems } from '../../../utils/staticData';

const Setting = () => {
  const navigation = useNavigation();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogoutConfirm = () => {
    setShowLogoutModal(false);
    navigation.navigate('login_screen');
  };

  return (
    <AuthWrapper>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.profileImageContainer}>
            <Image source={IMAGES.EDIT_PROFILE} style={styles.profileImage} />
            <TouchableOpacity
              style={styles.editProfileIconButton}
              onPress={() => navigation.navigate('upload_profile_image')}
              activeOpacity={0.7}
            >
              <Ionicons
                name="create-outline"
                size={moderateScale(16)}
                color={BASE_COLORS.WHITE}
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.userName}>Mac Collins</Text>
          <Text style={styles.userEmail}>maccollins@gmail.com</Text>

          <TouchableOpacity
            style={styles.editProfileButton}
            onPress={() => navigation.navigate('edit_profile')}
            activeOpacity={0.8}
          >
            <Ionicons
              name="create-outline"
              size={moderateScale(13)}
              color={BASE_COLORS.WHITE}
              style={{ marginRight: 6 }}
            />
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => navigation.navigate(item.nav_link)}
            >
              <View style={styles.menuItemLeft}>
                <Ionicons
                  name={item.icon}
                  size={moderateScale(14)}
                  color={BASE_COLORS.DARK_GRAY}
                  style={{ marginRight: moderateScale(12) }}
                />
                <Text style={styles.menuItemText}>{item.title}</Text>
              </View>
              <Ionicons
                name="chevron-forward-outline"
                size={moderateScale(16)}
                color={BASE_COLORS.SECONDARY}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
        <CustomButton
          label="Log Out"
          onPress={() => setShowLogoutModal(true)}
          style={{ marginTop: 40, marginHorizontal: 2, height: 53 }}
          icon={
            <Ionicons
              name="log-out-outline"
              size={moderateScale(16)}
              color={BASE_COLORS.WHITE}
            />
          }
        />
      </ScrollView>

      {/* Logout Modal */}
      <Modal
        transparent
        visible={showLogoutModal}
        animationType="fade"
        onRequestClose={() => setShowLogoutModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              Are you sure you want to log out?
            </Text>
            <Text style={styles.modaldetail}>
              You’ll need to log in again to access your{'\n'}account and saved
              data.
            </Text>
            <View style={styles.optionRow}>
              <TouchableOpacity onPress={() => setShowLogoutModal(false)}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <View style={styles.separator} />
              <TouchableOpacity onPress={handleLogoutConfirm}>
                <Text style={styles.logoutText}>Log Out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </AuthWrapper>
  );
};

export default Setting;

const styles = StyleSheet.create({
  scrollContainer: {
    padding: moderateScale(20),
    paddingBottom: verticalScale(20),
    paddingTop: verticalScale(20),
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: verticalScale(10),
    marginTop: verticalScale(8),
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: verticalScale(6),
  },
  profileImage: {
    width: moderateScale(90),
    height: moderateScale(90),
    borderRadius: moderateScale(50),
    borderWidth: 1,
    borderColor: BASE_COLORS.WHITE,
  },
  editProfileIconButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: BASE_COLORS.SECONDARY,
    width: moderateScale(30),
    height: moderateScale(30),
    borderRadius: moderateScale(15),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: BASE_COLORS.WHITE,
    zIndex: 10,
  },
  userName: {
    fontSize: moderateScale(18),
    fontWeight: '500',
    color: BASE_COLORS.BLACK,
    marginBottom: verticalScale(2),
  },
  userEmail: {
    fontSize: moderateScale(12),
    color: BASE_COLORS.TEXT_SECONDARY,
    marginBottom: verticalScale(2),
  },
  editProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BASE_COLORS.PRIMARY,
    paddingVertical: verticalScale(6),
    paddingHorizontal: moderateScale(10),
    borderRadius: moderateScale(10),
    marginTop: verticalScale(3),
  },
  editProfileText: {
    color: BASE_COLORS.WHITE,
    fontSize: moderateScale(10),
    fontFamily: FONTS.MEDIUM,
  },
  menuContainer: {
    marginTop: verticalScale(6),
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: verticalScale(10),
    borderBottomWidth: 0.3,
    borderBottomColor: BASE_COLORS.LIGHT_BLACK,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: moderateScale(12),
    color: BASE_COLORS.DARK_GRAY,
    fontFamily: FONTS.REGULAR,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: BASE_COLORS.BLACKISH,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: BASE_COLORS.WHITE,
    padding: moderateScale(15),
    borderRadius: moderateScale(12),
    width: '70%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: moderateScale(14),
    fontWeight: '500',
    color: BASE_COLORS.BLACK,
    marginBottom: verticalScale(5),
    textAlign: 'center',
  },
  modaldetail: {
    fontSize: moderateScale(10),
    fontWeight: '400',
    color: BASE_COLORS.DARK_GRAY,
    marginBottom: verticalScale(8),
    textAlign: 'center',
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: verticalScale(10),
    alignItems: 'center',
    width: '100%',
  },
  cancelText: {
    fontSize: moderateScale(14),
    color: BASE_COLORS.TEXT_GRAY,
    fontWeight: '500',
  },
  logoutText: {
    fontSize: moderateScale(14),
    color: BASE_COLORS.TEXT_RED,
    fontWeight: '500',
  },
  separator: {
    width: 1,
    height: verticalScale(18),
    backgroundColor: BASE_COLORS.PRIMARY_DARK,
    marginHorizontal: moderateScale(15),
  },
});
