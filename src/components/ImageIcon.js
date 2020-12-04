import React, { PureComponent } from 'react';
import { View, Image } from 'react-native';
import FastImage from 'react-native-fast-image';
export default class ImageIcon extends PureComponent {
    render() {
        return (
            <FastImage
                style={[{ width: this.props.size || 30, height: this.props.size || 30, marginRight: this.props.marginRight || 0 }, this.props.extraStyle || {}]}
                source={this.props.source || require('../res/images/chat/send.png')}
                
            />
        )
    }
}