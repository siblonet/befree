import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DashBoard from './screens/HomeScreen';
import FormScreen from './screens/FormScreen';
import ConneXion from './screens/Connexion';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Compte">
        <Stack.Screen name="Compte" component={DashBoard} options={{
          headerShown: false
        }} />
        <Stack.Screen name="login" component={ConneXion} options={{
          headerShown: false
        }} />
        <Stack.Screen name="Enrôllement" component={FormScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
