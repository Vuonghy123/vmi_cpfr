import React from 'react';
import {
    Text, View, TextInput, TouchableOpacity, Dimensions, Keyboard,
    Image, StyleSheet, Platform, ScrollView, ImageBackground, AsyncStorage, Alert, Linking, Modal, KeyboardAvoidingView
} from 'react-native';
import { WHITE, BLACK, PRIMARY_COLOR, BACKGROUND_COLOR, LINEAR_START, GRAY_FONTCOLOR, BACKGROUND_GRAY_DESIGN, GREEN_FONTCOLOR, GREEN, GRAY_LIGHT } from '../constant/Colors';
import { scale, scaleVertical } from '../utils/Scale';
import { getString } from '../utils/GetString';
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/FontAwesome5'

class PartersScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    async componentDidMount() {
    }
    render() {
        return (
            <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
                style={styles.container}>
                <Header
                    title={'Đối tác'}
                ></Header>
                <ScrollView
                    contentContainerStyle={{ width: containerW, backgroundColor: WHITE }}
                    showsVerticalScrollIndicator={false}
                >
                    <TouchableOpacity
                        style={styles.container1}
                    >
                        <Icon name={'user-friends'} size={scale(30)} color={GRAY_FONTCOLOR}></Icon>
                        <Text allowFontScaling={false} style={styles.textBigPrimaryColorBold}>{'Khách hàng'}</Text>
                        <Icon name='angle-right' size={scale(25)} color={GRAY_FONTCOLOR} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.container1}
                    >
                        <Icon name={'file-invoice-dollar'} size={scale(30)} color={GRAY_FONTCOLOR}></Icon>
                        <Text allowFontScaling={false} style={styles.textBigPrimaryColorBold}>{'Nhà cung cấp'}</Text>
                        <Icon name='angle-right' size={scale(25)} color={GRAY_FONTCOLOR} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.container1}
                    >
                        <Icon name={'shipping-fast'} size={scale(30)} color={GRAY_FONTCOLOR}></Icon>
                        <Text allowFontScaling={false} style={styles.textBigPrimaryColorBold}>{'Đối tác giao hàng'}</Text>
                        <Icon name='angle-right' size={scale(25)} color={GRAY_FONTCOLOR} />
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView >

        );
    }
}
const containerW = Dimensions.get('window').width;
const containerH = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        width: containerW,
        backgroundColor: BACKGROUND_COLOR,
        alignItems: 'center'
    },
    container1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center', width: '100%',
        height: scale(60), paddingLeft: scale(10),
        paddingRight: scale(10),
        borderBottomColor: BLACK,
        borderBottomWidth: scale(0.3)
    },
    textBigPrimaryColorBold: {
        fontSize: scale(22),
        fontWeight: 'bold',
        color: PRIMARY_COLOR,
    },

})
export default PartersScreen;