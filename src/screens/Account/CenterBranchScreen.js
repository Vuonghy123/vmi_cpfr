import React from 'react';
import {
    Text, View, TextInput, TouchableOpacity, Dimensions, Keyboard,
    Image, StyleSheet, Platform, ScrollView, ImageBackground, AsyncStorage, Alert, Linking, Modal, KeyboardAvoidingView
} from 'react-native';
import { WHITE, BLACK, PRIMARY_COLOR, BACKGROUND_COLOR, BORDER, TEXT_GRAY, BACKGROUND_GRAY_DESIGN, GREEN_FONTCOLOR, GREEN, GRAY_LIGHT } from '../../constant/Colors';
import { scale, scaleVertical } from '../../utils/Scale';
import { getString } from '../../utils/GetString';
import Header from '../../components/Header';
import Icon from 'react-native-vector-icons/FontAwesome5'
import ImageIcon from '../../components/ImageIcon';
class CenterBranhScreen extends React.Component {
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
                    leftIcon={'arrow-left'}
                    onPressLeftIcon={() => this.props.navigation.pop()}
                    title={'Công ty TNHH Đức Vượng'}
                ></Header>
                <ScrollView
                    contentContainerStyle={{ width: containerW, backgroundColor: WHITE }}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={{ width: '100%', height: scale(130), justifyContent: 'center', alignItems: 'center' }}>
                        <View
                            style={{ width: scale(100), height: scale(100), borderRadius: scale(999) }}
                        >
                            <ImageIcon source={require('../../res/images/account/account.png')} size={scale(100)} />
                        </View>

                        <TouchableOpacity style={{ position: 'absolute', right: scale(15), top: scale(15) }}
                        //onPress={() => this.props.navigation.navigate(EDITMONITORINFO)}
                        >
                            <ImageIcon source={require('../../res/images/account/edit.png')} size={scale(25)} ></ImageIcon>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: '95%' }}>
                        <View style={[styles.row, { borderTopLeftRadius: scale(25), borderTopRightRadius: scale(25) }]}>
                            <View style={{ height: '100%', width: '50%', justifyContent: 'center', alignItems: 'flex-start' }}>
                                <Text allowFontScaling={false} style={styles.textKey}>{'Cơ sở'}</Text>
                            </View>
                            <View style={{ height: '100%', width: '50%', justifyContent: 'center', alignItems: 'flex-end' }}>
                                <Text allowFontScaling={false} style={styles.textValue}>{'Chi nhánh trung tâm'}</Text>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={{ height: '100%', width: '50%', justifyContent: 'center', alignItems: 'flex-start' }}>
                                <Text allowFontScaling={false} style={styles.textKey}>{'Địa chỉ'}</Text>
                            </View>
                            <View style={{ height: '100%', width: '50%', justifyContent: 'center', alignItems: 'flex-end' }}>
                                <Text allowFontScaling={false} style={styles.textValue}>{'ĐH Bách Khoa HN'}</Text>
                            </View>
                        </View>
                        <View style={[styles.row, { borderBottomLeftRadius: scale(25), borderBottomRightRadius: scale(25), borderBottomColor: WHITE }]}>
                            <View style={{ height: '100%', width: '40%', justifyContent: 'center', alignItems: 'flex-start' }}>
                                <Text allowFontScaling={false} style={styles.textKey}>{'Email'}</Text>
                            </View>
                            <View style={{ height: '100%', width: '60%', justifyContent: 'center', alignItems: 'flex-end' }}>
                                <Text allowFontScaling={false} style={styles.textValue}>{'Ducvuongpharma@gmail.com'}</Text>
                            </View>
                        </View>
                    </View>
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
    frames: {
        width: '100%',
        height: scale(70),
    },
    row: {
        height: scale(55),
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderBottomColor: BORDER,
        backgroundColor: WHITE,
        paddingLeft: scale(10),
        paddingRight: scale(10),
    },
    textKey: {
        color: TEXT_GRAY,
        fontSize: scale(16),
        fontWeight: 'normal',
        fontStyle: 'italic'
    },
    textValue: {
        color: PRIMARY_COLOR,
        fontSize: scale(16),
    },

})
export default CenterBranhScreen;