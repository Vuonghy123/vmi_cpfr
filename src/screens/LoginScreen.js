import React from 'react';
import {
    Text, View, TextInput, TouchableOpacity, Dimensions, Keyboard,
    Image, StyleSheet, Platform, SafeAreaView, ImageBackground, AsyncStorage, Alert, Linking, Modal
} from 'react-native';
import { BACKGROUND_COLOR, BLACK, GRAY_FONTCOLOR, GREEN, GREEN_FONTCOLOR, PRIMARY_COLOR, RED, WHITE } from '../constant/Colors';
import { scale, scaleModerate, scaleVertical } from '../utils/Scale';
import { isLargePhone, windowHeight } from '../constant/Layout';
import Loading from '../components/Loading';
import Message from '../components/Message';
import ImageIcon from '../components/ImageIcon';
import { windowWidth } from '../constant/Layout';
import { getString } from '../utils/GetString';
import ButtonLinear from '../components/ButtonLinear';
import RNRestart from 'react-native-restart';
import { BOTTOM_TAB, HOME } from '../navigator/RouteName';

class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isLoading: false,
            responseError: null,
            isShowpassword: true,
            link: require('../res/images/login/eyes.png'),
            isShowButton: false,
            focusingInput: '',
            isRememberAccount: false,
            isOpenModalLanguage: false
        };
    }

    async componentDidMount() {
        let crediental = await AsyncStorage.getItem('crediental');
        let dataCrediental = JSON.parse(crediental)
        console.log(dataCrediental)
        if (dataCrediental) {
            console.log(dataCrediental)
            console.log('data crediental:', dataCrediental.username)
            await this.setState({
                ...this.state,
                username: dataCrediental.username,
                password: dataCrediental.password,
                isRememberAccount: true
            })
            console.log('state', this.state)
        }
    }

    _isFillInput() {
        return this.state.username && this.state.password
    }

    async _onPressLogin() {
        if (this._isFillInput()) {
            this.setState({ isLoading: true })
            Keyboard.dismiss();
            const data = {
                username: this.state.username,
                password: this.state.password
            };
            //const response = await login(data)
            this.setState({ isLoading: false })
            this.props.navigation.navigate(BOTTOM_TAB)

        } else {
            this.setState({
                responseError: {
                    data: {
                        message: getString('LOGINSCREEN_ALERT_FILL_ALL_INPUT')
                    }
                }
            })
        }

    }

    setPassword = () => {
        this.setState({ isShowpassword: !this.state.isShowpassword });
        this.state.isShowpassword ?
            this.setState({ link: require('../res/images/login/eyesClose.png') }) :
            this.setState({ link: require('../res/images/login/eyes.png') });
    }

    render() {
        return (
            <TouchableOpacity
                onPress={() => Keyboard.dismiss()}
                activeOpacity={1}
                style={styles.imageBackground}
            >

                <View style={{ height: '20%', width: '100%', justifyContent: 'center', alignItems: 'center', paddingTop: scale(10) }}>
                    <Image
                        source={require('../res/images/login/CPFR2.png')}
                        resizeMode="center"
                    />
                </View>
                <View style={{ height: '40%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ width: '80%', justifyContent: 'flex-start' }}>
                        <Text allowFontScaling={false} style={{ fontSize: scale(22), fontWeight: 'bold', color: PRIMARY_COLOR }}>{getString('LOGINSCREEN_TEXT_LOGIN')}</Text>
                    </View>
                    <TextInput
                        onFocus={() => {
                            this.setState({
                                ...this.state,
                                focusingInput: 'username'
                            })
                        }}
                        onChangeText={(username) =>
                            this.setState({
                                username: username,
                            })
                        }
                        value={this.state?.username}
                        style={[styles.textinputStyle, { marginBottom: scale(244 - 180 - 52), borderBottomWidth: this.state.focusingInput === 'username' ? scale(2) : scale(1), borderBottomColor: this.state.focusingInput === 'username' ? PRIMARY_COLOR : GRAY_FONTCOLOR, color: BLACK }]}
                        placeholder={getString('LOGINSCREEN_TEXTINPUT_USERNAME')}
                        placeholderTextColor={GRAY_FONTCOLOR}
                    ></TextInput>
                    <View style={{
                        width: '80%',
                        height: scale(47),
                        borderBottomWidth: this.state.focusingInput === 'password' ? scale(2) : scale(1),
                        flexDirection: 'row',
                        borderBottomColor: this.state.focusingInput === 'password' ? PRIMARY_COLOR : GRAY_FONTCOLOR
                    }}>
                        <TextInput
                            onFocus={() => {
                                this.setState({
                                    ...this.state,
                                    focusingInput: 'password'
                                })
                            }}
                            value={this.state?.password}
                            onChangeText={(password) =>
                                this.setState({
                                    password: password,
                                })
                            }
                            placeholderTextColor={GRAY_FONTCOLOR}
                            secureTextEntry={this.state.isShowpassword}
                            style={{
                                borderTopLeftRadius: scale(180),
                                borderBottomLeftRadius: scale(180),
                                height: '100%',
                                width: '80%',
                                fontSize: scale(13),
                                textAlign: 'left',
                                paddingVertical: scaleVertical(10),
                                color: BLACK,

                            }}
                            placeholder={getString('LOGINSCREEN_TEXTINPUT_PASSWORD')}
                        ></TextInput>
                        <TouchableOpacity
                            onPress={this.setPassword}
                            style={{
                                height: '100%',
                                width: '20%',
                                borderTopRightRadius: scale(180),
                                borderBottomRightRadius: scale(180),
                                justifyContent: 'center',
                                alignItems: 'center',
                                opacity: 0.5
                            }}
                        >
                            <Image
                                style={{ width: scale(20), height: scale(14) }}
                                source={this.state.link}
                            />

                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', height: scale(52), width: '80%', paddingTop: scale(10), marginTop: scale(10) }}>
                        <TouchableOpacity
                            onPress={() => {
                                this.setState({
                                    ...this.state,
                                    isRememberAccount: !this.state.isRememberAccount
                                })
                            }}
                            style={{ width: '60%', height: '100%', alignItems: 'flex-start', flexDirection: 'row' }}>
                            <ImageIcon
                                source={this.state.isRememberAccount ? require('../res/images/login/check.png') : require('../res/images/login/uncheck.png')}
                                size={scale(15)} extraStyle={{ marginRight: scale(5) }}></ImageIcon>
                            <Text allowFontScaling={false} style={{ color: PRIMARY_COLOR, fontWeight: 'bold', fontSize: scale(13) }}>{getString('LOGINSCREEN_TEXT_REMEMBER')}</Text>
                        </TouchableOpacity>
                        {/* <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.navigate(FORGET_PASSWORD)
                            }}
                            style={{ width: '40%', height: '100%', alignItems: 'flex-end' }}>
                            <Text allowFontScaling={false} style={{ color: PRIMARY_COLOR, fontWeight: 'bold', fontSize: scale(13) }}>{getString('FORGET_PASSWORD')}</Text>
                        </TouchableOpacity> */}
                    </View>
                    <View style={{ width: containerW, height: scale(47), justifyContent: 'center', alignItems: 'center' }}>
                        <ButtonLinear
                            text={getString('LOGINSCREEN_TEXT_LOGIN')}
                            onPress={() => this._onPressLogin()}
                        ></ButtonLinear>
                    </View>
                </View>
                <View style={{ height: '35%', width: '100%', justifyContent: 'center', alignItems: 'center', paddingBottom: scale(15) }}>
                    <Image source={require('../res/images/login/VMI.png')} />
                </View>
                {
                    this.state.isLoading ? <Loading /> : null
                }
                {
                    this.state.responseError !== null ? (
                        <Message
                            message={this.state.responseError?.data?.message !== getString('LOGINSCREEN_ALERT_FILL_ALL_INPUT') ? getString('LOGINSCREEN_ALERT_INCORRECT_USERNAME') : getString('LOGINSCREEN_ALERT_FILL_ALL_INPUT')}
                            close={() => {
                                this.setState({ responseError: null });
                            }}
                        />
                    ) : null
                }
                {
                    !this.state.isLoading ?
                        <TouchableOpacity
                            onPress={async () => {
                                this.setState({
                                    ...this.state,
                                    isOpenModalLanguage: true
                                })
                            }}
                            style={{ position: 'absolute', right: scale(10), bottom: scale(30) }}>
                            <ImageIcon source={require('../res/images/common/global.png')} size={scale(20)}></ImageIcon>
                        </TouchableOpacity>
                        : null}

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
                                        await AsyncStorage.setItem('language', 'english')
                                        RNRestart.Restart()
                                    }}
                                    style={{ backgroundColor: WHITE, width: windowWidth * 0.5, paddingTop: scale(15), paddingBottom: scale(15), justifyContent: 'center', alignItems: 'center', borderBottomWidth: scale(0.5), borderColor: GRAY_FONTCOLOR, borderTopLeftRadius: scale(10), borderTopRightRadius: scale(10) }}
                                >
                                    <Text allowFontScaling={false} style={{ fontSize: scale(16), color: PRIMARY_COLOR, fontWeight: '500' }}>English</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{ backgroundColor: WHITE, width: windowWidth * 0.5, paddingTop: scale(15), paddingBottom: scale(15), justifyContent: 'center', alignItems: 'center', borderBottomLeftRadius: scale(10), borderBottomRightRadius: scale(10) }}
                                    onPress={async () => {
                                        await AsyncStorage.setItem('language', 'vietnamese')
                                        RNRestart.Restart()
                                    }}
                                >
                                    <Text allowFontScaling={false} style={{ fontSize: scale(16), color: PRIMARY_COLOR, fontWeight: '500' }}>Tiếng Việt</Text>
                                </TouchableOpacity>

                            </TouchableOpacity>
                        </Modal> :
                        null
                }
            </TouchableOpacity>

        );
    }
}
const containerW = Dimensions.get('window').width;
const containerH = Dimensions.get('window').height;

const styles = StyleSheet.create({

    imageBackground: {
        width: containerW,
        height: containerH,
    },
    textinputStyle: {
        width: '80%',
        height: scale(47),
        fontSize: scale(13),
        textAlign: 'left',
        paddingVertical: scaleVertical(10),
        borderBottomWidth: scale(1),
    }
})

export default LoginScreen;