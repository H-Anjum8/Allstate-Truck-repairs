import { Dimensions, Platform, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { FONTS } from '../../theme/fonts';
import CustomHeader from '../../components/CustomHeaders';

const Login = () => {
  const navigation = useNavigation();
  const { width, height } = Dimensions.get('window');
  return (
    <View>
      <CustomHeader
        leftIcon={<Ionicons name="chevron-back" size={24} color="black" />}
        onLeftPress={() => navigation.goBack()}
        showWelcomeText={false}
        showDescription={true}
        description="Manage your appointments and keep track of upcoming sessions with clients."
        username="Your Appointments"
        showUsername={true}
        usernameTextStyle={{ textAlign: 'left' }}
        onNotificationPress={() =>
          navigation.navigate('all_notifications_screen')
        }
        contentContainerStyle={{ alignItems: 'flex-start' }}
      />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
