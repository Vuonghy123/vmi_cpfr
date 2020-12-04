import Emoji from "../constant/Emoji";

export default function convertToEmoji(message) {
    var str = message;
    str = str.replace(/:\)/g, Emoji.SMILE);
    str = str.replace(/:D/g, Emoji.SMILE_MEDIUM);
    str = str.replace(/xD/g, Emoji.SMILE_HARD);
    str = str.replace(/:\(/g, Emoji.SAD);
    str = str.replace(/:'\(/g, Emoji.CRY_MEDIUM);
    str = str.replace(/T\.T/g, Emoji.CRY_HARD);
    str = str.replace(/-_-\!/g, Emoji.ANGRY_RED);
    str = str.replace(/-_-/g, Emoji.ANGRY);
    str = str.replace(/:\|/g, Emoji.SERIOUS);
    str = str.replace(/:x/g, Emoji.NO_COMMENT);
    str = str.replace(/:o/g, Emoji.WOW);
    str = str.replace(/:home/g, Emoji.HOME);
    str = str.replace(/:school/g, Emoji.SCHOOL);
    str = str.replace(/\<3/g, Emoji.LOVE);
    str = str.replace(/\(y\)/g, Emoji.LIKE);
    return str;

}