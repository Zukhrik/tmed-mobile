import {useCallback, useEffect, useState} from 'react'
import {useStore} from 'effector-react'
import {$appModel} from '../../Models/app'
import useWebSocket from 'react-use-websocket'
import {onlineUserMount} from '../../Models/user-model'

export function useCommonWs() {
    const {$app: {token}} = useStore($appModel)
    const [generalWSUrl, setGeneralWSUrl] = useState(null)
    const [time, setTime] = useState(null)
    // const [closed, setClosed] = useState({})
    const [tabVisibility, setTabVisibility] = useState(null)

    const {sendMessage} = useWebSocket(generalWSUrl, {
        onMessage: (e) => {
            const data = JSON.parse(e.data)
            // console.log(data)
            if (data.type === 'online_status') {
                const msg = {
                    [data.object.username]: {time: new Date().getTime()}
                }
                onlineUserMount(msg)
            }
        },
        onOpen: (e) => {
            // console.log(e)
            // setClosed({})
        },
        onClose: (e) => {
            // console.log(e)
            // setClosed({general: true})
        },
        onError: (e) => {
            console.log(e)
        },
    })

    useEffect(() => {
        if (token) {
            setGeneralWSUrl(`wss://py.dwed.biz/ws/v1.0/user/general/?token=${token}`)
        } else {
            setGeneralWSUrl(null)
        }
    }, [token])

    const getTabVisibility = useCallback(() => {
        if (document.visibilityState === 'visible') {
            setTabVisibility(document.visibilityState)
        }
        if (document.visibilityState === 'hidden') {
            setTabVisibility(null)
            setTime(null)
        }
    }, [])

    useEffect(() => {
        getTabVisibility()
        window.addEventListener('visibilitychange', getTabVisibility)

        return () => window.removeEventListener('visibilityChange', getTabVisibility)
    }, [getTabVisibility])

    useEffect(() => {
        let timeout = null
        if (token) {
            const data = {
                im_online: '1'
            }
            if (!time) {
                setTime(new Date().getTime())
                sendMessage(JSON.stringify(data))
            } else {
                if (tabVisibility && tabVisibility === 'visible') {
                    timeout = setInterval(() => {
                        const now = new Date()
                        if (time && now.getTime() - time > 10000) {
                            setTime(now.getTime())
                            // console.log(now)
                            sendMessage(JSON.stringify(data))
                        }
                    }, 10000)
                }
            }
        }

        return () => {
            clearInterval(timeout)
            timeout = null
        }
    }, [token, time, sendMessage, tabVisibility])
}