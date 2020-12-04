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
import ButtonLinear from './ButtonLinear';
import { getString } from '../utils/GetString';
class Message extends PureComponent {
    render() {
        const { title, message, textButton, customMarginTop } = this.props;
        return (
            <Modal
                animationType={'fade'}
                transparent={true}
            >
                <View style={[styles.container, { marginTop: 0 }]}>
                    <View style={[styles.messageArea, { paddingVertical: scaleVertical(20) }]}>
                        <Text allowFontScaling={false} style={[texts.h3, { fontWeight: 'bold' }]}>{title || getString('COMMON_BOTTOM_TAB_NOTIFICATION')}</Text>
                        <Text allowFontScaling={false} style={[texts.normal, { marginVertical: scaleVertical(10), fontSize: scale(16),width:'95%' }]}>{message || ''}</Text>
                        <View
                            style={{
                                width: '100%',
                                height: scale(45),
                                borderRadius: scaleModerate(40),
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <ButtonLinear
                                onPress={() => this.props.close()}
                                text={textButton || 'OK'}
                            />
                        </View>


                    </View>
                </View>
            </Modal>
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
        paddingLeft: scale(5),
        paddingRight: scale(5),
        
    },
    messageArea: {
        backgroundColor: COLOR.WHITE,
        borderRadius: scaleModerate(15),
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    button: {
        backgroundColor: COLOR.PRIMARY_COLOR,
        borderRadius: 6,
        height: scale(38),
        justifyContent: 'center',
        ...shadow.sm,
        marginTop: scaleVertical(10),
        marginBottom: scaleVertical(8)
    }
});

export default Message
