const AUTH_URL = 'https://auth.edukite.asia/';
const BASE_URL = 'https://api.edukite.asia/edukite/';

export const CHAT_URL = 'https://chat.edukite.asia/';
export const CHAT_PORT = 'https://chat.edukite.asia/';
export const CHAT_NGROK = 'https://chat.edukite.asia/';
export const MEDIA_URL = 'https://media.edukite.asia/';

export const AUTHENTICATE = AUTH_URL + 'oauth/token';

export const GET_MONITOR_INFO = BASE_URL + 'users/info';

export const GET_SCHEDULE_INFO = BASE_URL + 'schedule/me';

export const GET_BUS_STOP = BASE_URL + 'schedule/busstop';

export const GET_NEXT_STOP = BASE_URL + 'schedule/nextstop';

export const GET_STUDENT_CHECKIN_STOP = BASE_URL + 'schedule/studentsbus';
export const GET_STUDENT_CHECKOUT_STOP = BASE_URL + 'schedule/studentsbus?checkType=2';

export const CHECK_IN = BASE_URL + 'schedule/checkin'; // also used for checkout

export const GET_ALL_STUDENT = BASE_URL + 'schedule/students'; // get all student check in
export const GET_ALL_STUDENT_CHECKOUT = BASE_URL + 'schedule/students?checkType=2';

export const QR_CHECK_IN = BASE_URL + 'users/qrcode';

export const COUNT_CHECKIN_STUDENT_ALL_SCHEDULE = BASE_URL + 'schedule/count';
export const COUNT_CHECKOUT_STUDENT_ALL_SCHEDULE = BASE_URL + 'schedule/count?checkTypeId=2';
export const COUNT_EARLY_CHECKOUT_STUDENT_ALL_SCHEDULE = BASE_URL + 'schedule/count?checkTypeId=2&checkStatus=4';

export const COUNT_CHECKIN_STUDENT_PER_STOP = BASE_URL + 'schedule/count/busstop';
export const COUNT_CHECKOUT_STUDENT_PER_STOP = BASE_URL + 'schedule/count/busstop?checkTypeId=2';

export const GET_BUS_INFO = BASE_URL + 'verhicle/bus/';

export const GET_STUDENT_ON_BUS = BASE_URL + 'schedule/studentsbus/onbus';

export const DROP_EARLY = BASE_URL + 'schedule/drop/early';

export const GET_PARENT_INFO = BASE_URL + 'schedule/students/';

export const PUT_CHANGE_PASSWORD = BASE_URL + 'users/changepass';

export const GET_NOTIFICATION = BASE_URL + 'notification/?size=10';

export const GET_LIST_SCHEDULE = BASE_URL + 'schedule/monitor/schedulelist/?size=10';

export const GET_LIST_CHAT_USER = CHAT_URL + 'users';
export const GET_HISTORY_CHAT = CHAT_URL + 'messages/history';

export const POST_REPORT_LATE = BASE_URL + 'schedule/behavior/late';

export const UPLOAD_IMAGE = CHAT_NGROK + 'images/base64';

export const SEND_DEVICE_INFO = BASE_URL + 'notification/device';

export const ONLINE = CHAT_URL + 'users/active';
export const OFFLINE = CHAT_URL + 'users/inactive';

export const START_SCHEDULE = BASE_URL + 'schedule/start';
export const QR_FINISH = BASE_URL + 'schedule/end';

export const GET_STUDENT_DETAIL = BASE_URL + 'users/info/student/';

export const DEVICE = BASE_URL + 'notification/device/'; // + device id, method DELETE

export const GET_REAL_PARENT_INFO = BASE_URL + 'users/teacher/info/guardian/'

export const GET_STUDENT_INFO_BY_STUDENTCODE = BASE_URL + 'schedule/student/code';

export const POST_UPLOAD_AVT = BASE_URL + 'upload/profile';

export const POST_SOS = BASE_URL + 'schedule/sos';

export const FORGET_PASSWORD = BASE_URL + 'users/reset-password';

export const UPDATE_GPS = BASE_URL + 'verhicle/tracking/';