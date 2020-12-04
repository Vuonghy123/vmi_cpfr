import React from 'react';
import { Text, View, TextInput, TouchableOpacity, Dimensions, Keyboard, Image, StyleSheet, Platform, SafeAreaView, PermissionsAndroid, AsyncStorage } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout, PROVIDER_DEFAULT, Polyline } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { scale } from '../utils/Scale';
import { connect } from 'react-redux';
import { PAPER, WHITE, GREEN, PRIMARY_COLOR, RED, GRAY_FONTCOLOR, BLACK } from '../constant/Colors';
import { getScheduleInfo } from '../actions/ScheduleActions';
import Loading from './Loading';
import { CommonActions } from '@react-navigation/native';
import { LOGIN, ATTENDANCE, SCHEDULEGOING, REPORTLATE, QR_SCAN_FINISH_SCREEN,REPORTLATEANDROID } from '../navigator/RouteName';
import { scaleModerate } from '../constant/Scale';
import moment from 'moment';
import { Toast } from 'native-base';
import ImageIcon from './ImageIcon';
import { notificationAlert } from '../utils/CustomAlert';
import { CHAT_URL } from '../constant/EndPoint';
import { getString } from '../utils/GetString';
class GoogleMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            latitudeDelta: 0.03,
            longitudeDelta: 0.03,
        };
    }
    async componentDidMount() {
        await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
        const hasLocationPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
        Geolocation.getCurrentPosition(
            (position) => {
                let initialRegion = {
                    // latitude: 21.028511,
                    // longitude: 105.804817,
                    latitude: position.coords.latitude || 21.028511,
                    longitude: position.coords.longitude || 105.804817,
                    latitudeDelta: this.state.latitudeDelta,
                    longitudeDelta: this.state.longitudeDelta,
                }
                this.setState({
                    initialRegion
                })
            },
            (error) => {
                console.log(JSON.stringify(error));
            },
            { enableHighAccuracy: true, timeout: 5000, maximumAge: 10000 }
        );
        this.watchId = Geolocation.watchPosition((position) => {
            let lastRegion = {
                // latitude: 21.028511,
                // longitude: 105.804817,
                latitude: position.coords.latitude || 21.028511,
                longitude: position.coords.longitude || 105.804817,
                latitudeDelta: this.state.latitudeDelta,
                longitudeDelta: this.state.longitudeDelta,
            }
            this.setState({
                initialRegion: lastRegion
            })
        })
    }
    componentWillUnmount() {
        Geolocation.clearWatch(this.watchId)
    }
    async _tokenInvalidFunction() {
        Toast.show({
            text: getString('EXPIRED_LOGIN_SESSION_ALERT'),
            position: "bottom",
            duration: 3000
        })
        await AsyncStorage.removeItem('token');
        this.props.navigation.dispatch(
            CommonActions.reset({
                index: 1,
                routes: [{ name: LOGIN }],
            }),
        );
    }
    _renderMarkers(lat, long, name, status, index) {
        //1: nha => truong
        let isHomeToSchool = this.props?.scheduleInfo?.data[0]?.directionId === 1;
        let endPoint = 'default_uncolor.png'
        let color = 'black';
        let isSkipped = false;
        let imageSouceIndex = index + 1;
        if (status === 'not-yet') {
            color = 'Ongoing';
        } else if (status === 'arrived') {
            color = 'Next'
        } else if (status === 'skipped') {
            color = 'Skipped'
        } else if (status === 'left') {
            color = 'complete'
        } else {
            color = 'Skipped'
        }
        if (index === 0) {
            imageSouceIndex = ''
            if (isHomeToSchool) {
                color = color + 'Home'
            } else {
                color = color + 'School'
            }
        }
        if (index === this.props?.stops?.length - 1) {
            imageSouceIndex = ''
            if (!isHomeToSchool) {
                color = color + 'Home'
            } else {
                color = color + 'School'
            }
        }
        endPoint = color + imageSouceIndex
        let url_location = 'https://chat.edukite.asia/' + 'static/icon-map/MapIcon_' + endPoint + '.png'
        console.log(url_location)
        return (
            <Marker
                coordinate={{
                    latitude: lat,
                    longitude: long,
                }}

            >
                <ImageIcon size={scale(40)} source={{ uri: url_location }}></ImageIcon>
                <Callout>
                    <View style={{ width: scale(100), justifyContent: 'center', alignItems: 'center' }}>
                        <Text allowFontScaling={false} style={{ fontSize: scale(13), fontWeight: 'bold', color: PRIMARY_COLOR, textAlign: 'center' }}>{name}</Text>
                    </View>
                </Callout>
            </Marker>
        )
    }
    render() {
        // not-yet arrived skip left
        if (this.props.scheduleInfo && this.props.nextStop && this.props.totalEarly && this.props.totalCheckIn && this.props.totalCheckOut) {
            if (this.props.scheduleInfo?.code === 0 && this.props.nextStop?.code === 0 && this.props.totalEarly?.code === 0 && this.props.totalCheckOut?.code === 0 && this.props.totalCheckIn?.code === 0) {
                let realScheduleInfo = this.props?.scheduleInfo?.data[0]
                let nextStop = this.props?.nextStop?.data[0]
                let totalEarly = this.props?.totalEarly?.data;
                let totalCheckIn = this.props?.totalCheckIn?.data;
                let totalCheckOut = this.props?.totalCheckOut?.data;
                let coordinate = []
                this.props.stops.map((item, index) => {
                    coordinate.push({
                        latitude: item?.latitude,
                        longitude: item?.longtitude
                    })
                })
                return (
                    <View style={StyleSheet.absoluteFillObject}>
                        <MapView style={StyleSheet.absoluteFillObject}
                            region={this.state?.initialRegion}
                            provide={PROVIDER_GOOGLE}
                            showsUserLocation={true}
                            loadingEnabled={true}
                            showsMyLocationButton={true}
                        >

                            {
                                this.props.stops.map((item, index) => {
                                    let latitude = item.latitude ? item.latitude : 0
                                    let longtitude = item.longtitude ? item.longtitude : 0
                                    return this._renderMarkers(latitude, longtitude, item.stopName, item.arrival, index)
                                })
                            }
                            <Polyline
                                coordinates={coordinate}
                                strokeColor={PRIMARY_COLOR} // fallback for when `strokeColors` is not supported by the map-provider

                                strokeWidth={3}
                            >

                            </Polyline>
                        </MapView>
                        <View style={{ position: 'absolute', top: scale(0), width: '100%', height: scale(50), backgroundColor: WHITE, borderColor: PRIMARY_COLOR, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderTopWidth: scale(0.5), borderTopColor: GRAY_FONTCOLOR }}>
                            <View style={{ height: '100%', width: '25%', justifyContent: 'center', alignItems: 'center' }}>
                                {
                                    realScheduleInfo?.directionId !== 1 ?
                                        <View style={{ flex: 0.9, justifyContent: 'flex-start', alignItems: 'center', paddingLeft: scale(10), flexDirection: 'row' }}>
                                            <ImageIcon marginRight={scale(3)} size={scale(30)} source={require('../res/images/home/school.png')}></ImageIcon>
                                            <ImageIcon marginRight={scale(3)} size={scale(13)} source={require('../res/images/home/arrow.png')}></ImageIcon>
                                            <ImageIcon size={scale(30)} source={require('../res/images/home/home.png')}></ImageIcon>
                                        </View>
                                        :
                                        <View style={{ flex: 0.9, justifyContent: 'flex-start', alignItems: 'center', paddingLeft: scale(10), flexDirection: 'row' }}>
                                            <ImageIcon marginRight={scale(3)} size={scale(30)} source={require('../res/images/home/home.png')}></ImageIcon>
                                            <ImageIcon marginRight={scale(3)} size={scale(13)} source={require('../res/images/home/arrow.png')}></ImageIcon>
                                            <ImageIcon size={scale(30)} source={require('../res/images/home/school.png')}></ImageIcon>
                                        </View>
                                }
                            </View>

                            <View style={{ height: '100%', width: '25%', justifyContent: 'center', alignItems: 'center' }}>
                                <Text allowFontScaling={false} style={{ fontSize: scale(13), color: PRIMARY_COLOR, fontWeight: 'bold' }}>{getString('COMMON_SCHEDULE_SCREEN_TEXT_GETIN')}:</Text>
                                <Text allowFontScaling={false} style={{ fontSize: scale(13), color: PRIMARY_COLOR, fontWeight: 'bold', marginTop: scale(5) }}>{totalCheckIn?.realNumber || 0}/{totalCheckIn?.expectNumber || 0}</Text>
                            </View>
                            <View style={{ height: '100%', width: '25%', justifyContent: 'center', alignItems: 'center' }}>
                                <Text allowFontScaling={false} style={{ fontSize: scale(13), color: PRIMARY_COLOR, fontWeight: 'bold' }}>{getString('COMMON_SCHEDULE_SCREEN_TEXT_GETOUT')}:</Text>
                                <Text allowFontScaling={false} style={{ fontSize: scale(13), color: PRIMARY_COLOR, fontWeight: 'bold', marginTop: scale(5) }}>{totalCheckOut?.realNumber || 0}/{totalCheckOut?.expectNumber || 0}</Text>
                            </View>
                            <View style={{ height: '100%', width: '25%', justifyContent: 'center', alignItems: 'center' }}>
                                <Text allowFontScaling={false} style={{ fontSize: scale(13), color: PRIMARY_COLOR, fontWeight: 'bold' }}>{getString('MONITOR_MAPS_SCREEN_ONBUS')}:</Text>
                                <Text allowFontScaling={false} style={{ fontSize: scale(13), color: PRIMARY_COLOR, fontWeight: 'bold', marginTop: scale(5) }}> {this?.props?.listStudentOnBus?.data.length || 0}</Text>
                            </View>

                        </View>
                        <View style={{ position: 'absolute', width: scale(180), height: scale(65), backgroundColor: WHITE, top: scale(60), left: scale(30), borderWidth: scale(0.5), borderRadius: scale(20), borderColor: GRAY_FONTCOLOR }}>
                            <View style={{ width: '100%', height: '40%', justifyContent: 'center', alignItems: 'center' }}>
                                <Text allowFontScaling={false} numberOfLines={2} style={{ fontSize: scale(13), fontWeight: 'bold', color: PRIMARY_COLOR }}>
                                    {realScheduleInfo?.scheduleStatusId === 2 ? getString('MONITOR_HOMESCREEN_TEXT_STATUS_GOING') : realScheduleInfo?.scheduleStatusId !== 3 ? getString('MONITOR_HOMESCREEN_TEXT_STATUS_COMMING') : getString('MONITOR_HOMESCREEN_TEXT_STATUS_END')}
                                </Text>
                            </View>

                            <View style={{ width: '100%', height: '60%', justifyContent: 'flex-start', alignItems: 'center', paddingLeft: scale(10) }}>
                                <Text allowFontScaling={false} numberOfLines={2} style={{ fontSize: scale(13), color: GRAY_FONTCOLOR }}>{getString('COMMON_SCHEDULE_SCREEN_TEXT_STOPNAME_NEXTSTOP')}: {(nextStop?.name) ? nextStop?.name : getString('NULL')} ({(nextStop?.arrivalTime) ? moment(nextStop?.arrivalTime).format('h:mm A') : getString('UNKNOW')}) </Text>
                            </View>
                        </View>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate(ATTENDANCE, {
                                initialScreen: 0
                            })}
                            style={{ position: 'absolute', top: scale(60), right: scale(10), backgroundColor: WHITE, width: scale(45), height: scale(45), borderRadius: scale(999), borderWidth: scale(2), borderColor: BLACK, justifyContent: 'center', alignItems: 'center' }} >
                            <ImageIcon source={require('../res/images/home/attendance.png')}></ImageIcon>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate(ATTENDANCE, {
                                initialScreen: 1
                            })}
                            style={{ position: 'absolute', top: scale(distance * 2 + heightButton + scale(55)), right: scale(10), backgroundColor: WHITE, width: scale(45), height: scale(45), borderRadius: scale(999), borderWidth: scale(2), justifyContent: 'center', alignItems: 'center', borderColor: BLACK }}>
                            <ImageIcon source={require('../res/images/home/checkOutEarly.png')}></ImageIcon>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate(SCHEDULEGOING)}
                            style={{
                                position: 'absolute', top: scale(distance * 3 + heightButton * 2 + scale(60)), right: scale(10), backgroundColor: WHITE, width: scale(45), height: scale(45), borderRadius: scale(999), borderWidth: scale(2), justifyContent: 'center', alignItems: 'center', borderColor: BLACK
                            }}>
                            <ImageIcon source={require('../res/images/home/update.png')}></ImageIcon>
                        </TouchableOpacity>
                        {
                            realScheduleInfo?.scheduleStatusId === 2 && !this.props?.nextStop?.data[0]?.stopId ?
                                <TouchableOpacity
                                    onPress={() => {
                                        this.props?.navigation.navigate(QR_SCAN_FINISH_SCREEN)
                                    }}
                                    style={{
                                        position: 'absolute', top: scale(distance * 4 + heightButton * 3 + scale(65)), right: scale(10), backgroundColor: WHITE, width: scale(45), height: scale(45), borderRadius: scale(999), borderWidth: scale(2), justifyContent: 'center', alignItems: 'center', borderColor: BLACK
                                    }}>
                                    <ImageIcon source={require('../res/images/attendance/stop.png')}></ImageIcon>
                                </TouchableOpacity>
                                : realScheduleInfo?.scheduleStatusId === 2 ?
                                    <TouchableOpacity
                                        onPress={() => {
                                            if (this.props?.nextStop?.data[0]) {
                                                if (Platform.OS === 'ios') {
                                                    this.props.navigation.navigate(REPORTLATE)
                                                } else {
                                                    this.props.navigation.navigate(REPORTLATEANDROID)
                                                }
                                            } else {
                                                notificationAlert(getString('COMMON_BOTTOM_TAB_NOTIFICATION'), getString('MONITOR_HOMESCREEN_ONPRESS_REPORTLATE_ALERT'))
                                            }
                                        }}
                                        style={{
                                            position: 'absolute', top: scale(distance * 4 + heightButton * 3 + scale(65)), right: scale(10), backgroundColor: WHITE, width: scale(45), height: scale(45), borderRadius: scale(999), borderWidth: scale(2), justifyContent: 'center', alignItems: 'center', borderColor: BLACK
                                        }}>
                                        <ImageIcon source={require('../res/images/home/reportLate.png')}></ImageIcon>
                                    </TouchableOpacity> : null
                        }

                    </View >
                )
            } else {
                this._tokenInvalidFunction()
                return null;
            }
        } else {
            return (
                <Loading></Loading>
            )
        }
    }
}

const heightButton = scale(35);
const distance = scale(5);

const mapStateToProps = (store) => {
    return {
        monitorInfo: store.monitorReducer.monitorInfo,
        scheduleInfo: store.scheduleReducer.scheduleInfo,
        nextStop: store.scheduleReducer.nextStop,
        totalCheckIn: store.scheduleReducer.totalCheckIn,
        totalCheckOut: store.scheduleReducer.totalCheckOut,
        totalEarly: store.scheduleReducer.totalEarly,
        listStudentOnBus: store.scheduleReducer.listStudentOnBus,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getScheduleInfo: (monitorId) => {
            dispatch(getScheduleInfo(monitorId))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(GoogleMap);

