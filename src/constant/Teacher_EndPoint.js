const AUTH_URL = 'https://auth.edukite.asia/';
const BASE_URL = 'https://api.edukite.asia/edukite/';

export const CHAT_URL = 'https://chat.edukite.asia/';
export const CHAT_PORT = 'https://chat.edukite.asia/';
export const CHAT_NGROK = 'https://chat.edukite.asia/';

export const MEDIA_URL = 'https://media.edukite.asia/';
export const MEDIA_URL2 = 'https://media.edukite.asia';
export const AUTHENTICATE = AUTH_URL + 'oauth/token';

export const GET_COUNT_TODAY_SCHEDULES = BASE_URL + 'schedule/teacher/count';
export const GET_TEACHER_INFO = BASE_URL + 'users/info';
export const GET_LIST_CLASS = BASE_URL + 'users/teacher/class';
export const GET_LIST_STUDENT_IN_CLASS = BASE_URL + 'users/teacher/class';
export const GET_DATA_ATTENDANCE_BUS_SCREEN = BASE_URL + 'schedule/teacher/student/checklist';
export const GET_STUDENT_INFO = BASE_URL + 'users/info/student/';
export const GET_LIST_STUDENT_ADDTENDANCE_CLASS = BASE_URL + 'attendance/students';
export const GET_ATTENDANCE_STATISTIC = BASE_URL + 'attendance/statistic';
export const GET_ATTENDANCE_ABSENT_STATISTIC = BASE_URL + 'attendance/statistic/absence';
export const POST_ATTENDANCE_TEACHER = BASE_URL + 'attendance/checkin';
export const POST_ATTENDANCE_CHECKOUT_TEACHER = BASE_URL + 'attendance/checkout';
export const GET_COUNT_ATTENDANCE_CLASS_CHECKOUT = BASE_URL + 'attendance/leave';

//Vuong add
export const UPDATE_TEACHER_INFO = BASE_URL + 'users/info/teacher';
export const GET_STUDENT_INFO_BY_CLASSID = BASE_URL + 'users/class/student/';
export const GET_GUARDIAN_INFO_BY_STUDENTID = BASE_URL + 'users/teacher/info/guardian/';
export const GET_MONITORPICKUP_INFO = BASE_URL + 'users/info/';
export const GET_NOTIFICATION_TYPE = BASE_URL + 'notification/type';
export const GET_NOTIFICATION_CONTENT = BASE_URL + 'notification/category';
export const GET_HISTORY_NOTIFICATION = BASE_URL + 'notification/teacher/created/?size=10'
export const POST_CREATE_NOTI = BASE_URL + 'notification/class';
export const GET_CREATED_NOTI_DETAIL = BASE_URL + 'notification/teacher/created/detail';
