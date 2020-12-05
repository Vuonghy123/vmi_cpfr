import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  LOGIN,
  HOME,
  BOTTOM_TAB,
  BILLSALES,
  BILLBRANCH
} from './RouteName';
import BottomTabNavigator from './BottomTabNavigator'
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import BillSalse from '../screens/InitHomeScreen/BillSales';
import BillBranch from '../screens/InitHomeScreen/BillBranch';

const Stack = createStackNavigator();
function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={LOGIN} headerMode={'none'}>
        <Stack.Screen name={LOGIN} component={LoginScreen} />
        <Stack.Screen name={HOME} component={HomeScreen} />
        <Stack.Screen name={BOTTOM_TAB} component={BottomTabNavigator} />
        <Stack.Screen name={BILLSALES} component={BillSalse} />
        <Stack.Screen name={BILLBRANCH} component={BillBranch} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default RootNavigator;
