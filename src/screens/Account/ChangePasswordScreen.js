import React from 'react';
import {
    Text, View, TextInput, TouchableOpacity, Dimensions, Keyboard,
    Image, StyleSheet, AsyncStorage, placeholder, KeyboardAvoidingView, Platform
} from 'react-native';
import Header from '../../components/Header';
import { scale, scaleModerate, scaleVertical } from '../../utils/Scale';
import { WHITE, BLACK, BACKGROUND_COLOR, GRAY_FONTCOLOR } from '../../constant/Colors';
import Message from '../../components/Message';
import Loading from '../../components/Loading';
import ButtonLinear from '../../components/ButtonLinear';
import { getString } from '../../utils/GetString';
class ChangePasswordScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            passwordOld: '',
            isShowpasswordOld: true,
            passwordNew: '',
            isShowpasswordNew: true,
            passAgain: '',
            isShowpassAgain: true,
            link1: require('../../res/images/login/eyes.png'),
            link2: require('../../res/images/login/eyes.png'),
            link3: require('../../res/images/login/eyes.png'),
            isLoading: false,
            errorMessage: null,
            isOut: false
        }
    }
    setOldPassword = () => {
        this.setState({ isShowpasswordOld: !this.state.isShowpasswordOld });
        this.state.isShowpasswordOld ?
            this.setState({ link1: require('../../res/images/login/eyesClose.png') }) :
            this.setState({ link1: require('../../res/images/login/eyes.png') });
    }
    setNewPassword = () => {
        this.setState({ isShowpasswordNew: !this.state.isShowpasswordNew });
        this.state.isShowpasswordNew ?
            this.setState({ link2: require('../../res/images/login/eyesClose.png') }) :
            this.setState({ link2: require('../../res/images/login/eyes.png') });
    }
    setNewPassAgain = () => {
        this.setState({ isShowpassAgain: !this.state.isShowpassAgain });
        this.state.isShowpassAgain ?
            this.setState({ link3: require('../../res/images/login/eyesClose.png') }) :
            this.setState({ link3: require('../../res/images/login/eyes.png') });
    }
    async _onPressChange() {
        this.setState({ isLoading: true })
        Keyboard.dismiss();
        if (this.state?.passwordOld !== '') {
            if (this.state?.passwordNew !== '') {
                if (this.state?.passAgain !== '') {
                    if (this.state?.passwordOld === this.state?.passwordNew || this.state?.passwordOld === this.state?.passAgain) {
                        this.setState({
                            ...this.state,
                            errorMessage: {
                                message: getString('COMMON_ACCOUNT_SCREEN_CHANGE_PASSWORD_ALERT_OLD_NEW')
                            }
                        })
                    }
                    else if (this.state.passwordNew === this.state.passAgain) {
                        const data = {
                            oldPass: this.state.passwordOld,
                            newPass: this.state.passwordNew,
                        };
                        this.setState({ isOut: true })
                        this.setState({
                            ...this.state,
                            errorMessage: {
                                message: getString('COMMON_ACCOUNT_SCREEN_CHANGE_PASSWORD_ALERT_ONPRESS_SUCCESS')
                            }
                        })
                    }
                    else {
                        this.setState({
                            ...this.state,
                            errorMessage: {
                                message: getString('COMMON_ACCOUNT_SCREEN_CHANGE_PASSWORD_ALERT_FAILE_PASSWORD')
                            }
                        })
                    }
                }
                else {
                    this.setState({
                        ...this.state,
                        errorMessage: {
                            message: getString('COMMON_ACCOUNT_SCREEN_CHANGE_PASSWORD_ALERT_PASSWORD_AGAIN_FAILE')
                        }
                    })
                }
            }
            else {
                this.setState({
                    ...this.state,
                    errorMessage: {
                        message: getString('COMMON_ACCOUNT_SCREEN_CHANGE_PASSWORD_ALERT_PASSWORD_NEW_FAILE')
                    }
                })
            }
        }
        else {
            this.setState({
                ...this.state,
                errorMessage: {
                    message: getString('COMMON_ACCOUNT_SCREEN_CHANGE_PASSWORD_ALERT_PASSWORD_OLD_FAILE')
                }
            })
        }
        this.setState({ isLoading: false })
    }
    render() {
        return (
            <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
            >
                <Header
                    leftIcon={'arrow-left'}
                    onPressLeftIcon={() => this.props.navigation.pop()}
                    title={getString('COMMON_ACCOUNT_SCREEN_CHANGE_PASSWORD_TEXT_HEADER')}
                ></Header>
                <View style={styles.container}>
                    <View style={styles.cellStyle}>
                        <TextInput
                            placeholderTextColor={GRAY_FONTCOLOR}
                            onChangeText={(password) =>
                                this.setState({
                                    passwordOld: password,
                                })
                            }
                            secureTextEntry={this.state.isShowpasswordOld}
                            style={{
                                borderTopLeftRadius: scale(180),
                                borderBottomLeftRadius: scale(180),
                                height: '100%',
                                width: '80%',
                                fontSize: scale(13),
                                textAlign: 'left',
                                paddingVertical: scaleVertical(10),
                                paddingHorizontal: scaleModerate(15),
                                color: BLACK
                            }}
                            placeholder={getString('COMMON_ACCOUNT_SCREEN_CHANGE_PASSWORD_TEXTINPUT_PASSWORD_OLD')}
                        ></TextInput>
                        <TouchableOpacity
                            onPress={this.setOldPassword}
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
                                source={this.state.link1}
                            />

                        </TouchableOpacity>
                    </View>
                    <View style={styles.cellStyle}>
                        <TextInput
                            placeholderTextColor={GRAY_FONTCOLOR}
                            onChangeText={(password) =>
                                this.setState({
                                    passwordNew: password,
                                })
                            }
                            secureTextEntry={this.state.isShowpasswordNew}
                            style={{
                                borderTopLeftRadius: scale(180),
                                borderBottomLeftRadius: scale(180),
                                height: '100%',
                                width: '80%',
                                fontSize: scale(13),
                                textAlign: 'left',
                                paddingVertical: scaleVertical(10),
                                paddingHorizontal: scaleModerate(15),
                                color: BLACK
                            }}
                            placeholder={getString('COMMON_ACCOUNT_SCREEN_CHANGE_PASSWORD_TEXTINPUT_PASSWORD_NEW')}
                        ></TextInput>
                        <TouchableOpacity
                            onPress={this.setNewPassword}
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
                                source={this.state.link2}
                            />

                        </TouchableOpacity>
                    </View>
                    <View style={styles.cellStyle}>
                        <TextInput
                            placeholderTextColor={GRAY_FONTCOLOR}
                            onChangeText={(password) =>
                                this.setState({
                                    passAgain: password,
                                })
                            }
                            secureTextEntry={this.state.isShowpassAgain}
                            style={{
                                borderTopLeftRadius: scale(180),
                                borderBottomLeftRadius: scale(180),
                                height: '100%',
                                width: '80%',
                                fontSize: scale(13),
                                textAlign: 'left',
                                paddingVertical: scaleVertical(10),
                                paddingHorizontal: scaleModerate(15),
                                color: BLACK
                            }}
                            placeholder={getString('COMMON_ACCOUNT_SCREEN_CHANGE_PASSWORD_TEXTINPUT_PASSWORD_AGAIN')}
                        ></TextInput>
                        <TouchableOpacity
                            onPress={this.setNewPassAgain}
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
                                source={this.state.link3}
                            />

                        </TouchableOpacity>
                    </View>
                    <View style={{ width: containerW, height: scale(47), justifyContent: 'center', alignItems: 'center', marginTop: scale(15) }}>
                        <ButtonLinear
                            text={getString('COMMON_ACCOUNT_SCREEN_CHANGE_PASSWORD_BUTTON_UPDATE_PASSWORD')}
                            onPress={() => this._onPressChange()}
                        ></ButtonLinear>
                    </View>
                </View>
                {this.state.isLoading ? <Loading /> : null}
                {this.state.errorMessage !== null ?
                    this.state.isOut ? (
                        <Message
                            message={this.state.errorMessage.message}
                            close={() => {
                                this.setState({ errorMessage: null });
                                this.props.navigation.pop()
                            }}
                        />
                    )
                        : (<Message
                            message={this.state.errorMessage.message}
                            close={() => {
                                this.setState({ errorMessage: null });
                            }}
                        />
                        )
                    : null}
            </KeyboardAvoidingView>
        )
    }
}
const containerW = Dimensions.get('window').width;
const containerH = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container: {
        width: containerW,
        height: containerH,
        backgroundColor: BACKGROUND_COLOR,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    textinputStyle: {
        width: '90%',
        height: scale(47),
        backgroundColor: WHITE,
        borderRadius: scale(180),
        fontSize: scale(13),
        textAlign: 'left',
        paddingVertical: scaleVertical(10),
        paddingHorizontal: scaleModerate(15),

    },
    cellStyle: {
        width: '95%',
        height: scale(47),
        backgroundColor: WHITE,
        borderRadius: scale(180),
        flexDirection: 'row',
        marginTop: scale(15)
    }
})

export default ChangePasswordScreen;