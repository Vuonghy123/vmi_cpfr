import React, { PureComponent } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Modal,
    Dimensions
} from 'react-native';
import { scaleModerate, scaleVertical } from '../utils/Scale';
import * as Layout from '../constant/Layout';
import * as COLOR from '../constant/Colors';
import { shadow, texts } from '../constant/CommonStyles';
import { scale } from '../constant/Scale';
import { PRIMARY_COLOR } from '../constant/Colors';
import { getString } from '../utils/GetString';
class Note extends PureComponent {
    constructor(props) {
        this.state.isChoose = false;
    }
    setIsChoose() {
        this.setState({ isChoose: !this.state.isChoose })
    }
    render() {
        const { title, message, textButton } = this.props;
        return (
            <View style={styles.container}>
                <View style={[styles.messageArea, { paddingVertical: scaleVertical(20), paddingHorizontal: scaleModerate(15) }]}>
                    <Text allowFontScaling={false} style={texts.h3}>{title || getString('COMMON_BOTTOM_TAB_NOTIFICATION')}</Text>
                    <Text allowFontScaling={false} style={[texts.normal, { marginVertical: scaleVertical(10) }]}>{message || ''}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity
                            onPress={() => this.setIsChoose()}>
                            <View
                                style={{
                                    width: containerW * 0.3,
                                    height: scale(45),
                                    borderRadius: scaleModerate(40),
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: PRIMARY_COLOR,
                                }}>
                                <Text allowFontScaling={false} style={[texts.normal, { color: COLOR.WHITE }]}>{getString('MONITOR_REASON_UNCHECKSCREEN_TEXT_HEADER')}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.props.close()}>
                            <View
                                style={{
                                    width: containerW * 0.3,
                                    height: scale(45),
                                    borderRadius: scaleModerate(40),
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: PRIMARY_COLOR,
                                    marginLeft: containerW * 0.1,
                                }}>
                                <Text allowFontScaling={false} style={[texts.normal, { color: COLOR.WHITE }]}>{textButton || getString('COMMON_TEXT_CANCEL')}</Text>
                            </View>
                        </TouchableOpacity>
                        {

                        }
                    </View>
                </View>
            </View>
        )
    }
}
const containerW = Dimensions.get('window').width;
const containerH = Dimensions.get('window').height;
const { width, height } = Layout.window;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#00000099",
        position: "absolute",
        width: width,
        height: height,
    },
    messageArea: {
        backgroundColor: COLOR.WHITE,
        borderRadius: scaleModerate(5),
        width: '80%'
    },
    button: {
        backgroundColor: COLOR.PRIMARY_COLOR,
        borderRadius: 6,
        height: scaleModerate(38),
        justifyContent: 'center',
        ...shadow.sm,
        marginTop: scaleVertical(10),
        marginBottom: scaleVertical(8)
    }
});

export default Note;
