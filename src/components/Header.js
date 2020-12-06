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
import LinearGradient from 'react-native-linear-gradient';
import { PRIMARY_COLOR, RED, WHITE, LINEAR_START, LINEAR_END } from '../constant/Colors';
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
    return (
      <LinearGradient
        start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }}
        colors={[LINEAR_START, LINEAR_END]}
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
                <ImageIcon source={require('../res/images/common/back.png')} size={scaleModerate(22)} color={WHITE}/>
              </TouchableOpacity> :
              <View style={styles.buttonArea} />
          }

          <View style={{ width: windowWidth - headerHeight - headerHeight, height: headerHeight, justifyContent: 'center', alignItems: 'center' }}>

            <Text allowFontScaling={false} style={[texts.white_bold, { fontSize: scale(22), color: WHITE }]}>{title || 'NUll'}</Text>

          </View>


          {
            rightIcon ? rightIcon !== 'comment' ?

              <TouchableOpacity style={styles.buttonArea}
                onPress={() => this.props.onPressRightIcon()}>
                <Icon name={rightIcon} size={scaleModerate(22)} color={WHITE} />
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
      </LinearGradient>
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