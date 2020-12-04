const AUTH_URL = 'https://auth.edukite.asia/';
const BASE_URL = 'https://api.edukite.asia/edukite/';

export const CHAT_URL = 'https://chat.edukite.asia/';
export const CHAT_PORT = 'https://chat.edukite.asia/';
export const CHAT_NGROK = 'https://chat.edukite.asia/';

export const MEDIA_URL = 'https://media.edukite.asia/';
export const MEDIA_URL2 = 'https://media.edukite.asia';

export const AUTHENTICATE = AUTH_URL + 'oauth/token';
export const GET_PARENT_INFO = BASE_URL + 'users/parent/info';
export const GET_LIST_STUDENT = BASE_URL + 'users/parent/student';
export const PUT_CHANGE_PASSWORD = BASE_URL + 'users/changepass';
export const GET_GUARDIAN_INFO = BASE_URL + 'users/info/guardian/';
export const GET_STUDENT_INFO = BASE_URL + 'users/info/student/';
export const GET_GRANTEE_INFO = BASE_URL + 'users/info/grantee/';
export const GET_LIST_SCHEDULE_STUDENT = BASE_URL + 'schedule/parent/schedulelist';
export const GET_LIST_PICKUP = BASE_URL + 'users/pickup/list/';
export const POST_REQUEST_FAMILY = BASE_URL + 'schedule/request/family';
export const POST_REQUEST_CHANGE_STOP = BASE_URL + 'schedule/request/change-stop';
export const POST_REQUEST_PICKUP_EARLY = BASE_URL + 'schedule/request/pickup-early';
export const POST_REQUEST_CHANGE_PICKER = BASE_URL + 'schedule/request/change-picker';
export const POST_REQUEST_ABSENT = BASE_URL + 'schedule/requestabsent';
export const DELETE_GRANTEE = BASE_URL + 'users/grantee/';
export const GET_LIST_RELATION = BASE_URL + 'params/relation';
export const UPDATE_USER_INFO = BASE_URL + 'users/info/parent';
export const GET_RECENT_SCHEDULE = BASE_URL + 'schedule/parent/current';
export const GET_NOTIFICATION = BASE_URL + 'notification/?size=10';
export const GET_HISTORY_CHAT = CHAT_URL + 'messages/history';
export const UPLOAD_IMAGE = CHAT_NGROK + 'images/base64';
export const GET_LIST_CHAT_USER = CHAT_URL + 'users';

export const SEND_DEVICE_INFO = BASE_URL + 'notification/device'
export const DEVICE = BASE_URL + 'notification/device/'; // + device id, method DELETE
export const GET_LIST_BUSSTOP_PARENT = BASE_URL + 'schedule/busstop/parent';
export const GET_DETAIL_STUDENT_SCHEDULE = BASE_URL + 'schedule/parent/schedule/detail';

export const GET_LIST_STOP_STUDENT = BASE_URL + 'schedule/busstop/parent';

export const GET_ATTENDANCE_STUDENT = BASE_URL + 'attendance/parent/history';

export const GET_INFO_CLASS_ATTENDANCE_STUDENT_IN_HOME_SCREEN = BASE_URL + 'attendance/parent/today';
export const POST_ABSENT_REPORT = BASE_URL + 'attendance/request-absence';
export const GET_CHANGE_REQUEST_HISTORY = BASE_URL + 'schedule/parent/change-request/history';
export const GET_CHANGE_REQUEST_DETAIL = BASE_URL + 'schedule/parent/change-request/detail';
export const GET_ATTENDANCE_DETAIL = BASE_URL + 'attendance/parent/detail';
export const GET_TRACKING_MONITOR = BASE_URL + 'verhicle/tracking/';
