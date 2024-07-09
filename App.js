import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DashBoard from './screens/HomeScreen';
import EnrollerOperateurAgricole from './screens/FormScreen';
import ConneXion from './screens/Connexion';
import ChoxMenu from './screens/choixboard';
import OperateurAgricole from './screens/operateur';
import SignatureDrawing from './screens/signature_drawing';
import Explotation_Agricole from './screens/explotation_agricole';

import Travailleur from './screens/travailleur';
import Proprierteur_Explotation_Agricole from './screens/proprieteur';
import Inspecteur from './screens/inspaction';

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

        <Stack.Screen name="Option sur Opérateur" component={ChoxMenu} options={{
          headerShown: false
        }} />

        <Stack.Screen name="signature" component={SignatureDrawing} options={{
          headerShown: false
        }} />

        <Stack.Screen name="Détail sur l'opérateur" component={OperateurAgricole} options={{
          headerShown: false
        }} />

        <Stack.Screen name="ExplotationAgricole" component={Explotation_Agricole} options={{
          headerShown: false
        }} />
        <Stack.Screen name="Enrollement" component={EnrollerOperateurAgricole} options={{
          headerShown: false
        }} />

        <Stack.Screen name="Inspecteur" component={Inspecteur} options={{
          headerShown: false
        }} />
        <Stack.Screen name="ProExp_Agr" component={Proprierteur_Explotation_Agricole} options={{
          headerShown: false
        }} />
        <Stack.Screen name="Travailleur" component={Travailleur} options={{
          headerShown: false
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
