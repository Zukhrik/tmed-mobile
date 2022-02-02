import moment from 'moment'
import order from '../../Service/order'
import {getWeekDay} from '../../utils/time-utils'
import {useCallback, useEffect, useState} from 'react'

export const formatter = 'YYYY-MM-DD HH:mm:ss'

export const strHourToInt = (strHour) => parseInt(strHour.split(':')[0])

const getDateTime = (number) => {
    const now = new Date().toDateString()
    const time = String(number.toFixed(2)).split('.').join(':')
    return new Date(`${now} ${time}`)
}

export function useSpecialistDate({job, dateData, active, handleChange}) {
    const [error, setError] = useState([])
    const [currentWeekday, setCurrentWeekday] = useState(getWeekDay(new Date()))
    const [date, setDate] = useState(new Date())
    const [hours, setHours] = useState([])
    const [meetTimes, setMeetTimes] = useState({})
    const [requestData, setRequestData] = useState({})
    const [isCurrentDate, setIsCurrentDate] = useState(true)
    const [requestLoading, setRequestLoading] = useState(false)
    const [mounted, setMounted] = useState(false)
    
    
    const generateData = useCallback((data) => {
        const tmp = {}
        for (let i = 0; i < data.length; i++) {
            const id = moment(data[i].meet_date).format(formatter)
            const meetTime = moment(data[i].meet_date).format('HH.mm')
            tmp[id] = {
                id: data[i].id,
                user: data[i].user,
                meetTime: parseFloat(meetTime).toFixed(1),
                meetTimeStr: moment(data[i].meet_date).format('HH:mm')
            }
        }
        return tmp
    }, [])
    
    const addClientData = useCallback((order) => {
        if (dateData && dateData.id) {
            const meetTime = moment(dateData.id).format('HH.mm')
            order[dateData.id] = {
                id: active.id,
                user: active.user,
                meetTime: parseFloat(meetTime).toFixed(1),
                meetTimeStr: moment(dateData.id).format('HH:mm')
            }
            return order
        }
        
        return false
    }, [active, dateData])
    
    const renderMeetRow = useCallback((id) => {
        const strHour = moment(id).format('HH:mm')
        const hourInt = strHourToInt(strHour)
        return meetTimes[hourInt]
            && Object.values(meetTimes[hourInt]).sort((a, b) => a - b)
    }, [meetTimes])
    
    const getOrgOrder = useCallback((params) => {
        setRequestLoading(true)
        order.getOrgOrderResponsible(params)
            .then(res => {
                const data = res.data.results
                let orders = generateData(data)
                const withClientOrder = addClientData(orders)
                if (withClientOrder) {
                    orders = withClientOrder
                }
                setRequestData(orders)
            })
            .finally(() => setRequestLoading(false))
            .catch(() => {
                setRequestLoading(false)
            })
    }, [generateData, addClientData])
    
    useEffect(() => {
        if (job && job.operating_mode && job.operating_mode[currentWeekday]) {
            const data = job.operating_mode[currentWeekday]
            const breaks = data.breaks
            const to = parseInt(data.to)
            const interval = data.proc_interval
            const tmp = []
            const possibleMeetTime = {}
            let from = parseInt(data.from)
            let a = data.from
            
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
                    .setMinutes(new Date(getDateTime(a === from ? data.from : a)).getMinutes() + interval)))
                
                const id = moment(new Date(`${date.toDateString()} ${moment(getDateTime(a)).format('HH:mm')}`)).format(formatter)
                
                possibleMeetTime[parseInt(a)][id] = {
                    intDate: a,
                    isPossible: isCurrentDate,
                    strDate: `${moment(getDateTime(a)).format('HH:mm')} - ${strHour.format('HH:mm')}`,
                    dateString: moment(new Date(`${date.toDateString()} ${moment(getDateTime(a)).format('HH:mm')}`)).format(formatter)
                }
                a = parseFloat(strHour.format('HH.mm'))
            }
            
            setMeetTimes(possibleMeetTime)
            
            if (isCurrentDate) {
                from = moment(new Date()).format('H')
            }
            
            for (let i = from; i < to; i++) {
                const id = moment(new Date(`${date.toDateString()} 0${i}:00`)).format(formatter)
                if (i < 10) {
                    tmp.push({hour: `0${i}:00`, interval: data.proc_interval, id})
                } else {
                    tmp.push({hour: `${i}:00`, interval: data.proc_interval, id})
                }
            }
            setHours(tmp)
            setError(null)
        } else {
            setError('Не рабочий день')
        }
    }, [job, currentWeekday, date, isCurrentDate])
    
    const getOrders = useCallback((id) => {
        const data = {
            responsible_id: id,
            params: {
                limit: 200,
                offset: 0,
                meet_date__gt: moment(new Date(`${date.toDateString()} 00:00`)).format(formatter),
                meet_date__lt: moment(new Date(`${date.toDateString()} 23:59`)).format(formatter)
            }
        }
        getOrgOrder(data)
    }, [date, getOrgOrder])
    
    const changeClientDate = useCallback((meet_date, meetTime) => {
        const orders = {...requestData}
        const params = {
            id: active.id,
            user: active.user,
            meetTime: parseFloat(meetTime).toFixed(1),
            meetTimeStr: moment(meet_date).format('HH:mm')
        }
        if (dateData && dateData.id && orders[dateData.id]) {
            delete orders[dateData.id]
        }
        
        const clientDate = {
            date: meet_date,
            id: meet_date
        }
        
        handleChange(clientDate)
        orders[meet_date] = params
        setRequestData(orders)
    }, [active, dateData, requestData, handleChange])
    
    const onChange = useCallback((meetDate) => {
        const meet_date = moment(new Date(`${date.toDateString()} ${moment(getDateTime(meetDate)).format('HH:mm')}`)).format(formatter)
        const meetTime = moment(meet_date).format('HH.mm')
        changeClientDate(meet_date, meetTime)
        
    }, [changeClientDate, date])
    
    const selectDate = useCallback((date) => {
        setDate(new Date(date))
        setCurrentWeekday(getWeekDay(new Date(date)))
        
        if (moment(date).format('YYYY-MM-DD') === moment(new Date()).format('YYYY-MM-DD')) {
            setIsCurrentDate(true)
        } else {
            setIsCurrentDate(false)
        }
    }, [])
    
    useEffect(() => {
        if (!mounted && job) {
            getOrders(job.id)
            setMounted(true)
        }
    }, [getOrders, mounted, job])
    
    return {
        hours,
        renderMeetRow,
        requestData,
        onChange,
        selectDate,
        date,
        requestLoading,
        error
    }
}