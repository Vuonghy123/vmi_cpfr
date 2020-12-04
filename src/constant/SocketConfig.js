import io from 'socket.io-client';
import {CHAT_URL} from '../constant/EndPoint';


export const socketInstance = (function () {
    var instance;
    function init() {
        instance = io(CHAT_URL)
        return instance;
    }

    return {
        getInstance: function () {
            if (!instance) instance = init();
            return instance;
        },
        clearInstance: function () {
            instance = null
        }
    }
})();