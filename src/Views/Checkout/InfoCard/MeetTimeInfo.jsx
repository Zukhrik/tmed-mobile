import React, {useCallback} from 'react'
import moment from 'moment'
import {Tooltip} from 'antd'
import {URL_KEYS} from '../../../Constants'
import {useLocation} from 'react-router-dom'
import {useUrlParams} from '../../../Hooks/app'
import {MeetTimeItem, MeetTimeUIBox} from './style'
import {Title} from '../../../UIComponents/Typography/Title'

export const MeetTimeInfo = ({requestData, dateItem, meetDate, activeDay}) => {
    const {pathname} = useLocation()
    const time = moment(dateItem.dateTime).format('HH:mm')
    const {urlData} = useUrlParams()
    const specId = urlData[URL_KEYS.SPECIALIST_ID]
    
    const generateMeetTimeLink = useCallback((time) => {
        const url = []
        if (specId) {
            url.push(`${URL_KEYS.SPECIALIST_ID}=${specId}`)
        }
        url.push(`${URL_KEYS.DATE}=${activeDay}`)
        url.push(`${URL_KEYS.TIME}=${time}`)
        return {
            pathname,
            search: url.join('&')
        }
    }, [activeDay, pathname, specId])
    
    const currentTime = new Date().getTime()
    
    return (
        <>
            {
                requestData[dateItem.dateTime]
                    ? (
                        <>
                            {
                                dateItem.dateTime > currentTime
                                && (
                                    <Tooltip
                                        title={`${requestData[dateItem.dateTime]?.user?.full_name} ${dateItem.strDate}`}>
                                        <MeetTimeUIBox imgUrl={requestData[dateItem.dateTime]?.user?.avatar}/>
                                    </Tooltip>
                                )
                            }
                        </>
                    )
                    : (
                        <>
                            {
                                dateItem.dateTime > currentTime
                                && (
                                    <MeetTimeItem
                                        to={generateMeetTimeLink(time)}
                                        isActive={() => meetDate && meetDate === dateItem.dateTime}
                                    >
                                        <Title weight={500}>
                                            {time}
                                        </Title>
                                    </MeetTimeItem>
                                )
                                
                            }
                        </>
                    )
            }
        </>
    )
}