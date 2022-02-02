import moment from 'moment'
import {useCallback, useEffect, useState} from 'react'
import {useUrlParams} from '../app'
import {URL_KEYS} from '../../Constants'
import {useStore} from 'effector-react'
import {formatter, strHourToInt} from './use-specialist-date'
import {getDateTime, getWeekDay} from '../../utils/time-utils'
import {$orderModel} from '../../Models/order-model'
import order from '../../Service/order'
import {useParams} from 'react-router-dom'

export function useSpecMeetDate({activeDay}) {
    const {organization} = useParams()
    const [activeDate] = useState(new Date())
    const {$orgOrderCartList: {data}} = useStore($orderModel)
    const [dateRange, setDateRange] = useState([])
    const [meetTimes, setMeetTimes] = useState({})
    const [hours, setHours] = useState([])
    const [requestData, setRequestData] = useState({})
    const operating_modes = organization && data[organization] &&  data[organization][0]?.responsible?.operating_mode
    const {urlData} = useUrlParams()
    const specId = urlData[URL_KEYS.SPECIALIST_ID]

    const generateData = useCallback((data) => {
        const tmp = {}
        for (let i = 0; i < data.length; i++) {
            const id = new Date(moment(data[i].meet_date).format(formatter)).getTime()
            const meetTime = moment(data[i].meet_date).format('HH.mm')
            tmp[id] = {
                user: data[i].user,
                meetTime: parseFloat(parseFloat(meetTime).toFixed(1)),
            }
        }
        return tmp
    }, [])

    const getOrgOrder = useCallback((params) => {
        order.getOrgOrderResponsible(params)
            .then(res => {
                const data = res.data.results
                let orders = generateData(data)
                setRequestData(orders)
            })
    }, [generateData])

    const renderMeetRow = useCallback((id) => {
        const strHour = moment(id).format('HH:mm')
        const hourInt = strHourToInt(strHour)
        return meetTimes[hourInt] && Object.values(meetTimes[hourInt]).sort((a, b) => a - b)
    }, [meetTimes])

    useEffect(() => {
        const endDate = moment(activeDate).endOf('month')
        let start = activeDate.getUTCDate()
        const end = new Date(endDate).getUTCDate()
        const tmp = []
        for (let i = 0; i <= end - start; i++) {
            const d = moment(activeDate).add(i, 'days')
            tmp.push(d.format('YYYY-MM-DD'))
        }

        setDateRange(tmp)
    }, [activeDate])


    useEffect(() => {
        const day = getWeekDay(new Date())
        if (operating_modes && operating_modes[day]) {
            const mode = operating_modes[day]
            const breaks = mode.breaks
            const to = mode.to
            const interval = mode.proc_interval
            const tmp = []
            const possibleMeetTime = {}
            let from = parseInt(mode.from)
            let a = mode.from
            const date = new Date(activeDay)

            while (a < to) {

                for (let i = 0; i < breaks.length; i++) {
                    if (parseInt(a) === parseInt(breaks[i].from) && (breaks[i].from >= a || a < breaks[i].to)) {
                        a = breaks[i].to
                    }
                }

                possibleMeetTime[parseInt(a)] = possibleMeetTime[parseInt(a)]
                    ? {...possibleMeetTime[parseInt(a)]}
                    : {}

                const strHour = moment(new Date(new Date(getDateTime(a))
                    .setMinutes(new Date(getDateTime(a === from ? mode.from : a)).getMinutes() + interval)))

                const id = moment(new Date(`${date.toDateString()} ${moment(getDateTime(a)).format('HH:mm')}`)).format(formatter)

                possibleMeetTime[parseInt(a)][id] = {
                    intDate: a,
                    strDate: `${moment(getDateTime(a)).format('HH:mm')} - ${strHour.format('HH:mm')}`,
                    dateTime: new Date(new Date(`${date.toDateString()} ${moment(getDateTime(a)).format('HH:mm')}`)).getTime()
                }
                a = parseFloat(strHour.format('HH.mm'))
            }
            setMeetTimes(possibleMeetTime)
            for (let i = from; i < to; i++) {
                const id = new Date(new Date(`${date.toDateString()} 0${i}:59`)).getTime()
                if (i < 10) {
                    tmp.push({hour: `0${i}:00`, interval, id})
                } else {
                    tmp.push({hour: `${i}:00`, interval, id})
                }
            }
            setHours(tmp)
        }
    }, [operating_modes, activeDay])


    useEffect(() => {
        if (specId && activeDay) {
            const data = {
                responsible_id: specId,
                params: {
                    status: '0,1,2',
                    limit: 200,
                    offset: 0,
                    meet_date__gt: moment(new Date(`${new Date(activeDay).toDateString()} 00:00`)).format(formatter),
                    meet_date__lt: moment(new Date(`${new Date(activeDay).toDateString()} 23:59`)).format(formatter),
                }
            }
            getOrgOrder(data)
        }
    }, [specId, getOrgOrder, activeDay])

    return {dateRange, activeDate, hours, renderMeetRow, requestData}
}