import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DashBoard from './screens/HomeScreen';
import FormScreen from './screens/FormScreen';
import ConneXion from './screens/Connexion';
import DetailScreen from './screens/detailscreen';

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
        <Stack.Screen name="Détails" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
