import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import UsersScreen from './screens/UsersScreen';
import ShowsScreen from './screens/ShowsScreen';
import AdvsScreen from './screens/AdvsScreen';

const Tab = createMaterialTopTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Користувачі" component={UsersScreen} />
        <Tab.Screen name="TV передачі" component={ShowsScreen} />
        <Tab.Screen name="Реклама" component={AdvsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
