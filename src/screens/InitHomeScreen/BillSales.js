import React from 'react';
import {
    Text, View, TextInput, TouchableOpacity, Dimensions, Keyboard,
    Image, StyleSheet, Platform, ScrollView, ImageBackground, AsyncStorage, Alert, Linking, Modal, KeyboardAvoidingView
} from 'react-native';
import { WHITE, BLACK, PRIMARY_COLOR, BACKGROUND_COLOR, LINEAR_START, GRAY_FONTCOLOR, BACKGROUND_GRAY_DESIGN, GREEN_FONTCOLOR, GREEN, GRAY_LIGHT } from '../../constant/Colors';
import { scale, scaleVertical } from '../../utils/Scale';
import { getString } from '../../utils/GetString';
import Header from '../../components/Header';
import ImageIcon from '../../components/ImageIcon';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { Item } from 'native-base';
import { color } from 'react-native-reanimated';
class BillSalse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           
        }
    }

    async componentDidMount() {
    }
    render() {
        let cost = this.props.route.params?.cost
        let costGoods = this.props.route.params?.costGoods
        let costSaleBill = this.props.route.params?.costSaleBill
        let costReturn = this.props.route.params?.costReturn
        let netRevenue = this.props.route.params?.netRevenue
        return (
            <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
                style={styles.container}>
                <Header
                    leftIcon={'arrow-left'}
                    onPressLeftIcon={() => this.props.navigation.pop()}
                    title={'Tổng quan'}
                ></Header>
                <ScrollView
                    contentContainerStyle={{ width: containerW, backgroundColor: WHITE }}
                    showsVerticalScrollIndicator={false}
                >

                    <TouchableOpacity
                        style={{ height: scale(50), width: '100%', backgroundColor: WHITE, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingLeft: scale(10), paddingRight: scale(10), borderBottomColor: BLACK, borderBottomWidth: scale(0.3) }}
                    >
                        <Text allowFontScaling={false} style={styles.textMediumBlackColorBold}>{'Doanh thu'}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text allowFontScaling={false} style={styles.textMediumBlackColorBold}>{cost}{'  '}</Text>
                            <Icon name='angle-right' size={scale(25)} color={GRAY_LIGHT} />
                        </View>

                    </TouchableOpacity>
                    <View
                        style={{ height: scale(50), width: '100%', backgroundColor: WHITE, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingLeft: scale(30), paddingRight: scale(30), borderBottomColor: BLACK, borderBottomWidth: scale(0.3) }}
                    >
                        <Text allowFontScaling={false} style={styles.textMediumBlackColor}>{'Tổng tiền hàng'}</Text>
                        <Text allowFontScaling={false} style={styles.textMediumBlackColor}>{costGoods}</Text>
                    </View>
                    <View
                        style={{ height: scale(50), width: '100%', backgroundColor: WHITE, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingLeft: scale(30), paddingRight: scale(30), borderBottomColor: BLACK, borderBottomWidth: scale(0.3) }}
                    >
                        <Text allowFontScaling={false} style={styles.textMediumBlackColor}>{'Giảm giá hóa đơn'}</Text>
                        <Text allowFontScaling={false} style={styles.textMediumBlackColor}>{costSaleBill}</Text>
                    </View>
                    <TouchableOpacity
                        style={{ height: scale(50), width: '100%', backgroundColor: WHITE, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingLeft: scale(10), paddingRight: scale(10), borderBottomColor: BLACK, borderBottomWidth: scale(0.3) }}
                    >
                        <Text allowFontScaling={false} style={styles.textMediumBlackColorBold}>{'Giá trị trả'}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text allowFontScaling={false} style={styles.textMediumBlackColorBold}>{costReturn}{'  '}</Text>
                            <Icon name='angle-right' size={scale(25)} color={GRAY_LIGHT} />
                        </View>

                    </TouchableOpacity>
                    <View
                        style={{ height: scale(50), width: '100%', backgroundColor: WHITE, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingLeft: scale(10), paddingRight: scale(30), borderBottomColor: BLACK, borderBottomWidth: scale(0.3) }}
                    >
                        <Text allowFontScaling={false} style={styles.textMediumBlackColorBold}>{'Doanh thu thuần'}</Text>
                        <Text allowFontScaling={false} style={styles.textMediumPrimaryColorBold}>{netRevenue}</Text>
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
    imageBackground: {
        width: containerW,
        height: containerH,
    },
    // styte text
    textSmallNormal: {
        fontSize: scale(13),
        fontWeight: 'normal'
    },
    textSmallNormalPrimarycolor: {
        fontSize: scale(13),
        fontWeight: 'normal',
        color: PRIMARY_COLOR,
    },
    textSmallNormalPrimarycolorSpecial1: {
        fontSize: scale(13),
        fontWeight: 'normal',
        color: PRIMARY_COLOR,
        width: '30%',
    },
    textSmallNormalBlackcolorSpecial2: {
        fontSize: scale(13),
        fontWeight: 'normal',
        color: BLACK,
        width: '70%',
    },
    textSmallBoldBlackcolor: {
        fontSize: scale(13),
        fontWeight: 'bold',
        color: BLACK
    },
    textSmallBold: {
        fontSize: scale(13),
        fontWeight: 'bold',
        color: BLACK
    },
    textareaContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: BACKGROUND_GRAY_DESIGN,
        borderRadius: scale(15)
    },
    textarea: {
        textAlignVertical: 'top',
        height: '100%',
        fontSize: scale(13),
        color: GRAY_FONTCOLOR,
        width: '100%',
        paddingLeft: scale(10),
        paddingTop: scale(10)
    },
    textMediumPrimaryColorCenter: {
        fontSize: scale(16),
        fontWeight: 'normal',
        color: PRIMARY_COLOR,
        textAlign: 'center',
    },
    textRedSmall: {
        color: '#EB5757',
        fontSize: scale(13)
    },
    textMediumNormalGray: {
        fontSize: scale(16),
        fontWeight: 'normal',
        color: GRAY_FONTCOLOR,
        fontStyle: 'italic'
    },
    textSmallNormalGray: {
        fontSize: scale(13),
        fontWeight: 'normal',
        color: GRAY_FONTCOLOR,
    },
    textAgliRightSmallNormalGray: {
        fontSize: scale(13),
        fontWeight: 'normal',
        color: GRAY_FONTCOLOR,
        fontStyle: 'italic',
        textAlign: 'right'
    },
    textSmallNormalLinearStart: {
        fontSize: scale(13),
        fontWeight: 'normal',
        color: LINEAR_START
    },
    textMediumPrimaryColor: {
        fontSize: scale(16),
        fontWeight: 'normal',
        color: PRIMARY_COLOR,
        alignItems: 'center'
    },
    textMediumPrimaryColorBold: {
        fontSize: scale(16),
        fontWeight: 'bold',
        color: PRIMARY_COLOR,
    },
    textBigPrimaryColorBold: {
        fontSize: scale(22),
        fontWeight: 'bold',
        color: PRIMARY_COLOR,
    },
    textMediumBlackColor: {
        fontSize: scale(16),
        fontWeight: 'normal',
        color: BLACK,
    },
    textMediumBlackColorBold: {
        fontSize: scale(16),
        fontWeight: 'bold',
        color: BLACK,
    },
    textHeaderPri: {
        fontSize: scale(30),
        fontWeight: 'bold',
        color: PRIMARY_COLOR,
    },
    textHeader: {
        fontSize: scale(20),
        fontWeight: 'bold',
        color: BLACK,
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

export default BillSalse;