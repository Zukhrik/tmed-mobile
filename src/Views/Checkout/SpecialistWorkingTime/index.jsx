import React from 'react'
import {SpecialistWorkingTimeWrapper} from '../style'
import {MeetDateContent, MeetDateContentInner, MeetDateGridItem, MeetDateHour, MeetDatePeople} from './style'
import {MeetTimeList} from './MeetTimeList'


export const SpecialistWorkingTime = ({active, hours, renderMeetRow, requestData, onChange}) => {
    
    return (
        <SpecialistWorkingTimeWrapper>
            {/*<Row gutter={[24, 0]} align='middle'>*/}
            {/*    <Col>*/}
            {/*        <Text>{moment().format('HH:mm')}</Text>*/}
            {/*    </Col>*/}
            {/*</Row>*/}
            <MeetDateContent>
                {/*<MeetDate>*/}
                {/*    {moment(date).format('YYYY.MM.DD')}*/}
                {/*</MeetDate>*/}
                <MeetDateContentInner>
                    {
                        hours.map((item, idx) => {
                            const meetRow = renderMeetRow(item.id)
                            return (
                                <MeetDateGridItem key={`${idx + 1}`}>
                                    <MeetDateHour>
                                        {item.hour}
                                    </MeetDateHour>
                                    <MeetDatePeople>
                                        {
                                            meetRow && meetRow.length > 0
                                            && meetRow.map((time, idx) => {
                                                const data = requestData[time.dateString] || false
                                                return (
                                                    <MeetTimeList
                                                        key={`${idx + 1}`}
                                                        data={data}
                                                        time={time}
                                                        onChange={onChange}
                                                        active={active}
                                                    />
                                                )
                                            })
                                        }
                                    </MeetDatePeople>
                                </MeetDateGridItem>
                            )
                        })
                    }
                </MeetDateContentInner>
            </MeetDateContent>
        </SpecialistWorkingTimeWrapper>
    )
}