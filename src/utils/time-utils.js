import moment from 'moment'
import i18next from 'i18next'

export const getDWEDChatDetailTime = (date) => {
    const last = moment(date)
    const now = moment(new Date())
    const duration = moment.duration(now.diff(last))

    if (duration.asHours() < 1) {
        return last.fromNow()
    } else if (duration.asHours() > 1 && duration.asDays() < 2 ) {
        return last.calendar().toLowerCase()
    }else if(duration.asDays() > 2 && duration.asDays() < 8) {
        const weekDay = moment.weekdays()[last.isoWeekday()]
        return `${weekDay}, ${last.format('HH:mm')}`
    }else if(duration.asDays() > 7){
        return last.format('DD.MM.YYYY')
    }
}

export const getDWEDCHatListTime= (date) => {
    const last = moment(date)
    const now = moment(new Date())
    const duration = moment.duration(now.diff(last))

    return last.calendar(null, {
            sameDay: 'HH:mm',
            lastDay: 'dd',
            lastWeek: 'dd',
            sameElse: duration.asYears() > 1 ? 'DD.MM.YY' : 'DD.MM'
        })

}

export const getDWEDGroupOfChatTime = (date) => {
    const last = moment(date)
    const now = moment(new Date())
    const duration = moment.duration(now.diff(last))

    if(duration.asDays() < 1) {
        return i18next.t('today')
    }else {
        return last.format('D MMMM')
    }
}

export const getWeekDay = (date) => new Date(date).toLocaleString('en-US', {weekday: 'short'}).toLowerCase()

export const getDateTime = (number) => {
    const now = new Date().toDateString()
    const time = String(number.toFixed(2)).split('.').join(':')
    return new Date(`${now} ${time}`)
}
