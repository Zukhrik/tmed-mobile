import {useEffect, useState} from 'react'
import {useStore} from 'effector-react'
import {$userModel} from '../../Models/user-model'
import {getDWEDChatDetailTime} from '../../utils/time-utils'
import {useTranslation} from 'react-i18next'

export function useUserOnline({username}) {
    const [onlineText, setOnlineText] = useState('')
    const {$onlineUser: {data}} = useStore($userModel)
    const {t} = useTranslation()

    useEffect(() => {
        let timeout = null

        timeout = setInterval(() => {
            if (username && data[username]) {
                const time = data[username].time
                const now = new Date().getTime()
                if (now - time <= 11000) {
                    setOnlineText(t('online'))
                } else {
                    setOnlineText(t('last_seen_t', {t: getDWEDChatDetailTime(time)}))
                }
            }else {
                setOnlineText(t('last_seen_recently'))
            }
        }, 1000)

        return () => {
            clearInterval(timeout)
            timeout = null
        }
    }, [data, username, t])

    return {onlineText}

}