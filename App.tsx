import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import UsersScreen from './screens/UsersScreen';
import ShowsScreen from './screens/ShowsScreen';

const Tab = createMaterialTopTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Користувачі" component={UsersScreen} />
        <Tab.Screen name="TV передачі" component={ShowsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
