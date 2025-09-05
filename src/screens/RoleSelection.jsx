import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import BASE_COLORS from '../utils/colors';
import { IMAGES } from '../utils/appAssets';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppWrapper from '../components/AuthWrapper/AppWrapper';
import CustomHeader from '../components/CustomHeader/CustomHeader';
import { TextStyles } from '../theme/fonts';
import CustomButton from '../components/common/CustomButton';
import { ROLES } from '../utils/constants';

const RoleSelection = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(ROLES.OWNER);

  const handleSelect = role => {
    setSelected(role);
    // dispatch(setUserRole(role));
    console.log('Selected Role:', role);
  };
  const handleContinue = () => {
    if (selected) {
      navigation.navigate('login_screen', { role: selected || ROLES });
    }
  };

  return (
    <AppWrapper style={{ paddingHorizontal: 16 }}>
      <CustomHeader
        leftIcon={<Ionicons name="chevron-back" size={22} color="black" />}
        onLeftPress={() => navigation.goBack()}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'space-between',
        }}
      >
        <View style={{ gap: 10, marginVertical: 20 }}>
          <Text style={styles.title}>Let’s Get You Started</Text>
          <Text style={styles.description}>
            Whether you're a truck owner looking for help, or a mechanic ready
            to provide service—we’ve got you covered.
          </Text>
        </View>

        <View style={styles.container}>
          <View>
            <TouchableOpacity
              style={[
                styles.roleButton,
                selected === ROLES.OWNER && styles.selectedButton,
              ]}
              onPress={() => handleSelect(ROLES.OWNER)}
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
                      selected === ROLES.OWNER
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
                selected === ROLES.MECHANIC && styles.selectedButton,
              ]}
              onPress={() => handleSelect(ROLES.MECHANIC)}
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
                      selected === ROLES.MECHANIC
                        ? BASE_COLORS.WHITE
                        : BASE_COLORS.PRIMARY,
                  },
                ]}
              >
                Mechanic
              </Text>
            </TouchableOpacity>
          </View>
          <CustomButton label="Continue" onPress={handleContinue} />
        </View>
      </ScrollView>
    </AppWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 20,
    marginTop: 10,
  },
  title: {
    ...TextStyles.heading1,
    fontWeight: '500',
    color: BASE_COLORS.PRIMARY,
    textAlign: 'center',
  },
  description: {
    ...TextStyles.bodySmall,
    fontWeight: '400',
    color: BASE_COLORS.DARK_GRAY,
    textAlign: 'center',
  },
  roleButton: {
    padding: 16,
    marginVertical: 6,
    borderRadius: 16,
    backgroundColor: BASE_COLORS.GRAYIESH,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: BASE_COLORS.LIGHT_GRAY,
    gap: 10,
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
});

export default RoleSelection;
