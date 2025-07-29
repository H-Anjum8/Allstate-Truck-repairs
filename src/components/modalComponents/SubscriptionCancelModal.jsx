import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Modal,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { verticalScale, moderateScale } from 'react-native-size-matters';

import AuthWrapper from '../../../components/AuthWrapper';
import CustomHeader from '../../../components/CustomHeaders';
import CustomButton from '../../../components/CustomButton';
import BASE_COLORS from '../../../utils/colors';
import { FONTS } from '../../../theme/fonts';

const SubscriptionCancelModal = () => {
  const navigation = useNavigation();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogoutConfirm = () => {
    setShowLogoutModal(false);
    // Add your cancellation logic here
  };

  return (
    <AuthWrapper>
      <CustomHeader
        leftIcon={
          <Ionicons name="chevron-back" size={24} color={BASE_COLORS.BLACK} />
        }
        onLeftPress={() => navigation.goBack()}
        username="Subscription Plan"
        showUsername
        showWelcomeText={false}
        usernameTextStyle={{ marginBottom: verticalScale(28) }}
        contentContainerStyle={{ alignItems: 'center' }}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {/* Plan Card */}
        <View style={styles.planCard}>
          <Text style={styles.cardLabel}>Current Plan</Text>

          <View style={styles.planRow}>
            <Text style={styles.planTitle}>Fleet Pro</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>Active</Text>
            </View>
          </View>

          <Text style={styles.billingText}>
            <Text style={styles.billingAmount}>$49.99</Text>
            <Text style={styles.billingCycle}> billed every month</Text>
          </Text>

          <Text style={styles.renewText}>Renews on July 10ᵗʰ 2025</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonRow}>
          <CustomButton
            label="Cancel Subscription"
            onPress={() => setShowLogoutModal(true)} // << updated here
            style={[styles.button, styles.outlineButton]}
            textStyle={styles.outlineText}
          />
          <CustomButton
            label="Change Plan"
            onPress={() => navigation.navigate('ChangePlanScreen')}
            style={[styles.button, styles.fillButton]}
            textStyle={styles.fillText}
          />
        </View>
      </ScrollView>

      {/* Logout Modal as Confirmation Dialog */}
      <Modal
        transparent
        visible={showLogoutModal}
        animationType="fade"
        onRequestClose={() => setShowLogoutModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              Are you sure you want to{'\n'} Cancel Subscription?
            </Text>
            <Text style={styles.modaldetail}>
              You’ll lose your current subscription & you will need to subscribe
              again to use your account.
            </Text>
            <View style={styles.optionRow}>
              <TouchableOpacity onPress={() => setShowLogoutModal(false)}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <View style={styles.separator} />
              <TouchableOpacity onPress={handleLogoutConfirm}>
                <Text style={styles.logoutText}>Cancel Subscription</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </AuthWrapper>
  );
};

export default SubscriptionCancelModal;

const styles = StyleSheet.create({
  planCard: {
    backgroundColor: BASE_COLORS.PRIMARY_SEMI,
    borderRadius: 16,
    padding: moderateScale(16),
    marginTop: verticalScale(8),
  },
  cardLabel: {
    fontSize: moderateScale(12),
    fontFamily: FONTS.REGULAR,
    color: BASE_COLORS.BLACK,
    marginBottom: verticalScale(6),
  },
  planRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  planTitle: {
    fontSize: moderateScale(18),
    fontFamily: FONTS.BOLD,
    color: BASE_COLORS.BLACK,
  },
  statusBadge: {
    backgroundColor: BASE_COLORS.LIGHT_GREEN,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
  },
  statusText: {
    fontSize: moderateScale(10),
    color: BASE_COLORS.BLACK,
    fontFamily: FONTS.MEDIUM,
  },
  billingText: {
    marginTop: verticalScale(6),
    fontSize: moderateScale(12),
  },
  billingAmount: {
    fontFamily: FONTS.MEDIUM,
    color: BASE_COLORS.TEXT_PRIMARY,
  },
  billingCycle: {
    fontFamily: FONTS.REGULAR,
    color: BASE_COLORS.BLACK,
  },
  renewText: {
    fontSize: moderateScale(11),
    marginTop: verticalScale(12),
    fontFamily: FONTS.REGULAR,
    color: BASE_COLORS.BLACK,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: verticalScale(20),
  },
  button: {
    flex: 1,
    height: verticalScale(40),
    borderRadius: 12,
    marginHorizontal: moderateScale(5),
  },
  outlineButton: {
    backgroundColor: BASE_COLORS.WHITE,
    borderWidth: 1.5,
    borderColor: BASE_COLORS.BLACK,
  },
  outlineText: {
    color: BASE_COLORS.BLACK,
    fontSize: moderateScale(13),
    fontFamily: FONTS.MEDIUM,
  },
  fillButton: {
    backgroundColor: BASE_COLORS.SECONDARY,
  },
  fillText: {
    color: BASE_COLORS.WHITE,
    fontSize: moderateScale(13),
    fontFamily: FONTS.MEDIUM,
  },
  // Modal styles
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
    fontSize: moderateScale(9),
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
