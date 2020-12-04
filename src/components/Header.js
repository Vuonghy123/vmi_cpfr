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
import { statusBarHeight, windowWidth } from '../constant/Layout';
import * as COLOR from '../constant/Colors'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { scaleModerate, scaleVertical, scale } from '../constant/Scale';
import { texts } from '../constant/CommonStyles';
import ImageIcon from './ImageIcon';
import { PRIMARY_COLOR, RED, WHITE } from '../constant/Colors';
import { isLargePhone } from '../constant/Layout';
const { width, height } = Dimensions.get('window');
const headerHeight = scaleVertical(60)
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPressBack: false
    }
  }

  render() {
    const { leftIcon, title, rightIcon, screenPopUpFromRightIcon } = this.props;
    // 'arrow-left'
    let canPress = false;
    if (this.props.canPress === true) {
      canPress = true;
    }
    return (
      <TouchableOpacity
        disabled={!canPress}
        onPress={() => this.props.onPressHeader()}
        style={styles.container}
      >
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
              this.props.logo ?
                <View
                  style={styles.buttonArea}>
                  <ImageIcon source={{ uri: this.props?.logo }} size={scaleModerate(35)} color={COLOR.WHITE} />
                </View>
                :
                <View style={styles.buttonArea} />
          }

          <View style={{ width: windowWidth - headerHeight - headerHeight, height: headerHeight, justifyContent: 'center', alignItems: 'center' }}>

            <Text allowFontScaling={false} style={[texts.white_bold, { fontSize: scale(22), color: PRIMARY_COLOR }]}>{title || 'Edukite'}</Text>

          </View>


          {
            rightIcon ? rightIcon !== 'comment' ?

              <TouchableOpacity style={styles.buttonArea}
                onPress={() => this.props.onPressRightIcon()}>
                <Icon name={rightIcon} size={scaleModerate(22)} color={COLOR.WHITE} />
              </TouchableOpacity> :
              <TouchableOpacity style={styles.buttonArea}
                onPress={() => this.props.onPressRightIcon()}>
                <ImageIcon size={scale(22)} source={require('../res/images/home/chat.png')}>
                </ImageIcon>
                {
                  this.props.count ? <View style={{ width: scale(10), height: scale(10), borderRadius: scale(999), backgroundColor: RED, position: 'absolute', bottom: isLargePhone ? scale(20) : scale(15), right: isLargePhone ? scale(20) : scale(13) }}></View> : null
                }
              </TouchableOpacity>
              : <View style={styles.buttonArea} />
          }
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: width,
    height: Platform.OS === 'ios' ? headerHeight + scale(20) : headerHeight,
    backgroundColor: COLOR.PRIMARY_COLOR,
    paddingTop: Platform.OS === 'ios' ? statusBarHeight : 0,
    backgroundColor: WHITE
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

export default Header;