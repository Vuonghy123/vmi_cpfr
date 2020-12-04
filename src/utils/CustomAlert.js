import { Alert } from "react-native";
import { getString } from '../utils/GetString';
export const notificationAlert = (title, content) => {
    Alert.alert(
        title || getString('COMMON_BOTTOM_TAB_NOTIFICATION'),
        content || 'Sản phẩm của Headway',
        [
            { text: getString('OK'), onPress: () => console.log('OK Pressed') }
        ],
        { cancelable: false }
    );
}
export const cancelableNotificationAlert = (title, content, onPressOK) => {
    Alert.alert(
        title || getString('COMMON_BOTTOM_TAB_NOTIFICATION'),
        content || 'Sản phẩm của Headway',
        [
            { text: getString('COMMON_TEXT_CANCEL'), onPress: () => console.log('Cancel Pressed') },
            { text: getString('OK'), onPress: () => onPressOK() }
        ],
        { cancelable: false }
    );
}
export const notificationAlertWithPressableOK = (title, content, onPressOK) => {
    Alert.alert(
        title || getString('COMMON_BOTTOM_TAB_NOTIFICATION'),
        content || 'Sản phẩm của Headway',
        [
            { text: getString('OK'), onPress: () => onPressOK() }
        ],
        { cancelable: false }
    );
}