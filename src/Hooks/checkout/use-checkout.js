import moment from 'moment'
import {useUrlParams} from '../app'
import {useOrgPayments} from '../org'
import {useStore} from 'effector-react'
import order from '../../Service/order'
import {URL_KEYS} from '../../Constants'
import {useHistory} from 'react-router-dom'
import {formatter} from './use-specialist-date'
import {$orgModel} from '../../Models/org-model'
import {useCallback, useEffect, useState} from 'react'
import {resetOrderCartList, resetOrgOrderCart} from '../../Models/order-model'

export function useCheckout() {
    useOrgPayments()
    const {$orgPaymentMethods: {data}} = useStore($orgModel)
    const [comment, setComment] = useState('')
    const [activeDay, setActiveDay] = useState(moment(new Date()).format('YYYY-MM-DD'))
    const [meetDate, setMeetDate] = useState(null)
    const [payment, setPayment] = useState({
        id: data?.status ? data?.['1'].id : null,
        title: data?.status ? data?.['1'].method : null,
        extraId: null
    })
    const {urlData} = useUrlParams()
    const spec_id = urlData[URL_KEYS.SPECIALIST_ID]
    const _activeDate = urlData[URL_KEYS.DATE]
    const time = urlData[URL_KEYS.TIME]
    const text = urlData[URL_KEYS.TEXT]
    const {push} = useHistory()
    
    const handleSubmit = useCallback(() => {
        if (spec_id && meetDate) {
            const data = {
                meet_date: moment(new Date(meetDate)).format(formatter),
                client_comment: comment && comment.trim().length > 0 ? comment : null,
                responsible_id: spec_id,
                payment: payment.extraId,
                card_id: Number(payment.extraId) === 3 ? payment.id : null
            }
            order.createOrder(data)
                .then((res) => {
                    if (res) {
                        push(`/records/detail/${res.data.id}`)
                        resetOrgOrderCart()
                        resetOrderCartList()
                    }
                })
        }
        
    }, [spec_id, comment, meetDate, payment, push])
    
    
    useEffect(() => {
        let timeout = null
        
        timeout = setTimeout(() => {
            if (!!activeDay && !!time) {
                setMeetDate(new Date(moment(`${activeDay} ${time}`).toDate()).getTime())
            } else {
                setMeetDate(null)
            }
        }, 100)
        
        return () => {
            clearTimeout(timeout)
            timeout = null
        }
    }, [time, activeDay])
    
    useEffect(() => {
        let timeout = null
        timeout = setTimeout(() => {
            if (_activeDate) {
                
                setActiveDay(_activeDate)
            } else {
                setActiveDay(moment(new Date()).format('YYYY-MM-DD'))
            }
        }, 100)
        
        return () => {
            clearTimeout(timeout)
            timeout = null
        }
    }, [_activeDate])
    
    useEffect(() => {
        if (!text) {
            setComment(text)
        }
    }, [text])
    
    useEffect(() => {
        let timeout = null
        
        timeout = setTimeout(() => {
            if (!spec_id) {
                push('/records/unregistered')
            }
        }, 600)
        
        return () => {
            clearTimeout(timeout)
            timeout = null
        }
    }, [spec_id, push])
    
    
    return {comment, handleSubmit, activeDay, meetDate, setComment, payment, setPayment}
}