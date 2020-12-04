import React from 'react';
import {
    Text, View, TextInput, TouchableOpacity, Dimensions, Keyboard,
    Image, StyleSheet, Platform, SafeAreaView, ImageBackground, AsyncStorage, Alert, Linking, Modal
} from 'react-native';
import { BACKGROUND_COLOR, BLACK, GRAY_FONTCOLOR, GREEN, GREEN_FONTCOLOR, PRIMARY_COLOR, RED, WHITE } from '../constant/Colors';
import { scale, scaleVertical } from '../utils/Scale';
import { getString } from '../utils/GetString';
import Header from '../components/Header';
class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    async componentDidMount() {
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
            <View style={{ backgroundColor: BACKGROUND_COLOR }}>
                <Header
                    navigation={this.props.navigation}
                    back={false}
                    title={'Tổng quan'}
                ></Header>
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