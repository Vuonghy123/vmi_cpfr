import * as React from 'react';
import {
    Image,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HOME, STAFF, GOODS, DEALS, NOTIFICATION,PARTERS} from './RouteName';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import { size } from '../constant/CommonStyles';
import { GRAY_FONTCOLOR, PRIMARY_COLOR,WHITE } from '../constant/Colors';
import NotificationScreen from '../screens/NotificationScreen';
import DealsScreen from '../screens/DealsScreens';
import GoodsScreen from '../screens/GoodsScreen';
import PartersScreen from '../screens/PartersScreen';
const Tab = createBottomTabNavigator();
export default function BottomTabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color }) => {
                    let iconName;
                    let iconNameGray;
                    if (route.name === HOME) {
                        iconName = require('../res/images/tab_bar/homePressed.png');
                        iconNameGray = require('../res/images/tab_bar/home.png');
                    } else if (route.name === NOTIFICATION) {
                        iconName = require('../res/images/tab_bar/notiPressed.png');
                        iconNameGray = require('../res/images/tab_bar/noti.png');
                    } else if (route.name === DEALS) {
                        iconName = require('../res/images/tab_bar/hanghoaPressed.png');
                        iconNameGray = require('../res/images/tab_bar/hanghoa.png');
                    } else if (route.name === PARTERS) {
                        iconName = require('../res/images/tab_bar/userPressed.png');
                        iconNameGray = require('../res/images/tab_bar/user.png');
                    } else if (route.name === GOODS) {
                        iconName = require('../res/images/tab_bar/historyPressed.png');
                        iconNameGray = require('../res/images/tab_bar/history.png');
                    }
                    return (
                        <Image
                            style={focused ? size.smd : size.sm}
                            source={(focused ? iconName : iconNameGray)}
                            resizeMode={'contain'}
                        />

                    );
                },
            })}
            tabBarOptions={{
                inactiveTintColor: GRAY_FONTCOLOR,
                activeTintColor: PRIMARY_COLOR,
                style: {
                    shadowColor: PRIMARY_COLOR,
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    backgroundColor: WHITE,
                    elevation: 5,

                },
                labelPosition: 'below-icon',
                showLabel: true,
                showIcon: true,
                // labelStyle:{
                //     color:RED
                // }

            }}>
            <Tab.Screen name={HOME} component={HomeScreen} options={{ tabBarLabel: 'Tổng quan' }} />
            <Tab.Screen name={NOTIFICATION} component={NotificationScreen} options={{ tabBarLabel: 'Thông báo' }} />
            <Tab.Screen name={DEALS} component={DealsScreen} options={{ tabBarLabel: 'Giao dịch' }} />
            <Tab.Screen name={GOODS} component={GoodsScreen} options={{ tabBarLabel: 'Hàng hóa' }} />
            <Tab.Screen name={PARTERS} component={PartersScreen} options={{ tabBarLabel: 'Đối tác' }} />
        </Tab.Navigator>
    );
}
