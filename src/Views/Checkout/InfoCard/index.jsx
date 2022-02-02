import React from 'react'
import {SpecMeetDate} from './SpecMeetDate'
import {URL_KEYS} from '../../../Constants'
import {useUrlParams} from '../../../Hooks/app'
import {CheckoutDetail} from './CheckoutDetail'

export const InfoCard = ({activeDay, comment, onChange, meetDate, payment, setPayment}) => {
    const {urlData} = useUrlParams()
    const next = urlData[URL_KEYS.NEXT]
    
    return (
        <>
            {
                !next
                    ? (
                        <SpecMeetDate
                            comment={comment}
                            onChange={onChange}
                            activeDay={activeDay}
                            meetDate={meetDate}
                        />
                    )
                    : <CheckoutDetail payment={payment} setPayment={setPayment}/>
            }
        
        </>
    )
}