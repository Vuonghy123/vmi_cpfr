import * as React from 'react';
import {
    Image,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SCHEDULE, USER_INFO, MAP, EVENT, HOME, ERRORREPORT, CHAT, NOTIFICATION } from './RouteName';
import HomeScreen from '../screens/HomeScreen';
import ErrorReportScreen from '../screens/ErrorReportScreen';
import ScheduleScreen from '../screens/ScheduleScreens/ScheduleScreen';
import ChatScreen from '../screens/Chat/ChatScreen';
import EventScreen from '../screens/EventScreens/EventScreen';
import { size } from '../constant/CommonStyles';
import { BLACK, GRAY_FONTCOLOR, PRIMARY_COLOR, RED, WHITE } from '../constant/Colors';
import { scaleVertical } from '../constant/Scale';
import AccountScreen from '../screens/AccountSetting/AccountScreen';
import NotificationScreen from '../screens/Notification/NotificationScreen';
import { getString } from '../utils/GetString';
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
                    } else if (route.name === SCHEDULE) {
                        iconName = require('../res/images/tab_bar/historyPressed.png');
                        iconNameGray = require('../res/images/tab_bar/history.png');
                    } else if (route.name === USER_INFO) {
                        iconName = require('../res/images/tab_bar/userPressed.png');
                        iconNameGray = require('../res/images/tab_bar/user.png');
                    } else if (route.name === CHAT) {
                        iconName = require('../res/images/bottom_tab/noti_color.png');
                        iconNameGray = require('../res/images/bottom_tab/noti.png');
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
            <Tab.Screen name={HOME} component={HomeScreen} options={{ tabBarLabel: getString('COMMON_BOTTOM_TAB_HOME') }} />
            <Tab.Screen name={NOTIFICATION} component={NotificationScreen} options={{ tabBarLabel: getString('COMMON_BOTTOM_TAB_NOTIFICATION') }} />
            <Tab.Screen name={SCHEDULE} component={ScheduleScreen} options={{ tabBarLabel: getString('COMMON_BOTTOM_TAB_SCHEDULE') }} />
            <Tab.Screen name={USER_INFO} component={AccountScreen} options={{ tabBarLabel: getString('COMMON_BOTTOM_TAB_ACCOUNT') }} />
        </Tab.Navigator>
    );
}
