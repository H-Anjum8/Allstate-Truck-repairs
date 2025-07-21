import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import Routes, { getAuthScreens, getProtectedScreens } from '../utils/routlist';
import { selectIsAuthenticated } from '../store/slices/authSlice';
import BottomNavigation from './BottomNavigation'; // ✅ Unified component
import BASE_COLORS from '../utils/colors';
import Login from '../screens/Auth/Login';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const [showSplash, setShowSplash] = useState(true);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: 'transparent',
            elevation: 0,
            shadowOpacity: 0,
          },
          contentStyle: { backgroundColor: BASE_COLORS.WHITE },
          gestureEnabled: false,
          headerBackTitleVisible: false,
        }}
      >
        {showSplash ? (
          <Stack.Screen
            name={Routes.Splash.name}
            component={Routes.Splash.component}
            options={Routes.Splash.options}
          />
        ) : !isAuthenticated ? (
          getAuthScreens().map(
            route =>
              route.name !== Routes.Splash.name && (
                <Stack.Screen
                  key={route.name}
                  name={route.name}
                  component={route.component}
                  options={route.options}
                />
              ),
          )
        ) : (
          <>
            <Stack.Screen
              name={Routes.Dashboard.name}
              component={Routes.Dashboard.component}
              options={Routes.Dashboard.options}
            />
            {getProtectedScreens()
              .filter(route => route.name !== 'dashboard')
              .map(route => (
                <Stack.Screen
                  key={route.name}
                  name={route.name}
                  component={route.component}
                  options={route.options}
                />
              ))}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
