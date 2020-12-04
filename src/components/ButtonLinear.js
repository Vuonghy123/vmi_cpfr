import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Platform
} from 'react-native';
const { width, height } = Dimensions.get('window');
const headerHeight = scaleVertical(50)
import { scaleModerate, scaleVertical, scale } from '../constant/Scale';
import LinearGradient from 'react-native-linear-gradient';
import { texts } from '../constant/CommonStyles';
import { WHITE, LINEAR_START, LINEAR_END } from '../constant/Colors';
export default class ButtonLinear extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <TouchableOpacity
                onPress={this.props.onPress}
                disabled={this.props.disabled || false}
                style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', borderRadius: scale(180) }}
            >
                <LinearGradient
                    start={{ x: 0, y: 0.75 }} end={{ x: 1, y: 0.25 }}
                    colors={[LINEAR_START, LINEAR_END]}
                    style={{ width: '95%', height: '100%', borderRadius: scale(180), justifyContent: 'center', alignItems: 'center' }}
                >
                    <Text allowFontScaling={false} style={{ fontSize: scale(16), color: WHITE, fontWeight: 'bold' }}>{this.props.text || 'OK'}</Text>
                </LinearGradient>
            </TouchableOpacity>
        );
    }
}

