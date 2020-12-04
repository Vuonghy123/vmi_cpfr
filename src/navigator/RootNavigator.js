import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  LOGIN,
  HOME
} from './RouteName';

import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';

const Stack = createStackNavigator();
function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={LOGIN} headerMode={'none'}>
        <Stack.Screen name={LOGIN} component={LoginScreen} />
        <Stack.Screen name={HOME} component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default RootNavigator;
