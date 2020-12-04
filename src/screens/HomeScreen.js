import React from 'react';
import {
    Text, View, TextInput, TouchableOpacity, Dimensions, Keyboard,
    Image, StyleSheet, Platform, SafeAreaView, ImageBackground, AsyncStorage, Alert, Linking, Modal
} from 'react-native';
import { BACKGROUND_COLOR, BLACK, GRAY_FONTCOLOR, GREEN, GREEN_FONTCOLOR, PRIMARY_COLOR, RED, WHITE } from '../constant/Colors';
import { scale,  scaleVertical } from '../utils/Scale';
import { getString } from '../utils/GetString';
class HomeScreen extends React.Component {
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
            <View style={{width: containerW, height: containerH, backgroundColor: 'red'}}>

            </View>

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

export default HomeScreen;