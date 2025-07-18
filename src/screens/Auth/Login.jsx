import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import CustomHeader from '../../components/CustomHeaders/CustomHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomHomeHeader from '../../components/CustomHeaders/CustomHomeHeader';
import { useNavigation } from '@react-navigation/native';
const Login = () => {
  const navigation = useNavigation();
  return (
    <View>
      <CustomHeader
        leftIcon={<Ionicons name="chevron-back" size={24} color="black" />}
        onLeftPress={() => navigation.goBack()}
      />
      <CustomHomeHeader
        showWelcomeText={false}
        showDescription={true}
        description="Manage your appointments and keep track of upcoming sessions with clients."
        username="Your Appointments"
        showUsername={true}
        usernameTextStyle={{ fontSize: width * 0.06 }}
        onNotificationPress={() =>
          navigation.navigate('all_notifications_screen')
        }
        contentContainerStyle={{ alignItems: 'flex-start' }}
      />
      <Ionicons name="home" size={30} color="red" />
      <Text>Login</Text>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
