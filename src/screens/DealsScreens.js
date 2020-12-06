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

class DealsScreen extends React.Component {
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
                    title={'Giao dịch'}
                ></Header>
                <ScrollView
                    contentContainerStyle={{ width: containerW, backgroundColor: WHITE }}
                    showsVerticalScrollIndicator={false}
                >
                    <TouchableOpacity
                        style={styles.container1}
                    >
                        <Icon name={'clipboard-check'} size={scale(30)} color={BLACK}></Icon>
                        <Text allowFontScaling={false} style={styles.textBigPrimaryColorBold}>{'Đặt hàng'}</Text>
                        <Icon name='angle-right' size={scale(25)} color={GRAY_FONTCOLOR} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.container1}
                    >
                        <Icon name={'file-alt'} size={scale(30)} color={BLACK}></Icon>
                        <Text allowFontScaling={false} style={styles.textBigPrimaryColorBold}>{'Hóa đơn'}</Text>
                        <Icon name='angle-right' size={scale(25)} color={GRAY_FONTCOLOR} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.container1}
                    >
                        <Icon name={'file-import'} size={scale(30)} color={BLACK}></Icon>
                        <Text allowFontScaling={false} style={styles.textBigPrimaryColorBold}>{'Vận đơn'}</Text>
                        <Icon name='angle-right' size={scale(25)} color={GRAY_FONTCOLOR} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.container1}
                    >
                        <Icon name={'window-close'} size={scale(30)} color={BLACK}></Icon>
                        <Text allowFontScaling={false} style={styles.textBigPrimaryColorBold}>{'Trả hàng'}</Text>
                        <Icon name='angle-right' size={scale(25)} color={GRAY_FONTCOLOR} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.container1}
                    >
                        <Icon name={'arrow-circle-up'} size={scale(30)} color={BLACK}></Icon>
                        <Text allowFontScaling={false} style={styles.textBigPrimaryColorBold}>{'Nhập hàng'}</Text>
                        <Icon name='angle-right' size={scale(25)} color={GRAY_FONTCOLOR} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.container1}
                    >
                        <Icon name={'times-circle'} size={scale(30)} color={BLACK}></Icon>
                        <Text allowFontScaling={false} style={styles.textBigPrimaryColorBold}>{'Trả nhập hàng'}</Text>
                        <Icon name='angle-right' size={scale(25)} color={GRAY_FONTCOLOR} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.container1}
                    >
                        <Icon name={'truck-moving'} size={scale(30)} color={BLACK}></Icon>
                        <Text allowFontScaling={false} style={styles.textBigPrimaryColorBold}>{'Chuyển hàng'}</Text>
                        <Icon name='angle-right' size={scale(25)} color={GRAY_FONTCOLOR} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.container1}
                    >
                        <Icon name={'exchange-alt'} size={scale(30)} color={BLACK}></Icon>
                        <Text allowFontScaling={false} style={styles.textBigPrimaryColorBold}>{'Xuất hủy'}</Text>
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
export default DealsScreen;