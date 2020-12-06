import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  LOGIN,
  HOME,
  BOTTOM_TAB,
  BILLSALES,
  BILLBRANCH,
  ACCOUNT,
  CHANGEPASS,
  CENTERSCREEN
} from './RouteName';
import BottomTabNavigator from './BottomTabNavigator'
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import BillSalse from '../screens/InitHomeScreen/BillSales';
import BillBranch from '../screens/InitHomeScreen/BillBranch';
import AccountScreen from '../screens/Account/AccountScreen';
import ChangePasswordScreen from '../screens/Account/ChangePasswordScreen';
import CenterBranhScreen from '../screens/Account/CenterBranchScreen';

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
        <Stack.Screen name={ACCOUNT} component={AccountScreen} />
        <Stack.Screen name={CHANGEPASS} component={ChangePasswordScreen} />
        <Stack.Screen name={CENTERSCREEN} component={CenterBranhScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default RootNavigator;
