import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { scale, scaleModerate, scaleVertical } from '../../constant/Scale';
import { texts } from '../../constant/CommonStyles';
import * as COLOR from '../../constant/Colors';
import { PRIMARY_COLOR, WHITE, GRAY_LIGHT } from '../../constant/Colors';

import ImageIcon from '../ImageIcon';

const { width, height } = Dimensions.get('window');

export default class ItemAccount extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { iconLeftName, iconRightName, subTitle, title, canPress, iconLeftColor, iconStyle, extraInfo, extraInfoColor, isLastItem } = this.props;
    console.log(isLastItem)
    return (
      <TouchableOpacity
        disabled={!canPress}
        onPress={canPress ? () => this.props.onPress() : () => { }}
        style={[styles.container, { borderBottomLeftRadius: isLastItem ? scale(20) : 0, borderBottomRightRadius: isLastItem ? scale(20) : 0 }]}>
        <View style={iconStyle ? iconStyle : styles.icon}>
          <ImageIcon source={iconLeftName} size={scale(28)}
          />
        </View>
        <View style={styles.textArea}>
          {
            extraInfo ?
              <View style={styles.title}>
                <Text allowFontScaling={false} style={[texts.l_normal]}>{title}</Text>
                <Text allowFontScaling={false} style={[texts.l_bold, { color: extraInfoColor || COLOR.TEXT_LABEL }]}>
                  {extraInfo}
                </Text>
              </View> : <Text allowFontScaling={false} style={{ fontSize: scale(16), fontWeight: 'bold', color: PRIMARY_COLOR }}>{title}</Text>
          }
          {
            subTitle ? <Text allowFontScaling={false} style={styles.subTitle} numberOfLines={1}>{subTitle}</Text> : null
          }

        </View>
        {
          canPress ?
            <View style={{ flex: 0.7 }} >
              <ImageIcon source={require('../../res/images/home/arrow.png')}
                size={scale(16)}
              />
            </View> :
            <View style={{ flex: 0.5 }} />
        }
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: scaleVertical(14),
    flexDirection: 'row',
    borderTopColor: GRAY_LIGHT,
    borderTopWidth: scale(1),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: WHITE,

  },
  textArea: {
    flex: 7,
    paddingLeft: scaleModerate(8),
    justifyContent: 'center'
  },
  icon: {
    flex: 1,
    paddingLeft: scaleModerate(9),
    justifyContent: 'center',
    alignItems: 'center'

  },
  subTitle: {
    marginTop: scaleVertical(2),
    fontSize: scale(13),
    color: 'gray',
  },
  title: {
    flexDirection: 'row',
  },
});
