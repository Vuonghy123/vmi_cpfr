import { EN, language, VI } from "../constant/Language";

export function getString(text) {
    switch (language.getInstance()) {
        case 'english':
            return EN[text] || 'ERR(ENG)';
        case 'vietnamese':
            return VI[text] || 'ERR(VIE)';
        default:
            return VI[text] || 'ERR(VIE)';
    }
}
