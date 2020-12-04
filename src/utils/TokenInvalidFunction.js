import { Toast } from "native-base";
import {
    AsyncStorage,
} from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { LOGIN } from "../navigator/RouteName";
import { getString } from '../utils/GetString';
export const _tokenInvalidFunction = async (navigation) => {
    Toast.show({
        text: getString('EXPIRED_LOGIN_SESSION_ALERT'),
        position: "bottom",
        duration: 3000
    })
    await AsyncStorage.removeItem('token');
    navigation.dispatch(
        CommonActions.reset({
            index: 1,
            routes: [{ name: LOGIN }],
        }),
    );
}
