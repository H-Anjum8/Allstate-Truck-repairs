import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import Routes, { getAuthScreens, getProtectedScreens } from '../utils/routlist';
import { selectIsAuthenticated } from '../store/slices/authSlice';
import BASE_COLORS from '../utils/colors';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

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
        {!isAuthenticated ? (
          getAuthScreens().map(route => (
            <Stack.Screen
              key={route.name}
              name={route.name}
              component={route.component}
              options={route.options}
            />
          ))
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
