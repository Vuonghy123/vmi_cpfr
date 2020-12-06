import React from 'react';
import {
    Text, View, TextInput, TouchableOpacity, Dimensions, Keyboard,
    Image, StyleSheet, Platform, ScrollView, ImageBackground, AsyncStorage, Alert, Linking, Modal, KeyboardAvoidingView
} from 'react-native';
import { WHITE, BLACK, PRIMARY_COLOR, BACKGROUND_COLOR, LINEAR_START, GRAY_FONTCOLOR, BACKGROUND_GRAY_DESIGN, GREEN_FONTCOLOR, GREEN, GRAY_LIGHT } from '../constant/Colors';
import { scale, scaleVertical } from '../utils/Scale';
import { getString } from '../utils/GetString';
import Header from '../components/Header';
import ImageIcon from '../components/ImageIcon';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { Item } from 'native-base';
import { color } from 'react-native-reanimated';
import { BILLBRANCH, BILLSALES,ACCOUNT } from '../navigator/RouteName';
class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fillId: 4,
            fillName: 'Tháng này',
            modalFill: false,
            cost: 142890000,
            costReturn: 0,
            costSaleBill: 0,
            numberBill: 46,
            numberReturn: 0,
            order: 0,
            numberOrder: 0,
            inventory: 28160600,
            numberInventory: 464,
            isSale: true,
        };
        this.arrFill = [
            {
                value: 1,
                lable: '7 ngày qua'
            },
            {
                value: 2,
                lable: 'Tuần này'
            },
            {
                value: 3,
                lable: 'Tuần trước'
            },
            {
                value: 4,
                lable: 'Tháng này'
            },
            {
                value: 5,
                lable: 'Tháng trước'
            },
            {
                value: 6,
                lable: 'Tùy chọn...'
            },
        ]
        this.dataTopSale = [
            {
                name: 'Threalene - Alimemazine5mg- Sanofi - H2Vx20 Viên',
                cost: 29750000,
                numberInventory: 105,
            },
            {
                name: 'Threalene - Alimemazine5mg- Sanofi - H2Vx20 Viên',
                cost: 29750000,
                numberInventory: 105,
            },
            {
                name: 'Threalene - Alimemazine5mg- Sanofi - H2Vx20 Viên',
                cost: 29750000,
                numberInventory: 105,
            },
            {
                name: 'Threalene - Alimemazine5mg- Sanofi - H2Vx20 Viên',
                cost: 29750000,
                numberInventory: 105,
            },
            {
                name: 'Threalene - Alimemazine5mg- Sanofi - H2Vx20 Viên',
                cost: 29750000,
                numberInventory: 105,
            },
            {
                name: 'Threalene - Alimemazine5mg- Sanofi - H2Vx20 Viên',
                cost: 29750000,
                numberInventory: 105,
            },
            {
                name: 'Threalene - Alimemazine5mg- Sanofi - H2Vx20 Viên',
                cost: 29750000,
                numberInventory: 105,
            },
            {
                name: 'Threalene - Alimemazine5mg- Sanofi - H2Vx20 Viên',
                cost: 29750000,
                numberInventory: 105,
            },
            {
                name: 'Threalene - Alimemazine5mg- Sanofi - H2Vx20 Viên',
                cost: 29750000,
                numberInventory: 105,
            },
            {
                name: 'Threalene - Alimemazine5mg- Sanofi - H2Vx20 Viên',
                cost: 29750000,
                numberInventory: 105,
            }
        ]
    }

    async componentDidMount() {
    }
    renderFillItem(id, name) {
        return (
            <TouchableOpacity
                style={{ width: '100%', height: scale(40), justifyContent: 'center', alignItems: 'center' }}
                onPress={() => this.setState({
                    ...this.state,
                    modalFill: false,
                    fillId: id,
                    fillName: name
                })}
            >
                <Text allowFontScaling={false} style={styles.textMediumBlackColor}>{name}</Text>
            </TouchableOpacity>
        )
    }
    renderTopSale(name, cost) {
        return (
            <View style={{ width: '100%', height: scale(80), backgroundColor: WHITE, borderBottomColor: BLACK, borderBottomWidth: scale(0.3), flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flex: 2 }}>
                    <ImageIcon size={scale(25)} source={require('../res/parent_images/home/class/absent.png')} />
                </View>
                <View style={{ flex: 10 }}>
                    <Text allowFontScaling={false} numberOfLines={3} style={styles.textMediumBlackColorBold}>{name}</Text>
                </View>
                <View style={{ flex: 3 }}>
                    <Text allowFontScaling={false} numberOfLines={3} style={styles.textMediumBlackColor}>{cost}</Text>
                </View>
            </View>
        )
    }
    renderTopNumber(name, number) {
        return (
            <View style={{ width: '100%', height: scale(80), backgroundColor: WHITE, borderBottomColor: BLACK, borderBottomWidth: scale(0.3), flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flex: 2 }}>
                    <ImageIcon size={scale(25)} source={require('../res/parent_images/home/class/absent.png')} />
                </View>
                <View style={{ flex: 10 }}>
                    <Text allowFontScaling={false} numberOfLines={3} style={styles.textMediumBlackColorBold}>{name}</Text>
                </View>
                <View style={{ flex: 3 }}>
                    <Text allowFontScaling={false} numberOfLines={3} style={styles.textMediumBlackColor}>{number}</Text>
                </View>
            </View>
        )
    }
    render() {
        return (
            <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
                style={styles.container}>
                <Header
                    navigation={this.props.navigation}
                    back={false}
                    title={'Tổng quan'}
                    rightIcon={'user-cog'}
                    onPressRightIcon={() => this.props.navigation.navigate(ACCOUNT)}
                ></Header>
                <ScrollView
                    contentContainerStyle={{ width: containerW, backgroundColor: WHITE }}
                    showsVerticalScrollIndicator={false}
                >

                    <TouchableOpacity
                        style={{ height: scale(40), width: '100%', backgroundColor: GRAY_LIGHT, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', paddingLeft: scale(15) }}
                        onPress={() => this.setState({ modalFill: true })}
                    >
                        <Icon name={'calendar'} size={scale(25)} color={PRIMARY_COLOR}></Icon>
                        <Text allowFontScaling={false} style={styles.textMediumBlackColorBold}>{'  '}{this.state.fillName}{'  '}</Text>
                        <ImageIcon size={scale(25)} source={require('../res/parent_images/request/ic_arrowdown.png')}></ImageIcon>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate(BILLSALES, {
                            cost: this.state.cost,
                            costGoods: this.state.cost,
                            costSaleBill: this.state.costSaleBill,
                            costReturn: this.state.costReturn,
                            netRevenue: this.state.cost,
                        })}
                    >
                        <View style={{ width: '100%', backgroundColor: WHITE, paddingLeft: scale(15), marginTop: scale(20), flexDirection: 'row', alignItems: 'center', }}>
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end' }}>
                                <Text allowFontScaling={false} style={styles.textHeaderPri}>{this.state.cost > 1000000 ? this.state.cost / 1000000 : this.state.cost}</Text>
                                <Text allowFontScaling={false} style={styles.textSmallBoldBlackcolor}>{' triệu'}</Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end' }}>
                                <Text allowFontScaling={false} style={styles.textHeaderPri}>{this.state.costReturn}</Text>
                                <Text allowFontScaling={false} style={styles.textSmallBoldBlackcolor}>{' đồng'}</Text>
                            </View>
                            <View style={{ position: 'absolute', right: scale(5), end: scale(0) }}>
                                <Icon name='angle-right' size={scale(25)} color={GRAY_FONTCOLOR} />
                            </View>
                        </View>

                        <View style={{ width: '100%', backgroundColor: WHITE, paddingLeft: scale(15), marginTop: scale(5), flexDirection: 'row', alignItems: 'center', }}>
                            <View style={{ flex: 1 }}>
                                <Text allowFontScaling={false} style={styles.textMediumBlackColor}>{this.state.numberBill}{' Hóa đơn'}</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text allowFontScaling={false} style={styles.textMediumBlackColor}>{this.state.numberReturn}{' Phiếu trả'}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ width: '100%', height: scale(65), alignItems: 'center', backgroundColor: GRAY_LIGHT, flexDirection: 'row', marginTop: scale(10), justifyContent: 'space-between', alignItems: 'center', paddingLeft: scale(15), paddingRight: scale(5), borderBottomColor: BLACK, borderBottomWidth: scale(0.3) }}
                    >
                        <View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text allowFontScaling={false} style={styles.textMediumBlackColor}>{'Đặt hàng '}</Text>
                                <Text allowFontScaling={false} style={styles.textBigPrimaryColorBold}>{this.state.order}</Text>
                            </View>
                            <Text allowFontScaling={false} style={styles.textSmallNormalGray}>{this.state.numberOrder}{' phiếu'}</Text>
                        </View>
                        <View>
                            <Icon name='angle-right' size={scale(25)} color={GRAY_FONTCOLOR} />
                        </View>
                    </TouchableOpacity>
                    <View
                        style={{ width: '100%', height: scale(65), alignItems: 'flex-start', justifyContent: 'center', backgroundColor: GRAY_LIGHT, paddingLeft: scale(15), }}
                    >

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text allowFontScaling={false} style={styles.textMediumBlackColor}>{'Tồn kho '}</Text>
                            <Text allowFontScaling={false} style={styles.textBigPrimaryColorBold}>{this.state.inventory}</Text>
                        </View>
                        <Text allowFontScaling={false} style={styles.textSmallNormalGray}>{this.state.numberInventory}{' sản phẩm'}</Text>
                    </View>
                    <TouchableOpacity
                        style={{ width: '100%', height: scale(65), alignItems: 'center', backgroundColor: WHITE, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingLeft: scale(15), paddingRight: scale(5) }}
                        onPress={() => this.props.navigation.navigate(BILLBRANCH, {
                            fillDate: this.state.fillName,
                            costSale: this.state.cost,
                            costReturn: this.state.costReturn,
                            netRevenue: this.state.cost,
                            inventory: this.state.inventory,
                            nameBranch: 'Chi nhánh trung tâm',
                        })}
                    >
                        <Text allowFontScaling={false} style={styles.textMediumBlackColor}>{'Doanh thu chi theo chi nhánh'}</Text>
                        <View>
                            <Icon name='angle-right' size={scale(25)} color={GRAY_FONTCOLOR} />
                        </View>
                    </TouchableOpacity>
                    <View style={{ width: '100%', height: scale(10), backgroundColor: GRAY_LIGHT }}></View>
                    <View style={{ width: '100%', padding: scale(15) }}>
                        <Text allowFontScaling={false} style={styles.textSmallNormalLinearStart}>{'Top 10 hàng bán chạy'}</Text>
                        <View style={{ width: '100%', marginTop: scale(10), flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', borderBottomColor: GRAY_FONTCOLOR, borderBottomWidth: scale(0.3) }}>
                            <TouchableOpacity
                                style={{
                                    justifyContent: 'center', alignItems: 'center', borderBottomColor: PRIMARY_COLOR,
                                    borderBottomWidth: this.state.isSale ? scale(2) : scale(0),
                                    width: '35%', height: scale(40),
                                }}
                                onPress={() => this.setState({ isSale: true })}
                                disabled={this.state.isSale}
                            >
                                <Text allowFontScaling={false} style={{ fontSize: scale(16), color: this.state.isSale ? BLACK : GRAY_FONTCOLOR }}>{'Theo doanh thu'}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    justifyContent: 'center', alignItems: 'center', borderBottomColor: PRIMARY_COLOR,
                                    borderBottomWidth: !this.state.isSale ? scale(2) : scale(0),
                                    width: '35%', height: scale(40),
                                }}
                                onPress={() => this.setState({ isSale: false })}
                                disabled={!this.state.isSale}
                            >
                                <Text allowFontScaling={false} style={{ fontSize: scale(16), color: !this.state.isSale ? BLACK : GRAY_FONTCOLOR }}>{'Theo số lượng'}</Text>
                            </TouchableOpacity>
                        </View>
                        {
                            this.state.isSale ?
                                this.dataTopSale.map((item, index) => {
                                    return this.renderTopSale(item?.name, item?.cost)
                                })
                                :
                                this.dataTopSale.map((item, index) => {
                                    return this.renderTopNumber(item?.name, item?.numberInventory)
                                })
                        }
                    </View>
                    {
                        this.state.modalFill ?
                            <View style={{ position: 'absolute', left: 0, top: 0, width: scale(120), height: scale(240), backgroundColor: WHITE }}>
                                {
                                    this.arrFill.map((item, index) => {
                                        return this.renderFillItem(item.value, item.lable)
                                    })
                                }
                            </View>
                            : null
                    }
                    <View style={{ height: scaleVertical(60) }}></View>
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

export default HomeScreen;