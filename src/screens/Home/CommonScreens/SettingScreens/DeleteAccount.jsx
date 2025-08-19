import React, { useState } from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  Modal,
  TouchableOpacity,
} from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

import BASE_COLORS from '../../../../utils/colors';
import { FONTS } from '../../../../theme/fonts';
import AuthWrapper from '../../../../components/AuthWrapper';
import CustomHeader from '../../../../components/CustomHeaders';
import CustomButton from '../../../../components/CustomButton';

const DeleteAccount = () => {
  const navigation = useNavigation();
  const [showDeleteModal, setShowDeletetModal] = useState(false);

  const handleDeleteConfirm = () => {
    setShowDeletetModal(false);
    navigation.navigate('login_screen');
  };

  return (
    <AuthWrapper>
      <CustomHeader
        leftIcon={
          <Ionicons name="chevron-back" size={24} color={BASE_COLORS.BLACK} />
        }
        onLeftPress={() => navigation.goBack()}
        username="DeleteAccount"
        showUsername
        showWelcomeText={false}
        usernameTextStyle={{
          marginBottom: verticalScale(20),
          color: BASE_COLORS.BLACK,
        }}
        contentContainerStyle={{ alignItems: 'center' }}
      />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Delete Account Button */}
        <CustomButton
          title="Delete Account"
          onPress={() => setShowDeletetModal(true)}
          buttonStyle={{
            backgroundColor: BASE_COLORS.TEXT_RED,
            marginTop: verticalScale(20),
          }}
          textStyle={{ color: BASE_COLORS.WHITE }}
        />

        {/* Delete Modal */}
        <Modal
          transparent
          visible={showDeleteModal}
          animationType="fade"
          onRequestClose={() => setShowDeletetModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Delete Account</Text>
              <Text style={styles.modaldetail}>
                Deleting your account will permanently remove your {'\n'}{' '}
                profile and all associated data from the AllState Truck{'\n'}
                Repairs app. This action cannot be undone.
              </Text>
              <View style={styles.optionRow}>
                <TouchableOpacity onPress={() => setShowDeletetModal(false)}>
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
                <View style={styles.separator} />
                <TouchableOpacity onPress={handleDeleteConfirm}>
                  <Text style={styles.logoutText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </AuthWrapper>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: moderateScale(16),
    paddingBottom: verticalScale(40),
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
    width: '75%',
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

export default DeleteAccount;
