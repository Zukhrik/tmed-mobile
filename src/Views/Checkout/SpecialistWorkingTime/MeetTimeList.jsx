import React from 'react'
import {BookedMeetTime} from './BookedMeetTime'
import {MeetTime} from './MeetTime'
import {MeetDateItem} from './style'
import moment from 'moment'
export const MeetTimeList = ({data, time, onChange, active}) => {
    return (
        <>
            {
                data
                    ? (
                        <BookedMeetTime data={data} active={active}/>
                    )
                    : (
                        <>
                            {
                                time.isPossible
                                    ? parseFloat(moment(new Date()).format('HH.mm')) < time.intDate ? (
                                        <MeetTime
                                            time={time}
                                            onChange={onChange}
                                        />
                                    ) : <MeetDateItem/>
                                    : <MeetTime
                                        time={time}
                                        onChange={onChange}
                                    />
                            }

                        </>
                    )
            }
        </>
    )
}