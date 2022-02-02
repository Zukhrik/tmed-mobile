import React from 'react'
import {PlusSvg} from '../../../Icons/Plus'
import {MeetDateItem} from './style'
export const MeetTime = ({time, onChange, ...props}) => {
    return (
        <MeetDateItem
            onClick={() => onChange(time.intDate)}
            {...props}
        >
            <PlusSvg/>
        </MeetDateItem>
    )
}