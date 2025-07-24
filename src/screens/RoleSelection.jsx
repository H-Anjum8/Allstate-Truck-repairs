import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import BASE_COLORS from '../utils/colors';
import { setUserRole } from '../store/slices/authSlice';
import { IMAGES } from '../utils/appAssets';
import AuthWrapper from '../components/AuthWrapper';
import CustomHeader from '../components/CustomHeaders';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from '../components/CustomButton';

const RoleSelection = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(null);

  const handleSelect = role => {
    setSelected(role);
    dispatch(setUserRole(role));
    console.log('Selected Role:', role);
  };

  const handleContinue = () => {
    if (selected) {
      navigation.navigate('login_screen');
    }
  };

  return (
    <AuthWrapper>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <CustomHeader
          leftIcon={<Ionicons name="chevron-back" size={22} color="black" />}
          onLeftPress={() => navigation.goBack()}
          showWelcomeText={false}
          showDescription={true}
          showUsername={true}
          username="Let’s Get You Started"
          description="Whether you're a truck owner looking for help, or a mechanic ready to provide service—we’ve got you covered."
          usernameTextStyle={{
            fontSize: 24,
            alignSelf: 'center',
          }}
          descriptionTextStyle={{ textAlign: 'center' }}
          onNotificationPress={() =>
            navigation.navigate('all_notifications_screen')
          }
        />

        <View style={styles.container}>
          <View>
            <TouchableOpacity
              style={[
                styles.roleButton,
                selected === 'truck_owner' && styles.selectedButton,
              ]}
              onPress={() => handleSelect('truck_owner')}
            >
              <Image
                source={IMAGES.OWNER}
                style={styles.image}
                resizeMode="contain"
              />
              <Text
                style={[
                  styles.roleText,
                  {
                    color:
                      selected === 'truck_owner'
                        ? BASE_COLORS.WHITE
                        : BASE_COLORS.PRIMARY,
                  },
                ]}
              >
                Truck Owner
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.roleButton,
                selected === 'mechanic' && styles.selectedButton,
              ]}
              onPress={() => handleSelect('mechanic')}
            >
              <Image
                source={IMAGES.MACHANIC}
                style={styles.image}
                resizeMode="contain"
              />
              <Text
                style={[
                  styles.roleText,
                  {
                    color:
                      selected === 'mechanic'
                        ? BASE_COLORS.WHITE
                        : BASE_COLORS.PRIMARY,
                  },
                ]}
              >
                Mechanic
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <CustomButton
              label="Continue"
              onPress={handleContinue}
              style={{ marginHorizontal: 3 }}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </AuthWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 20,
    marginTop: 10,
  },
  roleButton: {
    padding: 16,
    marginVertical: 6,
    borderRadius: 16,
    backgroundColor: BASE_COLORS.GRAYIESH,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: BASE_COLORS.LIGHT_GRAY,
  },
  selectedButton: {
    backgroundColor: BASE_COLORS.PRIMARY,
  },
  roleText: {
    fontWeight: 500,
    fontSize: 16,
  },
  image: {
    width: 60,
    height: 60,
    marginBottom: 4,
  },
  footer: {
    // marginTop: 20,
  },
});

export default RoleSelection;
