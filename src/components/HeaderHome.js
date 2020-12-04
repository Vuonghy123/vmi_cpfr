import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Platform,
    Image
} from 'react-native';
import { statusBarHeight } from '../constant/Layout';
import * as COLOR from '../constant/Colors'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { scaleModerate, scaleVertical, scale } from '../constant/Scale';
import { texts } from '../constant/CommonStyles';
import { CommonActions } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { PRIMARY_COLOR } from '../constant/Colors';
import ImageIcon from './ImageIcon';
const { width, height } = Dimensions.get('window');
const headerHeight = scaleVertical(50)

export default class HeaderHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPressBack: false
        }
    }

    render() {
        const { leftIcon, title, rightIcon, screenPopUpFromRightIcon } = this.props;
        // 'arrow-left'
        return (
            <LinearGradient
                start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 0.1 }}
                colors={['#3C86FB', '#3BCEFD', '#FFF887']}
                style={styles.container}
            >
                <Image
                    style={{ position: 'absolute', width: scale(45), height: scale(45), right: 0 }}
                    source={require('../res/images/common/kite.png')}></Image>
                <View style={styles.headerContent}>
                    {
                        leftIcon ?
                            <TouchableOpacity
                                disabled={this.state.isPressBack}
                                onPress={async () => {
                                    if (leftIcon === 'arrow-left') {
                                        await this.setState({
                                            ...this.state,
                                            isPressBack: true
                                        })
                                        this.props.onPressLeftIcon();
                                    }
                                    else {
                                        this.props.onPressLeftIcon()
                                    }
                                }}
                                style={styles.buttonArea}>
                                <ImageIcon source={require('../res/images/common/back.png')} size={scaleModerate(22)} color={COLOR.WHITE} />
                            </TouchableOpacity> :
                            <View style={styles.buttonArea} />
                    }

                    <Text allowFontScaling={false} style={[texts.white_bold, { fontSize: scale(16), color: PRIMARY_COLOR }]}>{title || 'Edukite'}</Text>
                    {
                        rightIcon ? rightIcon !== 'comment' ?
                            <TouchableOpacity style={styles.buttonArea}
                                onPress={() => this.props.onPressRightIcon()}>
                                <Icon name={rightIcon} size={scaleModerate(22)} color={COLOR.WHITE} />
                            </TouchableOpacity> :
                            <TouchableOpacity style={styles.buttonArea}
                                onPress={() => this.props.onPressRightIcon()}>
                                <ImageIcon size={scale(22)} source={require('../res/images/home/chat.png')}></ImageIcon>
                            </TouchableOpacity>
                            : <View style={styles.buttonArea} />
                    }
                </View>
            </LinearGradient >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: width,
        height: Platform.OS === 'ios' ? headerHeight + scale(20) : headerHeight,
        backgroundColor: COLOR.PRIMARY_COLOR,
        paddingTop: Platform.OS === 'ios' ? statusBarHeight : 0
    },
    headerContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    buttonArea: {
        height: headerHeight,
        width: headerHeight,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
