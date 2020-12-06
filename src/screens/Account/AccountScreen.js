import React from 'react';
import { View, Dimensions, StyleSheet, SectionList, AsyncStorage, Alert, Text, Linking, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { scale, scaleVertical } from '../../constant/Scale';
import { statusBarHeight, windowHeight, windowWidth } from '../../constant/Layout';
import { LOGIN, CHANGEPASS, CENTERSCREEN } from '../../navigator/RouteName';
import ItemAccount from '../../components/account/ItemAccount';
import Header from '../../components/Header';
import { GRAY_FONTCOLOR, PRIMARY_COLOR, WHITE } from '../../constant/Colors';
import { CommonActions } from '@react-navigation/native';
import { getString } from '../../utils/GetString';
import RNRestart from 'react-native-restart';
import { cancelableNotificationAlert } from '../../utils/CustomAlert'
class AccountScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            monitorInfo: null,
            isOpenModalLanguage: false
        }
        this.itemList = [
            {
                section: 1,
                data: [
                    {
                        iconLeftName: require('../../res/images/account/ThongTinCaNhan.png'),
                        title: getString('COMMON_ACCOUNT_SCREEN_USER_INFO'),
                        subTitle: getString('COMMON_ACCOUNT_SCREEN_SUBTITLE_USERINFO'),
                        onPress: () => this.props.navigation.navigate(CENTERSCREEN),
                        canPress: true,
                    },
                    {
                        iconLeftName: require('../../res/images/account/secure.png'),
                        title: getString('COMMON_ACCOUNT_SCREEN_ACCOUNT_SECURITY'),
                        subTitle: getString('COMMON_ACCOUNT_SCREEN_SUBTITLE_ACCOUNT_SECURITY'),
                        onPress: () => this.gotoChangPassword(),
                        iconLeftColor: PRIMARY_COLOR,
                        canPress: true,
                    },
                    {
                        iconLeftName: require('../../res/images/account/instructions.png'),
                        title: getString('COMMON_ACCOUNT_SCREEN_USER_GUIDE'),
                        subTitle: getString('COMMON_ACCOUNT_SCREEN_SUBTITLE_USER_GUIDE'),
                        onPress: async () => {
                            
                        },
                        iconLeftColor: PRIMARY_COLOR,
                        canPress: true,
                    },
                    {
                        iconLeftName: require('../../res/images/account/settings.png'),
                        title: getString('COMMON_ACCOUNT_SCREEN_USER_INFO_SCREN_LANGUAGE'),
                        onPress: () => this.changeLanguage(),
                        iconLeftColor: PRIMARY_COLOR,
                        canPress: true,
                    },
                    {
                        iconLeftName: require('../../res/images/account/logout.png'),
                        title: getString('COMMON_ACCOUNT_SCREEN_LOGOUT'),
                        subTitle: '',
                        onPress: () => this.gotoLogout(),
                        iconLeftColor: '#5fc0dc',
                        canPress: true,
                        isLastItem: true
                    }
                ],
            },

        ];
    };

    changeLanguage = async () => {
        this.setState({
            ...this.state,
            isOpenModalLanguage: true
        })
        // RNRestart.Restart()
    }
    gotoChangPassword = () => {
        this.props.navigation.navigate(CHANGEPASS)
    };
    async _logout() {
            this.props.navigation.dispatch(
                CommonActions.reset({
                    index: 1,
                    routes: [{ name: LOGIN }],
                }),
            );

    }
    gotoLogout = () => {
        Alert.alert(
            getString('COMMON_BOTTOM_TAB_NOTIFICATION'),
            getString('COMMON_ACCOUNT_SCREEN_ACCOUNT_SECURITY_SCREEN_ALERT_ONPRESS_LOGOUT'),
            [
                { text: getString('COMMON_TEXT_CANCEL'), onPress: () => console.log('cancel') },
                {
                    text: getString('COMMON_ACCOUNT_SCREEN_LOGOUT'), onPress: () => this._logout()
                },
            ],
            { cancelable: false }
        )
    }
    render() {
        console.log('language:' + this.state.language)
        return (
            <View style={styles.container}>
                <Header
                    // rightIcon={'comment'}
                    // onPressRightIcon={() => this.props.navigation.navigate(CHAT)}
                    leftIcon={'arrow-left'}
                    onPressLeftIcon={() => this.props.navigation.pop()}
                    title={getString('COMMON_ACCOUNT_SCREEN_TEXT_HEADER')} />
                <ScrollView style={{ width: containerW * 0.95, marginTop: scale(5) }}>
                    <SectionList
                        scrollEnabled={false}
                        keyExtractor={(item, index) => item + index}
                        sections={this.itemList}
                        renderItem={({ item }) =>
                            <ItemAccount
                                {...this.props}
                                iconLeftName={item.iconLeftName}
                                title={item.title}
                                canPress={item.canPress}
                                subTitle={item.subTitle}
                                onPress={() => item.onPress()}
                                extraInfo={item.extraInfo}
                                extraInfoColor={item.extraInfoColor}
                                iconLeftColor={item.iconLeftColor}
                                isLastItem={item?.isLastItem || false}
                            />
                        }
                        renderSectionHeader=
                        {
                            ({ section: { section } }) =>
                                (
                                    <View style={{ width: containerW, height: scaleVertical(1) }} />
                                )
                        }
                    />
                </ScrollView>

                {
                    this.state.isOpenModalLanguage ?
                        <Modal
                            animationType={'fade'}
                            transparent={true}>
                            <TouchableOpacity
                                activeOpacity={1}
                                onPress={() => {
                                    this.setState({
                                        ...this.state,
                                        isOpenModalLanguage: false
                                    })
                                }}
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: "#00000099",
                                    position: "absolute",
                                    width: windowWidth,
                                    height: windowHeight,
                                }}>
                                <TouchableOpacity
                                    onPress={async () => {
                                        cancelableNotificationAlert(getString('COMMON_BOTTOM_TAB_NOTIFICATION'), getString('ALERT_CHANGE_LANGUAGE'), async () => {
                                            await AsyncStorage.setItem('language', 'english')

                                            RNRestart.Restart()
                                        })
                                    }}
                                    style={{ backgroundColor: WHITE, width: windowWidth * 0.5, paddingTop: scale(15), paddingBottom: scale(15), justifyContent: 'center', alignItems: 'center', borderBottomWidth: scale(0.5), borderColor: GRAY_FONTCOLOR, borderTopLeftRadius: scale(10), borderTopRightRadius: scale(10) }}
                                >
                                    <Text allowFontScaling={false} style={{ fontSize: scale(16), color: PRIMARY_COLOR, fontWeight: '500' }}>English</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{ backgroundColor: WHITE, width: windowWidth * 0.5, paddingTop: scale(15), paddingBottom: scale(15), justifyContent: 'center', alignItems: 'center', borderBottomLeftRadius: scale(10), borderBottomRightRadius: scale(10) }}
                                    onPress={async () => {
                                        cancelableNotificationAlert(getString('COMMON_BOTTOM_TAB_NOTIFICATION'), getString('ALERT_CHANGE_LANGUAGE'), async () => {
                                            await AsyncStorage.setItem('language', 'vietnamese')

                                            RNRestart.Restart()
                                        })
                                    }}
                                >
                                    <Text allowFontScaling={false} style={{ fontSize: scale(16), color: PRIMARY_COLOR, fontWeight: '500' }}>Tiếng Việt</Text>
                                </TouchableOpacity>

                            </TouchableOpacity>
                        </Modal> :
                        null
                }

            </View>
        );
    }
}

const containerW = Dimensions.get('window').width;
const containerH = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container: {
        width: containerW,
        height: containerH,
        alignItems: 'center'
    },
    header: {
        width: containerW,
        height: containerH / 13,
        backgroundColor: '#C71585',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: statusBarHeight / 1.5,
    },
    body1: {
        width: containerW,
        height: containerH / 6.7,
        marginTop: '2%',
        flexDirection: 'row',
        backgroundColor: 'white',
    },
    headerTitle: {
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: scale(16),
    },
    infoArea: {
        flex: 8,
        flexDirection: 'row',
        marginBottom: scale(5),
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: scale(20),
    },
});


export default AccountScreen;
