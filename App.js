import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DashBoard from './screens/HomeScreen';
import FormScreen from './screens/FormScreen';
import ConneXion from './screens/Connexion';
import ChoxMenu from './screens/choixboard';
import OperateurAgricole from './screens/operateur';
import SignatureDrawing from './screens/signature_drawing';


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
        <Stack.Screen name="Enrôllement" component={FormScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
