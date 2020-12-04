import React, { useState, useEffect } from 'react';
import { GiftedChat, Send } from 'react-native-gifted-chat';
import {
    Text, View, Image, TouchableOpacity, Keyboard, TouchableWithoutFeedback
} from 'react-native';
import { Toast } from 'native-base';
import { socketInstance } from '../constant/SocketConfig';
import Header from './Header';
import { callApiWithParams, callApiWithRawBody } from '../api/CustomAPI';
import { GET_HISTORY_CHAT, UPLOAD_IMAGE } from '../constant/EndPoint';
import convertToEmoji from '../utils/EmojiHandle';
import { scale } from '../constant/Scale';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ImagePicker from 'react-native-image-picker';
import { WHITE, GRAY_FONTCOLOR } from '../constant/Colors';
import Emoji from '../constant/Emoji';
import ImageIcon from './ImageIcon';
import { SHOWINFOUSERINCHATSCREEN } from '../common_navigator/RouteName';
import { notificationAlert } from '../utils/CustomAlert';
import { useDispatch } from 'react-redux';
import { requestUpdateContactScreen } from '../common_actions/SystemAction';
import { headerHeight, windowHeight, windowWidth } from '../constant/Layout';
import { getString } from '../utils/GetString';
// import Emoticons from 'react-native-emoticons';
export default function Chat(props) {
    const dispatch = useDispatch()
    const [messages, setMessages] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [currentMessage, setCurrentMessage] = useState(' ')
    const [page, setPage] = useState(0);
    const [filePath, setFilePath] = useState(null);
    const [isMeTyping, setMeTyping] = useState(false);
    const [isFriendTyping, setFriendTyping] = useState(false);

    const onSend = (message) => {
        if (props?.extraData?.beBlocked || props?.extraData?.blocked) {
            notificationAlert(getString('COMMON_BOTTOM_TAB_NOTIFICATION'), getString('COMMON_MESS_SCREEN_TEXT_BLOCK_DETAIL'))
        }
        else {
            console.log(props?.extraData)
            if (filePath === null) {
                let mess = message[0]
                let textString = message[0]?.text || Emoji.LIKE
                mess = {
                    ...mess,
                    text: textString
                }
                mess = {
                    ...mess,
                    receivedId: props.userId,
                }
                socketInstance.getInstance().emit('client-new-message', mess)
            } else {
                let dataImage = {
                    uri: filePath.path,
                    name: filePath.fileName,
                    type: filePath.type,
                    data: filePath.data
                }
                setFilePath(null)
                setLoading(true)
                callApiWithRawBody('POST', UPLOAD_IMAGE, dataImage).then((response) => {
                    console.log(response?.data)
                    let linkImage = null;
                    if (response) {
                        if (response.status === 200) {
                            if (response.data.code === 0) {
                                linkImage = response.data?.data
                            }
                        }
                    }
                    if (linkImage) {
                        let mess = message[0]
                        let textString = message[0]?.text
                        mess = {
                            ...mess,
                            text: textString,
                            receivedId: props.userId,
                            image: linkImage
                        }
                        console.log('send:' + JSON.stringify(mess))
                        socketInstance.getInstance().emit('client-new-message', mess)
                        setLoading(false)
                    } else {
                        setLoading(false)
                        Toast.show({
                            text: getString('COMMON_MESS_SCREEN_TOAST_NO_SEND_IMAGE'),
                            position: "bottom",
                            duration: 3000
                        })
                    }

                })
            }
        }
    }
    const renderFooter = () => {
        return (
            <View style={{ width: '10%', height: scale(40), flexDirection: 'row', backgroundColor: WHITE, alignItems: 'center', marginLeft: scale(3) }} >
                <TouchableOpacity
                    onPress={() => {
                        var options = {
                            title: 'Select Image',
                            storageOptions: {
                                skipBackup: true,
                                path: 'images',
                            },
                        };
                        ImagePicker.showImagePicker(options, response => {
                            if (response.didCancel) {
                                console.log('User cancelled image picker');
                            } else if (response.error) {
                                console.log('ImagePicker Error: ', response.error);
                            } else if (response.customButton) {
                                console.log('User tapped custom button: ', response.customButton);
                                alert(response.customButton);
                            } else {
                                let source = response;
                                if (currentMessage === '') {
                                    setCurrentMessage(' ')
                                }
                                setFilePath(source)
                            }
                        });
                    }}
                    style={{ width: scale(40), height: scale(40), justifyContent: 'center', alignItems: 'center' }}>
                    <ImageIcon source={require('../res/images/chat/picture.png')}></ImageIcon>
                </TouchableOpacity>
            </View>
        )
    }
    useEffect(() => {
        socketInstance.getInstance().on('server-new-message', (messages) => {
            console.log('received')
            let messData = JSON.parse(messages)
            console.log('received new message:', messData)
            if (messData.sendId == props.userId) {
                setMessages(previousMessages => GiftedChat.append(previousMessages, messData))
            } else {
                
            }
        });
        socketInstance.getInstance().on('is-typing-alert', (data) => {
            if (data.sendId == props.userId) {
                console.log('set friend typing true')
                setFriendTyping(true)
            } else {
            }
        })
        socketInstance.getInstance().on('stop-typing-alert', (data) => {
            if (data.sendId == props.userId) {
                console.log('set friend typing false')
                setFriendTyping(false)
            } else {
            }
        })
        setPage(page + 1)
        let params = {
            userId: props?.userId,
            size: 20,
            page: page,
        }
        callApiWithParams('GET', GET_HISTORY_CHAT, params).then((response) => {
            if (response) {
                console.log(response.status)
                if (response.status === 200) {
                    if (response.data?.code === 0) {
                        setMessages(response.data?.data?.messages)

                    }
                }
            }
        })
    }, [])

    return (
        <>
            <Header
                canPress={true}
                navigation={props.navigation}
                back={true}
                leftIcon={'arrow-left'}
                onPressLeftIcon={() => {
                    dispatch(requestUpdateContactScreen(true))
                    socketInstance.getInstance().removeAllListeners('server-new-message')
                    socketInstance.getInstance().removeAllListeners('is-typing-alert')
                    socketInstance.getInstance().removeAllListeners('stop-typing-alert')
                    props?.navigation.pop()
                }}
                title={props?.name}
                onPressHeader={() => {
                    props?.navigation.navigate(SHOWINFOUSERINCHATSCREEN, {
                        chatUserInfo: {
                            id: props?.userId,
                            name: props?.name,
                            extraData: props?.extraData
                        }
                    })
                }}
            ></Header>
            <GiftedChat
                showAvatarForEveryMessage={false}
                renderChatFooter={() => {
                    if (filePath) {
                        return (
                            <View style={{ width: scale(150), height: scale(150) }}>
                                <Image
                                    source={{ uri: filePath.uri }}
                                    style={{ width: scale(150), height: filePath ? scale(150) : 0 }}
                                />
                                <TouchableOpacity
                                    onPress={() => {
                                        setFilePath(null)
                                    }}
                                    style={{ position: 'absolute', width: scale(30), height: scale(30), justifyContent: 'center', alignItems: 'center', right: 0, top: 0 }}>
                                    <Icon name={'times-circle'} size={scale(25)} color={WHITE}></Icon>
                                </TouchableOpacity>
                            </View>
                        )
                    } else {
                        return null;
                    }
                }}

                renderSend={(props) => {
                    return (
                        <Send
                            {...props}
                            containerStyle={{
                                height: 40,
                                width: 50,
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                paddingRight: scale(3),
                                paddingTop: (currentMessage === ' ' || currentMessage === ' ') && filePath === null ? scale(1) : scale(2)
                            }}
                        >
                            {
                                (currentMessage === ' ' || currentMessage === ' ') && filePath === null ?
                                    <ImageIcon source={require('../res/images/chat/like.png')}></ImageIcon> :
                                    <ImageIcon size={scale(25)}></ImageIcon>
                            }
                        </Send>
                    )
                }}
                placeholder={''}
                onInputTextChanged={(data) => {
                    if (data === '') {
                        data = ' '
                    }
                    if (isMeTyping) {
                        if (data === '' || data === ' ') {
                            setMeTyping(false)
                            socketInstance.getInstance().emit('client-stop-typing', {
                                receivedId: props.userId
                            })
                        }
                    } else {
                        if (data !== '' && data !== ' ') {
                            //emit dang nhap
                            setMeTyping(true)
                            socketInstance.getInstance().emit('client-is-typing', {
                                receivedId: props.userId
                            })
                        }
                    }
                    setCurrentMessage(convertToEmoji(data))
                }}
                text={currentMessage}
                alwaysShowSend={true}
                renderActions={renderFooter}
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: 1,
                }}
                // infiniteScroll={true}
                renderFooter={() => {
                    if (isLoading) {
                        return (
                            <View style={{ width: '100%', height: scale(25), paddingLeft: scale(10) }}>
                                <Text allowFontScaling={false} style={{ fontSize: scale(13), fontStyle: 'italic', color: GRAY_FONTCOLOR }}>{getString('COMMON_MESS_SCREEN_SENDING')}</Text>
                            </View>
                        )
                    } else if (isFriendTyping) {
                        return (
                            <View style={{ width: '100%', height: scale(25), paddingLeft: scale(10) }}>
                                <Text allowFontScaling={false} style={{ fontSize: scale(13), fontStyle: 'italic', color: GRAY_FONTCOLOR }}>{props.name} {getString('COMMON_MESS_SCREEN_RECV')}</Text>
                            </View>
                        )
                    } else {
                        return null
                    }
                }}
                loadEarlier={true}

                onLoadEarlier={() => {
                    setPage(page + 1)
                    let params = {
                        userId: props?.userId,
                        size: 10,
                        page: page,
                        lastMessage: messages[messages.length - 1]?.createdAt || null
                    }
                    console.log(params)
                    callApiWithParams('GET', GET_HISTORY_CHAT, params).then((response) => {
                        if (response) {
                            if (response.status === 200) {
                                if (response.data?.code === 0) {
                                    setMessages([...messages, ...response.data?.data?.messages])
                                }
                            }
                        }
                    })
                }}


            >

            </GiftedChat>
        </>
    )


}