import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
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
      >
        <CustomHeader
          leftIcon={<Ionicons name="chevron-back" size={24} color="black" />}
          onLeftPress={() => navigation.goBack()}
          showWelcomeText={false}
          showDescription={true}
          showUsername={true}
          username="Let’s Get You Started"
          description="Whether you're a truck owner looking for help, or a mechanic ready to provide service—we’ve got you covered."
          usernameTextStyle={{ textAlign: 'center', fontSize: 24 }}
          descriptionTextStyle={{ textAlign: 'center' }}
          onNotificationPress={() =>
            navigation.navigate('all_notifications_screen')
          }
          contentContainerStyle={{ alignItems: 'flex-start' }}
        />
        <View style={{ flexDirection: 'column' }}>
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
              {' '}
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
          <CustomButton
            label="Continue"
            onPress={handleContinue}
            style={{ marginHorizontal: 3, marginTop: 190 }}
          />
        </View>
      </KeyboardAvoidingView>
    </AuthWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: BASE_COLORS.PRIMARY,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 16,
    color: '#444',
  },
  roleButton: {
    padding: 14,
    marginVertical: 6,
    borderRadius: 16,
    backgroundColor: BASE_COLORS.LIGHT_GRAY,
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: BASE_COLORS.PRIMARY,
  },
  roleText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  continueButton: {
    backgroundColor: BASE_COLORS.TEXT_RED,
    padding: 16,
    borderRadius: 12,
    marginTop: 30,
  },
  continueText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
  image: {
    width: 60,
    height: 60,
    marginBottom: 4,
  },
});

export default RoleSelection;
