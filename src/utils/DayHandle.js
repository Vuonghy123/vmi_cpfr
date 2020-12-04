import { moment } from 'moment';
export const dayHandler = (distance) => {
    console.log('distance', distance)
    let day = (parseInt(moment().add(distance, "days").format('d')) + 1) === 1 ? 'Chủ nhật' : 'Thứ ' + (parseInt(moment().add(distance, "days").format('d')) + 1)
    let date = (moment().format('DD/MM'))
    return {
        day
    }
}