import React from 'react';
import {
    Text, View, TextInput, TouchableOpacity, Dimensions, Keyboard,
    Image, StyleSheet, Platform, ScrollView, ImageBackground, AsyncStorage, Alert, Linking, Modal, KeyboardAvoidingView
} from 'react-native';
import { WHITE, BLACK, PRIMARY_COLOR, BACKGROUND_COLOR, PINK_FONTCOLOR, GRAY_FONTCOLOR, BACKGROUND_GRAY_DESIGN, GREEN_FONTCOLOR, GREEN, GRAY_LIGHT } from '../constant/Colors';
import { scale, scaleVertical } from '../utils/Scale';
import { getString } from '../utils/GetString';
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment';
import { Item } from 'native-base';

class NotificationScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: new Date(),
        }
        this.dataNoti = [
            {
                value: 1,
                lable: "Đang có hàng hóa vượt mức quy định tồn tại",
                branch: "Chi nhánh trung tâm.",
                time: moment(this.state.time).format('LT'),
            },
            {
                value: 1,
                lable: "Đang có hàng hóa sắp hết ở kho",
                branch: "Chi nhánh trung tâm.",
                time: moment(this.state.time).subtract(1, 'days').calendar(),
            },
            {
                value: 1,
                lable: "Đang có hàng hóa vượt mức quy định tồn tại",
                branch: "Chi nhánh trung tâm.",
                time: moment(this.state.time).subtract(2, 'days').calendar()
            }
        ]
    }

    async componentDidMount() {
    }

    renderNoti(id, name, branch, time) {
        return (
            <TouchableOpacity
                style={styles.container1}
            >
                <View style={{ flex: 2 }}>
                    <Icon name={'tag'} size={scale(30)} color={PINK_FONTCOLOR}></Icon>
                </View>
                <View style={{ flex: 8, alignItems: 'flex-start', justifyContent: 'center' }}>
                    <Text allowFontScaling={false} style={styles.textMediumBlackColor} numberOfLines={2}>{name}</Text>
                    <Text allowFontScaling={false} style={styles.textMediumBlackColor} numberOfLines={1}>{branch}</Text>
                    <View style={{ flexDirection: 'row', justifyContent:'flex-start', alignItems:'center' }}>
                        <Icon name={'clock'} size={scale(12)} color={BLACK}></Icon>
                        <Text allowFontScaling={false} style={styles.textSmallNormalGray}>{' '}{time}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
                style={styles.container}>
                <Header
                    title={'Thông báo'}
                ></Header>
                <ScrollView
                    contentContainerStyle={{ width: containerW, backgroundColor: WHITE }}
                    showsVerticalScrollIndicator={false}
                >
                    {
                        this.dataNoti.map((item, index) => {
                            return this.renderNoti(item?.value, item?.lable, item?.branch, item?.time)
                        })
                    }
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
        //justifyContent: 'space-between',
        alignItems: 'center', width: '100%',
        height: scale(100), paddingLeft: scale(15),
        paddingRight: scale(15),
        paddingTop: scale(10),
        paddingBottom: scale(10),
        borderBottomColor: BLACK,
        borderBottomWidth: scale(0.3),
        backgroundColor: GRAY_LIGHT
    },
    textMediumBlackColor: {
        fontSize: scale(16),
        fontWeight: 'normal',
        color: BLACK,
    },
    textBigPrimaryColorBold: {
        fontSize: scale(22),
        fontWeight: 'bold',
        color: PRIMARY_COLOR,
    },
    textSmallNormalGray: {
        fontSize: scale(13),
        fontWeight: 'normal',
        color: GRAY_FONTCOLOR,
    },

})

export default NotificationScreen;