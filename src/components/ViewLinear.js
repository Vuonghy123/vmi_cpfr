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
import { WHITE, LINEAR_START, LINEAR_END, PRIMARY_COLOR } from '../constant/Colors';
export default class ViewLinear extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <LinearGradient
                start={{ x: 0, y: 0.75 }} end={{ x: 1, y: 0.25 }}
                colors={this.props.linearColors || [LINEAR_START, LINEAR_END]}
                style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', borderTopLeftRadius: this.props.borderTopRadius || 0, borderTopRightRadius: this.props.borderTopRadius || 0 }}
            >
                <Text allowFontScaling={false} style={{ fontSize: this.props.fontSize || scale(15), fontWeight: 'bold', color: PRIMARY_COLOR }}>{this.props.title || ''}</Text>
            </LinearGradient>
        );
    }
}

